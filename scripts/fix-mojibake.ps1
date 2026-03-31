$ErrorActionPreference = "Stop"

$targets = Get-ChildItem -Recurse -File -Include *.html,*.xml,*.txt

# Fix mojibake by re-interpreting Windows-1252 bytes as UTF-8.
# This corrects sequences like "Weâ€™re" back to "We’re".
$enc1252 = [Text.Encoding]::GetEncoding(1252)
$encUtf8 = New-Object Text.UTF8Encoding($false)

$changed = 0
foreach ($f in $targets) {
  $p = $f.FullName
  $text = Get-Content -Raw -Path $p -Encoding UTF8

  # Only run the conversion when the file looks "broken".
  # Mojibake typically introduces Latin-1 characters like Â (U+00C2), â (U+00E2), Ã (U+00C3).
  if ($text -notmatch "(\u00C2|\u00E2|\u00C3)") {
    continue
  }

  $bytes = $enc1252.GetBytes($text)
  $fixed = $encUtf8.GetString($bytes)

  if ($fixed -ne $text) {
    Set-Content -Path $p -Value $fixed -Encoding UTF8
    $changed++
  }
}

Write-Host "Fixed mojibake in $changed files."

