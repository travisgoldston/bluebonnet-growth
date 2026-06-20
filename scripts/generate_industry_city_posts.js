const fs = require("fs");
const path = require("path");
const cities = require("./data/texas_cities");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const FOOTER_SOCIAL = fs.readFileSync(path.join(ROOT, "blog", "what-is-local-seo.html"), "utf8")
  .match(/<div class="footer-social"[\s\S]*?<\/div>\s*<\/div>/)[0]
  .replace(/^ {6}/gm, "        ");

function locationStripHtml() {
  return [...cities]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => {
      const href = c.path || `/${c.slug}`;
      return `            <a class="location-tag" href="${href}">${c.name}</a>`;
    })
    .join("\n");
}

const texasInterlink = `      <section class="section section-light">
        <div class="container">
          <h2>Local SEO in cities across Texas</h2>
          <p>I help small businesses get found on Google statewide. Explore local SEO by city:</p>
          <nav class="location-strip" aria-label="Texas cities">
${locationStripHtml()}
          </nav>
          <p class="section-cta"><a href="/locations">View all Texas cities we serve</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>`;

function shell({ slug, title, description, eyebrow, lead, sections }) {
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
    <link rel="canonical" href="https://bluebonnetgrowth.com/blog/${slug}" />
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body class="blog-post">
    <nav class="nav" aria-label="Primary navigation">
      <a class="nav-logo" href="/">
        <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="34" height="34" />
        <span class="nav-logo-text">Bluebonnet Growth</span>
      </a>
      <div class="nav-links">
        <a href="/results">Results</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How it works</a>
        <a href="/about">About</a>
        <a href="/blog" class="is-active">Blog</a>
      </div>
      <a href="/contact" class="nav-cta">Apply Now</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" data-nav-drawer aria-label="Mobile navigation">
      <a href="/results">Results</a>
      <a href="/services">Services</a>
      <a href="/how-it-works">How it works</a>
      <a href="/about">About</a>
      <a href="/blog" class="is-active">Blog</a>
      <a href="/contact">Apply Now</a>
    </div>
    <main>
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${eyebrow}</span>
          <h1>${title}</h1>
          <p class="lead">${lead}</p>
        </div>
      </section>

${sections.join("\n\n")}

${texasInterlink}
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Ranking Texas local businesses on Google. One operator. Direct access. Real results.</div>
${FOOTER_SOCIAL}
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          <li><a href="/results">Results</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/locations">Locations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ready to rank?</div>
        <div class="footer-cta-text">Limited to 5 clients at a time. Apply to see if there is a spot open for your business.</div>
        <a href="/contact" class="footer-btn">Apply Now</a>
      </div>
    </footer>
    <div class="copyright">
      <span>© 2026 Bluebonnet Growth. All rights reserved.</span>
      <span>Based in Melissa, TX · Serving Texas</span>
    </div>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

function industryPost(cfg) {
  const {
    slug,
    service,
    servicePlural,
    searchPhrase,
    searchPhraseAlt,
    customerLabel,
    city,
    citySlug,
    tips,
    extraParagraph,
  } = cfg;

  const title = `How to Rank for "${searchPhraseAlt}" on Google`;
  const description = `Want more ${customerLabel} from Google? A plain guide for ${servicePlural} in ${city}, TX to show up when people search ${searchPhrase} and call you first.`;
  const eyebrow = `${city} local SEO · ${servicePlural}`;
  const lead = `When someone types "${searchPhrase}" into Google, they are not browsing. They need a ${service} and they want one nearby. This guide explains, in plain English, how ${city} ${servicePlural} can show up in those searches and turn them into ${customerLabel}.`;

  const tipList = tips.map((t) => `<li>${t}</li>`).join("\n            ");

  const sections = [
    `      <section class="section section-light">
        <div class="container">
          <h2>What happens when someone searches "${searchPhrase}"</h2>
          <p>They see a map with a few ${servicePlural} listed underneath. Below that, they see websites. Most people tap the map or call one of the first three names they trust.</p>
          <p>If your practice or business is not there, you do not get a second chance on that search. They call someone else.</p>
          <p>That is why local SEO matters for ${servicePlural} in ${city}. You are not trying to rank nationwide. You are trying to win the searches your neighbors actually type.</p>
          <blockquote class="blog-pullquote">
            <p>Most people never scroll past the map. If you are not on it, you are invisible for that search.</p>
          </blockquote>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Why ${city} is its own market</h2>
          <p>${city} sits on the Highway 75 corridor north of Dallas. A lot of your ${customerLabel} live in ${city}, but Google also mixes in results from <a href="/mckinney">McKinney</a>, <a href="/anna">Anna</a>, and sometimes <a href="/locations/frisco-tx">Frisco</a>.</p>
          <p>That means you are not only competing with other ${servicePlural} in town. You are competing with bigger cities that show up in the same search.</p>
          <p>${extraParagraph || `Your Google profile and website need to say clearly that you serve ${city} and the areas around it.`}</p>
          <p>We cover the broader picture in <a href="/blog/what-is-local-seo">what local SEO means</a> and on our <a href="/${citySlug}">local SEO in ${city}</a> page.</p>
        </div>
      </section>`,
    `      <section class="section section-light">
        <div class="container">
          <h2>Step 1: Fix your Google Business Profile</h2>
          <p>For "${searchPhrase}" searches, your Google Business Profile is often more important than your website. Google pulls map results from profiles first.</p>
          <ul>
            <li><strong>Primary category:</strong> Pick the category that closest matches what you do (for example, ${cfg.categoryExample}).</li>
            <li><strong>Service area:</strong> Include ${city} and nearby areas you actually serve.</li>
            <li><strong>Hours and phone:</strong> Must be correct. A wrong number costs you calls.</li>
            <li><strong>Photos:</strong> Real photos of your office, team, and work. Not stock images.</li>
            <li><strong>Services list:</strong> Add the services people search for in plain language.</li>
          </ul>
          <p>Walk through our <a href="/blog/google-business-profile-checklist">Google Business Profile checklist</a> if you want a step-by-step list.</p>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Step 2: Earn reviews that mention ${city}</h2>
          <p>Reviews help Google trust you. They also help real people feel safe calling.</p>
          <p>For ${servicePlural}, the best reviews are specific: "Great experience at their ${city} office" or "They fixed our issue the same week." Generic "five stars" helps less.</p>
          <p>Ask happy ${customerLabel} right after a good visit. Send a direct review link. One simple ask is enough.</p>
          <blockquote class="blog-pullquote">
            <p>A steady trickle of recent reviews beats a big burst from three years ago.</p>
          </blockquote>
          <p>See <a href="/blog/how-to-get-more-google-reviews">how to ask for Google reviews without feeling awkward</a>.</p>
          <div class="blog-cta-box">
            <h3>Want to know how you rank for "${searchPhrase}" today?</h3>
            <p>I will check your Google listing, your reviews, and who shows up above you in ${city}. Plain English, no pressure.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
    `      <section class="section section-light">
        <div class="container">
          <h2>Step 3: Make your website match what people search</h2>
          <p>Your site does not need to be huge. It needs to be clear.</p>
          <ul>
            <li>Say on your homepage that you serve ${city}, TX and nearby areas.</li>
            <li>Have a page or section that talks about your main services in plain language.</li>
            <li>Put your phone number at the top on mobile. Make it tap to call.</li>
            <li>Load fast on a phone. Most "${searchPhrase}" searches happen on mobile.</li>
          </ul>
          <p>If people visit but do not call, read <a href="/blog/website-traffic-no-calls">why websites get traffic but no calls</a>.</p>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Tips specific to ${servicePlural} in ${city}</h2>
          <ul>
            ${tipList}
          </ul>
          <p>These are the levers that move the needle for "${searchPhrase}" and similar searches in ${city}.</p>
        </div>
      </section>`,
    `      <section class="section section-light">
        <div class="container">
          <h2>What to do this week</h2>
          <ol>
            <li>Search "${searchPhrase}" on your phone in private mode. Write down who shows on the map.</li>
            <li>Compare their profiles to yours. Photos, reviews, categories, hours.</li>
            <li>Fix anything wrong on your profile today.</li>
            <li>Ask three happy ${customerLabel} for a Google review with a direct link.</li>
            <li>Make sure your website says ${city} and has a clear call button on mobile.</li>
          </ol>
          <p>If you want help, I am based in ${city} and work with ${servicePlural} across Texas. See <a href="/services/local-seo">local SEO services</a>, <a href="/how-it-works">how it works</a>, or <a href="/contact">apply now</a>.</p>
          <p>More guides for ${city} businesses: ${cfg.relatedGuides || ""}</p>
        </div>
      </section>`,
  ];

  return { slug, title, description, eyebrow, lead, sections };
}

const melissaGuides = [
  {
    slug: "local-seo-for-dentists-melissa-tx",
    service: "dentist",
    servicePlural: "dentists",
    searchPhrase: "dentist melissa tx",
    searchPhraseAlt: "Dentist Melissa TX",
    customerLabel: "patients",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "Dentist or Pediatric dentist",
    tips: [
      "<strong>List services people search:</strong> Cleanings, emergency visits, Invisalign, family dentistry. Match the words patients use.",
      "<strong>Show your Melissa location clearly:</strong> Address, parking, landmarks. New residents do not know the area yet.",
      "<strong>Post photos of your office and team:</strong> Dental anxiety is real. Familiar faces build trust before they call.",
      "<strong>Answer common questions on your site:</strong> Insurance, new patient process, hours. Fewer surprises means more bookings.",
    ],
    extraParagraph:
      "Many Melissa families still drive to McKinney for care out of habit. When you show up first on Google, you become the easy choice in town.",
    relatedGuides:
      '<a href="/blog/local-seo-for-plumbers-melissa-tx">plumbers</a>, <a href="/blog/local-seo-for-hvac-melissa-tx">HVAC</a>, <a href="/blog/local-seo-for-chiropractors-melissa-tx">chiropractors</a>',
  },
  {
    slug: "local-seo-for-plumbers-melissa-tx",
    service: "plumber",
    servicePlural: "plumbers",
    searchPhrase: "plumber melissa tx",
    searchPhraseAlt: "Plumber Melissa TX",
    customerLabel: "customers",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "Plumber",
    tips: [
      "<strong>Highlight emergency service:</strong> If you offer it, say so on your profile and site. Urgent searches convert fast.",
      "<strong>Mention common jobs:</strong> Water heaters, slab leaks, drain cleaning. These match real searches.",
      "<strong>Show service area towns:</strong> Melissa, Anna, McKinney, Van Alstyne if you cover them.",
      "<strong>Respond to every review:</strong> Homeowners read owner replies when choosing a plumber.",
    ],
    relatedGuides:
      '<a href="/blog/local-seo-for-electricians-melissa-tx">electricians</a>, <a href="/blog/local-seo-for-hvac-melissa-tx">HVAC</a>, <a href="/blog/local-seo-for-roofers-melissa-tx">roofers</a>',
  },
  {
    slug: "local-seo-for-hvac-melissa-tx",
    service: "HVAC company",
    servicePlural: "HVAC companies",
    searchPhrase: "hvac melissa tx",
    searchPhraseAlt: "HVAC Melissa TX",
    customerLabel: "customers",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "HVAC contractor",
    tips: [
      "<strong>Season matters:</strong> Update posts before summer and winter. AC and heating searches spike with weather.",
      "<strong>List brands you service:</strong> Trane, Carrier, Lennox. Homeowners search brand plus repair.",
      "<strong>Offer clear pricing signals:</strong> Free estimates, service call fees. Reduces tire-kickers, builds trust.",
      "<strong>Show before and after photos:</strong> New unit installs perform well on Google profiles.",
    ],
    relatedGuides:
      '<a href="/blog/local-seo-for-plumbers-melissa-tx">plumbers</a>, <a href="/blog/local-seo-for-electricians-melissa-tx">electricians</a>, <a href="/blog/local-seo-for-roofers-melissa-tx">roofers</a>',
  },
  {
    slug: "local-seo-for-roofers-melissa-tx",
    service: "roofer",
    servicePlural: "roofers",
    searchPhrase: "roofer melissa tx",
    searchPhraseAlt: "Roofer Melissa TX",
    customerLabel: "homeowners",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "Roofing contractor",
    tips: [
      "<strong>Storm season content:</strong> After hail, search volume jumps. An active profile with recent photos helps.",
      "<strong>Insurance and inspection language:</strong> Many searches include storm damage or insurance claims.",
      "<strong>Local project photos:</strong> Roofs in Melissa neighborhoods beat generic stock shots.",
      "<strong>Clear warranty info:</strong> Homeowners compare roofers carefully. Spell out what you guarantee.",
    ],
    relatedGuides:
      '<a href="/blog/local-seo-for-plumbers-melissa-tx">plumbers</a>, <a href="/blog/local-seo-for-hvac-melissa-tx">HVAC</a>, <a href="/blog/local-seo-for-electricians-melissa-tx">electricians</a>',
  },
  {
    slug: "local-seo-for-chiropractors-melissa-tx",
    service: "chiropractor",
    servicePlural: "chiropractors",
    searchPhrase: "chiropractor melissa tx",
    searchPhraseAlt: "Chiropractor Melissa TX",
    customerLabel: "patients",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "Chiropractor",
    tips: [
      "<strong>List conditions you treat:</strong> Back pain, neck pain, sports injuries. Match search language.",
      "<strong>New patient offers:</strong> If you run one, mention it on your profile. Lowers the barrier to book.",
      "<strong>Office hours that fit commuters:</strong> Early morning or evening slots are worth highlighting.",
      "<strong>Video or photo tour:</strong> First-time patients want to know what the office feels like.",
    ],
    relatedGuides:
      '<a href="/blog/local-seo-for-dentists-melissa-tx">dentists</a>, <a href="/blog/local-seo-for-plumbers-melissa-tx">plumbers</a>, <a href="/blog/local-seo-for-hvac-melissa-tx">HVAC</a>',
  },
  {
    slug: "local-seo-for-electricians-melissa-tx",
    service: "electrician",
    servicePlural: "electricians",
    searchPhrase: "electrician melissa tx",
    searchPhraseAlt: "Electrician Melissa TX",
    customerLabel: "customers",
    city: "Melissa",
    citySlug: "melissa",
    categoryExample: "Electrician",
    tips: [
      "<strong>Panel upgrades and EV chargers:</strong> New homes in Melissa search for modern electrical work.",
      "<strong>Licensed and insured:</strong> Say it on your site and profile. Homeowners look for this first.",
      "<strong>Same-day or emergency line:</strong> If you offer it, make the phone number obvious on mobile.",
      "<strong>Residential vs commercial:</strong> Pick a focus on your site so Google knows who you serve.",
    ],
    relatedGuides:
      '<a href="/blog/local-seo-for-plumbers-melissa-tx">plumbers</a>, <a href="/blog/local-seo-for-hvac-melissa-tx">HVAC</a>, <a href="/blog/local-seo-for-roofers-melissa-tx">roofers</a>',
  },
];

const posts = melissaGuides.map(industryPost);

for (const post of posts) {
  const file = path.join(BLOG, `${post.slug}.html`);
  fs.writeFileSync(file, shell(post), "utf8");
  console.log("wrote:", post.slug);
}

// Export slugs for sitemap update
fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"),
  JSON.stringify(posts.map((p) => p.slug), null, 2),
  "utf8"
);

console.log(`Done. ${posts.length} industry guides for Melissa, TX.`);
