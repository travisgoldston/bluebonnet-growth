const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const FOOTER_SOCIAL = `        <div class="footer-social" aria-label="Social media">
          <a href="https://facebook.com/bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://x.com/bluebonnetgr" target="_blank" rel="noopener noreferrer" aria-label="X" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/bluebonnetgrowth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="https://youtube.com/@bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>`;

function shell({ slug, title, description, eyebrow, lead, sections }) {
  const body = sections.join("\n\n");
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

${body}
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Ranking North Texas local businesses on Google. One operator. Direct access. Real results.</div>
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

const posts = [
  {
    slug: "how-to-get-more-google-reviews",
    title: "How to Ask for Google Reviews (Without Feeling Awkward)",
    description:
      "A simple, honest way for North Texas small businesses to get more Google reviews. Scripts, timing, and what to do when someone says no.",
    eyebrow: "Reviews that help you rank",
    lead:
      "You know reviews matter. You just do not want to sound pushy or desperate. Here is a calm, repeatable way to ask happy customers for a Google review that actually works.",
    sections: [
      `      <section class="section section-light">
        <div class="container">
          <h2>Why reviews matter more than you think</h2>
          <p>When someone in Frisco or Melissa searches for what you do, Google shows them a short list of businesses. Reviews are one of the main ways Google decides who looks trustworthy enough to put on that list.</p>
          <p>Reviews also help real people. A stranger scanning three plumbers will often pick the one with clear, recent reviews that mention the kind of job they need.</p>
          <p>You do not need hundreds. You need a steady flow of real reviews from real customers. That is it.</p>
          <blockquote class="blog-pullquote">
            <p>You do not need hundreds of reviews. You need a steady flow of real reviews from real customers.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>The best time to ask</h2>
          <p>Timing matters. The best moment is right after you have done good work and the customer is relieved or happy.</p>
          <p>Good times to ask:</p>
          <ul>
            <li>Right after you finish a job and they thank you.</li>
            <li>When they email or text you something nice.</li>
            <li>At checkout, if you have a front desk and they are smiling.</li>
          </ul>
          <p>Bad times to ask:</p>
          <ul>
            <li>Before the work is done.</li>
            <li>When something went wrong and you are still fixing it.</li>
            <li>Months later when they barely remember your name.</li>
          </ul>
          <p>Think of it like this: you are not begging for a favor. You are giving them a chance to help the next person who is scared and searching at 9 p.m.</p>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>What to say (word for word if you want)</h2>
          <p>Keep it short. Keep it human. Here are three versions you can use as-is or tweak.</p>
          <p><strong>In person, after a job:</strong> "If this helped you out, would you mind leaving us a quick Google review? It really helps other folks in the area find us. I can text you the link right now if that is easier."</p>
          <p><strong>By text or email:</strong> "Hi [Name], glad we could help with [job]. If you have a minute, a Google review would mean a lot to our small business. Here is the direct link: [link]. Thank you either way."</p>
          <p><strong>At the front desk:</strong> "We are a small local business and reviews help a ton. If you had a good experience today, would you consider leaving one on Google? We can email you the link."</p>
          <blockquote class="blog-pullquote">
            <p>You are not begging for a favor. You are giving them a chance to help the next person who is scared and searching at 9 p.m.</p>
          </blockquote>
          <p>Notice what is not in those scripts: guilt, pressure, or a lecture about algorithms. Just a simple ask after good work.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Make it easy: the direct review link</h2>
          <p>Do not tell people to "find us on Google." That adds friction. Send them a direct link that opens the review box.</p>
          <p>To get your link:</p>
          <ol>
            <li>Open your Google Business Profile.</li>
            <li>Click "Get more reviews" or find your review link in the profile tools.</li>
            <li>Copy that link and save it in your phone notes.</li>
          </ol>
          <p>Use the same link every time. Text it. Email it. Put a QR code on a small card at your front desk if you want.</p>
          <p>Our <a href="/blog/google-business-profile-checklist">Google Business Profile Checklist</a> walks through profile setup step by step, including reviews.</p>
          <div class="blog-cta-box">
            <h3>Want help setting up your review system?</h3>
            <p>We will look at your profile, your current reviews, and how you compare to nearby competitors in cities like McKinney and Allen.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>What to do when someone says no</h2>
          <p>Some people will say no. That is fine. Smile, thank them, and move on.</p>
          <p>Never argue. Never follow up three times. One polite ask is enough.</p>
          <p>If you are worried about a bad review, focus on doing good work and responding calmly to the rare unhappy customer. Most business owners overthink this. A handful of bad reviews among many good ones is normal.</p>
          <p>Reply to every review when you can. A simple "Thank you, [Name]" on a good review and a calm, helpful reply on a bad one both show you care.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Build a simple habit</h2>
          <p>You do not need a fancy system. You need a habit.</p>
          <ul>
            <li>Ask at the end of every job that went well.</li>
            <li>Send the link the same day if you can.</li>
            <li>Check your profile once a week to reply to new reviews.</li>
          </ul>
          <p>Over a few months, this alone can put you ahead of competitors who never ask. Reviews feed into <a href="/blog/what-is-local-seo">local SEO</a> and into whether you show on <a href="/blog/google-maps-not-showing-up">Google Maps</a> at all.</p>
          <p>If you want the ongoing work handled for you, see our <a href="/services/local-seo">local SEO service</a> or <a href="/contact">apply now</a> for a free visibility check.</p>
        </div>
      </section>`,
    ],
  },
  {
    slug: "why-competitor-ranks-higher",
    title: "Why a Competitor Ranks Higher Than You on Google (And What You Can Do)",
    description:
      "Your competitor shows up above you on Google and you are not sure why. Here are the most common reasons, explained in plain English, plus what to fix first.",
    eyebrow: "Honest competitor check",
    lead:
      "You search for what you do in your city. Your competitor is there. You are not, or you are buried on page two. That stings. Here is what is usually going on, without the jargon.",
    sections: [
      `      <section class="section section-light">
        <div class="container">
          <h2>Start with what you can see</h2>
          <p>Before you panic, look at what Google actually shows. Search on your phone like a customer would. Use the city name. Try a few phrases people really use, like "AC repair McKinney" or "family dentist near Allen."</p>
          <p>Write down:</p>
          <ul>
            <li>Who is in the map pack (the three businesses under the map).</li>
            <li>Who shows up in the regular results below.</li>
            <li>Whether your business appears at all.</li>
          </ul>
          <p>That snapshot tells you where you are starting from. Everything else is about closing the gap.</p>
          <blockquote class="blog-pullquote">
            <p>Search like a customer would. That snapshot tells you where you are starting from.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Reason 1: Their Google Business Profile is more complete</h2>
          <p>Google trusts businesses that look real and active. If your competitor has filled out every section of their profile and you have a bare bones listing, they get an edge.</p>
          <p>Check their profile against yours:</p>
          <ul>
            <li>Do they have more photos that show real work?</li>
            <li>Is their primary category a closer match to the search?</li>
            <li>Do they post updates or answer questions?</li>
            <li>Are their hours and phone number correct and current?</li>
          </ul>
          <p>Run through our <a href="/blog/google-business-profile-checklist">Google Business Profile Checklist</a> and close the obvious gaps first. This is often the fastest win.</p>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>Reason 2: They have more and better reviews</h2>
          <p>Reviews are not just for customers. Google uses them as a trust signal. A business with 120 recent reviews will usually beat one with 8 reviews from four years ago, even if your work is better.</p>
          <p>Look at:</p>
          <ul>
            <li>Total review count.</li>
            <li>How recent the newest reviews are.</li>
            <li>Whether reviews mention specific services and cities.</li>
          </ul>
          <p>You cannot fix this overnight, but you can start today. Our guide on <a href="/blog/how-to-get-more-google-reviews">how to ask for Google reviews</a> shows a simple way to build a steady flow without feeling salesy.</p>
          <blockquote class="blog-pullquote">
            <p>You cannot fix reviews overnight, but you can start today with one honest ask after every good job.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Reason 3: Their website matches what people search</h2>
          <p>Google cross-checks your website with your profile. If your competitor has clear pages for their services and the cities they serve, Google has an easier time ranking them for "plumber in Prosper" or "roofer near Celina."</p>
          <p>Click through to their site. Notice if they have:</p>
          <ul>
            <li>A homepage that says what they do in plain language.</li>
            <li>Service pages or location pages you do not have.</li>
            <li>A phone number and address that match their Google listing.</li>
          </ul>
          <p>If your site is thin or confusing, read <a href="/blog/website-traffic-no-calls">5 Reasons Your Website Gets Traffic But No Calls</a>. Sometimes the problem is not ranking at all. It is what happens after someone clicks.</p>
          <div class="blog-cta-box">
            <h3>Want to know exactly where you stand?</h3>
            <p>We will compare your Google presence to your top competitors and tell you what to fix first. No fluff report. Just a clear plan.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>Reason 4: They have been at this longer</h2>
          <p>This one is hard to hear, but it is true. If a competitor has been consistently showing up on Google for three years, they have history on their side.</p>
          <p>That does not mean you cannot catch up. It means you should expect progress over months, not days. <a href="/blog/how-long-does-local-seo-take">How long local SEO takes</a> depends on your market, but most owners see real movement in 60 to 90 days when the basics are handled.</p>
          <p>Stay focused on the levers you control: profile, reviews, website clarity, and consistent information everywhere your name appears online.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>What to do this week</h2>
          <ol>
            <li>Search your main keywords on your phone and write down who ranks.</li>
            <li>Complete or fix your Google Business Profile.</li>
            <li>Ask three happy customers for a review with a direct link.</li>
            <li>Make sure your website says what you do and where you work.</li>
          </ol>
          <p>If you are already paying someone for SEO and still losing ground, read <a href="/blog/is-your-seo-company-working">how to tell if your SEO company is actually doing anything</a>.</p>
          <p>We help North Texas businesses in places like <a href="/frisco">Frisco</a>, <a href="/plano">Plano</a>, and <a href="/melissa">Melissa</a> close these gaps. See <a href="/how-it-works">how it works</a> or <a href="/contact">apply now</a> if you want direct help.</p>
        </div>
      </section>`,
    ],
  },
  {
    slug: "how-long-does-local-seo-take",
    title: "How Long Does Local SEO Take to Work?",
    description:
      "Honest timelines for local SEO results in North Texas. What to expect in the first 30, 60, and 90 days, and what slows progress down.",
    eyebrow: "Realistic timelines",
    lead:
      "If someone promises you page one in a week, be careful. Local SEO is not instant, but it is predictable if you know what actually moves the needle. Here is what we tell every owner who asks.",
    sections: [
      `      <section class="section section-light">
        <div class="container">
          <h2>The honest short answer</h2>
          <p>Most small businesses in North Texas start seeing real movement in 60 to 90 days when the basics are done right. Some see signs sooner. Some competitive markets take longer.</p>
          <p>Local SEO is more like tending a garden than flipping a switch. You plant, you water, you wait, and then growth shows up in ways you can measure: more calls, more "I found you on Google" comments, more form fills.</p>
          <blockquote class="blog-pullquote">
            <p>Local SEO is more like tending a garden than flipping a switch.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>What happens in the first 30 days</h2>
          <p>The first month is mostly foundation work. If you skip this and chase tricks, you usually pay for it later.</p>
          <p>Typical first-month work:</p>
          <ul>
            <li>Claiming or fixing your Google Business Profile.</li>
            <li>Making sure your name, address, and phone match everywhere.</li>
            <li>Fixing wrong categories, hours, or old photos.</li>
            <li>Auditing your website for clarity on services and service area.</li>
            <li>Setting up a simple way to ask for reviews.</li>
          </ul>
          <p>You might not see a big jump in calls yet. That is normal. You are building the base.</p>
          <p>New to this? Start with <a href="/blog/what-is-local-seo">what local SEO actually means</a> so the pieces make sense.</p>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>What happens around days 30 to 60</h2>
          <p>This is when many owners start noticing small wins. You might rank for a few more searches. You might show up in the map pack for a less competitive phrase. Your profile might get more views.</p>
          <p>Work in this phase often includes:</p>
          <ul>
            <li>Building or improving service and location pages.</li>
            <li>Earning a steady trickle of new reviews.</li>
            <li>Fixing technical issues that slow your site down on mobile.</li>
            <li>Cleaning up duplicate or wrong listings on other sites.</li>
          </ul>
          <blockquote class="blog-pullquote">
            <p>Small wins in month two mean the foundation is working. Do not quit because the phone is not ringing every hour yet.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>What happens around days 60 to 90</h2>
          <p>This is the window we talk about on our <a href="/">homepage</a>: triple your inbound calls in 90 days, or walk away. Not every business hits that exact number, but this is when results should be visible enough to judge.</p>
          <p>By now you should see clearer signs:</p>
          <ul>
            <li>More calls or leads from Google.</li>
            <li>Better map visibility for your main services.</li>
            <li>A profile that looks active and trustworthy compared to competitors.</li>
          </ul>
          <p>If nothing has changed by day 90, something is wrong: wrong strategy, wrong market focus, or a provider who is not doing the work. Our article on <a href="/blog/is-your-seo-company-working">whether your SEO company is working</a> can help you figure out which.</p>
          <div class="blog-cta-box">
            <h3>Want a realistic plan for your business?</h3>
            <p>We will look at your market, your competitors, and your starting point, then tell you what timeline to expect. No false promises.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>What makes local SEO take longer</h2>
          <p>Some situations add time. That does not mean it will not work. It means you should plan accordingly.</p>
          <ul>
            <li><strong>Very competitive searches:</strong> "Dentist in Plano" is harder than "dentist in Howe."</li>
            <li><strong>A brand new business:</strong> Google needs time to trust a new listing.</li>
            <li><strong>Wrong or messy info online:</strong> Mixed addresses and phone numbers slow everything down.</li>
            <li><strong>No website or a broken one:</strong> See <a href="/blog/do-you-need-a-website-for-local-seo">do you need a website for local SEO</a> for when a site matters most.</li>
            <li><strong>Zero reviews:</strong> You can rank with few reviews, but it is harder in crowded markets.</li>
          </ul>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>How to know if it is working</h2>
          <p>Do not obsess over one keyword ranking. Track real life signs:</p>
          <ul>
            <li>Call volume from new customers.</li>
            <li>How often people say they found you on Google.</li>
            <li>Leads from your contact form or booking link.</li>
            <li>Google Business Profile views and actions (calls, direction requests).</li>
          </ul>
          <p>We walk through this on <a href="/results">our results page</a> and in <a href="/how-it-works">how it works</a>. The goal is not a trophy ranking. The goal is a fuller calendar.</p>
          <p>Ready to get started? <a href="/services/local-seo">See our local SEO service</a> or <a href="/contact">apply now</a>.</p>
        </div>
      </section>`,
    ],
  },
  {
    slug: "do-you-need-a-website-for-local-seo",
    title: "Do You Really Need a Website for Local SEO?",
    description:
      "Can you rank on Google without a website? Sometimes yes, sometimes no. Here is when a website matters for local SEO and what to put on it if you have one.",
    eyebrow: "Website basics",
    lead:
      "You have heard you need a website. You have also seen businesses rank with just a Google profile. So what is true? Here is a straight answer for small business owners in North Texas.",
    sections: [
      `      <section class="section section-light">
        <div class="container">
          <h2>The short answer</h2>
          <p>For most businesses, yes, you need a website if you want local SEO to work well long term. Your Google Business Profile is critical, but Google still looks at your website to confirm who you are and what you do.</p>
          <p>A few businesses get by with only a profile for a while, usually in very small towns or low competition niches. But as soon as competitors invest in simple, clear sites, the profile-only approach stops being enough.</p>
          <blockquote class="blog-pullquote">
            <p>Your Google profile gets attention. Your website earns trust. You usually need both.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>What Google uses your website for</h2>
          <p>Think of your website as proof. Google wants to send searchers to businesses that will not waste their time.</p>
          <p>Your site helps Google verify:</p>
          <ul>
            <li>Your business name, address, and phone (they should match your profile exactly).</li>
            <li>What services you actually offer.</li>
            <li>Which cities and neighborhoods you serve.</li>
            <li>That you are a real, active business.</li>
          </ul>
          <p>If that information is missing or different from your profile, Google gets nervous and may show someone else instead.</p>
          <p>This ties directly into <a href="/blog/what-is-local-seo">local SEO basics</a> and whether you show on <a href="/blog/google-maps-not-showing-up">Google Maps</a> at all.</p>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>When a profile alone might be enough (for now)</h2>
          <p>There are a few cases where owners limp along without a site:</p>
          <ul>
            <li>You are the only option for miles in a rural area.</li>
            <li>You rely almost entirely on word of mouth and your calendar is already full.</li>
            <li>Your category has almost no competition online yet.</li>
          </ul>
          <p>Even then, a simple one-page site is cheap insurance. Markets change fast in North Texas. A new competitor with a decent site can pass you in a few months.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>What your website needs (it is less than you think)</h2>
          <p>You do not need a huge site. You need a clear one. At minimum:</p>
          <ul>
            <li><strong>Homepage:</strong> What you do, who you help, and where you work.</li>
            <li><strong>Contact page:</strong> Phone, email, address, and a simple form or clear call button.</li>
            <li><strong>Service clarity:</strong> Either one strong homepage or separate pages for your main services.</li>
            <li><strong>Mobile friendly:</strong> Most searches happen on phones. If your site is hard to use on a phone, you lose calls.</li>
          </ul>
          <p>That is enough to support local SEO in many cases. You can add blog posts, city pages, and photos over time.</p>
          <blockquote class="blog-pullquote">
            <p>You do not need a huge site. You need a clear one that works on a phone.</p>
          </blockquote>
          <div class="blog-cta-box">
            <h3>Not sure if your site is helping or hurting?</h3>
            <p>We will review your website and Google profile together and tell you what is missing. Plain English, no pressure.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>When traffic comes but the phone stays quiet</h2>
          <p>Sometimes you have a website and it still does not work. People visit but do not call. That is a different problem, usually about trust, speed, or a confusing layout.</p>
          <p>Read <a href="/blog/website-traffic-no-calls">5 Reasons Your Website Gets Traffic But No Calls</a> if that sounds familiar.</p>
          <p>If you need a new site or a cleanup, see our <a href="/services/web-design">web design service</a>. We keep sites simple on purpose. You are not trying to win a design award. You are trying to get calls.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Practical next step</h2>
          <p>If you have no site, get a simple one up that says what you do and how to reach you. Match every detail to your Google Business Profile.</p>
          <p>If you have a site, read it on your phone like a stranger would. Can you tell what you do in five seconds? Can you tap to call? If not, fix that before you worry about blog posts or fancy features.</p>
          <p>We help businesses across <a href="/locations">North Texas</a> tie their website and Google presence together. <a href="/contact">Apply now</a> or explore <a href="/services">our services</a>.</p>
        </div>
      </section>`,
    ],
  },
  {
    slug: "what-to-do-when-phone-stops-ringing",
    title: "What to Do When Your Phone Stops Ringing (A Simple Plan)",
    description:
      "When leads dry up, it is easy to panic or throw money at random ads. Here is a calm, step-by-step plan for North Texas small business owners.",
    eyebrow: "When leads slow down",
    lead:
      "Last month the phone was steady. This month it is quiet. You are not sure if it is seasonality, the economy, or something broken online. Take a breath. Here is a plan you can follow this week.",
    sections: [
      `      <section class="section section-light">
        <div class="container">
          <h2>First: do not panic-spend</h2>
          <p>When revenue dips, the first instinct is to throw money at the problem. A boosted Facebook post. A new billboard. A contract with whoever calls you next.</p>
          <p>Slow down. A quiet week does not always mean your marketing is broken. Sometimes it is weather, holidays, or a normal slow season for your trade.</p>
          <p>Give yourself two days to look at facts before you spend big. You will make better choices.</p>
          <blockquote class="blog-pullquote">
            <p>A quiet week does not always mean your marketing is broken. Look at facts before you spend big.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Step 1: Check the basics (30 minutes)</h2>
          <p>Before you assume Google hates you, check things that break all the time:</p>
          <ul>
            <li>Is your phone forwarding working?</li>
            <li>Is your website up and loading on your phone?</li>
            <li>Is your Google Business Profile showing the right hours and phone number?</li>
            <li>Did your main contact form stop sending emails?</li>
          </ul>
          <p>You would be surprised how often a quiet week traces back to a full voicemail box or a form that broke after a small website change.</p>
          <p>Use our <a href="/blog/google-business-profile-checklist">Google Business Profile Checklist</a> to verify the listing side.</p>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>Step 2: Search like a customer (15 minutes)</h2>
          <p>Open your phone in private mode or ask a friend in another part of town to search. Try the phrases real customers use.</p>
          <p>Write down:</p>
          <ul>
            <li>Do you still show on the map?</li>
            <li>Did a new competitor show up above you?</li>
            <li>Are your reviews older than everyone else's?</li>
          </ul>
          <p>If you dropped or a competitor passed you, read <a href="/blog/why-competitor-ranks-higher">why a competitor ranks higher</a> and <a href="/blog/google-maps-not-showing-up">why businesses disappear from Google Maps</a>.</p>
          <blockquote class="blog-pullquote">
            <p>Search like a customer before you blame the economy or Google.</p>
          </blockquote>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>Step 3: Work your existing pipeline</h2>
          <p>While you fix visibility, do not ignore people who already know you.</p>
          <ul>
            <li>Email or text past customers you have not heard from in a year.</li>
            <li>Ask happy clients for referrals and reviews.</li>
            <li>Post one useful tip on your Google profile (a seasonal reminder, a short how-to).</li>
            <li>Follow up on old quotes you never closed.</li>
          </ul>
          <p>This is not glamorous, but it works. Our guide on <a href="/blog/how-to-get-more-google-reviews">asking for Google reviews</a> fits right here.</p>
          <div class="blog-cta-box">
            <h3>Want a second set of eyes?</h3>
            <p>We will check your Google presence, your site, and your top competitors, then tell you what we would fix first if we were in your shoes.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>`,
      `      <section class="section section-light">
        <div class="container">
          <h2>Step 4: Pick one growth lever for the next 90 days</h2>
          <p>You cannot fix everything at once. Pick one main focus:</p>
          <ul>
            <li><strong>Visibility:</strong> Local SEO to rank for searches in your service area. See <a href="/services/local-seo">local SEO</a> and <a href="/blog/how-long-does-local-seo-take">realistic timelines</a>.</li>
            <li><strong>Conversion:</strong> You get traffic but few calls. Fix the website. Start with <a href="/blog/website-traffic-no-calls">website traffic but no calls</a>.</li>
            <li><strong>Trust:</strong> You are visible but reviews are thin. Focus on reviews for 60 days.</li>
          </ul>
          <p>One clear focus beats five half-finished projects.</p>
        </div>
      </section>`,
      `      <section class="section">
        <div class="container">
          <h2>When to get help</h2>
          <p>If you have checked the basics, searched like a customer, and worked your pipeline, but the phone is still quiet after 30 to 60 days, it is time for outside help or a hard look at your offer and pricing.</p>
          <p>If you are paying for SEO already, use <a href="/blog/is-your-seo-company-working">our SEO company checklist</a> before you renew.</p>
          <p>We work with a small number of North Texas businesses at a time. See <a href="/about">about us</a>, <a href="/results">results</a>, and <a href="/contact">apply now</a> if you want a partner who will tell you the truth and pick up the phone when you call.</p>
        </div>
      </section>`,
    ],
  },
];

for (const post of posts) {
  const file = path.join(BLOG, `${post.slug}.html`);
  fs.writeFileSync(file, shell(post), "utf8");
  console.log("wrote:", path.relative(ROOT, file));
}

console.log(`Done. Wrote ${posts.length} posts.`);
