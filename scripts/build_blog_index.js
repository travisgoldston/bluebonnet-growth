const fs = require("fs");
const path = require("path");
const generalPosts = require("./data/general_blog_posts");
const industries = require("./data/industry_templates");
const guideCities = require("./data/industry_guide_cities");
const cities = require("./data/texas_cities");
const { tagLabel, categoryLabel, tagHref } = require("./lib/blog_meta");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");
const MANIFEST = path.join(ROOT, "scripts", "data", "blog_manifest.json");

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
}

function uniqueTags(posts, key) {
  const set = new Set();
  for (const p of posts) {
    if (key === "category") set.add(p.category);
    else for (const t of p.tags || []) set.add(t);
  }
  return [...set].sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)));
}

function cityTags() {
  return guideCities
    .map((c) => c.slug)
    .sort((a, b) => {
      const ca = cities.getBySlug(a)?.name || a;
      const cb = cities.getBySlug(b)?.name || b;
      return ca.localeCompare(cb);
    });
}

function industryTags() {
  return industries.map((i) => i.key);
}

function topicTags(posts) {
  const citySlugs = new Set(guideCities.map((c) => c.slug));
  const industryKeys = new Set(industries.map((i) => i.key));
  return uniqueTags(posts, "tags").filter((t) => !citySlugs.has(t) && !industryKeys.has(t));
}

function filterPill(group, value, label) {
  const active = value === "all" ? " is-active" : "";
  return `            <button type="button" class="blog-filter${active}" data-filter-${group}="${value}">${label}</button>`;
}

function blogCard(post) {
  const tagHtml = post.tags
    .map((t) => `<a href="${tagHref(t)}" class="blog-tag">${tagLabel(t)}</a>`)
    .join("\n              ");
  const catClass = post.category === "city-guide" ? "city-guide" : "general";
  return `            <article class="blog-card blog-card-index" data-category="${post.category}" data-tags="${post.tags.join(",")}">
              <a href="/blog?category=${post.category}" class="blog-card-category blog-card-category--${catClass}">${categoryLabel(post.category)}</a>
              <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
              <p>${post.excerpt}</p>
              <div class="blog-card-tags">${tagHtml}</div>
            </article>`;
}

function buildIndexSection(posts) {
  const cityTagList = cityTags();
  const industryTagList = industryTags();
  const topicTagList = topicTags(posts);

  const categoryPills = [
    filterPill("category", "all", "All"),
    filterPill("category", "city-guide", "City guides"),
    filterPill("category", "general", "General advice"),
  ].join("\n");

  const cityPills = [
    filterPill("city", "all", "All cities"),
    ...cityTagList.map((t) => filterPill("city", t, tagLabel(t))),
  ].join("\n");

  const industryPills = [
    filterPill("industry", "all", "All industries"),
    ...industryTagList.map((t) => filterPill("industry", t, tagLabel(t))),
  ].join("\n");

  const topicPills = [
    filterPill("topic", "all", "All topics"),
    ...topicTagList.map((t) => filterPill("topic", t, tagLabel(t))),
  ].join("\n");

  const sorted = [
    ...posts.filter((p) => p.category === "general"),
    ...posts
      .filter((p) => p.category === "city-guide")
      .sort((a, b) => a.cityName.localeCompare(b.cityName) || a.title.localeCompare(b.title)),
  ];

  const cards = sorted.map(blogCard).join("\n");

  return `      <section class="section section-light">
        <div class="container blog-index">
          <div class="blog-filters" data-blog-filters>
            <div class="blog-filter-group">
              <span class="blog-filter-label">Type</span>
              <div class="blog-filter-pills" role="group" aria-label="Filter by type">
${categoryPills}
              </div>
            </div>
            <div class="blog-filter-group">
              <span class="blog-filter-label">City</span>
              <div class="blog-filter-pills blog-filter-pills-wrap" role="group" aria-label="Filter by city">
${cityPills}
              </div>
            </div>
            <div class="blog-filter-group">
              <span class="blog-filter-label">Industry</span>
              <div class="blog-filter-pills blog-filter-pills-wrap" role="group" aria-label="Filter by industry">
${industryPills}
              </div>
            </div>
            <div class="blog-filter-group">
              <span class="blog-filter-label">Topic</span>
              <div class="blog-filter-pills blog-filter-pills-wrap" role="group" aria-label="Filter by topic">
${topicPills}
              </div>
            </div>
            <button type="button" class="blog-filter-clear" data-blog-clear hidden>Clear filters</button>
          </div>
          <p class="blog-results-count" data-blog-count>Showing ${posts.length} articles</p>
          <div class="blog-grid" data-blog-grid>
${cards}
          </div>
          <p class="blog-index-footer">Browse <a href="/locations">Texas cities</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>`;
}

function patchGeneralPostTags() {
  const { blogMetaHtml } = require("./lib/blog_meta");
  for (const post of generalPosts) {
    const file = path.join(BLOG, `${post.slug}.html`);
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    const meta = blogMetaHtml({ category: post.category, tags: post.tags });
    if (html.includes('class="blog-meta"')) {
      html = html.replace(/<div class="blog-meta">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/section>)/, meta.trim());
    } else if (html.includes('<p class="lead">')) {
      html = html.replace(
        /(<p class="lead">[\s\S]*?<\/p>)\s*/,
        `$1\n${meta}\n`
      );
    }
    fs.writeFileSync(file, html, "utf8");
  }
  console.log(`Patched tags on ${generalPosts.length} general blog posts`);
}

function buildBlogHtml() {
  const industryPosts = loadManifest();
  const general = generalPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    cityName: "",
  }));

  const allPosts = [...general, ...industryPosts];
  const blogPath = path.join(ROOT, "blog.html");
  let html = fs.readFileSync(blogPath, "utf8");

  const start = "<!-- BLOG-INDEX-START -->";
  const end = "<!-- BLOG-INDEX-END -->";
  const indexSection = buildIndexSection(allPosts);

  if (html.includes(start)) {
    html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${indexSection}\n      ${end}`);
  } else {
    const legacyStart = "<!-- INDUSTRY-GUIDES-START -->";
    const legacyEnd = "<!-- INDUSTRY-GUIDES-END -->";
    if (html.includes(legacyStart)) {
      html = html.replace(
        new RegExp(`${legacyStart}[\\s\\S]*?${legacyEnd}`),
        `${start}\n${indexSection}\n      ${end}`
      );
      html = html.replace(
        /<section class="section">\s*<div class="container">\s*<h2>Latest articles<\/h2>[\s\S]*?<\/section>\s*/,
        ""
      );
    }
  }

  html = html.replace(
    /<section class="section section-light">\s*<div class="container">\s*<h2>Local SEO in cities across Texas<\/h2>[\s\S]*?<\/section>\s*(?=<\/main>)/,
    ""
  );

  fs.writeFileSync(blogPath, html, "utf8");
  console.log(`Blog index: ${allPosts.length} articles (${general.length} general, ${industryPosts.length} city guides)`);
}

patchGeneralPostTags();
buildBlogHtml();
