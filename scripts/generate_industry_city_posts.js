const fs = require("fs");
const path = require("path");
const cities = require("./data/texas_cities");
const industries = require("./data/industry_templates");
const guideCities = require("./data/industry_guide_cities");
const { blogMetaHtml } = require("./lib/blog_meta");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const FOOTER_SOCIAL = fs
  .readFileSync(path.join(ROOT, "blog", "what-is-local-seo.html"), "utf8")
  .match(/<div class="footer-social"[\s\S]*?<\/div>\s*<\/div>/)[0]
  .replace(/^ {6}/gm, "        ");

function cityPath(slug) {
  const city = cities.getBySlug(slug);
  return city ? cities.getPath(city) : `/${slug}`;
}

function nearbyLinksHtml(slug, limit = 3) {
  const city = cities.getBySlug(slug);
  if (!city) return "";
  return (city.nearby || [])
    .slice(0, limit)
    .map((s) => cities.getBySlug(s))
    .filter(Boolean)
    .map((c) => `<a href="${cities.getPath(c)}">${c.name}</a>`)
    .join(", ");
}

function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function locationStripHtml() {
  return [...cities]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => {
      const href = cities.getPath(c);
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

function shell({ slug, title, description, eyebrow, lead, sections, blogMeta }) {
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
${blogMeta}
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

function relatedGuidesHtml(citySlug, currentKey) {
  const others = industries.filter((i) => i.key !== currentKey).slice(0, 3);
  return others
    .map((i) => {
      const slug = `local-seo-for-${i.key}-${citySlug}-tx`;
      return `<a href="/blog/${slug}">${i.servicePlural}</a>`;
    })
    .join(", ");
}

function defaultMarketNote(cityName, citySlug) {
  const nearby = nearbyLinksHtml(citySlug);
  if (nearby) {
    return `${cityName} has its own search market on Google. Your customers often see results from ${nearby} too.`;
  }
  return `${cityName} has its own search market on Google. Nearby towns often show up in the same results.`;
}

function formatSearchPhraseAlt(searchKey, city) {
  if (searchKey === "hvac") return `HVAC ${city} TX`;
  const titled = searchKey
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${titled} ${city} TX`;
}

function industryPost(cityCfg, industry) {
  const cityMeta = cities.getBySlug(cityCfg.slug);
  const city = cityMeta.name;
  const citySlug = cityCfg.slug;
  const cityLower = city.toLowerCase();
  const searchPhrase = `${industry.searchKey} ${cityLower} tx`;
  const searchPhraseAlt = formatSearchPhraseAlt(industry.searchKey, city);
  const slug = `local-seo-for-${industry.key}-${citySlug}-tx`;
  const vars = { city, citySlug, searchPhrase };

  const title = `How to Rank for "${searchPhraseAlt}" on Google`;
  const description = `Want more ${industry.customerLabel} from Google? A plain guide for ${industry.servicePlural} in ${city}, TX to show up when people search ${searchPhrase} and call you first.`;
  const eyebrow = `${city} local SEO · ${industry.servicePlural}`;
  const lead = `When someone types "${searchPhrase}" into Google, they are not browsing. They need a ${industry.service} and they want one nearby. This guide explains, in plain English, how ${city} ${industry.servicePlural} can show up in those searches and turn them into ${industry.customerLabel}.`;

  const marketNote = cityCfg.marketNote || defaultMarketNote(city, citySlug);
  const extraParagraph =
    (cityCfg.extraNote && cityCfg.extraNote[industry.key]) ||
    `Your Google profile and website need to say clearly that you serve ${city} and the areas around it.`;

  const tipList = industry.tips
    .map((t) => fill(t, vars))
    .map((t) => `<li>${t}</li>`)
    .join("\n            ");

  const sections = [
    `      <section class="section section-light">
        <div class="container">
          <h2>What happens when someone searches "${searchPhrase}"</h2>
          <p>They see a map with a few ${industry.servicePlural} listed underneath. Below that, they see websites. Most people tap the map or call one of the first three names they trust.</p>
          <p>If your practice or business is not there, you do not get a second chance on that search. They call someone else.</p>
          <p>That is why local SEO matters for ${industry.servicePlural} in ${city}. You are not trying to rank nationwide. You are trying to win the searches your neighbors actually type.</p>
          <blockquote class="blog-pullquote">
            <p>Most people never scroll past the map. If you are not on it, you are invisible for that search.</p>
          </blockquote>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Why ${city} is its own market</h2>
          <p>${marketNote}</p>
          <p>That means you are not only competing with other ${industry.servicePlural} in town. You are competing with businesses from nearby cities that show up in the same search.</p>
          <p>${extraParagraph}</p>
          <p>We cover the broader picture in <a href="/blog/what-is-local-seo">what local SEO means</a> and on our <a href="${cityPath(citySlug)}">local SEO in ${city}</a> page.</p>
        </div>
      </section>`,
    `      <section class="section section-light">
        <div class="container">
          <h2>Step 1: Fix your Google Business Profile</h2>
          <p>For "${searchPhrase}" searches, your Google Business Profile is often more important than your website. Google pulls map results from profiles first.</p>
          <ul>
            <li><strong>Primary category:</strong> Pick the category that closest matches what you do (for example, ${industry.categoryExample}).</li>
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
          <p>For ${industry.servicePlural}, the best reviews are specific: "Great experience at their ${city} office" or "They fixed our issue the same week." Generic "five stars" helps less.</p>
          <p>Ask happy ${industry.customerLabel} right after a good visit. Send a direct review link. One simple ask is enough.</p>
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
          <h2>Tips specific to ${industry.servicePlural} in ${city}</h2>
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
            <li>Ask three happy ${industry.customerLabel} for a Google review with a direct link.</li>
            <li>Make sure your website says ${city} and has a clear call button on mobile.</li>
          </ol>
          <p>If you want help, I work with ${industry.servicePlural} in ${city} and across Texas. See <a href="/services/local-seo">local SEO services</a>, <a href="/how-it-works">how it works</a>, or <a href="/contact">apply now</a>.</p>
          <p>More guides for ${city} businesses: ${relatedGuidesHtml(citySlug, industry.key)}.</p>
        </div>
      </section>`,
  ];

  const tags = [industry.key, citySlug, "local-seo"];
  const cardBlurb = fill(industry.cardBlurb, vars);

  return {
    slug,
    title,
    description,
    eyebrow,
    lead,
    sections,
    guideTitle: searchPhraseAlt,
    cardBlurb,
    city,
    citySlug,
    region: cityMeta.region,
    category: "city-guide",
    tags,
    excerpt: cardBlurb,
    cityName: city,
    blogMeta: blogMetaHtml({ category: "city-guide", tags }),
  };
}

const posts = [];
const guidesByCity = {};

for (const cityCfg of guideCities) {
  const cityPosts = industries.map((industry) => industryPost(cityCfg, industry));
  posts.push(...cityPosts);
  guidesByCity[cityCfg.slug] = cityPosts.map((p) => ({
    slug: p.slug,
    title: p.guideTitle,
  }));
}

for (const post of posts) {
  const file = path.join(BLOG, `${post.slug}.html`);
  fs.writeFileSync(file, shell(post), "utf8");
}

const manifest = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  tags: p.tags,
  cityName: p.cityName,
}));

fs.writeFileSync(path.join(ROOT, "scripts", "data", "blog_manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"),
  JSON.stringify(posts.map((p) => p.slug), null, 2) + "\n",
  "utf8"
);

fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "industry_guides_by_city.json"),
  JSON.stringify(guidesByCity, null, 2) + "\n",
  "utf8"
);

console.log(`Done. ${posts.length} industry guides across ${guideCities.length} Texas cities.`);
require("./build_blog_index.js");
