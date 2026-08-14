/**
 * One-shot generator for Bluebonnet 8/26 secondary pages.
 * Run: node preview/bluebonnet_8/26/_build_pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BASE = '/preview/bluebonnet_8/26/';

const header = (active = '') => `
    <div class="preview-banner">Design preview · Bluebonnet 8/26 · <a href="/">Back to live site</a></div>
    <header class="v-header">
      <div class="container">
        <div class="v-header-inner">
          <a href="index.html" class="logo">
            <img src="/assets/bluebonnet-icon.png" alt="" class="logo-mark" width="28" height="28" />
            <span class="logo-wordmark"><span class="logo-wordmark-bluebonnet">Bluebonnet</span><span class="logo-wordmark-growth">Growth</span></span>
          </a>
          <nav class="v-nav" aria-label="Primary">
            <a href="services.html"${active === 'services' ? ' class="is-active"' : ''}>Services</a>
            <a href="industries.html"${active === 'industries' ? ' class="is-active"' : ''}>Industries</a>
            <a href="approach.html"${active === 'approach' ? ' class="is-active"' : ''}>Approach</a>
            <a href="about.html"${active === 'about' ? ' class="is-active"' : ''}>About</a>
            <a href="/blog">Blog</a>
          </nav>
          <a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a>
          <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button>
        </div>
        <div class="v-drawer" data-nav-drawer>
          <a href="services.html">Services</a>
          <a href="industries.html">Industries</a>
          <a href="approach.html">Approach</a>
          <a href="about.html">About</a>
          <a href="/blog">Blog</a>
          <a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a>
        </div>
      </div>
    </header>`;

const footer = `
    <footer class="v-footer">
      <div class="container">
        <div class="v-footer-grid">
          <div class="v-footer-brand">
            <a href="index.html" class="logo">
              <img src="/assets/bluebonnet-icon.png" alt="" class="logo-mark" width="28" height="28" />
              <span class="logo-wordmark"><span class="logo-wordmark-bluebonnet">Bluebonnet</span><span class="logo-wordmark-growth">Growth</span></span>
            </a>
            <p>Helping Texas businesses get found online, convert visitors into leads, and keep the phone ringing, without the agency runaround.</p>
          </div>
          <div class="v-footer-col">
            <h4>Pages</h4>
            <a href="services.html">Services</a>
            <a href="industries.html">Industries</a>
            <a href="approach.html">Approach</a>
            <a href="case-studies/budgetocity.html">Case study</a>
            <a href="pricing.html">Pricing</a>
          </div>
          <div class="v-footer-col">
            <h4>Company</h4>
            <a href="about.html">About</a>
            <a href="/blog">Blog</a>
            <a href="faq.html">FAQ</a>
            <a href="contact.html">Contact</a>
            <a href="/">Live site →</a>
          </div>
        </div>
        <div class="v-footer-bottom">
          <span>Design preview · not indexed</span>
          <span>© Bluebonnet Growth · Melissa, TX</span>
        </div>
      </div>
    </footer>
    <script src="${BASE}script.js"></script>`;

function page(title, active, body) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <base href="${BASE}" />
    <title>${title}</title>
    <link rel="stylesheet" href="${BASE}styles.css" />
  </head>
  <body>
${header(active)}
    <main>
${body}
    </main>
${footer}
  </body>
</html>
`;
}

const industries = [
  {
    slug: 'hvac',
    name: 'HVAC',
    title: 'HVAC SEO for Texas Companies | Bluebonnet Growth',
    h1: 'HVAC SEO for Texas home service companies',
    lead: 'When the first 100-degree week hits, AC repair search explodes. The shops already sharp on Google Maps get the calls. Everyone else watches the phone stay quiet.',
    problem: 'Most HVAC owners already know July should be busy. The real issue is that Google shows three Map Pack names and a handful of organic results. If you are not one of them in McKinney, Frisco, Plano, Dallas, or your service cities, your best techs sit underutilized while a competitor books out.',
    includes: [
      'Map Pack visibility for “AC repair near me,” furnace repair, and brand-adjacent searches',
      'Google Business Profile categories, photos, hours, and a review flow that survives peak season',
      'Service and city pages that match how Texans search, not a thin homepage that says “all HVAC”',
      'Tracking tied to calls and booked estimates so you know whether SEO is paying for itself',
    ],
    blog: [
      ['/blog/local-seo-for-hvac-texas', 'Local SEO for HVAC companies in Texas'],
      ['/blog/local-seo-for-hvac-mckinney-tx', 'HVAC local SEO in McKinney'],
      ['/blog/local-seo-for-hvac-frisco-tx', 'HVAC local SEO in Frisco'],
    ],
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    title: 'Plumbing SEO for Texas Companies | Bluebonnet Growth',
    h1: 'Plumbing SEO for Texas service companies',
    lead: 'Emergency searches do not wait. When a pipe bursts or a water heater dies, homeowners pick from whoever shows up first on Maps and Google, not whoever has the nicest truck wrap.',
    problem: 'Plumbing companies often dump money into paid leads while their Google Business Profile, citations, and service pages sit half-finished. That rents attention. Local and on-page SEO build a durable path to calls, especially when the site loads fast and makes “call now” obvious.',
    includes: [
      'Local pack and organic visibility for drain, water heater, leak, and “plumber near me” searches',
      'Profile optimization, photos of real jobs, and review systems that look current',
      'Clear service pages and city coverage for the ZIPs you actually run trucks in',
      'Conversion fixes so search traffic turns into booked jobs, not bounce',
    ],
    blog: [
      ['/blog/local-seo-for-plumbers-dallas-tx', 'Plumbing local SEO in Dallas'],
      ['/blog/google-maps-not-showing-up', 'Why you are not showing on Google Maps'],
    ],
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    title: 'Roofing SEO for Texas Companies | Bluebonnet Growth',
    h1: 'Roofing SEO for Texas contractors',
    lead: 'Storm season and insurance claims create spikes. The roofers who already own Map Pack and clear service pages capture estimates. Everyone else fights over leftover leads.',
    problem: 'Roofing is competitive and full of thin “we serve 40 cities” pages that Google ignores. Texas homeowners look for proof, speed, and a contractor who looks established online. SEO plus a credible site is how you stop depending on storm chaser ads alone.',
    includes: [
      'Map Pack and organic rankings for roof repair, replacement, and inspection searches',
      'GBP setup, photo proof of installs, and review velocity that builds trust',
      'Honest service and city pages, depth over spam',
      'On-page and conversion work so estimate forms and phone CTAs actually get used',
    ],
    blog: [
      ['/blog/local-seo-for-roofers-mckinney-tx', 'Roofing local SEO in McKinney'],
      ['/blog/local-seo-vs-traditional-seo', 'Local SEO vs traditional SEO'],
    ],
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    title: 'Landscaping SEO for Texas Companies | Bluebonnet Growth',
    h1: 'Landscaping SEO for Texas crews',
    lead: 'Lawn care, irrigation, and outdoor living are visual and local. If your Maps listing and website do not show the work, neighbors hire someone who does.',
    problem: 'Many landscaping companies look great on Instagram and invisible on Google. Seasonal demand rewards operators who show up for “lawn care near me,” irrigation repair, and softscape searches, with pages and photos that match the job.',
    includes: [
      'Local SEO for lawn, irrigation, hardscape, and maintenance searches',
      'Google Business Profile that showcases real yards and trucks',
      'Service pages that separate recurring maintenance from one-off installs',
      'Site speed and mobile UX so homeowners can request a quote in one tap',
    ],
    blog: [
      ['/blog/local-seo-for-landscapers-texas', 'Local SEO for landscapers in Texas'],
    ],
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    title: 'Contractor SEO for Texas Businesses | Bluebonnet Growth',
    h1: 'SEO for Texas contractors',
    lead: 'General contractors and specialty trades win when project-ready homeowners can find them without a referral. Search is that referral, at scale.',
    problem: 'Contractor sites are often brochure leftovers, slow, vague, and missing the services people type into Google. We fix the engine (site + messaging) and add the fuel (local and on-page SEO) so inquiries come from people ready to hire.',
    includes: [
      'Keyword and service-page strategy tied to the jobs you want',
      'Maps and profile work for brand and category searches',
      'Web design and conversion so portfolios and CTAs drive estimates',
      'Content that answers real homeowner questions without fluff',
    ],
    blog: [
      ['/blog/ranking-number-one-nobody-calls', 'Ranking #1 when nobody calls'],
      ['/blog/missed-calls-destroy-local-seo-roi', 'Missed calls destroy local SEO ROI'],
    ],
  },
  {
    slug: 'local-services',
    name: 'Local services',
    title: 'Local Services SEO for Texas Businesses | Bluebonnet Growth',
    h1: 'Local SEO for Texas service businesses',
    lead: 'If customers search “near me” before they buy, you need Maps, on-page clarity, and a site that converts, whether you run a shop, a route, or a home-service crew.',
    problem: '“Local services” is a big tent: cleaning, electrical, pest, garage door, and more. The pattern is the same. Outdated sites and thin listings waste the traffic SEO could send. We build Texas-focused visibility and fix the site so leads stick.',
    includes: [
      'Local and on-page SEO tuned to your category and cities',
      'Google Business Profile and review systems',
      'Conversion optimization and web design when the engine is broken',
      'A limited roster so you work directly with the operator, not a ticket queue',
    ],
    blog: [
      ['/blog/local-seo-vs-traditional-seo', 'Local SEO vs traditional SEO'],
      ['/blog', 'Browse the Bluebonnet Growth blog'],
    ],
  },
];

function industryBody(ind) {
  const siblings = industries
    .filter((i) => i.slug !== ind.slug)
    .map((i) => `<a href="${i.slug}.html">${i.name}</a>`)
    .join('\n            ');
  const blogs = ind.blog
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('\n            ');
  const includes = ind.includes.map((x) => `<li>${x}</li>`).join('\n            ');
  return `
      <section class="v-page-hero v-page-hero-left">
        <div class="container">
          <h1>${ind.h1}</h1>
          <p>${ind.lead}</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose v-prose-left">
          <h2>The problem is not “more website traffic”</h2>
          <p>${ind.problem}</p>
          <p>Paid ads can fill gaps, but they rent attention. Local SEO compounds. If SEO is the fuel, the website is the engine, we make sure both work. See <a href="services.html">services</a> and <a href="approach.html">how we approach the work</a>.</p>
          <h2>What ${ind.name.toLowerCase()} SEO includes</h2>
          <ul>
            ${includes}
          </ul>
          <h2>How we work</h2>
          <ol>
            <li><strong>Audit:</strong> Listing, rankings, competitors, and what blocks calls today.</li>
            <li><strong>Foundation:</strong> Profile cleanup, on-page fixes, citations, review asks.</li>
            <li><strong>Build:</strong> Priority service and city pages for markets you actually serve.</li>
            <li><strong>Maintain:</strong> Steady improvements so visibility sticks, or you walk away.</li>
          </ol>
          <p>Built and run for Texas businesses. Limited to five clients. Read <a href="about.html">about Travis</a> or <a href="case-studies/budgetocity.html">see organic results for Budgetocity</a>.</p>
          <h2>Related industries</h2>
          <div class="v-industry-links">
            ${siblings}
            <a href="industries.html">All industries</a>
          </div>
          <h2>Guides worth reading</h2>
          <ul>
            ${blogs}
          </ul>
          <p style="margin-top:40px;"><a href="contact.html" class="v-btn v-btn-primary">Get a Free Local Search Audit</a></p>
        </div>
      </section>`;
}

// --- write pages ---
const writes = [];

writes.push([
  'services.html',
  page(
    'Services | Design Preview | Bluebonnet Growth',
    'services',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Services</h1>
          <p>SEO gets you found. The website has to convert. We build both for Texas businesses.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container">
          <div class="v-card-grid">
            <article class="v-card">
              <h3>Local SEO &amp; Google Maps</h3>
              <p>Google Business Profile, local relevance, reviews, and content so you show up when people search nearby.</p>
              <a href="local-seo.html">Local SEO details →</a>
            </article>
            <article class="v-card">
              <h3>On-page SEO</h3>
              <p>Service pages, titles, structure, and internal links that match how Texans search, so rankings have somewhere to land.</p>
              <a href="contact.html">Talk about on-page →</a>
            </article>
            <article class="v-card">
              <h3>Web design</h3>
              <p>Fast, mobile-first sites built to earn trust and make calling or requesting a quote the obvious next step.</p>
              <a href="contact.html">Web design inquiry →</a>
            </article>
            <article class="v-card">
              <h3>Conversion optimization</h3>
              <p>Traffic only matters if people take action. We tighten offers, CTAs, and page flow so more visitors become leads.</p>
              <a href="contact.html">Conversion help →</a>
            </article>
          </div>
          <div class="container v-prose v-prose-left" style="margin-top:56px;padding:0;">
            <h2>If SEO is the fuel, the website is the engine</h2>
            <p>Businesses with outdated sites, confusing messaging, slow load times, or traffic that never turns into leads do not need more vanity rankings. They need the site fixed and the search foundation built together.</p>
            <p>See who we help by industry on the <a href="industries.html">industries</a> pages, or read how organic SEO moved <a href="case-studies/budgetocity.html">Budgetocity</a> without paid ads.</p>
          </div>
        </div>
      </section>
      <section class="v-cta"><div class="container"><h2>Not sure where to start?</h2><p>Book a call. We'll figure out what matters most for your Texas business.</p><a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a></div></section>`
  ),
]);

writes.push([
  'industries.html',
  page(
    'Industries | Design Preview | Bluebonnet Growth',
    'industries',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Industries</h1>
          <p>Built and run for Texas businesses, with dedicated pages Google can crawl and customers can understand.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container">
          <div class="v-card-grid">
            ${industries
              .map(
                (i) => `<article class="v-card">
              <h3>${i.name}</h3>
              <p>${i.lead.slice(0, 120)}…</p>
              <a href="${i.slug}.html">${i.name} SEO →</a>
            </article>`
              )
              .join('\n            ')}
          </div>
        </div>
      </section>`
  ),
]);

writes.push([
  'about.html',
  page(
    'About | Design Preview | Bluebonnet Growth',
    'about',
    `
      <section class="v-page-hero v-page-hero-left">
        <div class="container">
          <h1>About Bluebonnet Growth</h1>
          <p>A Texan serving Texas businesses, founder-led SEO, digital marketing, and sites that convert.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container">
          <div class="v-about-layout">
            <figure class="v-about-photo">
              <img src="/assets/travis-and-victoria.png" alt="Travis and Victoria" width="560" height="560" loading="eager" />
            </figure>
            <div class="v-prose v-prose-left">
              <h2>Travis. Based in Melissa, Texas.</h2>
              <p>I am Travis. My wife Victoria and I built Bluebonnet Growth here in North Texas. She is my sounding board on every client decision. I am the one in your Google profile, your rankings, your content, and your site.</p>
              <p>I earned a degree in Marketing from Texas Tech University. Since then I have dedicated the next stretch of my career to AI and digital marketing, primarily through SEO, helping businesses get found online and stay there without burning money on ads that vanish when the budget stops.</p>
              <p>We keep the roster at <strong>five clients</strong> because that is how many I can actually run well. When you hire Bluebonnet Growth, you work with me. No account managers. No handoffs.</p>
              <h2>We are <span class="v-underline-not">not</span> an agency</h2>
              <p>If you want a cookie-cutter package shipped from somewhere else, we are not a fit. If you want a Texas partner who treats search, the website, and conversion as one system, <a href="contact.html">book a call</a>.</p>
              <p>See <a href="case-studies/budgetocity.html">how we helped Budgetocity</a> grow organic visibility without paid ads, or browse the <a href="/blog">blog</a> for practical local SEO guidance.</p>
              <p style="margin-top:32px;"><a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a></p>
            </div>
          </div>
        </div>
      </section>`
  ),
]);

writes.push([
  'approach.html',
  page(
    'Approach | Design Preview | Bluebonnet Growth',
    'approach',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Approach</h1>
          <p>Fix the engine. Add the fuel. Measure calls, not vanity charts.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose">
          <h2>1. Audit what is broken</h2>
          <p>Site speed, messaging, Maps presence, on-page gaps, and where leads die. If traffic never converts, more SEO alone wastes gas.</p>
          <h2>2. Foundation first</h2>
          <p>Google Business Profile, technical and on-page SEO, and the pages customers actually need. Web design and conversion work when the site is holding you back.</p>
          <h2>3. Build what compounds</h2>
          <p>Service and city pages, content that ranks, and internal links across industries and the <a href="/blog">blog</a>, so Google and customers can move through a coherent site.</p>
          <h2>4. Stay because it works</h2>
          <p>No long-term lock-ins. If we are not creating more value than you pay, you walk away. That is the deal on the <a href="index.html">homepage</a> for a reason.</p>
          <p style="margin-top:40px;"><a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a></p>
        </div>
      </section>`
  ),
]);

writes.push([
  'local-seo.html',
  page(
    'Local SEO | Design Preview | Bluebonnet Growth',
    'services',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Local SEO</h1>
          <p>Show up on Google and Maps when Texas customers are ready to call.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose">
          <p>Local SEO covers Google Business Profile, Map Pack visibility, reviews, citations, and on-page pages that match “near me” intent. Pair it with <a href="services.html">conversion and web design</a> when the site leaks leads.</p>
          <p>Explore industry pages for <a href="hvac.html">HVAC</a>, <a href="plumbing.html">plumbing</a>, <a href="roofing.html">roofing</a>, and more, or <a href="contact.html">apply for an audit</a>.</p>
        </div>
      </section>`
  ),
]);

writes.push([
  'pricing.html',
  page(
    'Pricing | Design Preview | Bluebonnet Growth',
    '',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Pricing</h1>
          <p>Scoped to your market and what is broken, site, search, or both. Limited to 5 clients.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose">
          <p>Every Texas business starts in a different place. Some need Maps and on-page SEO. Others need the website rebuilt before SEO can work. We price after an audit, not from a one-size package.</p>
          <p><a href="contact.html" class="v-btn v-btn-primary">Book a Strategy Call</a></p>
        </div>
      </section>`
  ),
]);

writes.push([
  'faq.html',
  page(
    'FAQ | Design Preview | Bluebonnet Growth',
    '',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>FAQ</h1>
          <p>Straight answers for Texas owners considering SEO, web design, or conversion work.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-faq">
          <div class="v-faq-item"><button class="v-faq-q" type="button">Do you only work with home services?<span>+</span></button><div class="v-faq-a"><p>Home services are a core focus, HVAC, plumbing, roofing, landscaping, contractors, but we also help Texas businesses that need organic search and a site that converts. See <a href="industries.html">industries</a>.</p></div></div>
          <div class="v-faq-item"><button class="v-faq-q" type="button">Is this an agency?<span>+</span></button><div class="v-faq-a"><p>No. Founder-led, limited roster, direct access. Read <a href="about.html">About</a>.</p></div></div>
          <div class="v-faq-item"><button class="v-faq-q" type="button">Do I need ads?<span>+</span></button><div class="v-faq-a"><p>Not to get started. Our <a href="case-studies/budgetocity.html">Budgetocity case study</a> is organic SEO and content, no ad spend required to move rankings.</p></div></div>
          <div class="v-faq-item"><button class="v-faq-q" type="button">What if my website is outdated?<span>+</span></button><div class="v-faq-a"><p>Then SEO alone wastes fuel. We offer web design and conversion optimization with local and on-page SEO. <a href="services.html">See services</a>.</p></div></div>
        </div>
      </section>`
  ),
]);

writes.push([
  'contact.html',
  page(
    'Contact | Design Preview | Bluebonnet Growth',
    '',
    `
      <section class="v-page-hero">
        <div class="container">
          <h1>Book a strategy call</h1>
          <p>Texan-run. Limited to 5 clients. Tell us what is broken, search, site, or both.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose">
          <p>Email <a href="mailto:hello@bluebonnetgrowth.com">hello@bluebonnetgrowth.com</a> or use the live contact form on the <a href="/contact">production contact page</a> while this design is in preview.</p>
          <p>Before you write: skim <a href="about.html">About</a>, <a href="services.html">Services</a>, and the <a href="case-studies/budgetocity.html">Budgetocity case study</a>.</p>
        </div>
      </section>`
  ),
]);

for (const ind of industries) {
  writes.push([`${ind.slug}.html`, page(ind.title, 'industries', industryBody(ind))]);
}

// Case study (nested path, base href still points to preview root)
const caseDir = path.join(ROOT, 'case-studies');
fs.mkdirSync(caseDir, { recursive: true });
const caseHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <base href="${BASE}" />
    <title>Budgetocity Case Study | Bluebonnet Growth</title>
    <link rel="stylesheet" href="${BASE}styles.css" />
  </head>
  <body>
${header('')}
    <main>
      <section class="v-page-hero v-page-hero-left">
        <div class="container">
          <a href="https://budgetocity.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/budgetocity-logo.png" alt="Budgetocity" class="v-case-logo" width="96" height="96" />
          </a>
          <h1>Budgetocity: from page 3 to page 1 with organic SEO</h1>
          <p>How we transformed their web content and search foundation, without spending a dime on ads.</p>
        </div>
      </section>
      <section class="v-content">
        <div class="container v-prose v-prose-left">
          <div class="v-stat-row">
            <div class="v-stat"><div class="v-stat-value">31.2 → 6.2</div><div class="v-stat-label">Average Google search position</div></div>
            <div class="v-stat"><div class="v-stat-value">+28%</div><div class="v-stat-label">Clicks, year over year</div></div>
            <div class="v-stat"><div class="v-stat-value">~$0 ads</div><div class="v-stat-label">Growth driven by organic SEO and content</div></div>
          </div>

          <h2>The problem</h2>
          <p>Budgetocity is a paycheck budgeting app for people living paycheck to paycheck, a real product with real search demand. The site was averaging position <strong>31.2</strong> in Google. Page three. Effectively invisible. No content engine. No durable organic presence.</p>
          <p>They did not need another ad campaign. They needed to be findable.</p>

          <h2>What we did</h2>
          <p>We focused on organic search and the content that supports it:</p>
          <ul>
            <li><strong>SEO foundation</strong>, structural and on-page issues that kept the site buried, built around queries people actually type.</li>
            <li><strong>Content that ranks</strong>, topics chosen from search intent, written to answer the question and earn the click, not filler.</li>
            <li><strong>Steady shipping</strong>, publish, measure in Search Console, iterate. No tricks.</li>
          </ul>
          <p>Social channels helped awareness while organic search compounded. The growth story we care about here is SEO and content, not paid media.</p>

          <h2>What happened</h2>
          <p>Average ranking position moved from <strong>31.2 to 6.2</strong>, page three to the top of page one across real keywords in a competitive niche. Clicks grew <strong>28% year over year</strong>. Higher-intent queries started landing on pages built for them.</p>
          <p>Same product. Better visibility. No ad budget required to prove the channel.</p>

          <h2>What it means for Texas businesses</h2>
          <p>Page three is not a “traffic” problem. It is a visibility and content problem. Fix the foundation, publish the right pages, stay consistent, and Google moves you up.</p>
          <p>If your site is the broken engine, we fix that too. Start with <a href="services.html">services</a>, explore <a href="industries.html">industries</a>, or meet the operator on <a href="about.html">About</a>.</p>

          <p>
            <a href="https://budgetocity.com" target="_blank" rel="noopener noreferrer" class="v-btn v-btn-primary">Visit Budgetocity</a>
            &nbsp;
            <a href="contact.html" class="v-btn v-btn-outline">Book a Strategy Call</a>
          </p>
          <p style="margin-top:24px;"><a href="/blog">Read the blog →</a></p>
        </div>
      </section>
    </main>
${footer}
  </body>
</html>
`;

fs.writeFileSync(path.join(caseDir, 'budgetocity.html'), caseHtml, 'utf8');
console.log('wrote case-studies/budgetocity.html');

for (const [file, html] of writes) {
  fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
  console.log('wrote', file);
}

console.log('done');
