/**
 * Commercial industry money pages: /industries/{slug}
 * Unique copy per trade — not city-name swaps.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://bluebonnetgrowth.com";
const OUT = path.join(ROOT, "industries");

const FOOTER_SOCIAL = `        <div class="footer-social" aria-label="Social media">
          <a href="https://facebook.com/bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://x.com/bluebonnetgr" target="_blank" rel="noopener noreferrer" aria-label="X" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/bluebonnetgrowth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="https://youtube.com/@bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>`;

const industries = [
  {
    slug: "hvac-seo",
    trade: "HVAC",
    tradeLong: "HVAC companies",
    title: "HVAC SEO Texas | More AC Repair Calls from Google | Bluebonnet Growth",
    description:
      "Local SEO for Texas HVAC companies. Rank for AC repair and heating searches on Google Maps, win seasonal spikes, and turn visibility into booked jobs. Based in Melissa, TX.",
    h1: "HVAC SEO for Texas Home Service Companies",
    lead:
      "When the first 100-degree week hits North Texas, AC repair search volume explodes. The shops already looking sharp on Google Maps get the calls. Everyone else watches the phone stay quiet. I help HVAC owners win the searches that turn into service calls, estimates, and booked jobs — not vanity rankings.",
    problemTitle: "The problem is not “more website traffic”",
    problem: [
      "Most HVAC owners I talk to already know the phone should ring harder in July. The real issue is that Google shows three map pack names and a handful of organic results. If you are not one of them in McKinney, Frisco, Plano, or Dallas, your best techs sit underutilized while a competitor books out.",
      "Paid ads can fill gaps, but they rent attention. Local SEO compounds: a stronger Google Business Profile, clearer service pages, and reviews that look recent when a homeowner is sweating in the attic.",
      "I have spent years inside home service operations. Rankings only matter if the call gets answered, the estimate gets booked, and the job gets scheduled. HVAC SEO here is built around that machine.",
    ],
    solutionTitle: "What HVAC SEO actually includes",
    solution: [
      "<strong>Map pack and local pack visibility</strong> for “AC repair near me,” “furnace repair {city},” and brand-adjacent searches.",
      "<strong>Google Business Profile</strong> categories, services, photos of trucks and installs, hours that match peak season, and a review flow that does not die in August.",
      "<strong>Service and city pages</strong> that match how Texans search — not a thin homepage that says “all HVAC services.”",
      "<strong>Tracking</strong> tied to calls and booked estimates, so you know whether SEO is paying for itself.",
    ],
    processTitle: "How we work with HVAC companies",
    process: [
      "<strong>Audit:</strong> Your listing, rankings, competitors in your ZIP codes, and what blocks calls today.",
      "<strong>Foundation:</strong> Profile cleanup, citation consistency, on-page fixes, review asks.",
      "<strong>Build:</strong> Priority service pages and city pages for the markets you actually run trucks in.",
      "<strong>Maintain:</strong> Seasonal tuning before summer and winter peaks — when search intent spikes.",
    ],
    citiesIntro:
      "I work deepest with HVAC companies across the DFW growth corridor and selectively with Texas operators who want hands-on local search help.",
    cityLinks: [
      ["/mckinney", "McKinney"],
      ["/locations/frisco-tx", "Frisco"],
      ["/plano", "Plano"],
      ["/dallas", "Dallas"],
      ["/fort-worth", "Fort Worth"],
      ["/locations/allen-tx", "Allen"],
    ],
    blogLinks: [
      ["/blog/local-seo-for-hvac-texas", "Local SEO for HVAC companies in Texas"],
      ["/blog/local-seo-for-hvac-mckinney-tx", "HVAC local SEO in McKinney"],
      ["/blog/local-seo-for-hvac-frisco-tx", "HVAC local SEO in Frisco"],
      ["/blog/google-maps-not-showing-up", "Why you are not showing on Google Maps"],
    ],
    schemaService: "HVAC local SEO",
  },
  {
    slug: "plumber-seo",
    trade: "Plumbing",
    tradeLong: "plumbing companies",
    title: "Plumber SEO Texas | More Emergency & Install Calls | Bluebonnet Growth",
    description:
      "Local SEO for Texas plumbers. Win emergency, drain, and water heater searches on Google Maps. More qualified calls for owner-led plumbing companies in North Texas.",
    h1: "Plumber SEO for Texas Service Companies",
    lead:
      "A burst pipe does not wait for office hours. Homeowners search, skim the map, and call whoever looks available and trustworthy. I help plumbing companies show up for those high-intent searches — emergency, drain cleaning, water heaters, and remodel work — so your phone rings with jobs worth taking.",
    problemTitle: "Emergency intent is different from “brand awareness”",
    problem: [
      "Plumbing SEO fails when agencies optimize for soft content and ignore the map pack. When someone types “emergency plumber Frisco” or “water heater repair McKinney,” they are comparing three listings in seconds. Photos of your truck, recent reviews, and clear service areas decide the click.",
      "Many plumbers also bleed calls because the site has one vague “services” page. Google cannot match “clogged drain Allen” to a page that never says it. Thin sites lose to competitors with depth — even when your techs are better.",
      "I focus on calls, estimates, and booked jobs. If ranking #1 does not produce phone rings, we change course. That is the deal.",
    ],
    solutionTitle: "What plumber SEO looks like in practice",
    solution: [
      "<strong>Google Business Profile</strong> tuned for plumbing categories, emergency messaging where accurate, and photos that prove you are a real crew.",
      "<strong>Service pages</strong> for the work you want more of — not every SKU in the truck.",
      "<strong>City and service-area clarity</strong> across the northern suburbs where searches overlap.",
      "<strong>Review systems</strong> so recent 5-stars show up when someone is flooded at 9 p.m.",
      "<strong>Call tracking</strong> so you see which searches and pages produce booked work.",
    ],
    processTitle: "Process for plumbing owners",
    process: [
      "<strong>Visibility check:</strong> Where you rank today for emergency and install terms in your cities.",
      "<strong>Fix the listing:</strong> Categories, hours, services, Q&amp;A, photos.",
      "<strong>Pages that match intent:</strong> Drain, water heater, re-pipe, remodel — whatever pays.",
      "<strong>Steady cadence:</strong> Reviews, posts, and ranking checks without agency busywork.",
    ],
    citiesIntro: "Plumbing searches blend across suburb lines. I help owners in:",
    cityLinks: [
      ["/mckinney", "McKinney"],
      ["/locations/frisco-tx", "Frisco"],
      ["/locations/allen-tx", "Allen"],
      ["/melissa", "Melissa"],
      ["/dallas", "Dallas"],
      ["/plano", "Plano"],
    ],
    blogLinks: [
      ["/blog/local-seo-for-plumbers-texas", "Local SEO for plumbers in Texas"],
      ["/blog/local-seo-for-plumbers-mckinney-tx", "Plumber SEO in McKinney"],
      ["/blog/local-seo-for-plumbers-frisco-tx", "Plumber SEO in Frisco"],
      ["/blog/website-traffic-no-calls", "Website traffic but no calls"],
    ],
    schemaService: "Plumbing local SEO",
  },
  {
    slug: "roofer-seo",
    trade: "Roofing",
    tradeLong: "roofing companies",
    title: "Roofing SEO Texas | Storm Leads & Map Pack Visibility | Bluebonnet Growth",
    description:
      "Local SEO for Texas roofers. Rank for roof repair and replacement searches after storms and year-round. Google Maps visibility that turns into estimates — North Texas focused.",
    h1: "Roofing SEO for Texas Contractors",
    lead:
      "After a hailstorm, every homeowner with a dented roof searches the same way: city + roof repair, insurance help, free inspection. The roofers with strong Google presence book the estimates. Everyone else chases leftovers. I help roofing companies own local search before and after storm season.",
    problemTitle: "Storm season exposes weak local SEO fast",
    problem: [
      "Roofing is feast-or-famine online. When weather hits DFW, search volume spikes overnight. If your Google Business Profile is thin, your photos are outdated, or your site cannot rank for “roof repair Fort Worth,” you lose the window.",
      "Door knockers and national lead mills flood the market after storms. Local SEO is how legitimate local roofers stay visible without renting every lead forever.",
      "I care about estimate requests and closed jobs — not screenshots of rankings that never rang your phone.",
    ],
    solutionTitle: "Roofing SEO that matches how Texans hire",
    solution: [
      "<strong>Map pack presence</strong> for repair, replacement, and inspection searches in your cities.",
      "<strong>Proof on the profile:</strong> project photos, service areas, insurance-friendly clarity without hype.",
      "<strong>Pages for repair vs replacement</strong> and the cities you actually pull permits in.",
      "<strong>Review velocity</strong> so you look active when storm shoppers compare three names.",
    ],
    processTitle: "How engagement works",
    process: [
      "<strong>Audit competitors</strong> who own the map pack in your ZIPs today.",
      "<strong>Strengthen the listing</strong> and review flow before peak season.",
      "<strong>Build service and city pages</strong> that match storm and non-storm intent.",
      "<strong>Measure estimates and booked jobs</strong>, then tune.",
    ],
    citiesIntro: "Priority roofing markets I support:",
    cityLinks: [
      ["/dallas", "Dallas"],
      ["/fort-worth", "Fort Worth"],
      ["/mckinney", "McKinney"],
      ["/locations/frisco-tx", "Frisco"],
      ["/plano", "Plano"],
      ["/arlington", "Arlington"],
    ],
    blogLinks: [
      ["/blog/local-seo-for-roofers-texas", "Local SEO for roofers in Texas"],
      ["/blog/local-seo-for-roofers-dallas-tx", "Roofing SEO in Dallas"],
      ["/blog/local-seo-for-roofers-fort-worth-tx", "Roofing SEO in Fort Worth"],
      ["/blog/how-long-does-local-seo-take", "How long local SEO takes"],
    ],
    schemaService: "Roofing local SEO",
  },
  {
    slug: "electrician-seo",
    trade: "Electrical",
    tradeLong: "electrical companies",
    title: "Electrician SEO Texas | More Service Calls from Google | Bluebonnet Growth",
    description:
      "Local SEO for Texas electricians. Rank for panel upgrades, EV chargers, and electrical repair on Google Maps. More qualified calls for North Texas electrical contractors.",
    h1: "Electrician SEO for Texas Contractors",
    lead:
      "Electrical work ranges from urgent outages to planned panel upgrades and EV charger installs. Homeowners search differently for each. I help electrical companies show up for the jobs you want — with Google Maps visibility and pages that match real search intent across North Texas.",
    problemTitle: "One vague “electrician” page is not enough",
    problem: [
      "Google and customers both need specifics. “EV charger install Prosper,” “panel upgrade Plano,” and “electrician near me” are different intents. A single thin homepage rarely wins all three.",
      "Licensed, insured electricians sometimes lose to louder competitors with better photos and more recent reviews — even when the work quality is higher. Local SEO levels that field.",
      "I optimize for booked service calls and estimates, not traffic charts that never convert.",
    ],
    solutionTitle: "What electrician SEO covers",
    solution: [
      "<strong>Category and service alignment</strong> on Google Business Profile for the work you sell.",
      "<strong>Service pages</strong> for high-value jobs: panels, EV, generators, lighting, troubleshooting.",
      "<strong>City visibility</strong> where your trucks actually run — Frisco, McKinney, Plano, Prosper, and beyond.",
      "<strong>Trust signals:</strong> reviews, photos of finished work, clear phone CTAs on mobile.",
    ],
    processTitle: "Working together",
    process: [
      "<strong>Map your money keywords</strong> — not every electrical phrase on the internet.",
      "<strong>Fix profile and on-page gaps</strong> that block map pack rankings.",
      "<strong>Publish pages</strong> that match install vs emergency intent.",
      "<strong>Track calls</strong> and adjust to what books work.",
    ],
    citiesIntro: "Electrical companies I prioritize in:",
    cityLinks: [
      ["/locations/frisco-tx", "Frisco"],
      ["/mckinney", "McKinney"],
      ["/plano", "Plano"],
      ["/prosper", "Prosper"],
      ["/locations/allen-tx", "Allen"],
      ["/celina", "Celina"],
    ],
    blogLinks: [
      ["/blog/local-seo-for-electricians-texas", "Local SEO for electricians in Texas"],
      ["/blog/local-seo-for-electricians-frisco-tx", "Electrician SEO in Frisco"],
      ["/blog/local-seo-for-electricians-mckinney-tx", "Electrician SEO in McKinney"],
      ["/blog/google-business-profile-checklist", "Google Business Profile checklist"],
    ],
    schemaService: "Electrician local SEO",
  },
  {
    slug: "landscaping-seo",
    trade: "Landscaping",
    tradeLong: "landscaping companies",
    title: "Landscaping SEO Texas | More Lawn & Design Leads | Bluebonnet Growth",
    description:
      "Local SEO for Texas landscapers. Rank for lawn care, mowing, and landscape design on Google Maps. More local leads for North Texas landscaping companies.",
    h1: "Landscaping SEO for Texas Companies",
    lead:
      "Landscaping leads come from neighbors who want their yard to look like the one next door — and from homeowners searching lawn care, cleanups, and design installs. I help landscaping companies win those Google searches so routes stay full and crews stay busy.",
    problemTitle: "Seasonal demand still needs year-round visibility",
    problem: [
      "Spring floods search volume. Fall cleanups spike again. If your Google listing looks abandoned in February, you start the busy season behind competitors who posted photos and collected reviews all winter.",
      "Many landscapers rely only on yard signs and referrals. Those still matter. Google is where new subdivisions in Frisco, Prosper, and McKinney find a crew when they move in.",
      "I build visibility that turns into estimate requests and recurring routes — not empty “brand awareness.”",
    ],
    solutionTitle: "Landscaping SEO that fits field businesses",
    solution: [
      "<strong>Profile optimization</strong> with before/after photos, service lists, and accurate service areas.",
      "<strong>Pages for lawn care vs design/install</strong> so Google can match intent.",
      "<strong>City pages</strong> for the suburbs where your trailers already roll.",
      "<strong>Review asks</strong> after jobs so Maps trust stays fresh.",
    ],
    processTitle: "How I help landscapers",
    process: [
      "<strong>Audit</strong> your listing and competitors on the map.",
      "<strong>Clean up</strong> categories, photos, and on-page basics.",
      "<strong>Add pages</strong> for the services and cities that pay.",
      "<strong>Maintain</strong> through seasons so you do not restart every March.",
    ],
    citiesIntro: "Landscaping markets I support:",
    cityLinks: [
      ["/locations/frisco-tx", "Frisco"],
      ["/mckinney", "McKinney"],
      ["/prosper", "Prosper"],
      ["/celina", "Celina"],
      ["/plano", "Plano"],
      ["/locations/allen-tx", "Allen"],
    ],
    blogLinks: [
      ["/blog/local-seo-for-landscapers-texas", "Local SEO for landscapers in Texas"],
      ["/blog/local-seo-for-landscapers-frisco-tx", "Landscaping SEO in Frisco"],
      ["/blog/local-seo-for-landscapers-mckinney-tx", "Landscaping SEO in McKinney"],
      ["/blog/how-to-get-more-google-reviews", "How to get more Google reviews"],
    ],
    schemaService: "Landscaping local SEO",
  },
];

function shell({ title, description, canonical, ogTitle, schema, main }) {
  const url = `${BASE}${canonical}`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG3FTP7PC3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG3FTP7PC3');
    </script>
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${ogTitle || title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${BASE}/assets/bluebonnet-icon.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${ogTitle || title}" />
    <meta name="twitter:description" content="${description}" />
    ${schema}
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <nav class="nav" aria-label="Primary navigation">
      <a class="nav-logo" href="/">
        <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="34" height="34" />
        <span class="nav-logo-text">Bluebonnet Growth</span>
      </a>
      <div class="nav-links">
        <a href="/results">Results</a>
        <a href="/services" class="is-active">Services</a>
        <a href="/how-it-works">How it works</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
      </div>
      <a href="/contact" class="nav-cta">Apply Now</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" data-nav-drawer aria-label="Mobile navigation">
      <a href="/results">Results</a>
      <a href="/services" class="is-active">Services</a>
      <a href="/how-it-works">How it works</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Apply Now</a>
    </div>
    <main>
${main}
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Local SEO for North Texas service businesses. One operator. Direct access. More calls from Google.</div>
${FOOTER_SOCIAL}
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          <li><a href="/results">Results</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/industries">Industries</a></li>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/locations">Locations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ready for more calls?</div>
        <div class="footer-cta-text">I take on 5 clients at a time. Apply to see if there is a spot open for your business.</div>
        <a href="/contact" class="footer-btn">Get a Free Local Search Audit</a>
      </div>
    </footer>
    <div class="copyright">
      <span>© 2026 Bluebonnet Growth. All rights reserved.</span>
      <span>Based in Melissa, TX · Serving North Texas</span>
    </div>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

function industryMain(ind) {
  const cityNav = ind.cityLinks
    .map(([href, name]) => `            <a class="location-tag" href="${href}">${name}</a>`)
    .join("\n");
  const blogs = ind.blogLinks
    .map(([href, label]) => `            <li><a href="${href}">${label}</a></li>`)
    .join("\n");
  const solution = ind.solution.map((s) => `            <li>${s}</li>`).join("\n");
  const process = ind.process.map((s) => `            <li>${s}</li>`).join("\n");
  const problem = ind.problem.map((p) => `          <p>${p}</p>`).join("\n");

  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${ind.trade} · Texas local SEO</span>
          <h1>${ind.h1}</h1>
          <p class="lead">${ind.lead}</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
          </p>
          <p class="hero-note" style="margin-top:1rem;opacity:.75;font-size:.9rem;">No obligation · Limited to 5 clients at a time · Not an agency</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>${ind.problemTitle}</h2>
${problem}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>${ind.solutionTitle}</h2>
          <p class="section-intro">This is operator-led local SEO for ${ind.tradeLong} — the same focus as my <a href="/services/local-seo">Local SEO</a> and <a href="/services/google-business-profile">Google Business Profile</a> services, applied to how your customers actually search.</p>
          <ul>
${solution}
          </ul>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>${ind.processTitle}</h2>
          <ol class="process-list">
${process}
          </ol>
          <p>See <a href="/how-it-works">how it works</a> or read <a href="/about">why this is not an agency</a>. I keep the roster at five clients so you get direct access to the person doing the work.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Cities where ${ind.trade.toLowerCase()} companies hire me</h2>
          <p>${ind.citiesIntro}</p>
          <nav class="location-strip" aria-label="Cities">
${cityNav}
          </nav>
          <p class="text-links"><a href="/locations">All locations</a> · <a href="/industries">All industries</a> · <a href="/services/local-seo">Local SEO services</a></p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Guides for ${ind.trade.toLowerCase()} owners</h2>
          <ul>
${blogs}
          </ul>
        </div>
      </section>

      <section class="section section-dark final-cta">
        <div class="container final-cta-grid">
          <div class="final-cta-copy">
            <span class="eyebrow">Next step</span>
            <h2>See where you are losing Google leads</h2>
            <p>Apply for a free local search audit. I will show you how your ${ind.trade.toLowerCase()} company shows up on Google today — and what would actually move the needle.</p>
            <p>Limited to 5 clients at a time. Direct access. No long-term contracts.</p>
          </div>
          <div class="final-cta-actions">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
            <a href="/contact" class="btn btn-outline">Apply Now</a>
          </div>
        </div>
      </section>`;
}

function schemaFor(ind, canonical) {
  return `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${ind.schemaService}",
      "serviceType": "${ind.schemaService}",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Bluebonnet Growth",
        "url": "https://bluebonnetgrowth.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melissa",
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      },
      "areaServed": { "@type": "State", "name": "Texas" },
      "url": "${BASE}${canonical}",
      "description": "${ind.description.replace(/"/g, '\\"')}"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE}/" },
        { "@type": "ListItem", "position": 2, "name": "Industries", "item": "${BASE}/industries" },
        { "@type": "ListItem", "position": 3, "name": "${ind.trade} SEO", "item": "${BASE}${canonical}" }
      ]
    }
    </script>`;
}

function hubMain() {
  const cards = industries
    .map(
      (ind) => `          <div class="how-item">
            <div class="how-num">${ind.trade.slice(0, 1)}</div>
            <div>
              <div class="how-title"><a href="/industries/${ind.slug}">${ind.trade} SEO</a></div>
              <div class="how-desc">${ind.lead.slice(0, 140)}… <a href="/industries/${ind.slug}">See ${ind.trade.toLowerCase()} SEO</a></div>
            </div>
          </div>`
    )
    .join("\n");

  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Industries</span>
          <h1>Local SEO for Texas Home Service Trades</h1>
          <p class="lead">HVAC, plumbing, roofing, electrical, and landscaping companies win or lose on Google Maps. These pages explain how Bluebonnet Growth helps each trade get more qualified calls — without a big agency.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
          </p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2>Choose your trade</h2>
          <div class="how-list">
${cards}
          </div>
          <p style="margin-top:1.5rem;">Also see <a href="/services/local-seo">Local SEO</a>, <a href="/services/google-business-profile">Google Business Profile optimization</a>, and <a href="/locations">Texas locations</a>.</p>
        </div>
      </section>
      <section class="section section-dark final-cta">
        <div class="container final-cta-grid">
          <div class="final-cta-copy">
            <span class="eyebrow">Next step</span>
            <h2>Find out why you are not showing up</h2>
            <p>I take on 5 clients at a time. Apply for a free visibility check and see if there is a spot open.</p>
          </div>
          <div class="final-cta-actions">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
          </div>
        </div>
      </section>`;
}

fs.mkdirSync(OUT, { recursive: true });

for (const ind of industries) {
  const canonical = `/industries/${ind.slug}`;
  const html = shell({
    title: ind.title,
    description: ind.description,
    canonical,
    ogTitle: `${ind.trade} SEO Texas | Bluebonnet Growth`,
    schema: schemaFor(ind, canonical),
    main: industryMain(ind),
  });
  fs.writeFileSync(path.join(OUT, `${ind.slug}.html`), html, "utf8");
  console.log("wrote", canonical);
}

const hub = shell({
  title: "Industries | HVAC, Plumbing, Roofing SEO Texas | Bluebonnet Growth",
  description:
    "Local SEO for Texas home service industries: HVAC, plumbing, roofing, electrical, and landscaping. More Google Maps visibility and qualified calls.",
  canonical: "/industries",
  ogTitle: "Home Service Industries | Bluebonnet Growth",
  schema: `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Industries — Bluebonnet Growth",
      "url": "${BASE}/industries",
      "description": "Local SEO pages for Texas home service trades."
    }
    </script>`,
  main: hubMain(),
});
fs.writeFileSync(path.join(OUT, "index.html"), hub, "utf8");
// Also support /industries.html for local file serving consistency
fs.writeFileSync(path.join(ROOT, "industries.html"), hub, "utf8");
console.log("wrote /industries hub");
