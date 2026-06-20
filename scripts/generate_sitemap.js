// Regenerate sitemap via build script (patch-only mode).
process.env.PATCH_ONLY = "1";
require("./build_texas_locations.js");
