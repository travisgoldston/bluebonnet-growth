$ErrorActionPreference = "Stop"

$files = @(
  "index.html",
  "services.html",
  "seo.html",
  "web-design.html",
  "conversion-optimization.html",
  "pricing.html",
  "about.html",
  "faq.html",
  "proof.html",
  "blog.html",
  "locations.html",
  "frisco.html",
  "allen.html",
  "wylie.html",
  "van-alstyne.html",
  "gunter.html",
  "sherman.html",
  "blog/google-maps-not-showing-up.html",
  "blog/what-is-local-seo.html",
  "blog/website-traffic-no-calls.html",
  "blog/is-your-seo-company-working.html",
  "blog/google-business-profile-checklist.html"
)

foreach ($path in $files) {
  if (-not (Test-Path $path)) { continue }
  $c = Get-Content -Raw -Path $path

  $c = $c.Replace("Boldspark", "Bluebonnet Growth")
  $c = $c.Replace("boldspark", "bluebonnetgrowth")
  $c = $c.Replace('href="/favicon.png"', 'href="/assets/favicon-32x32.png"')
  $c = $c.Replace('src="/assets/boldspark-mark.png"', 'src="/assets/bluebonnet-icon.png"')
  $c = $c.Replace('alt="Boldspark"', 'alt="Bluebonnet Growth"')
  $c = $c.Replace("https://x.com/boldsparkdotco", "https://x.com/bluebonnetdotco")
  $c = $c.Replace("https://instagram.com/boldsparkdotco", "https://www.instagram.com/bluebonnetgrowth/")

  # Fix prior bad replacements that introduced spaces in URLs/paths
  $c = $c.Replace("bluebonnet growthdotco", "bluebonnetdotco")
  $c = $c.Replace("bluebonnet growth-mark.png", "bluebonnet-icon.png")
  $c = $c.Replace("https://instagram.com/bluebonnetdotco", "https://www.instagram.com/bluebonnetgrowth/")
  $c = $c.Replace("https://www.instagram.com/bluebonnetdotco", "https://www.instagram.com/bluebonnetgrowth/")
  $c = $c.Replace("https://x.com/bluebonnetgrowthdotco", "https://x.com/bluebonnetdotco")
  $c = $c.Replace("https://x.com/bluebonnetgrowth", "https://x.com/bluebonnetdotco")

  Set-Content -Path $path -Value $c -Encoding utf8
}

Write-Host ("Updated: " + ($files -join ", "))

