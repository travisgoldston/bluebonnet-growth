# Bulk-update internal links to canonical SEO URLs (root + blog HTML only)
$root = Split-Path -Parent $PSScriptRoot
$files = @(
  Get-ChildItem -Path $root -Filter "*.html" -File
  Get-ChildItem -Path (Join-Path $root "blog") -Filter "*.html" -File -ErrorAction SilentlyContinue
  Get-ChildItem -Path (Join-Path $root "services") -Filter "*.html" -File -ErrorAction SilentlyContinue
  Get-ChildItem -Path (Join-Path $root "locations") -Filter "*.html" -File -ErrorAction SilentlyContinue
) | Where-Object {
  $_.FullName -notmatch '\\resources\\|\\incoming\\'
}

$replacements = [ordered]@{
  'href="/final-cta"' = 'href="/contact"'
  "href='/final-cta'" = "href='/contact'"
  'href="/seo"' = 'href="/services/local-seo"'
  'href="/web-design"' = 'href="/services/web-design"'
  'href="/frisco"' = 'href="/locations/frisco-tx"'
  'href="/allen"' = 'href="/locations/allen-tx"'
  'https://www.bluebonnetgrowth.com' = 'https://bluebonnetgrowth.com'
}

$skipFiles = @('city-lander-template.html', 'master-template.html', 'seo-mckinney.html', 'seo-frisco.html', 'seo-allen.html', 'seo-anna.html', 'seo-melissa.html', 'seo-prosper.html')

foreach ($file in $files) {
  if ($skipFiles -contains $file.Name) { continue }
  $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $original = $content
  foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
  }
  if ($content -ne $original) {
    Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
  }
}

Write-Host "Done."
