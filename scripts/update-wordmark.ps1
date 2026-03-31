$ErrorActionPreference = "Stop"

# Update the header wordmark text to match the brand kit:
# Bluebonnet (serif) + Growth (serif italic) with brand colors.
#
# We intentionally skip vendor/reference exports.

$root = (Get-Location).Path
$skipDirs = @("\resources\", "\incoming\")

$targets = Get-ChildItem -Recurse -File -Filter *.html | Where-Object {
  $full = $_.FullName
  foreach ($d in $skipDirs) {
    if ($full.ToLower().Contains($d)) { return $false }
  }
  return $true
}

$old = "<span>bluebonnet growth</span>"
$new = @"
<span class="logo-wordmark" aria-label="Bluebonnet Growth">
  <span class="logo-wordmark-bluebonnet">Bluebonnet</span>
  <span class="logo-wordmark-growth">Growth</span>
</span>
"@

$changed = 0
foreach ($f in $targets) {
  $p = $f.FullName
  $text = Get-Content -Raw -Path $p -Encoding UTF8

  if ($text -notlike "*$old*") { continue }
  if ($text -like "*logo-wordmark*") { continue }

  $updated = $text.Replace($old, $new)
  if ($updated -ne $text) {
    Set-Content -Path $p -Value $updated -Encoding UTF8
    $changed++
  }
}

Write-Host "Updated wordmark in $changed files."

