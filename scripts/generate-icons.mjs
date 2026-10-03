import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const OUT = "public/icons";
const pulse = "M12 34 H22 L27 21 L35 45 L40 31 H52";

function markSvg({ maskable }) {
  const radius = maskable ? 0 : 15;
  const scale = maskable ? 0.72 : 1;
  const offset = (64 - 64 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#14B8A6"/><stop offset="1" stop-color="#0F766E"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="${radius}" fill="url(#g)"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    <path d="${pulse}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/logo-mark.svg`, markSvg({ maskable: false }));

const targets = [
  { name: "icon-192.png", size: 192, maskable: false },
  { name: "icon-512.png", size: 512, maskable: false },
  { name: "maskable-192.png", size: 192, maskable: true },
  { name: "maskable-512.png", size: 512, maskable: true },
  { name: "apple-touch-icon.png", size: 180, maskable: true },
  { name: "favicon-32.png", size: 32, maskable: false },
];

for (const { name, size, maskable } of targets) {
  await sharp(Buffer.from(markSvg({ maskable }))).resize(size, size).png().toFile(`${OUT}/${name}`);
}
process.stdout.write(`Generated ${targets.length} icons in ${OUT}\n`);
