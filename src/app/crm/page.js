export const metadata = {
  title: 'International Trade CRM',
  description: 'A CRM workspace designed for Alibaba International Station inquiries, follow-ups, quotations, samples and orders.'
};

const leads = [
  {
    company: 'Nordic Retail Group',
    country: 'Sweden',
    product: 'Custom sling bag',
    source: 'International Station Inquiry',
    owner: 'Anna',
    score: 92,
    status: 'Quoted',
    value: 'Tiered quote sent',
    next: 'Follow up quotation in 8h'
  },
  {
    company: 'Mercado Outdoor',
    country: 'Chile',
    product: 'Waterproof waist bag',
    source: 'RFQ',
    owner: 'Leo',
    score: 84,
    status: 'Sample',
    value: 'Sample stage',
    next: 'Confirm sample address'
  },
  {
    company: 'Bright Promo LLC',
    country: 'United States',
    product: 'Full-print backpack',
    source: 'TradeManager',
    owner: 'Mia',
    score: 76,
    status: 'Negotiating',
    value: 'Revised quote',
    next: 'Send revised MOQ option'
  },
  {
    company: 'Hikari Gifts',
    country: 'Japan',
    product: 'Cosmetic pouch set',
    source: 'Website Form',
    owner: 'Chen',
    score: 67,
    status: 'New',
    value: 'New RFQ',
    next: 'First reply overdue'
  }
];

const pipeline = [
  ['New Leads', 42, '42 active'],
  ['Contacted', 31, '31 in follow-up'],
  ['Quoted', 19, '19 tiered quotes'],
  ['Sample', 8, '8 sample cases'],
  ['Won', 5, '5 active orders']
];

const tasks = [
  ['09:30', 'Reply to 3 new inquiries from International Station', 'Urgent'],
  ['11:00', 'Send PI and bank details to Nordic Retail Group', 'Sales'],
  ['15:00', 'Check DHL tracking for Mercado Outdoor samples', 'Sample'],
  ['17:30', 'Wake up 60-day silent VIP customers', 'Retention']
];

const products = [
  ['Custom Backpack', '128 inquiries', '23.6% quote rate'],
  ['Sling Bag', '96 inquiries', '31.2% quote rate'],
  ['Waist Bag', '74 inquiries', '28.4% quote rate'],
  ['Cosmetic Pouch', '53 inquiries', '18.8% quote rate']
];

const quotes = [
  ['Q-2026-0630-18', 'Nordic Retail Group', 'Tiered quotation', 'Valid 12 days'],
  ['Q-2026-0630-17', 'Bright Promo LLC', 'Revised quotation', 'Version 3'],
  ['Q-2026-0629-09', 'Mercado Outdoor', 'Sample quote', 'Waiting sample fee']
];

function ScoreBar({ score }) {
  return (
    <div className="crm-score" aria-label={`Lead score ${score}`}>
      <span style={{ width: `${score}%` }} />
    </div>
  );
}

export default function CrmPage() {
  return (
    <div className="crm-shell">
      <aside className="crm-sidebar" aria-label="CRM navigation">
        <div className="crm-brand">
          <span className="crm-brand-mark">CRM</span>
          <div>
            <strong>TradeFlow</strong>
            <small>International Station CRM</small>
          </div>
        </div>
        <nav className="crm-nav">
          {['Dashboard', 'Leads', 'Customers', 'Follow-ups', 'Quotations', 'Samples', 'Orders', 'Reports'].map((item, index) => (
            <a className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase().replace('-', '')}`} key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </a>
          ))}
        </nav>
        <div className="crm-side-card">
          <span>Response SLA</span>
          <strong>12 min</strong>
          <p>Average first response for new inquiries today.</p>
        </div>
      </aside>

      <section className="crm-main">
        <header className="crm-topbar">
          <div>
            <span className="crm-kicker">Alibaba International Station CRM</span>
            <h1>Foreign trade customer command center</h1>
          </div>
          <div className="crm-actions">
            <button type="button" aria-label="Import inquiries">Import</button>
            <button type="button" className="primary" aria-label="Create new lead">New Lead</button>
          </div>
        </header>

        <section className="crm-hero-grid" id="dashboard">
          <article className="crm-panel crm-overview">
            <div className="crm-panel-head">
              <div>
                <span className="crm-kicker">Today</span>
                <h2>Inquiry to order funnel</h2>
              </div>
              <span className="crm-pill green">Live</span>
            </div>
            <div className="crm-funnel">
              {pipeline.map(([label, count, amount], index) => (
                <div className="crm-funnel-step" key={label} style={{ '--level': `${100 - index * 13}%` }}>
                  <span>{label}</span>
                  <strong>{count}</strong>
                  <small>{amount}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="crm-panel crm-ai-card">
            <span className="crm-kicker">Lead Intelligence</span>
            <h2>High quality buyer detected</h2>
            <p>Nordic Retail Group has a company domain email, clear quantity, target price, and previous category match. Suggested next action: send a two-tier FOB quote with 500 and 1000 pcs options.</p>
            <div className="crm-ai-actions">
              <button type="button">Draft Email</button>
              <button type="button">Create Quote</button>
            </div>
          </article>
        </section>

        <section className="crm-metrics" aria-label="CRM metrics">
          {[
            ['New inquiries', '42', '+18%'],
            ['Quotes sent', '19', '+11%'],
            ['Follow-up rate', '94%', '+7%'],
            ['Won orders', '5', '+4%']
          ].map(([label, value, trend]) => (
            <article className="crm-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{trend} vs yesterday</small>
            </article>
          ))}
        </section>

        <section className="crm-workspace">
          <article className="crm-panel crm-leads" id="leads">
            <div className="crm-panel-head">
              <div>
                <span className="crm-kicker">Lead Pool</span>
                <h2>Prioritized international inquiries</h2>
              </div>
              <div className="crm-filter">
                <button type="button" className="active">All</button>
                <button type="button">Hot</button>
                <button type="button">Overdue</button>
              </div>
            </div>
            <div className="crm-table">
              <div className="crm-table-row crm-table-head">
                <span>Customer</span>
                <span>Product</span>
                <span>Score</span>
                <span>Status</span>
                <span>Next Action</span>
              </div>
              {leads.map((lead) => (
                <div className="crm-table-row" key={lead.company}>
                  <span>
                    <strong>{lead.company}</strong>
                    <small>{lead.country} / {lead.source}</small>
                  </span>
                  <span>{lead.product}</span>
                  <span>
                    <b>{lead.score}</b>
                    <ScoreBar score={lead.score} />
                  </span>
                  <span><mark>{lead.status}</mark><small>{lead.value} / {lead.owner}</small></span>
                  <span>{lead.next}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="crm-right-rail">
            <article className="crm-panel" id="followups">
              <div className="crm-panel-head">
                <div>
                  <span className="crm-kicker">Tasks</span>
                  <h2>Follow-up rhythm</h2>
                </div>
              </div>
              <div className="crm-task-list">
                {tasks.map(([time, title, type]) => (
                  <div className="crm-task" key={title}>
                    <time>{time}</time>
                    <span>{title}</span>
                    <small>{type}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="crm-panel" id="quotations">
              <div className="crm-panel-head">
                <div>
                  <span className="crm-kicker">Quotes</span>
                  <h2>Open quotations</h2>
                </div>
              </div>
              <div className="crm-quote-list">
                {quotes.map(([code, customer, amount, note]) => (
                  <div className="crm-quote" key={code}>
                    <span>{code}</span>
                    <strong>{customer}</strong>
                    <small>{amount} / {note}</small>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="crm-bottom-grid">
          <article className="crm-panel" id="customers">
            <div className="crm-panel-head">
              <div>
                <span className="crm-kicker">Customer Assets</span>
                <h2>Tags and segments</h2>
              </div>
            </div>
            <div className="crm-tags">
              {['VIP buyer', 'OEM project', 'Price sensitive', 'Sample sent', 'Dormant 60 days', 'Repeat order', 'Distributor', 'Amazon seller'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>

          <article className="crm-panel" id="orders">
            <div className="crm-panel-head">
              <div>
                <span className="crm-kicker">Orders</span>
                <h2>Production tracking</h2>
              </div>
            </div>
            <div className="crm-progress-list">
              {[
                ['Deposit received', 100],
                ['Material prepared', 86],
                ['Mass production', 62],
                ['Inspection booked', 28]
              ].map(([label, progress]) => (
                <div className="crm-progress" key={label}>
                  <span>{label}<b>{progress}%</b></span>
                  <i><em style={{ width: `${progress}%` }} /></i>
                </div>
              ))}
            </div>
          </article>

          <article className="crm-panel" id="reports">
            <div className="crm-panel-head">
              <div>
                <span className="crm-kicker">Product Signals</span>
                <h2>Inquiry heat</h2>
              </div>
            </div>
            <div className="crm-product-list">
              {products.map(([name, count, rate]) => (
                <div key={name}>
                  <strong>{name}</strong>
                  <span>{count}</span>
                  <small>{rate}</small>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
