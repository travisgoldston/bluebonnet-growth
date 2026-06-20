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
          <p class="text-links"><a href="/locations">View all Texas cities we serve</a> · <a href="/blog">Read guides on the blog</a></p>
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
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
            <a href="/contact" class="btn btn-outline">Request a free visibility check</a>
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

function localSeoMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Texas local SEO agency</span>
          <h1>Local SEO for Small Businesses Across Texas</h1>
          <p class="lead">Bluebonnet Growth helps owner-led businesses rank on Google in Dallas, Houston, Austin, San Antonio, Fort Worth, and cities across the state. We are based in Melissa, Texas, and work with small businesses statewide. Map Pack visibility, cleaner Google Business Profiles, and service pages that match real searches.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What it is</span>
          <h2>SEO is long term lead generation from Google</h2>
          <p class="section-intro">When someone searches on Google, they see a map and a list of businesses. Local SEO is the work that helps you show up there. It also helps your site make sense to Google for searches like "electrician near me," "roof repair Dallas," or "dentist in Austin."</p>
          <ul>
            <li><strong>High intent keywords:</strong> We target searches that lead to calls, not curiosity traffic.</li>
            <li><strong>Local visibility:</strong> Better presence for nearby searches and map results.</li>
            <li><strong>Service and location pages:</strong> A clear page for each service and each area you serve.</li>
          </ul>
          <p class="section-summary">What is included in our SEO work</p>
          <ul>
            <li><strong>Local SEO and Google Business Profile:</strong> Clean up, optimization, and accuracy.</li>
            <li><strong>Service and location strategy:</strong> Pages that match what customers actually search.</li>
            <li><strong>SEO content creation:</strong> Useful content that supports rankings and answers common questions.</li>
            <li><strong>Tracking:</strong> Analytics and call tracking setup so you can see lead flow.</li>
          </ul>
          <p class="section-cta">
            <a href="/pricing" class="btn btn-primary">See pricing</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">What we do</span>
          <h2>What SEO work looks like with us</h2>
          <p class="section-intro">No dashboard homework. We do the work and then show you, in simple terms, what we changed and what it is doing for you.</p>
          <ol class="process-list">
            <li><strong>Audit:</strong> We check your Google listing, your site, your competitors, and what people are actually searching in your market.</li>
            <li><strong>Build the right pages:</strong> Service and location pages that match what customers search across Texas.</li>
            <li><strong>Improve and maintain:</strong> On page fixes, content improvements, and consistency so rankings hold.</li>
          </ol>
          <p>Want to compare services? See <a href="/services">Services</a>. Curious about pricing? Take a look at <a href="/pricing">Pricing</a>.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>SEO is a fit when people already search for you</h2>
          <p>If your customers search things like "plumber near me," "HVAC repair Houston TX," or "SEO company Dallas," local SEO is usually worth it. The goal is to show up for high intent searches in the cities you serve, then turn those visits into leads.</p>
          <p>Pair SEO with conversion focused <a href="/services/web-design">Web Design</a> and <a href="/conversion-optimization">Conversion Optimization</a> so traffic actually books.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Why Texas businesses invest in local SEO now</h2>
${paras([
    "Texas is growing fast. New neighborhoods and new businesses open every week in Dallas-Fort Worth, the Austin area, Houston suburbs, and cities along I-35. That growth brings demand, but it also brings more competition in Google's local results. When someone searches for a service near them, Google picks a short list of businesses in seconds.",
    "Most owners we meet are great at their work but frustrated online. They have a website, maybe a Google listing, and a stack of invoices from vendors who sent reports instead of calls. Local SEO should be measurable: more profile views, more direction requests, more calls from the ZIP codes you actually want.",
    "We focus on the searches that pay bills. That means high-intent phrases tied to your services and service area, not vanity traffic from blog posts nobody in your city will read. We align your Google Business Profile, on-page content, reviews, and citations so Google trusts that you are the right answer for your market.",
    "You do not need to be in the same city as your SEO partner. What matters is that your listing, site, and reviews clearly show where you work and what you do. We work remotely with Texas owners every week from our base in Melissa and stay focused on calls, not jargon.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>What our Texas local SEO work includes</h2>
          <p>Every engagement starts with a plain-English audit: where you show up today, which competitors own the map pack, and which pages are missing for the jobs you want. From there we build a practical roadmap. No 40-page slide deck.</p>
          <ul>
            <li><strong>Google Business Profile:</strong> Categories, services, photos, posts, and Q&amp;A tuned for your city and surrounding searches.</li>
            <li><strong>Service and location pages:</strong> Clear pages for each offering and each city you serve.</li>
            <li><strong>On-page SEO:</strong> Titles, headings, and internal links that reinforce local relevance without keyword stuffing.</li>
            <li><strong>Reviews and reputation:</strong> A simple system to earn consistent Google reviews from happy customers.</li>
            <li><strong>Reporting you can use:</strong> Calls, forms, and map visibility explained in language that ties back to revenue.</li>
          </ul>
          <p>When your site is the bottleneck, we pair SEO with <a href="/services/web-design">web design</a> and <a href="/conversion-optimization">conversion optimization</a> so traffic actually books.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>How long local SEO takes in Texas markets</h2>
${paras([
    "Honest answer: it depends on your city, your category, and how much cleanup your listing and site need. A broken Google profile fixed the right way can produce more calls within weeks. Competing for crowded terms in a major metro often takes several months of steady work.",
    "We set expectations up front. Before you commit, we tell you who ranks today, what they did to get there, and what we would tackle first. You should never pay for SEO without a clear picture of the path ahead.",
    "Texas is big, but local SEO still works town by town. A plumber in Lubbock and a dentist in Plano face different competition. We build plans around your actual service area, not a generic national checklist.",
  ])}
        </div>
      </section>

${finalCta("Ready for local SEO that shows up in the numbers?", [
    "Book a short strategy call or request a free visibility check. We will show you where you stand on Google today and what we would fix first for your Texas market. No pressure, no jargon.",
    "Serving small businesses across Texas from our home base in Melissa.",
  ])}

${texasLinksSection(
    "Local SEO in cities across Texas",
    "We help small businesses get found on Google statewide. Browse cities we serve or read plain-English guides on the blog."
  )}`;
}

function webDesignMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Texas web design for small business</span>
          <h1>Web Design That Turns Visitors Into Calls</h1>
          <p class="lead">We build fast, mobile-first websites for owner-led businesses across Texas. Based in Melissa, we serve Dallas, Houston, Austin, San Antonio, and cities statewide. Clear service pages, local structure, and calls to action that support <a href="/services/local-seo">local SEO</a> and real lead flow.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What matters</span>
          <h2>A conversion focused website does three things</h2>
          <p class="section-intro">It loads fast, it makes the next step obvious, and it is built in a way that helps rankings.</p>
          <ul>
            <li><strong>Speed:</strong> Fast load times, especially on phones.</li>
            <li><strong>Clarity:</strong> Clear services, clear service area, clear calls to action.</li>
            <li><strong>Structure:</strong> SEO friendly pages and a simple layout that helps Google and visitors.</li>
          </ul>
          <p>Want more leads long term? Pair web design with <a href="/services/local-seo">Local SEO</a> and <a href="/conversion-optimization">Conversion Optimization</a> so when someone in your city searches for what you do, your site shows up and makes it easy to choose you.</p>
          <p class="section-cta">
            <a href="/pricing" class="btn btn-primary">See pricing</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">How we build</span>
          <h2>Web design built for Texas small businesses</h2>
${paras([
    "Your website is often the first real impression a customer gets after finding you on Google. If the site is slow, confusing, or hard to use on a phone, you lose the call. We design sites that load quickly, explain what you do in plain language, and make calling or requesting a quote the obvious next step.",
    "We do not sell fancy templates that look good in a portfolio but fail in the field. Every page has a job: answer a question, build trust, or push someone to contact you. Service pages spell out what you offer. Location pages show where you work. Contact paths stay visible on every screen size.",
    "Structure matters for SEO too. Clean headings, logical URLs, and internal links help Google understand your business. When we rebuild a site, we plan page hierarchy around the searches your customers actually type, not around what a designer thought looked cool.",
  ])}
          <ol class="process-list">
            <li><strong>Discovery:</strong> We learn your services, service area, and what a good lead looks like.</li>
            <li><strong>Wireframe and copy:</strong> Simple layouts and plain words before any polish.</li>
            <li><strong>Build and launch:</strong> Fast hosting, mobile testing, forms and tracking wired up.</li>
            <li><strong>Improve:</strong> We watch calls and form fills, then tighten pages that underperform.</li>
          </ol>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>Web design is a fit when your site holds you back</h2>
          <p>Maybe you rank on Google but visitors bounce. Maybe your site looks fine on a laptop but breaks on phones. Maybe you have one long page instead of clear service pages for each job type. These problems show up for HVAC companies in Houston, law firms in Dallas, and home service crews in Central Texas alike.</p>
          <p>A new site is not always the answer. Sometimes we fix what you have: faster images, clearer buttons, better forms. We will tell you honestly which path saves you money and gets you more leads.</p>
          <p>See how we measure results on <a href="/results">Results</a> and how we work on <a href="/how-it-works">How it works</a>.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>What you get with our web design work</h2>
${paras([
    "Every project includes mobile-first layout, fast page speed, and clear calls to action. We set up contact forms, click-to-call buttons, and basic tracking so you know when the site produces a lead.",
    "We write in plain English at a reading level your customers actually use. No filler paragraphs. No buzzwords. Your visitor should know within seconds if you solve their problem and how to reach you.",
    "For businesses that serve multiple cities, we build location pages that support local SEO without duplicate fluff. Each page speaks to that market while staying true to your brand.",
    "After launch, we stay available for updates. Texas businesses change services, hours, and service areas. Your site should keep up without a fight every time.",
  ])}
          <ul>
            <li><strong>Custom design:</strong> Built for your brand, not a generic theme.</li>
            <li><strong>SEO-ready structure:</strong> Headings, meta tags, and internal links done right.</li>
            <li><strong>Forms and tracking:</strong> Know which pages drive calls and quote requests.</li>
            <li><strong>Ongoing support:</strong> Small updates without starting from scratch.</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Why Texas owners choose us over big agencies</h2>
${paras([
    "Big agencies spread your project across junior staff and account managers. You get pretty mockups and slow email threads. We are one operator based in Melissa with direct access and a small client roster so your site gets real attention.",
    "We understand Texas markets because we work in them every day. Suburban growth in DFW, seasonal demand on the Gulf Coast, and competitive trades in major metros all change what your site needs to say. We bake that context into structure and copy from day one.",
    "Most importantly, we tie design back to leads. A beautiful site that does not convert is a cost. A simple site that gets calls is an asset. That is the standard we build toward.",
  ])}
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>What to expect during a web design project</h2>
${paras([
    "Most builds take a few weeks from kickoff to launch, depending on how many pages you need and how fast you can approve copy. We keep the process simple: short check-ins, clear milestones, no surprise scope creep.",
    "You will review layouts on mobile first because that is how most Texas searchers browse. We test forms, phone links, and page speed before anything goes live.",
    "After launch we stick around for a tuning period. Real users behave differently than mockups predict. We watch early lead data and adjust headlines or buttons when something underperforms.",
  ])}
        </div>
      </section>

${finalCta("Ready for a website that earns its keep?", [
    "Book a short call. We will review your current site, show you what we would fix first, and give you an honest read on whether you need a rebuild or targeted improvements.",
    "Serving small businesses across Texas from Melissa.",
  ])}

${texasLinksSection(
    "Web design for Texas cities",
    "We build lead-ready sites for businesses across the state. See city pages and read practical guides on the blog."
  )}`;
}

function conversionOptimizationMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Conversion optimization</span>
          <h1>Traffic Is Worthless If It Does Not Convert</h1>
          <p class="lead">We optimize your website to turn more visitors into calls, form submissions, and customers. Based in Melissa, Texas, we help small businesses statewide fix the leaks between Google visits and booked jobs.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">What this is</span>
          <h2>Simple changes that improve lead flow</h2>
          <p class="section-intro">Many small business websites get visits but do not get enough calls. Conversion optimization is the work of removing friction and making the next step obvious for visitors coming from Google searches in your service area.</p>
          <ul>
            <li><strong>Calls to action:</strong> Clear buttons, clear phone placement, clear next step.</li>
            <li><strong>Forms:</strong> Fewer fields, better questions, better follow up.</li>
            <li><strong>Page layout:</strong> People should find what they need fast.</li>
            <li><strong>Tracking:</strong> Know what is producing leads, not just visits.</li>
          </ul>
          <p class="section-cta">
            <a href="/pricing" class="btn btn-primary">See pricing</a>
            <a href="/faq" class="service-panel-cta-link">Read the FAQ</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">What is included</span>
          <h2>Conversion work we do for Texas businesses</h2>
${paras([
    "We start with data when we can: which pages get traffic, where people leave, and how many calls or forms you get per week. If tracking is missing, we install it first. You cannot fix what you cannot see.",
    "Then we walk the site like a customer would. Is the phone number easy to tap on mobile? Does the main button stand out? Do service pages answer the question that brought someone there? Small fixes often produce big gains.",
    "We also look at speed and trust signals. Slow pages lose impatient searchers. Missing reviews, vague service lists, or hidden pricing create doubt. We address the practical blockers that stop a ready buyer from reaching out.",
  ])}
          <ul>
            <li><strong>CTA and layout audit:</strong> Find and fix confusing pages and weak buttons.</li>
            <li><strong>Form optimization:</strong> Shorter forms, better field labels, confirmation flows.</li>
            <li><strong>Mobile usability:</strong> Tap-to-call, sticky headers, readable text on phones.</li>
            <li><strong>Call tracking review:</strong> Make sure calls from Google get credit to the right source.</li>
            <li><strong>A/B style testing:</strong> Try headline and button changes, keep what wins.</li>
          </ul>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">Who it helps</span>
          <h2>Conversion optimization fits when traffic exists but leads lag</h2>
          <p>You might already rank for important searches in Dallas, Austin, or smaller markets across Texas. Analytics show sessions climbing, but your phone is not ringing more. That gap is a conversion problem, not an SEO problem.</p>
          <p>It also helps after a site launch or redesign when traffic holds steady but leads dip. New layouts sometimes hide the phone number or bury the quote form. We find those regressions quickly and restore lead flow.</p>
          <p>Pair this work with <a href="/services/local-seo">Local SEO</a> for more traffic and <a href="/services/web-design">Web Design</a> when the site structure itself is the bottleneck.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Common conversion problems we fix</h2>
${paras([
    "Hidden phone numbers are the most frequent issue. Visitors on phones want one tap to call. If they have to hunt through a menu, many leave. We put click-to-call where thumbs naturally land.",
    "Forms ask for too much too soon. Asking for address, budget, and timeline on a first touch scares off good leads. We trim fields to what you truly need to start a conversation.",
    "Service pages talk about the company instead of the customer's problem. We rewrite headings and intro copy so a visitor sees their issue reflected immediately.",
    "Pages load heavy images or scripts that slow mobile users. Speed fixes are conversion fixes. We compress assets and remove bloat that hurts both rankings and patience.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>How we measure success</h2>
${paras([
    "We care about calls, form fills, and booked jobs, not vanity metrics. After changes go live, we compare lead volume week over week and look at which pages improved.",
    "You get plain reports. No dashboard login required unless you want one. We explain what we changed, what moved, and what we would test next.",
    "Conversion work is iterative. Markets shift, seasons change, and competitors update their sites. We treat optimization as ongoing tuning, not a one-time project, especially for businesses growing across multiple Texas cities.",
  ])}
          <p>Learn more about our approach on <a href="/how-it-works">How it works</a> and see client metrics on <a href="/results">Results</a>.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Book a Strategy Call</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>When to choose conversion work over a full rebuild</h2>
${paras([
    "Not every lead problem needs a new website. If your brand looks fine, pages load acceptably, and structure is sound, targeted conversion fixes often cost less and pay back faster than starting over.",
    "We look for quick wins first: phone placement, form length, headline clarity, trust badges, and proof near the call to action. Those changes can ship in days, not months.",
    "When the foundation is weak, we say so. Thin content, broken mobile layout, or missing service pages are web design problems dressed up as conversion issues. We will point you to the right service instead of selling optimization you do not need.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>Conversion optimization for multi-city Texas businesses</h2>
${paras([
    "Many Texas service companies cover several counties or metros. Each landing page should speak to that area without cloning the same paragraph everywhere. We tune location pages so visitors feel you serve their town while keeping forms and phone paths consistent.",
    "Seasonal swings matter too. HVAC crews see different urgency in August than in March. We adjust messaging and offers on key pages when demand shifts, so your site matches what searchers need right now.",
  ])}
        </div>
      </section>

${finalCta("Getting traffic but not enough leads?", [
    "Request a conversion review. We will walk through your site, show you the biggest leaks, and outline fixes in plain language. No pressure to hire us for everything at once.",
    "Serving Texas small businesses from our base in Melissa.",
  ])}

${texasLinksSection(
    "Conversion help across Texas",
    "We improve lead flow for businesses in cities statewide. Browse locations or read tips on the blog."
  )}`;
}

function servicesOverviewMain() {
  return `      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Services for Texas small business</span>
          <h1>Three Things. Done Right.</h1>
          <p class="lead">Local SEO, web design, and conversion optimization for owner-led businesses across Texas. No bloated retainers. No services you do not need. Just the work that gets you found on Google, trusted online, and chosen when someone is ready to buy. Based in Melissa, serving the state.</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">How we help</span>
          <h2>One partner for search, site, and conversion</h2>
${paras([
    "Most small businesses do not need a dozen marketing services. They need to show up when locals search, look credible online, and convert visits into calls. We focus on those three jobs and do them well.",
    "We work with trades, professional services, healthcare practices, and other local businesses from Dallas to El Paso and points in between. You get one operator, direct access, and reporting tied to leads instead of jargon.",
  ])}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <span class="eyebrow">01</span>
          <h2>Local SEO</h2>
${paras([
    "Local SEO gets your business in front of people searching on Google and Google Maps. We tune your Google Business Profile, build service and location pages, earn reviews, and fix the on-site signals that help you rank in your service area.",
    "This is long-term lead generation. Rankings take time, but the payoff compounds. When you own the map pack for high-intent searches in your city, you stop renting every click from ads.",
    "Learn more on our <a href=\"/services/local-seo\">Local SEO page</a>, browse <a href=\"/locations\">Texas city pages</a>, or read guides on the <a href=\"/blog\">blog</a>.",
  ])}
          <p class="section-cta">
            <a href="/services/local-seo" class="btn btn-primary">Local SEO details</a>
          </p>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <span class="eyebrow">02</span>
          <h2>Web Design</h2>
${paras([
    "Your website should load fast on phones, explain what you do clearly, and make calling or requesting a quote easy. We build and refresh sites with that job in mind, not for design awards.",
    "Structure supports SEO. Speed supports conversion. Copy supports trust. We handle all three so your site works as a sales tool, not a digital brochure that sits idle.",
    "See the full breakdown on <a href=\"/services/web-design\">Web Design</a> and compare packages on <a href=\"/pricing\">Pricing</a>.",
  ])}
          <p class="section-cta">
            <a href="/services/web-design" class="btn btn-primary">Web Design details</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <span class="eyebrow">03</span>
          <h2>Conversion Optimization</h2>
${paras([
    "If traffic is coming in but leads are flat, something on the site is broken. We find friction, weak calls to action, slow pages, and confusing forms, then fix them so more visitors become customers.",
    "This service pairs well with SEO when rankings are solid but revenue is not keeping pace. It also helps after redesigns when a pretty site accidentally hides the phone number.",
    "Read more on <a href=\"/conversion-optimization\">Conversion Optimization</a> and see what we track on <a href=\"/results\">Results</a>.",
  ])}
          <p class="section-cta">
            <a href="/conversion-optimization" class="btn btn-primary">Conversion details</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>How the three services work together</h2>
${paras([
    "SEO brings qualified visitors from Google. Web design gives them a credible, fast place to land. Conversion optimization closes the gap between visits and booked jobs. Most clients need some mix of all three over time, but not always all at once.",
    "We start with an honest audit. Sometimes a broken Google profile and two new service pages beat a full rebuild. Sometimes the site is the blocker and SEO can wait until structure is fixed. We recommend the sequence that gets you leads fastest for your budget.",
    "You will never get a pitch for services you do not need. We cap clients at five at a time so each business gets real attention. That limit is intentional. Growth for you matters more than growth for us.",
    "We are based in Melissa, Texas, and serve businesses across the state remotely. Local SEO is about your service area, not our zip code. What matters is that Google and your customers understand where you work and why they should trust you.",
  ])}
          <p>Questions? Visit the <a href="/faq">FAQ</a> or read <a href="/how-it-works">How it works</a>.</p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>Who we work with</h2>
${paras([
    "We specialize in owner-led local businesses: home services, medical and dental practices, legal and financial offices, and other firms where a phone call or booked appointment is the goal. If your customers search on Google before they buy, we can usually help.",
    "We are not the right fit for national e-commerce brands, venture-backed startups chasing app downloads, or companies that want a 20-person agency roster. We keep the roster small so each client gets senior-level attention.",
    "Geography is flexible. A roofer in Midland and a med spa in San Antonio both need the same core ingredients: visibility, trust, and a site that converts. We adapt tactics to your market while keeping the process straightforward.",
  ])}
        </div>
      </section>

      <section class="section section-dark">
        <div class="container">
          <h2>What working together looks like</h2>
${paras([
    "You apply through our contact page. We review your site, listing, and goals, then schedule a short call if it looks like a fit. No high-pressure sales deck. Just a direct conversation about where you are and what would move the needle.",
    "If we work together, you get one point of contact, plain-English updates, and metrics tied to leads. We handle the technical work. You stay focused on running your business and closing the jobs we help you win.",
    "Most engagements combine ongoing SEO with periodic site and conversion improvements. We quote clearly up front and adjust scope when your needs change. Texas businesses grow; your marketing should grow with you.",
    "Every plan starts with your goals, not a pre-packaged bundle. You might need SEO first, a site rebuild first, or conversion fixes on a site that already ranks. We meet you where you are.",
  ])}
        </div>
      </section>

${finalCta("Not sure what you need?", [
    "Apply for a free strategy call. We will figure out the right mix of SEO, web design, and conversion work for your Texas business.",
    "Limited spots available. Direct access, plain language, real results.",
  ])}

${texasLinksSection(
    "Serving businesses across Texas",
    "Explore city pages for local SEO and read practical marketing guides on the blog."
  )}`;
}

const PAGES = [
  {
    file: path.join(ROOT, "services", "local-seo.html"),
    title: "Local SEO Texas | Google Maps & Search for Small Business | Bluebonnet Growth",
    description:
      "Texas local SEO for small businesses. Rank on Google Maps and search in Dallas, Houston, Austin, San Antonio, and cities statewide. Based in Melissa, TX.",
    canonical: "/services/local-seo",
    ogTitle: "Local SEO for Texas Small Businesses | Bluebonnet Growth",
    ogDescription:
      "Operator-led local SEO for Texas businesses. Map Pack visibility, GBP cleanup, and pages that earn calls.",
    main: localSeoMain(),
  },
  {
    file: path.join(ROOT, "services", "web-design.html"),
    title: "Web Design Texas | Lead-Ready Sites for Small Business | Bluebonnet",
    description:
      "Web design for Texas small businesses: fast, mobile-first sites built to rank locally and turn visitors into calls. Based in Melissa, serving statewide.",
    canonical: "/services/web-design",
    ogTitle: "Web Design for Texas Small Businesses | Bluebonnet Growth",
    ogDescription:
      "Conversion-focused web design for Texas small businesses. Speed, clarity, and local SEO structure built in.",
    main: webDesignMain(),
  },
  {
    file: path.join(ROOT, "conversion-optimization.html"),
    title: "Conversion Optimization Texas | Turn Traffic Into Leads | Bluebonnet Growth",
    description:
      "Conversion optimization for Texas small businesses. Turn more website visitors into calls, form submissions, and customers with clear, tested improvements.",
    canonical: "/conversion-optimization",
    ogTitle: "Conversion Optimization for Texas Small Businesses | Bluebonnet Growth",
    ogDescription:
      "Fix the leaks between Google visits and booked jobs. CTA, form, and page layout improvements that increase leads.",
    main: conversionOptimizationMain(),
  },
  {
    file: path.join(ROOT, "services.html"),
    title: "Services | Local SEO, Web Design & Conversion | Bluebonnet Growth",
    description:
      "Local SEO, web design, and conversion optimization for Texas small businesses. Three focused services from a Melissa-based operator serving statewide.",
    canonical: "/services",
    ogTitle: "Services for Texas Small Businesses | Bluebonnet Growth",
    ogDescription:
      "Local SEO, web design, and conversion optimization done right for owner-led Texas businesses.",
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
