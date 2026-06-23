/**
 * Extra body sections for city landing pages (900+ words total with base template).
 */
function nearbyList(city, getPath, getBySlug) {
  return (city.nearby || [])
    .slice(0, 4)
    .map((s) => getBySlug(s))
    .filter(Boolean)
    .map((c) => `<a href="${getPath(c)}">${c.name}</a>`)
    .join(", ");
}

function hasGuides(slug, guidesByCity) {
  return guidesByCity[slug] && guidesByCity[slug].length > 0;
}

function guideLink(slug, guidesByCity) {
  if (!hasGuides(slug, guidesByCity)) return "/blog?category=city-guide";
  return `/blog/${guidesByCity[slug][0].slug}`;
}

function extraSections(city, { getPath, getBySlug, guidesByCity = {} }) {
  const name = city.name;
  const nearby = nearbyList(city, getPath, getBySlug);
  const region = city.region;
  const blogLink = guideLink(city.slug, guidesByCity);
  const guidesNote = hasGuides(city.slug, guidesByCity)
    ? ` See our <a href="/blog?category=city-guide&city=${city.slug}">${name} industry guides</a> or start with the <a href="${blogLink}">${name} local SEO guide</a>.`
    : "";

  const beforeWhatIDo = `      <section class="section">
        <div class="container">
          <h2>How people in ${name} search on Google</h2>
          <p>Most ${name} customers start on their phone. They type what they need plus a city name, or they tap the map and call one of the first three businesses that look trustworthy. They are not comparing twenty options. They pick fast.</p>
          <p>That means your Google Business Profile and website need to answer three questions immediately: what you do, where you serve, and why someone should trust you. If any of those is missing or outdated, you lose the call to a competitor in ${name}${nearby ? ` or nearby cities like ${nearby}` : ""}.</p>
          <p>Local SEO is the work of fixing those basics and earning steady visibility for the searches that actually lead to jobs. It is not about ranking for every keyword on the internet. It is about winning the searches your neighbors type when they are ready to buy.</p>
          <p>Read <a href="/blog/what-is-local-seo">what local SEO means in plain English</a> or see <a href="/blog/google-maps-not-showing-up">why businesses disappear from Google Maps</a>.</p>
        </div>
      </section>
      <section class="section section-light">
        <div class="container">
          <h2>Common mistakes ${name} businesses make online</h2>
          <p>After auditing small business profiles across Texas, the same patterns show up in ${name} and every market I work in.</p>
          <ul>
            <li><strong>Wrong or missing categories</strong> on Google. Google uses your primary category to decide which searches you qualify for.</li>
            <li><strong>Thin service pages.</strong> One generic page for everything makes it hard to match specific searches in ${name}.</li>
            <li><strong>Old reviews.</strong> A burst from years ago does less than a steady trickle of recent ones.</li>
            <li><strong>Slow mobile site.</strong> Most ${name} searches happen on a phone. Hidden phone numbers cost you calls.</li>
            <li><strong>No clear service area.</strong> If you serve ${name} plus nearby towns, say so on your profile and website.</li>
          </ul>
          <p>Fixing even two or three of these can move the needle within weeks. See our <a href="/blog/google-business-profile-checklist">Google Business Profile checklist</a>.</p>
        </div>
      </section>`;

  const afterWhatIDo = `      <section class="section section-light">
        <div class="container">
          <h2>What I fix first for ${name} owners</h2>
          <p>Every engagement starts with a plain-English audit. I pull up how you show up today, who ranks above you in ${name}, and which searches matter most for your business.</p>
          <ol>
            <li><strong>Google Business Profile cleanup:</strong> Categories, hours, phone, photos, services list, and service area aligned with ${name}.</li>
            <li><strong>Review flow:</strong> A simple way to ask happy customers for Google reviews. See <a href="/blog/how-to-get-more-google-reviews">how to ask for reviews</a>.</li>
            <li><strong>Website clarity:</strong> Service pages, location language, and content that supports rankings. See <a href="/services/seo-content">SEO content</a> when needed.</li>
            <li><strong>Profile and review fixes:</strong> Google Business Profile cleanup and a simple review flow. See <a href="/services/google-business-profile">profile optimization</a>.</li>
            <li><strong>Ongoing tuning:</strong> Rankings, calls, and form fills tracked over time.</li>
          </ol>
          <p>I keep the scope focused. No bloated retainers, no jargon reports.${guidesNote}</p>
        </div>
      </section>`;

  const beforeFaq = `      <section class="section section-light">
        <div class="container">
          <h2>What to expect: timelines for ${name} local SEO</h2>
          <p>Honest timelines matter. Nobody can promise page one overnight in a competitive ${name} category. Here is what I typically see.</p>
          <ul>
            <li><strong>First 30 days:</strong> Profile fixes, quick technical wins, review asks, and clarity on which ${name} searches to prioritize.</li>
            <li><strong>60 to 90 days:</strong> Movement on map visibility and service-page rankings as Google re-crawls and trust signals build.</li>
            <li><strong>3 to 6 months:</strong> Steadier lead flow when competition is moderate and the basics stay maintained.</li>
          </ul>
          <p>Categories like dental, HVAC, plumbing, and legal tend to be competitive in ${name} and across ${region}. I will tell you upfront if your market will take longer. Read <a href="/blog/how-long-does-local-seo-take">how long local SEO takes</a>.</p>
          <p>Browse <a href="/locations">all Texas cities we serve</a> or explore <a href="/services/local-seo">local SEO services</a>.</p>
        </div>
      </section>`;

  return { beforeWhatIDo, afterWhatIDo, beforeFaq };
}

module.exports = { extraSections };
