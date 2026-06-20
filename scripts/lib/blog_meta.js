const generalPosts = require("../data/general_blog_posts");

const industries = require("../data/industry_templates");
const guideCities = require("../data/industry_guide_cities");
const cities = require("../data/texas_cities");

const TAG_LABELS = {
  ...generalPosts.TAG_LABELS,
  dentists: "Dentists",
  plumbers: "Plumbers",
  hvac: "HVAC",
  roofers: "Roofers",
  chiropractors: "Chiropractors",
  electricians: "Electricians",
  vets: "Vets",
  landscapers: "Landscapers",
  therapists: "Therapists",
  lawyers: "Lawyers",
  "insurance-agents": "Insurance",
  "financial-advisors": "Financial advisors",
};

const CATEGORY_LABELS = {
  "city-guide": "City guide",
  general: "General advice",
};

const CITY_SLUGS = new Set(guideCities.map((c) => c.slug));
const INDUSTRY_KEYS = new Set(industries.map((i) => i.key));

function tagHref(tag) {
  if (CITY_SLUGS.has(tag)) return `/blog?category=city-guide&city=${tag}`;
  if (INDUSTRY_KEYS.has(tag)) return `/blog?category=city-guide&industry=${tag}`;
  return `/blog?topic=${tag}`;
}

function tagLabel(slug) {
  const city = cities.getBySlug(slug);
  if (city) return city.name;
  return TAG_LABELS[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function blogMetaHtml({ category, tags }) {
  const categoryHref =
    category === "city-guide" ? "/blog?category=city-guide" : "/blog?category=general";
  const tagItems = tags
    .map((t) => `            <li><a href="${tagHref(t)}" class="blog-tag">${tagLabel(t)}</a></li>`)
    .join("\n");

  return `          <div class="blog-meta">
            <a href="${categoryHref}" class="blog-category-pill">${categoryLabel(category)}</a>
            <ul class="blog-tag-list" aria-label="Tags">
${tagItems}
            </ul>
          </div>`;
}

module.exports = { tagLabel, categoryLabel, blogMetaHtml, tagHref, TAG_LABELS, CATEGORY_LABELS };
