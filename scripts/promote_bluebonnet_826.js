/**
 * Promote preview/bluebonnet_8/26 → live site pages (indexed, absolute paths).
 * node scripts/promote_bluebonnet_826.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PREVIEW = path.join(ROOT, 'preview/bluebonnet_8/26');
const GTAG = `    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG3FTP7PC3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG3FTP7PC3');
    </script>`;

const CSS_NAME = 'bb-styles.css';
fs.copyFileSync(path.join(PREVIEW, 'styles.css'), path.join(ROOT, CSS_NAME));
fs.copyFileSync(path.join(PREVIEW, 'script.js'), path.join(ROOT, 'bb-script.js'));

function stripPreviewChrome(html) {
  let h = html;
  h = h.replace(/\s*<base href="[^"]*"\s*\/?>\s*/i, '\n');
  h = h.replace(/\s*<meta name="robots"[^>]*>\s*/i, '\n');
  h = h.replace(/<div class="preview-banner">[\s\S]*?<\/div>\s*/i, '');
  h = h.replace(/\/preview\/bluebonnet_8\/26\/styles\.css/g, `/${CSS_NAME}`);
  h = h.replace(/\/preview\/bluebonnet_8\/26\/script\.js/g, '/bb-script.js');
  h = h.replace(/href="index\.html"/g, 'href="/"');
  h = h.replace(/href="services\.html"/g, 'href="/services"');
  h = h.replace(/href="industries\.html"/g, 'href="/industries"');
  h = h.replace(/href="approach\.html"/g, 'href="/how-it-works"');
  h = h.replace(/href="about\.html"/g, 'href="/about"');
  h = h.replace(/href="pricing\.html"/g, 'href="/pricing"');
  h = h.replace(/href="faq\.html"/g, 'href="/faq"');
  h = h.replace(/href="contact\.html"/g, 'href="/contact"');
  h = h.replace(/href="local-seo\.html"/g, 'href="/services/local-seo"');
  h = h.replace(/href="case-studies\/budgetocity\.html"/g, 'href="/case-studies/budgetocity"');
  h = h.replace(/href="hvac\.html"/g, 'href="/industries/hvac-seo"');
  h = h.replace(/href="plumbing\.html"/g, 'href="/industries/plumber-seo"');
  h = h.replace(/href="roofing\.html"/g, 'href="/industries/roofer-seo"');
  h = h.replace(/href="landscaping\.html"/g, 'href="/industries/landscaping-seo"');
  h = h.replace(/href="contractors\.html"/g, 'href="/industries/contractors"');
  h = h.replace(/href="local-services\.html"/g, 'href="/industries/local-services"');
  h = h.replace(/<a href="\/">Live site →<\/a>\s*/g, '');
  h = h.replace(/Design preview · not indexed/g, 'Based in Melissa, TX');
  h = h.replace(/>Design preview</g, '>Bluebonnet Growth<');
  return h;
}

function injectHead(html, { title, description, canonical, ogImage }) {
  let h = html;
  // ensure gtag after charset/viewport
  if (!h.includes('G-QG3FTP7PC3')) {
    h = h.replace(
      /(<meta name="viewport"[^>]*>)/i,
      `$1\n${GTAG}`
    );
  }
  h = h.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  if (!h.includes('name="description"')) {
    h = h.replace(
      /<\/title>/i,
      `</title>\n    <meta name="description" content="${description}" />\n    <link rel="canonical" href="${canonical}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content="${title}" />\n    <meta property="og:description" content="${description}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta property="og:image" content="${ogImage}" />\n    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />`
    );
  }
  return h;
}

function writeLive(relOut, previewRel, meta) {
  const src = path.join(PREVIEW, previewRel);
  let html = fs.readFileSync(src, 'utf8');
  html = stripPreviewChrome(html);
  html = injectHead(html, meta);
  const out = path.join(ROOT, relOut);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  console.log('wrote', relOut);
}

const og = 'https://bluebonnetgrowth.com/assets/bluebonnet-icon.png';

writeLive('index.html', 'index.html', {
  title: "Local SEO for Texas Businesses | Bluebonnet Growth",
  description: "We'll help you get found online and stay there or you walk away. Local SEO, web design, and conversion for Texas businesses. Limited to 5 clients.",
  canonical: 'https://bluebonnetgrowth.com/',
  ogImage: og,
});

writeLive('about.html', 'about.html', {
  title: 'About | Bluebonnet Growth',
  description: 'Travis Goldston, Texas Tech Marketing graduate. Founder-led SEO and digital marketing for Texas businesses. Not an agency. Limited to 5 clients.',
  canonical: 'https://bluebonnetgrowth.com/about',
  ogImage: 'https://bluebonnetgrowth.com/assets/travis-and-victoria.png',
});

writeLive('services.html', 'services.html', {
  title: 'Services | Local SEO, Web Design, Conversion | Bluebonnet Growth',
  description: 'Local and on-page SEO, web design, and conversion optimization for Texas businesses. Get found and turn traffic into calls.',
  canonical: 'https://bluebonnetgrowth.com/services',
  ogImage: og,
});

writeLive('how-it-works.html', 'approach.html', {
  title: 'How It Works | Bluebonnet Growth',
  description: 'Audit, foundation, build, maintain. SEO plus a site that converts for Texas businesses.',
  canonical: 'https://bluebonnetgrowth.com/how-it-works',
  ogImage: og,
});

writeLive('contact.html', 'contact.html', {
  title: 'Contact | Book a Strategy Call | Bluebonnet Growth',
  description: 'Book a strategy call with Bluebonnet Growth. Texan-run local SEO for Texas businesses. Limited to 5 clients.',
  canonical: 'https://bluebonnetgrowth.com/contact',
  ogImage: og,
});

writeLive('faq.html', 'faq.html', {
  title: 'FAQ | Bluebonnet Growth',
  description: 'FAQ about Bluebonnet Growth local SEO, web design, and conversion services for Texas businesses.',
  canonical: 'https://bluebonnetgrowth.com/faq',
  ogImage: og,
});

writeLive('pricing.html', 'pricing.html', {
  title: 'Pricing | Bluebonnet Growth',
  description: 'Scoped pricing for Texas local SEO, web design, and conversion work. Limited to 5 clients.',
  canonical: 'https://bluebonnetgrowth.com/pricing',
  ogImage: og,
});

writeLive('services/local-seo.html', 'local-seo.html', {
  title: 'Local SEO for Texas Businesses | Bluebonnet Growth',
  description: 'Local SEO and Google Maps visibility for Texas businesses. Show up when customers are ready to call.',
  canonical: 'https://bluebonnetgrowth.com/services/local-seo',
  ogImage: og,
});

writeLive('case-studies/budgetocity.html', 'case-studies/budgetocity.html', {
  title: 'Budgetocity Case Study | Organic SEO | Bluebonnet Growth',
  description: 'How Bluebonnet Growth helped Budgetocity move from average position 31.2 to 6.2 with organic SEO and content, without paid ads.',
  canonical: 'https://bluebonnetgrowth.com/case-studies/budgetocity',
  ogImage: 'https://bluebonnetgrowth.com/assets/budgetocity-logo.png',
});

writeLive('industries/index.html', 'industries.html', {
  title: 'Industries | Texas Local SEO | Bluebonnet Growth',
  description: 'Local SEO for Texas HVAC, plumbing, roofing, landscaping, contractors, and local service businesses.',
  canonical: 'https://bluebonnetgrowth.com/industries',
  ogImage: og,
});

const industryMap = [
  ['industries/hvac-seo.html', 'hvac.html', 'HVAC SEO Texas | Bluebonnet Growth', 'Local SEO for Texas HVAC companies. Rank for AC repair and heating searches on Google Maps.', 'https://bluebonnetgrowth.com/industries/hvac-seo'],
  ['industries/plumber-seo.html', 'plumbing.html', 'Plumbing SEO Texas | Bluebonnet Growth', 'Local SEO for Texas plumbing companies. More Google Maps visibility and qualified calls.', 'https://bluebonnetgrowth.com/industries/plumber-seo'],
  ['industries/roofer-seo.html', 'roofing.html', 'Roofing SEO Texas | Bluebonnet Growth', 'Local SEO for Texas roofing contractors. Map Pack visibility and estimate requests from organic search.', 'https://bluebonnetgrowth.com/industries/roofer-seo'],
  ['industries/landscaping-seo.html', 'landscaping.html', 'Landscaping SEO Texas | Bluebonnet Growth', 'Local SEO for Texas landscaping companies. Get found for lawn care and outdoor services.', 'https://bluebonnetgrowth.com/industries/landscaping-seo'],
  ['industries/contractors.html', 'contractors.html', 'Contractor SEO Texas | Bluebonnet Growth', 'SEO for Texas contractors. Get found by homeowners ready to hire.', 'https://bluebonnetgrowth.com/industries/contractors'],
  ['industries/local-services.html', 'local-services.html', 'Local Services SEO Texas | Bluebonnet Growth', 'Local SEO for Texas service businesses. Maps, on-page SEO, and sites that convert.', 'https://bluebonnetgrowth.com/industries/local-services'],
];

for (const [out, src, title, desc, canon] of industryMap) {
  writeLive(out, src, { title, description: desc, canonical: canon, ogImage: og });
}

// Results page: point to Budgetocity case study as primary proof
writeLive('results.html', 'case-studies/budgetocity.html', {
  title: 'Results | Budgetocity Case Study | Bluebonnet Growth',
  description: 'Real organic SEO results. See how Budgetocity moved from page 3 to page 1 without paid ads.',
  canonical: 'https://bluebonnetgrowth.com/results',
  ogImage: 'https://bluebonnetgrowth.com/assets/budgetocity-logo.png',
});

console.log('promote complete');
