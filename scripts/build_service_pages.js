const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://bluebonnetgrowth.com";

const FOOTER_SOCIAL = `        <div class="footer-social" aria-label="Social media">
          <a href="https://facebook.com/bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://x.com/bluebonnetgr" target="_blank" rel="noopener noreferrer" aria-label="X" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/bluebonnetgrowth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="https://youtube.com/@bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>`;

function paras(lines) {
  return lines.map((p) => `          <p>${p}</p>`).join("\n");
}

function listItems(items) {
  return items.map((item) => `            <li>${item}</li>`).join("\n");
}

function texasLinksSection(title, intro) {
  return `      <section class="section section-light">
        <div class="container">
          <h2>${title}</h2>
          <p>${intro}</p>
          <p class="text-links"><a href="/locations">North Texas city pages</a> · <a href="/blog">Read guides on the blog</a></p>
        </div>
      </section>`;
}

function finalCta(headline, body) {
  return `      <section class="section section-dark final-cta">
        <div class="container final-cta-grid">
          <div class="final-cta-copy">
            <span class="eyebrow">Next step</span>
            <h2>${headline}</h2>
            ${paras(Array.isArray(body) ? body : [body])}
          </div>
          <div class="final-cta-actions">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
            <a href="/contact" class="btn btn-outline">Free visibility audit</a>
          </div>
        </div>
      </section>`;
}

function renderPage({ title, description, canonical, ogTitle, ogDescription, main }) {
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
    <meta property="og:description" content="${ogDescription || description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${BASE}/assets/bluebonnet-icon.png" />
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
      <span>Based in Melissa, TX · Serving North Texas</span>
    </div>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

function localSeoMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">North Texas local SEO</span>
          <h1>Local SEO for Home Service Businesses in North Texas</h1>
          <p class="lead">I help pest control, HVAC, plumbing, roofing, and electrical companies show up on Google when people in North Texas search for help. Based in Melissa, I work with owner-led crews across Dallas-Fort Worth, Collin County, and nearby cities. More map pack visibility. More calls from the ZIP codes you want.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What it is</span>
          <h2>Local SEO is how you get found on Google</h2>
          <p class="section-intro">When someone searches "plumber near me" or "AC repair Frisco," Google shows a map and a short list of businesses. Local SEO is the work that helps your company land in that list. It also helps your website rank for the services you offer in the towns you serve.</p>
          <ul>
            <li><strong>High intent searches:</strong> I target phrases that lead to calls, not random traffic.</li>
            <li><strong>Map pack visibility:</strong> Better presence in Google Maps and the local three-pack.</li>
            <li><strong>On-site signals:</strong> Titles, headings, and pages that tell Google where you work and what you do.</li>
          </ul>
          <p class="section-summary">What local SEO includes with me</p>
          <ul>
            <li><strong>Keyword and competitor research:</strong> What people search in your market and who ranks today.</li>
            <li><strong>On-page SEO:</strong> Titles, headings, and internal links on your existing pages.</li>
            <li><strong>Citations and consistency:</strong> Your name, address, and phone match across the web.</li>
            <li><strong>Review strategy:</strong> A simple system to earn steady Google reviews.</li>
            <li><strong>Tracking:</strong> Call tracking and analytics so you see lead flow.</li>
          </ul>
          <p>Your Google Business Profile and content pages are separate services. See <a href="/services/google-business-profile">Google Business Profile Optimization</a> and <a href="/services/seo-content">SEO Content</a> for those.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">What I do</span>
          <h2>What local SEO work looks like</h2>
          <p class="section-intro">No dashboard homework. I do the work and explain what changed in plain language. You stay focused on running jobs. I stay focused on Google.</p>
          <ol class="process-list">
            <li><strong>Audit:</strong> I check your Google listing, your site, your competitors, and what people actually search in your area.</li>
            <li><strong>Fix the foundation:</strong> On-page fixes, citation cleanup, and review gaps that hold you back.</li>
            <li><strong>Build and maintain:</strong> Steady improvements so rankings hold as North Texas markets shift.</li>
          </ol>
          <p>Want the full picture? See <a href="/services">Services</a> or read <a href="/how-it-works">How it works</a>.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>Local SEO fits when people already search for your trade</h2>
          <p>If your customers search things like "pest control Allen TX," "roof repair McKinney," or "electrician near me," local SEO is usually worth it. The goal is to show up for those searches in the cities you serve, then turn visits into phone calls.</p>
          <p>I work mainly with home service owners: pest control, HVAC, plumbing, roofing, and electricians. If your business lives and dies by the phone ringing, this is built for you.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Why North Texas home service owners invest in local SEO</h2>
${paras([
    "North Texas keeps growing. New neighborhoods go up every month in Frisco, Prosper, Celina, and across Collin and Denton counties. More homes mean more demand for HVAC, plumbing, roofing, and pest control. It also means more companies fighting for the same spots on Google.",
    "Most owners I talk to are great at their trade but tired of marketing that does not show results. They have a website, maybe a Google listing, and a folder of reports from vendors who never explained what changed. Local SEO should be simple to track: more profile views, more direction requests, more calls from the areas you actually serve.",
    "I focus on searches that pay bills. That means phrases tied to your services and your towns, not blog traffic from people three states away. I align your on-page content, reviews, citations, and listing signals so Google trusts you as the right answer in your market.",
    "You do not need to meet me in person. I am based in Melissa and work with North Texas owners every week. What matters is that your listing and site clearly show where you work and what jobs you take.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>What my local SEO work includes</h2>
          <p>Every project starts with a plain audit: where you show up today, which competitors own the map pack, and which gaps cost you calls. From there I build a practical plan. No giant slide deck.</p>
          <ul>
            <li><strong>Competitor analysis:</strong> Who ranks in your city and what they did to get there.</li>
            <li><strong>On-page SEO:</strong> Titles, headings, meta descriptions, and internal links without keyword stuffing.</li>
            <li><strong>Citation cleanup:</strong> Consistent name, address, and phone across directories.</li>
            <li><strong>Review system:</strong> A steady flow of Google reviews from happy customers.</li>
            <li><strong>Monthly reporting:</strong> Calls, forms, and map visibility explained in words you can use.</li>
          </ul>
          <p>For your Google listing, see <a href="/services/google-business-profile">Google Business Profile Optimization</a>. For service pages, city pages, and blog guides, see <a href="/services/seo-content">SEO Content</a>.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>How long local SEO takes in North Texas</h2>
${paras([
    "Honest answer: it depends on your city, your trade, and how much cleanup your listing and site need. A broken profile fixed the right way can produce more calls within weeks. Competing for crowded terms in Plano or Frisco often takes several months of steady work.",
    "I set expectations up front. Before you commit, I tell you who ranks today, what they did to get there, and what I would tackle first. You should never pay for SEO without a clear picture of the path ahead.",
    "North Texas is big, but local SEO still works town by town. A roofer in Sherman and an HVAC crew in Carrollton face different competition. I build plans around your actual service area, not a generic checklist.",
    "Seasons matter too. AC companies see a rush in summer. Pest control spikes in spring. I adjust focus when search patterns shift so you are ready when demand hits.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>Local SEO for pest control, HVAC, plumbing, roofing, and electrical</h2>
${paras([
    "Each trade has its own search patterns. Pest control owners need visibility for emergency and seasonal terms. HVAC crews compete hard on repair and install phrases. Plumbers fight for drain, leak, and water heater searches. Roofers need storm and inspection traffic. Electricians win on panel upgrades and emergency calls.",
    "I learn your trade before I touch your account. I look at what your best customers typed before they called you. Then I map those searches to pages, listings, and reviews you already have or still need.",
    "You get one operator, not a rotating team. I cap my client list at five businesses so your account gets real attention. When you have a question, you talk to me directly.",
  ])}
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

${finalCta("Ready for local SEO that shows up in your call log?", [
    "Apply for a free visibility check. I will show you where you stand on Google today and what I would fix first for your North Texas market. No pressure, no jargon.",
    "Based in Melissa, TX. Serving home service businesses across North Texas.",
  ])}

${texasLinksSection(
    "Local SEO in North Texas cities",
    "I help home service businesses get found on Google across North Texas. Browse city pages or read plain guides on the blog."
  )}`;
}

function gbpMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Google Business Profile</span>
          <h1>Google Business Profile Optimization for North Texas Home Services</h1>
          <p class="lead">Your Google Business Profile is often the first thing a customer sees. I optimize profiles for pest control, HVAC, plumbing, roofing, and electrical companies across North Texas. Better categories, better photos, better posts, and a listing that matches what people search.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What it is</span>
          <h2>Your Google listing is a sales tool</h2>
          <p class="section-intro">When someone searches for a home service near them, Google shows a map with a short list of businesses. Your Google Business Profile controls how you look in that list. A weak profile costs you calls even if your work is great.</p>
          <ul>
            <li><strong>Categories and services:</strong> The right labels so Google knows what you do.</li>
            <li><strong>Photos and posts:</strong> Proof that you are real, active, and local.</li>
            <li><strong>Reviews and Q&amp;A:</strong> Trust signals that push people to call.</li>
            <li><strong>Accuracy:</strong> Hours, service area, and phone that match your real business.</li>
          </ul>
          <p>Pair this with <a href="/services/local-seo">Local SEO</a> for rankings and <a href="/services/seo-content">SEO Content</a> for the pages behind your listing.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">What I do</span>
          <h2>Google Business Profile work step by step</h2>
          <p class="section-intro">I treat your listing like a landing page. Every field should help a North Texas homeowner choose you over the next name on the map.</p>
          <ol class="process-list">
            <li><strong>Audit:</strong> I review your profile, your competitors, and what is missing or wrong today.</li>
            <li><strong>Fix and optimize:</strong> Categories, services, description, photos, posts, and Q&amp;A.</li>
            <li><strong>Maintain:</strong> Regular posts, photo updates, and review responses so the profile stays active.</li>
          </ol>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>Profile optimization fits most home service owners</h2>
          <p>If you run a pest control, HVAC, plumbing, roofing, or electrical company in North Texas, your Google listing matters. Maybe you never claimed it. Maybe a past vendor set wrong categories. Maybe you have no photos or stale hours. These problems show up every week when I audit new accounts.</p>
          <p>A strong profile does not replace good work. It makes sure people who find you online actually call.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Why your Google Business Profile matters in North Texas</h2>
${paras([
    "North Texas homeowners search on their phones. They see your star rating, your photos, and your review count before they ever click your website. If your profile looks empty or outdated, they call the next company.",
    "Google uses your profile to decide map pack rankings. Categories, services, review velocity, and activity all send signals. A profile you set once and forgot about falls behind competitors who post weekly and collect steady reviews.",
    "Many owners think the listing is fine because it exists. When I audit, I often find wrong categories, duplicate listings, missing service areas, or phone numbers that do not match the website. Small errors confuse Google and cost you visibility.",
    "I am based in Melissa and work with home service businesses across Dallas-Fort Worth and nearby counties. I know how suburban growth changes search patterns from Frisco to Sherman and points in between.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>What Google Business Profile optimization includes</h2>
${paras([
    "I start with a full profile review. I check primary and secondary categories, the services list, business description, attributes, hours, service area settings, and whether duplicate listings exist.",
    "Photos matter more than most owners think. I help you build a photo library that shows trucks, crews, finished jobs, and your service area. I also set up a simple posting schedule so your profile looks alive.",
    "Reviews are part of profile health. I set up a review request process your techs can actually use in the field. I also draft responses for new reviews so you stay engaged without spending hours typing.",
  ])}
          <ul>
            <li><strong>Category and service tuning:</strong> Labels that match how customers search.</li>
            <li><strong>Description and attributes:</strong> Clear copy that supports your trade and area.</li>
            <li><strong>Photo strategy:</strong> Regular uploads that build trust.</li>
            <li><strong>Google posts:</strong> Offers, updates, and seasonal reminders.</li>
            <li><strong>Q&amp;A setup:</strong> Common questions answered before competitors fill them in.</li>
            <li><strong>Duplicate and NAP cleanup:</strong> One correct listing across the web.</li>
          </ul>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Common Google profile mistakes I fix</h2>
${paras([
    "Wrong primary category is the biggest one. An HVAC company listed as a general contractor fights the wrong fight. A plumber listed under handyman loses relevant searches. I pick categories based on what your customers type, not what sounds broad.",
    "Service areas set too wide or too narrow both hurt. If you serve Collin County but your profile says Dallas only, you miss Frisco and McKinney searches. If you claim the whole state, Google may not trust you for local map results.",
    "Stock photos and logos with no real job shots make you look like every other listing. Homeowners want to see your trucks, your uniforms, and your work. I push for real images on a steady schedule.",
    "Ignored reviews look bad. A one-star review with no response scares off callers. I help you respond in a professional way that shows you stand behind your work.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>How profile work ties to local SEO</h2>
${paras([
    "Your Google Business Profile and your website should tell the same story. Same name, same phone, same services, same cities. When those signals match, Google trusts you more.",
    "Profile optimization alone can produce more calls quickly. Long term, it works best paired with <a href=\"/services/local-seo\">Local SEO</a> and <a href=\"/services/seo-content\">SEO Content</a> so your site backs up what your listing promises.",
    "I cap my client list at five businesses. You work with me directly, not a junior account manager. When your profile needs a fix, I handle it.",
  ])}
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

${finalCta("Ready for a Google listing that earns calls?", [
    "Apply for a free profile review. I will show you what is wrong today and what I would fix first. Plain language, no pressure.",
    "Based in Melissa, TX. Serving home service businesses across North Texas.",
  ])}

${texasLinksSection(
    "Google visibility in North Texas cities",
    "I optimize listings for home service businesses across North Texas. Browse city pages or read guides on the blog."
  )}`;
}

function seoContentMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">SEO content</span>
          <h1>SEO Content for North Texas Home Service Businesses</h1>
          <p class="lead">Google needs pages that match what people search. I write service pages, city pages, and blog guides for pest control, HVAC, plumbing, roofing, and electrical companies across North Texas. Plain language. Real local detail. Built to rank and earn calls.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What it is</span>
          <h2>Content that helps you rank on Google</h2>
          <p class="section-intro">Most home service sites have a homepage and little else. That leaves money on the table. Service pages explain each job you do. City pages show you serve specific towns. Blog guides answer questions your customers ask before they call.</p>
          <ul>
            <li><strong>Service pages:</strong> One clear page per offering, like drain cleaning or AC repair.</li>
            <li><strong>City pages:</strong> Pages for Frisco, McKinney, Allen, and other towns you serve.</li>
            <li><strong>Blog guides:</strong> Helpful articles that build trust and support rankings.</li>
          </ul>
          <p>Content works best with <a href="/services/local-seo">Local SEO</a> and a strong <a href="/services/google-business-profile">Google Business Profile</a>.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">What I do</span>
          <h2>How I build SEO content</h2>
          <p class="section-intro">I research what people search in your market, then write pages that match those searches without sounding like a robot.</p>
          <ol class="process-list">
            <li><strong>Research:</strong> I find the phrases your customers use and see which pages competitors rank with.</li>
            <li><strong>Plan:</strong> I map service pages, city pages, and guides to gaps on your site.</li>
            <li><strong>Write and publish:</strong> Plain copy, clear headings, and internal links that help Google understand your site.</li>
          </ol>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>SEO content fits when your site is thin</h2>
          <p>Maybe you rank for your company name but not for "roof repair Plano" or "pest control Frisco." Maybe you serve ten cities but only mention one on your site. Maybe competitors have dozens of pages and you have five. Content fixes those gaps.</p>
          <p>I focus on home service trades in North Texas where search volume is real and calls matter.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Why home service businesses need more than a homepage</h2>
${paras([
    "Google ranks pages, not whole websites. If you want to show up for water heater repair, you need a page about water heater repair. If you want calls from Celina, you need content that speaks to Celina.",
    "North Texas searchers use specific phrases. They type their city, their problem, and sometimes their urgency. A generic homepage cannot cover every job and every town. Service pages and city pages give Google clear targets.",
    "Blog guides help too. A short article on when to replace an AC unit or how to spot roof storm damage answers questions, builds trust, and links back to your money pages. I write guides people in your area would actually read.",
    "Bad content hurts you. Duplicate city pages, copied paragraphs, and keyword stuffing can get you ignored or penalized. I write original copy for each page so your site grows the right way.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>What SEO content creation includes</h2>
${paras([
    "Service pages explain one offering in depth. What it is, when a homeowner needs it, what you do, and how to contact you. Each page targets searches that lead to calls, not curiosity clicks.",
    "City pages show you work in a specific town without copying the same paragraph everywhere. I mention local landmarks, neighborhoods, and search patterns for that market. The goal is relevance, not spam.",
    "Blog guides support your main pages. They answer common questions, earn internal links, and give you something useful to share. I keep them short, clear, and focused on your trade.",
  ])}
          <ul>
            <li><strong>Keyword research:</strong> Real searches from your North Texas market.</li>
            <li><strong>Service page writing:</strong> One page per core offering.</li>
            <li><strong>City page writing:</strong> Local pages for towns you serve.</li>
            <li><strong>Blog guides:</strong> Practical articles that support rankings.</li>
            <li><strong>On-page setup:</strong> Titles, headings, meta descriptions, and internal links.</li>
          </ul>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>How I write for pest control, HVAC, plumbing, roofing, and electrical</h2>
${paras([
    "Each trade has different customer questions. Pest control callers want fast help and clear pricing signals. HVAC searches spike with weather. Plumbing emergencies need trust fast. Roofing leads often follow storms. Electrical work needs safety language people understand.",
    "I learn your services before I write. I talk to you about which jobs pay best, which towns you want more of, and what customers ask on the phone. That input shapes every page.",
    "I write at a seventh or eighth grade reading level. No jargon walls. A homeowner should understand the page in seconds and know how to call you.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>How content ties to your broader SEO plan</h2>
${paras([
    "New pages alone do not fix a broken Google listing or weak reviews. Content works best as part of a plan. I pair it with <a href=\"/services/local-seo\">Local SEO</a> and <a href=\"/services/google-business-profile\">Google Business Profile Optimization</a> so every signal points the same direction.",
    "I publish on a schedule that fits your business. Some owners need ten service pages upfront. Others add city pages month by month as they expand. I quote based on what will move the needle, not on word count for its own sake.",
    "You work with me directly. I cap my roster at five clients so your content queue does not sit behind a big agency backlog.",
  ])}
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

${finalCta("Need pages that rank and read like a human wrote them?", [
    "Apply for a content review. I will show you which pages are missing and what I would write first. Plain language, no pressure.",
    "Based in Melissa, TX. Serving home service businesses across North Texas.",
  ])}

${texasLinksSection(
    "SEO content for North Texas cities",
    "I write service pages, city pages, and guides for home service businesses across North Texas. Browse city pages or read examples on the blog."
  )}`;
}

function servicesOverviewMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Services for North Texas home services</span>
          <h1>Three Services. One Goal: More Calls from Google.</h1>
          <p class="lead">I help pest control, HVAC, plumbing, roofing, and electrical companies get found on Google across North Texas. Local SEO, Google Business Profile optimization, and SEO content. No bloated packages. No services you do not need. Based in Melissa. Limited to five clients at a time.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">How I help</span>
          <h2>One operator focused on local search</h2>
${paras([
    "Most home service owners do not need a dozen marketing services. They need to show up when locals search, look credible on Google, and turn that visibility into phone calls. I focus on three jobs and do them well.",
    "I work with owner-led trades across Dallas-Fort Worth, Collin County, and nearby North Texas cities. You get direct access to me, plain updates, and reporting tied to calls instead of jargon.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">01</span>
          <h2>Local SEO</h2>
${paras([
    "Local SEO gets your business in front of people searching on Google and Google Maps. I handle on-page fixes, citations, review strategy, competitor research, and tracking so you rank in the cities you serve.",
    "This is long-term lead generation. Rankings take time, but the payoff compounds. When you own map pack spots for high-intent searches in your town, you stop renting every click from ads.",
    "Learn more on my <a href=\"/services/local-seo\">Local SEO page</a>, browse <a href=\"/locations\">North Texas city pages</a>, or read guides on the <a href=\"/blog\">blog</a>.",
  ])}
          <p class="section-cta">
            <a href="/services/local-seo" class="btn btn-primary">Local SEO details</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">02</span>
          <h2>Google Business Profile Optimization</h2>
${paras([
    "Your Google listing is often the first impression a customer gets. I tune categories, services, photos, posts, Q&amp;A, and reviews so your profile earns clicks and calls.",
    "A strong profile can produce results fast. Wrong categories, missing photos, and stale hours cost you calls every day. I fix the listing and keep it active.",
    "See the full breakdown on <a href=\"/services/google-business-profile\">Google Business Profile Optimization</a>.",
  ])}
          <p class="section-cta">
            <a href="/services/google-business-profile" class="btn btn-primary">Google Business Profile details</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">03</span>
          <h2>SEO Content</h2>
${paras([
    "Google ranks pages, not vague homepages. I write service pages, city pages, and blog guides that match what North Texas homeowners search for.",
    "Thin sites lose to competitors with depth. If you need pages for each service and each town you cover, this is where I build them. Plain language, local detail, no copy-paste spam.",
    "Read more on <a href=\"/services/seo-content\">SEO Content</a> and see results on <a href=\"/results\">Results</a>.",
  ])}
          <p class="section-cta">
            <a href="/services/seo-content" class="btn btn-primary">SEO Content details</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>How the three services work together</h2>
${paras([
    "Local SEO handles rankings, citations, and on-page signals. Google Business Profile optimization makes your listing look sharp and trustworthy. SEO content gives Google the pages it needs to match searches. Most clients need some mix of all three over time, but not always all at once.",
    "I start with an honest audit. Sometimes a broken profile and two new service pages beat a long wish list. Sometimes you need content before rankings can move. I recommend the sequence that gets you calls fastest for your budget.",
    "You will never get a pitch for services you do not need. I cap clients at five at a time so each business gets real attention. That limit is intentional.",
    "I am based in Melissa, Texas, and serve home service businesses across North Texas. Local SEO is about your service area, not my zip code. What matters is that Google and your customers understand where you work and why they should call you.",
  ])}
          <p>Questions? Visit the <a href="/faq">FAQ</a> or read <a href="/how-it-works">How it works</a>.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Who I work with</h2>
${paras([
    "I specialize in owner-led home service businesses: pest control, HVAC, plumbing, roofing, and electricians. If your customers search on Google before they call, I can usually help.",
    "I am not the right fit for national e-commerce brands, app startups, or companies that want a big agency roster. I keep the list small so each client gets senior-level attention.",
    "A pest control crew in Allen and a roofer in Denton both need the same core ingredients: visibility on Google, a strong listing, and pages that match local searches. I adapt tactics to your market while keeping the process simple.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>What working together looks like</h2>
${paras([
    "You apply through my contact page. I review your site, listing, and goals, then schedule a short call if it looks like a fit. No high-pressure sales pitch. Just a direct conversation about where you are and what would move the needle.",
    "If we work together, you get one point of contact, plain updates, and metrics tied to calls. I handle the technical work. You stay focused on running jobs and closing the work I help you win.",
    "Most engagements combine ongoing local SEO with profile updates and new content over time. I quote clearly up front and adjust scope when your needs change. North Texas markets shift fast. Your marketing should keep up.",
    "Every plan starts with your goals, not a pre-packaged bundle. You might need local SEO first, profile fixes first, or content before anything else. I meet you where you are.",
  ])}
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

${finalCta("Not sure what you need?", [
    "Apply for a free visibility check. I will figure out the right mix of local SEO, Google Business Profile work, and content for your North Texas business.",
    "Limited spots available. Direct access, plain language, real results.",
  ])}

${texasLinksSection(
    "Serving home service businesses across North Texas",
    "Explore city pages for local SEO and read practical guides on the blog."
  )}`;
}

const PAGES = [
  {
    file: path.join(ROOT, "services", "local-seo.html"),
    title: "Local SEO North Texas | Google Maps for Home Services | Bluebonnet Growth",
    description:
      "Local SEO for North Texas home service businesses. Rank on Google Maps and search in Dallas-Fort Worth, Collin County, and nearby cities. Based in Melissa, TX.",
    canonical: "/services/local-seo",
    ogTitle: "Local SEO for North Texas Home Services | Bluebonnet Growth",
    ogDescription:
      "Operator-led local SEO for pest control, HVAC, plumbing, roofing, and electricians. Map pack visibility and pages that earn calls.",
    main: localSeoMain(),
  },
  {
    file: path.join(ROOT, "services", "google-business-profile.html"),
    title: "Google Business Profile Optimization North Texas | Bluebonnet Growth",
    description:
      "Google Business Profile optimization for North Texas home service businesses. Categories, photos, posts, reviews, and listings that earn calls.",
    canonical: "/services/google-business-profile",
    ogTitle: "Google Business Profile Optimization | Bluebonnet Growth",
    ogDescription:
      "Profile cleanup and optimization for pest control, HVAC, plumbing, roofing, and electrical companies across North Texas.",
    main: gbpMain(),
  },
  {
    file: path.join(ROOT, "services", "seo-content.html"),
    title: "SEO Content North Texas | Service & City Pages | Bluebonnet Growth",
    description:
      "SEO content for North Texas home service businesses. Service pages, city pages, and blog guides that rank on Google and earn calls.",
    canonical: "/services/seo-content",
    ogTitle: "SEO Content for North Texas Home Services | Bluebonnet Growth",
    ogDescription:
      "Service pages, city pages, and blog guides written for pest control, HVAC, plumbing, roofing, and electricians.",
    main: seoContentMain(),
  },
  {
    file: path.join(ROOT, "services.html"),
    title: "Services | Local SEO, GBP & Content | Bluebonnet Growth",
    description:
      "Local SEO, Google Business Profile optimization, and SEO content for North Texas home service businesses. Three focused services from a Melissa-based operator.",
    canonical: "/services",
    ogTitle: "Services for North Texas Home Services | Bluebonnet Growth",
    ogDescription:
      "Local SEO, Google Business Profile optimization, and SEO content for owner-led home service businesses in North Texas.",
    main: servicesOverviewMain(),
  },
];

function mainWordCount(html) {
  const main = html.match(/<main>([\s\S]*?)<\/main>/);
  if (!main) return 0;
  const text = main[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(" ").filter(Boolean).length;
}

for (const page of PAGES) {
  const html = renderPage(page);
  fs.mkdirSync(path.dirname(page.file), { recursive: true });
  fs.writeFileSync(page.file, html, "utf8");
  const words = mainWordCount(html);
  console.log(`wrote ${path.relative(ROOT, page.file)} (${words} words in main)`);
}

console.log("Done. Service pages generated.");
