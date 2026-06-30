param(
  [string]$Bucket = "junyibags-assets",
  [string]$AssetsDir = "public/assets",
  [string]$Endpoint = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$accountId = $env:R2_ACCOUNT_ID
$accessKeyId = $env:R2_ACCESS_KEY_ID
$secretAccessKey = $env:R2_SECRET_ACCESS_KEY

if (-not $accountId) { throw "Set R2_ACCOUNT_ID before running this script." }
if (-not $accessKeyId) { throw "Set R2_ACCESS_KEY_ID before running this script." }
if (-not $secretAccessKey) { throw "Set R2_SECRET_ACCESS_KEY before running this script." }
if (-not $Endpoint) { $Endpoint = "https://$accountId.r2.cloudflarestorage.com" }

function Get-ContentType {
  param([string]$Path)
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".avif" { "image/avif"; break }
    ".webp" { "image/webp"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".svg" { "image/svg+xml"; break }
    ".ico" { "image/x-icon"; break }
    ".css" { "text/css"; break }
    ".js" { "text/javascript"; break }
    ".txt" { "text/plain"; break }
    ".xml" { "application/xml"; break }
    ".json" { "application/json"; break }
    ".pdf" { "application/pdf"; break }
    ".mp4" { "video/mp4"; break }
    default { "application/octet-stream" }
  }
}

function ConvertTo-Hex {
  param([byte[]]$Bytes)
  -join ($Bytes | ForEach-Object { $_.ToString("x2") })
}

function Get-Sha256Hex {
  param([byte[]]$Bytes)
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    ConvertTo-Hex ($sha.ComputeHash($Bytes))
  } finally {
    $sha.Dispose()
  }
}

function Get-HmacSha256 {
  param([byte[]]$Key, [string]$Data)
  $hmac = [System.Security.Cryptography.HMACSHA256]::new($Key)
  try {
    $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Data))
  } finally {
    $hmac.Dispose()
  }
}

function Get-SigningKey {
  param([string]$Secret, [string]$DateStamp, [string]$Region, [string]$Service)
  $kSecret = [System.Text.Encoding]::UTF8.GetBytes("AWS4$Secret")
  $kDate = Get-HmacSha256 $kSecret $DateStamp
  $kRegion = Get-HmacSha256 $kDate $Region
  $kService = Get-HmacSha256 $kRegion $Service
  Get-HmacSha256 $kService "aws4_request"
}

function Escape-S3PathPart {
  param([string]$Part)
  [System.Uri]::EscapeDataString($Part).Replace("%2F", "/")
}

function Invoke-R2PutObject {
  param(
    [string]$BucketName,
    [string]$Key,
    [string]$FilePath,
    [string]$ContentType
  )

  $body = [System.IO.File]::ReadAllBytes($FilePath)
  $payloadHash = Get-Sha256Hex $body
  $now = [DateTime]::UtcNow
  $amzDate = $now.ToString("yyyyMMddTHHmmssZ")
  $dateStamp = $now.ToString("yyyyMMdd")
  $region = "auto"
  $service = "s3"

  $endpointUri = [System.Uri]$Endpoint
  $hostName = $endpointUri.Host
  $encodedKey = ($Key.Split("/") | ForEach-Object { Escape-S3PathPart $_ }) -join "/"
  $canonicalUri = "/" + (Escape-S3PathPart $BucketName) + "/" + $encodedKey
  if (-not $canonicalUri.StartsWith("/")) { $canonicalUri = "/$canonicalUri" }

  $canonicalHeaders = "host:$hostName`nx-amz-content-sha256:$payloadHash`nx-amz-date:$amzDate`n"
  $signedHeaders = "host;x-amz-content-sha256;x-amz-date"
  $canonicalRequest = "PUT`n$canonicalUri`n`n$canonicalHeaders`n$signedHeaders`n$payloadHash"
  $credentialScope = "$dateStamp/$region/$service/aws4_request"
  $stringToSign = "AWS4-HMAC-SHA256`n$amzDate`n$credentialScope`n$(Get-Sha256Hex ([System.Text.Encoding]::UTF8.GetBytes($canonicalRequest)))"
  $signingKey = Get-SigningKey $secretAccessKey $dateStamp $region $service
  $signature = ConvertTo-Hex (Get-HmacSha256 $signingKey $stringToSign)

  $authorization = "AWS4-HMAC-SHA256 Credential=$accessKeyId/$credentialScope, SignedHeaders=$signedHeaders, Signature=$signature"
  $uri = "$($Endpoint.TrimEnd('/'))$canonicalUri"

  Invoke-WebRequest `
    -Uri $uri `
    -Method Put `
    -Headers @{
      Authorization = $authorization
      "x-amz-date" = $amzDate
      "x-amz-content-sha256" = $payloadHash
    } `
    -ContentType $ContentType `
    -Body $body `
    -TimeoutSec 120 `
    -UseBasicParsing | Out-Null
}

$resolvedAssets = (Resolve-Path -LiteralPath $AssetsDir).Path
$files = Get-ChildItem -LiteralPath $resolvedAssets -Recurse -File
$uploaded = 0

foreach ($file in $files) {
  $relative = $file.FullName.Substring($resolvedAssets.Length).TrimStart([char[]]@('\', '/'))
  $key = "assets/$($relative -replace '\\', '/')"
  $contentType = Get-ContentType $file.FullName

  if ($DryRun) {
    Write-Host "$key <$contentType>"
    continue
  }

  Invoke-R2PutObject -BucketName $Bucket -Key $key -FilePath $file.FullName -ContentType $contentType
  $uploaded += 1
  Write-Host "Uploaded $uploaded/$($files.Count): $key"
}

Write-Host "Uploaded $uploaded files to R2 bucket '$Bucket'."
