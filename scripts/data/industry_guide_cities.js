/**
 * Cities that receive full industry guide sets (6 posts each).
 * Optional marketNote overrides the default "why this city" paragraph.
 * Optional extraNote adds industry-specific context (keyed by industry key).
 */
module.exports = [
  {
    slug: "melissa",
    marketNote:
      "Melissa sits on the Highway 75 corridor north of Dallas. A lot of your customers live in Melissa, but Google also mixes in results from McKinney, Anna, and sometimes Frisco.",
    extraNote: {
      dentists:
        "Many Melissa families still drive to McKinney for care out of habit. When you show up first on Google, you become the easy choice in town.",
    },
  },
  { slug: "mckinney" },
  { slug: "anna" },
  { slug: "sherman" },
  { slug: "frisco" },
  { slug: "plano" },
  { slug: "allen" },
  { slug: "prosper" },
  { slug: "celina" },
  { slug: "van-alstyne" },
  { slug: "dallas" },
  { slug: "fort-worth" },
  { slug: "houston" },
  { slug: "austin" },
  { slug: "san-antonio" },
  { slug: "the-woodlands" },
  { slug: "round-rock" },
];
