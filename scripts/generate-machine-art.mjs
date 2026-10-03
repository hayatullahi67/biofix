import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/machines";
const stroke = 'stroke="#0F766E" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const body = 'fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"';

const devices = {
  monitor: `<rect x="190" y="120" width="420" height="280" rx="28" ${body}/>
    <rect x="220" y="150" width="360" height="200" rx="14" fill="#0F172A"/>
    <path d="M240 260 H320 L345 200 L380 310 L405 240 H560" stroke="#2DD4BF" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="370" y="400" width="60" height="60" fill="#E2E8F0"/><rect x="300" y="455" width="200" height="22" rx="11" fill="#CBD5E1"/>`,
  xray: `<rect x="160" y="400" width="480" height="44" rx="14" ${body}/>
    <rect x="370" y="110" width="40" height="300" rx="10" fill="#E2E8F0"/>
    <rect x="250" y="120" width="280" height="90" rx="22" ${body}/>
    <circle cx="390" cy="165" r="26" ${stroke}/><rect x="200" y="350" width="400" height="50" rx="16" fill="#CCFBF1"/>`,
  ultrasound: `<rect x="240" y="200" width="260" height="190" rx="22" ${body}/>
    <path d="M300 250 Q370 180 440 250 L410 340 H330 Z" fill="#0F172A"/>
    <rect x="290" y="390" width="160" height="70" rx="12" fill="#E2E8F0"/>
    <path d="M520 240 q60 20 50 110" ${stroke}/><rect x="545" y="340" width="40" height="70" rx="14" fill="#14B8A6"/>`,
  ventilator: `<rect x="250" y="110" width="300" height="320" rx="30" ${body}/>
    <rect x="280" y="140" width="240" height="140" rx="14" fill="#0F172A"/>
    <path d="M300 230 q30 -60 60 0 t60 0 t60 0" stroke="#38BDF8" stroke-width="6" fill="none"/>
    <circle cx="330" cy="340" r="26" ${stroke}/><circle cx="470" cy="340" r="26" ${stroke}/>
    <path d="M550 300 C640 300 640 420 560 440" ${stroke}/>`,
  cabinet: `<rect x="260" y="100" width="280" height="360" rx="30" ${body}/>
    <rect x="290" y="130" width="220" height="110" rx="14" fill="#0F172A"/>
    <rect x="310" y="160" width="120" height="14" rx="7" fill="#2DD4BF"/><rect x="310" y="190" width="80" height="14" rx="7" fill="#64748B"/>
    <rect x="290" y="270" width="220" height="150" rx="16" fill="#F0FDFA" stroke="#99F6E4" stroke-width="3"/>
    <circle cx="400" cy="345" r="40" ${stroke}/>`,
  incubator: `<path d="M220 260 Q400 120 580 260 V360 H220 Z" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="4"/>
    <rect x="200" y="360" width="400" height="50" rx="16" ${body}/>
    <rect x="370" y="410" width="60" height="50" fill="#E2E8F0"/><rect x="290" y="455" width="220" height="22" rx="11" fill="#CBD5E1"/>
    <circle cx="400" cy="300" r="20" ${stroke}/>`,
  pump: `<rect x="290" y="130" width="220" height="300" rx="26" ${body}/>
    <rect x="315" y="160" width="170" height="90" rx="12" fill="#0F172A"/>
    <text x="400" y="218" font-size="40" font-family="monospace" fill="#2DD4BF" text-anchor="middle">25.0</text>
    <rect x="315" y="275" width="70" height="40" rx="10" fill="#CCFBF1"/><rect x="415" y="275" width="70" height="40" rx="10" fill="#E2E8F0"/>
    <path d="M400 430 V480" ${stroke}/>`,
};

function svg(device) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" role="img">
  <defs><radialGradient id="bg" cx="0.5" cy="0.35" r="0.8"><stop offset="0" stop-color="#F0FDFA"/><stop offset="1" stop-color="#E2E8F0"/></radialGradient></defs>
  <rect width="800" height="560" fill="url(#bg)"/>
  <ellipse cx="400" cy="490" rx="260" ry="26" fill="#0F172A" opacity="0.06"/>
  ${device}
</svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const [name, device] of Object.entries(devices)) writeFileSync(`${OUT}/${name}.svg`, svg(device));
process.stdout.write(`Generated ${Object.keys(devices).length} machine illustrations\n`);
