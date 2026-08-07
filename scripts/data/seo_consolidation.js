/**
 * SEO consolidation config — keepers vs redirects after thin-page purge.
 * Home-service ICP first. Trade×city survivors only where local texture exists.
 */
module.exports = {
  /** Cities that keep a dedicated landing page */
  keepCitySlugs: [
    "melissa",
    "mckinney",
    "anna",
    "frisco",
    "plano",
    "allen",
    "prosper",
    "celina",
    "dallas",
    "fort-worth",
    "sherman",
    "denton",
    "van-alstyne",
    "wylie",
    "arlington",
    // GSC demand + Texas expansion (genuine pages only — not mass production)
    "boerne",
    "georgetown",
  ],

  /**
   * Trade×city posts to keep (industry key + city slug).
   * Everything else redirects to the trade Texas pillar.
   */
  keepTradeCity: [
    { industry: "plumbers", city: "mckinney" },
    { industry: "plumbers", city: "frisco" },
    { industry: "plumbers", city: "dallas" },
    { industry: "plumbers", city: "allen" },
    { industry: "plumbers", city: "melissa" },
    { industry: "hvac", city: "frisco" },
    { industry: "hvac", city: "mckinney" },
    { industry: "hvac", city: "plano" },
    { industry: "hvac", city: "dallas" },
    { industry: "hvac", city: "fort-worth" },
    { industry: "roofers", city: "dallas" },
    { industry: "roofers", city: "fort-worth" },
    { industry: "roofers", city: "mckinney" },
    { industry: "roofers", city: "frisco" },
    { industry: "electricians", city: "frisco" },
    { industry: "electricians", city: "mckinney" },
    { industry: "electricians", city: "plano" },
    { industry: "electricians", city: "prosper" },
    { industry: "landscapers", city: "frisco" },
    { industry: "landscapers", city: "mckinney" },
    { industry: "landscapers", city: "prosper" },
    { industry: "dentists", city: "melissa" },
    { industry: "dentists", city: "mckinney" },
    { industry: "dentists", city: "anna" },
    { industry: "dentists", city: "frisco" },
  ],

  /** Metro fallback when a non-keeper city redirects */
  cityRedirectFallback: "/locations",

  /** Named metro hubs for nearby non-keepers */
  cityRedirectOverrides: {
    houston: "/locations#houston-area",
    "the-woodlands": "/locations#houston-area",
    galveston: "/locations#houston-area",
    beaumont: "/locations#houston-area",
    austin: "/locations#central-texas",
    "round-rock": "/locations#central-texas",
    pflugerville: "/locations#central-texas",
    "san-marcos": "/locations#central-texas",
    waco: "/locations#central-texas",
    "college-station": "/locations#central-texas",
    killeen: "/locations#central-texas",
    "san-antonio": "/locations#san-antonio-area",
    lubbock: "/locations#west-texas",
    abilene: "/locations#west-texas",
    amarillo: "/locations#west-texas",
    midland: "/locations#west-texas",
    odessa: "/locations#west-texas",
    "el-paso": "/locations#west-texas",
    "corpus-christi": "/locations#south-texas",
    mcallen: "/locations#south-texas",
    laredo: "/locations#south-texas",
    brownsville: "/locations#south-texas",
    tyler: "/locations#east-texas",
    irving: "/dallas",
    murphy: "/wylie",
    sachse: "/wylie",
    lucas: "/allen",
    gunter: "/celina",
    denison: "/sherman",
    howe: "/sherman",
  },

  generalBlogSlugs: [
    "what-to-do-when-phone-stops-ringing",
    "how-to-get-more-google-reviews",
    "why-competitor-ranks-higher",
    "how-long-does-local-seo-take",
    "do-you-need-a-website-for-local-seo",
    "google-maps-not-showing-up",
    "what-is-local-seo",
    "website-traffic-no-calls",
    "is-your-seo-company-working",
    "google-business-profile-checklist",
    "ranking-number-one-nobody-calls",
    "missed-calls-destroy-local-seo-roi",
    "local-seo-vs-traditional-seo",
  ],
};
