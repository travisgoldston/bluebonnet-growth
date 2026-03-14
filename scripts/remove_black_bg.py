#!/usr/bin/env python3
"""Make black/near-black pixels transparent in a PNG."""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip3 install Pillow")
    sys.exit(1)


def remove_black_background(input_path: str, output_path: str, threshold: int = 45) -> None:
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r <= threshold and g <= threshold and b <= threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved: {output_path}")


if __name__ == "__main__":
    src = Path(__file__).resolve().parent.parent
    assets = src / "assets"
    input_file = sys.argv[1] if len(sys.argv) > 1 else None
    if not input_file or not Path(input_file).exists():
        print("Usage: python remove_black_bg.py <input.png>")
        sys.exit(1)
    out = assets / "bluebonnet-icon.png"
    remove_black_background(input_file, str(out))
