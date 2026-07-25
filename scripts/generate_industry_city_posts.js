const fs = require("fs");
const path = require("path");
const cities = require("./data/texas_cities");
const industries = require("./data/industry_templates");
const guideCities = require("./data/industry_guide_cities");
const consolidation = require("./data/seo_consolidation");
const { blogMetaHtml } = require("./lib/blog_meta");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const FOOTER_SOCIAL = fs
  .readFileSync(path.join(ROOT, "blog", "what-is-local-seo.html"), "utf8")
  .match(/<div class="footer-social"[\s\S]*?<\/div>\s*<\/div>/)[0]
  .replace(/^ {6}/gm, "        ");

const keepSet = new Set(consolidation.keepTradeCity.map((k) => `${k.industry}::${k.city}`));

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

function dfwStripHtml() {
  return consolidation.keepCitySlugs
    .map((slug) => cities.getBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `            <a class="location-tag" href="${cities.getPath(c)}">${c.name}</a>`)
    .join("\n");
}

function relatedGuidesHtml(citySlug, currentKey) {
  const others = consolidation.keepTradeCity
    .filter((k) => k.city === citySlug && k.industry !== currentKey)
    .map((k) => industries.find((i) => i.key === k.industry))
    .filter(Boolean);
  const cityLinks = others
    .map((i) => `<a href="/blog/local-seo-for-${i.key}-${citySlug}-tx">${i.servicePlural}</a>`)
    .join(", ");
  const pillar = `<a href="/blog/local-seo-for-${currentKey}-texas">Texas ${industries.find((i) => i.key === currentKey).servicePlural} guide</a>`;
  if (!cityLinks) return pillar;
  return `${cityLinks}, and the statewide ${pillar}`;
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
  const searchPhrase = `${industry.searchKey} ${city.toLowerCase()} tx`;
  const searchPhraseAlt = formatSearchPhraseAlt(industry.searchKey, city);
  const slug = `local-seo-for-${industry.key}-${citySlug}-tx`;
  const vars = { city, citySlug, searchPhrase };

  const serviceLabel =
    industry.servicePlural.charAt(0).toUpperCase() + industry.servicePlural.slice(1);
  const title = `Local SEO for ${serviceLabel} in ${city}, TX`;
  const description = `Practical Google Maps and local search advice for ${industry.servicePlural} in ${city}, TX — what actually moves calls in this market.`;
  const eyebrow = `${city} local SEO · ${industry.servicePlural}`;
  const lead = `When someone searches "${searchPhrase}" they are ready to hire. Here is how ${city} ${industry.servicePlural} win those searches without agency fluff.`;

  const marketNote = cityCfg.marketNote || `${city} has its own map pack, but Google still mixes in ${nearbyLinksHtml(citySlug) || "nearby cities"}.`;
  const extraParagraph =
    (cityCfg.extraNote && cityCfg.extraNote[industry.key]) ||
    `Say clearly on your profile and website that you serve ${city} and the towns you actually cover.`;

  const tipList = industry.tips
    .map((t) => fill(t, vars))
    .map((t) => `<li>${t}</li>`)
    .join("\n            ");

  const sections = [
    `      <section class="section section-light">
        <div class="container">
          <h2>How "${searchPhrase}" searches play out in ${city}</h2>
          <p>${marketNote}</p>
          <p>${extraParagraph}</p>
          <p>Most people never scroll past the map. If you are not on it, you are invisible for that search. Broader context: <a href="/blog/what-is-local-seo">what local SEO means</a> and <a href="${cityPath(citySlug)}">local SEO in ${city}</a>.</p>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Google profile priorities for ${city} ${industry.servicePlural}</h2>
          <p>For high-intent local searches, your Google Business Profile usually matters more than a long website. Do this first:</p>
          <ul>
            <li><strong>Primary category:</strong> ${industry.categoryExample}.</li>
            <li><strong>Service area:</strong> ${city} plus towns you actually serve${nearbyLinksHtml(citySlug) ? ` (often overlaps ${nearbyLinksHtml(citySlug)})` : ""}.</li>
            <li><strong>Hours and phone:</strong> Must be correct — especially evenings and weekends if you take those calls.</li>
            <li><strong>Photos:</strong> Real work, team, and trucks. Not stock.</li>
            <li><strong>Services:</strong> The plain words ${industry.customerLabel} type.</li>
          </ul>
          <p>Full walkthrough: <a href="/blog/google-business-profile-checklist">Google Business Profile checklist</a>. Statewide playbook: <a href="/blog/local-seo-for-${industry.key}-texas">${industry.servicePlural} across Texas</a>.</p>
        </div>
      </section>`,
    `      <section class="section section-light">
        <div class="container">
          <h2>Reviews and website clarity</h2>
          <p>Ask happy ${industry.customerLabel} right after a good job. Specific reviews that mention ${city} beat generic “great job” five-stars.</p>
          <p>On your site: say you serve ${city}, put tap-to-call at the top on mobile, and keep service language plain. If traffic does not call, read <a href="/blog/website-traffic-no-calls">why websites get traffic but no calls</a>.</p>
          <div class="blog-cta-box">
            <h3>Want a straight look at how you rank for "${searchPhrase}"?</h3>
            <p>I will check your listing, reviews, and who sits above you in ${city}. Plain English. Limited roster.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
    `      <section class="section">
        <div class="container">
          <h2>Tips for ${industry.servicePlural} in ${city}</h2>
          <ul>
            ${tipList}
          </ul>
          <h2>Do this week</h2>
          <ol>
            <li>Search "${searchPhrase}" on your phone in private mode. Note the map pack.</li>
            <li>Fix category, services, photos, and hours on your profile today.</li>
            <li>Ask three happy ${industry.customerLabel} for a Google review with a direct link.</li>
            <li>Confirm your site says ${city} and has an obvious call button on mobile.</li>
          </ol>
          <p>More for ${city}: ${relatedGuidesHtml(citySlug, industry.key)}.</p>
          <p class="text-links"><a href="/services/local-seo">Local SEO services</a> · <a href="/how-it-works">How it works</a> · <a href="/contact">Apply now</a></p>
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

function shell(post) {
  const body = post.sections.join("\n");
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
    <title>${post.title}</title>
    <meta name="description" content="${post.description.replace(/"/g, "&quot;")}" />
    <link rel="canonical" href="https://bluebonnetgrowth.com/blog/${post.slug}" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${JSON.stringify(post.title)},
      "description": ${JSON.stringify(post.description)},
      "author": { "@type": "Person", "name": "Travis", "url": "https://bluebonnetgrowth.com/about" },
      "publisher": { "@type": "Organization", "name": "Bluebonnet Growth", "url": "https://bluebonnetgrowth.com" },
      "mainEntityOfPage": "https://bluebonnetgrowth.com/blog/${post.slug}"
    }
    </script>
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
          <span class="eyebrow">${post.eyebrow}</span>
          <h1>${post.title}</h1>
          <p class="lead">${post.lead}</p>
          ${post.blogMeta}
        </div>
      </section>
${body}
      <section class="section section-light">
        <div class="container">
          <h2>North Texas focus</h2>
          <p>I help small home service businesses get found on Google across DFW growth markets.</p>
          <nav class="location-strip" aria-label="North Texas cities">
${dfwStripHtml()}
          </nav>
          <p class="text-links"><a href="/locations">View locations</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-meta">Based in Melissa, TX · Local SEO for Texas home service businesses</div>
        ${FOOTER_SOCIAL}
      </div>
      <div class="footer-links">
        <a href="/results">Results</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How it works</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/locations">Locations</a>
        <a href="/contact">Apply Now</a>
      </div>
    </footer>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

const posts = [];
const guidesByCity = {};

for (const cityCfg of guideCities) {
  for (const industry of industries) {
    if (!keepSet.has(`${industry.key}::${cityCfg.slug}`)) continue;
    if (!cityCfg.extraNote || !cityCfg.extraNote[industry.key]) {
      // Allow keepers that only have marketNote (still unique enough at city level)
      const allowedWithoutExtra = consolidation.keepTradeCity.some(
        (k) => k.industry === industry.key && k.city === cityCfg.slug
      );
      if (!allowedWithoutExtra) continue;
    }
    const post = industryPost(cityCfg, industry);
    posts.push(post);
    if (!guidesByCity[cityCfg.slug]) guidesByCity[cityCfg.slug] = [];
    guidesByCity[cityCfg.slug].push({ slug: post.slug, title: post.guideTitle });
  }
}

for (const post of posts) {
  fs.writeFileSync(path.join(BLOG, `${post.slug}.html`), shell(post), "utf8");
}

const pillarSlugs = industries.map((i) => `local-seo-for-${i.key}-texas`);
const tradePillarCopy = require("./data/trade_pillar_copy");
const generalPosts = require("./data/general_blog_posts");

const pillarManifest = industries.map((i) => {
  const copy = tradePillarCopy[i.key];
  return {
    slug: `local-seo-for-${i.key}-texas`,
    title: copy.title.replace(/\{servicePlural\}/g, i.servicePlural),
    excerpt: copy.description.replace(/\{servicePlural\}/g, i.servicePlural),
    category: "industry-guide",
    tags: [i.key, "texas", "local-seo"],
    cityName: null,
  };
});

const cityManifest = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  tags: p.tags,
  cityName: p.cityName,
}));

const generalEntries = generalPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt || "",
  category: p.category || "general",
  tags: p.tags || ["local-seo"],
  cityName: null,
}));

const manifest = [...pillarManifest, ...cityManifest, ...generalEntries];

fs.writeFileSync(path.join(ROOT, "scripts", "data", "blog_manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"),
  JSON.stringify([...pillarSlugs, ...posts.map((p) => p.slug)], null, 2) + "\n",
  "utf8"
);
fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "industry_guides_by_city.json"),
  JSON.stringify(guidesByCity, null, 2) + "\n",
  "utf8"
);

console.log(`Done. ${posts.length} city guides + ${pillarSlugs.length} pillars in manifest.`);
require("./build_blog_index.js");
