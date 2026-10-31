// Dashboard warning light symbols, drawn for this site (48 x 48, stroked in currentColor so each
// one takes its lamp colour). Used by the dashboard lights guide and its printable chart.
const dot = (x, y, r = 1.9) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;
const bang = (x, top, bottom, dotY) => `<path d="M${x} ${top}V${bottom}"/>${dot(x, dotY)}`;
// A lamp seen from the side: flat edge on one side, round on the other
const lampRight = '<path d="M27 13c6.5 0 11 4.9 11 11s-4.5 11-11 11Z"/>';
const lampLeft = '<path d="M21 13c-6.5 0-11 4.9-11 11s4.5 11 11 11Z"/>';
// A wavy line crossing light beams (fog)
const fogWave = (x) => `<path d="M${x} 12c-2.2 2 2.2 4 0 6s2.2 4 0 6 2.2 4 0 6 2.2 4 0 6"/>`;

export const DASH_ICONS = {
  brake: `<circle cx="24" cy="24" r="10.5"/>${bang(24, 18, 25.5, 30)}<path d="M10.5 14a15 15 0 0 0 0 20M37.5 14a15 15 0 0 1 0 20"/>`,
  powertrain: `<path d="M24 9.5v4.2M24 34.3v4.2M9.5 24h4.2M34.3 24h4.2M13.7 13.7l3 3M31.3 31.3l3 3M34.3 13.7l-3 3M16.7 31.3l-3 3" stroke-width="4"/><circle cx="24" cy="24" r="10"/>${bang(24, 19, 25.5, 29.6)}`,
  bulb: `<path d="M20 31.5c-2.8-2-4.6-5.1-4.6-8.6a8.6 8.6 0 0 1 17.2 0c0 3.5-1.8 6.6-4.6 8.6v2.5H20Z"/><path d="M20.5 37.5h7M22 41h4M24 6.5v3.5M12 11.5l2.4 2.4M36 11.5l-2.4 2.4M7.5 23h3.5M37 23h3.5"/>`,
  engine: '<path d="M11 19.5h5v-3.5h4v-2.5h9v2.5h4v3.5h3l3.5 4h2.5v-2.5h1.5v10h-1.5v-2.5H39l-3.5 5.5H19l-3-3h-5Z"/><path d="M7 21v10M7 26h4M22.5 13.5v-3M19.5 10.5h6"/>',
  rearFog: `${lampLeft}<path d="M27 17h12M27 24h12M27 31h12"/>${fogWave(33)}`,
  frontFog: `${lampRight}<path d="M9 15.5l12 2.5M9 22.5l12 2.5M9 29.5l12 2.5"/>${fogWave(15)}`,
  oil: '<path d="M9 21.5h5.5l3.5-3h8l12-4.5-9.5 12.5H13a4 4 0 0 1-4-4Z"/><path d="M20 18.5v-3h4M9 21.5l-3.5-2.5"/><path d="M40 27.5c1 1.8 1.9 2.9 1.9 4a1.9 1.9 0 0 1-3.8 0c0-1.1.9-2.2 1.9-4Z" fill="currentColor"/>',
  traction: '<path d="M10 25.5l3.8-10h20.4l3.8 10v6.5H10Z"/><path d="M10 32v3.5M38 32v3.5"/><path d="M15 25.5h18"/><path d="M17 36c-2.6 1.6-2.6 3.4 0 5s2.6 3.4 0 5M31 36c-2.6 1.6-2.6 3.4 0 5s2.6 3.4 0 5"/>',
  defrost: '<path d="M9 13.5h30l-3.5 21h-23Z"/><path d="M18 31c-1.6-1.8 1.6-3.6 0-5.4s1.6-3.6 0-5.4M24 31c-1.6-1.8 1.6-3.6 0-5.4s1.6-3.6 0-5.4M30 31c-1.6-1.8 1.6-3.6 0-5.4s1.6-3.6 0-5.4M16 22l2-2.6 2 2.6M22 22l2-2.6 2 2.6M28 22l2-2.6 2 2.6"/>',
  master: `<path d="M24 8.5 40.5 37h-33Z"/>${bang(24, 18.5, 27.5, 32)}`,
  battery: '<path d="M8 16h32v19H8Z"/><path d="M13 16v-3h6v3M29 16v-3h6v3M13 25.5h6M29 25.5h6M32 22.5v6"/>',
  seatbelt: `<circle cx="22" cy="9.5" r="3.4"/><path d="M15.5 37V22.5c0-3.6 2.8-6.5 6.5-6.5s6.5 2.9 6.5 6.5V27h5.5l3 10"/><path d="M15.5 17.5 31.5 33" stroke-width="3.2"/>`,
  throttle: '<path d="M26.5 10.5 19 25h6.5L21 37.5 30.5 22H24l4.5-11.5Z" fill="currentColor" stroke-width="1.6"/><path d="M14 12.5c-3.6 3-5.5 7.1-5.5 11.5s1.9 8.5 5.5 11.5M34 12.5c3.6 3 5.5 7.1 5.5 11.5s-1.9 8.5-5.5 11.5"/>',
  childLock: `<path d="M13 23v-5a11 11 0 0 1 22 0v5"/><rect x="10" y="23" width="28" height="18" rx="3.5"/><circle cx="24" cy="29" r="2.4"/><path d="M24 31.4v4.6M20.5 33.5h7"/>`,
  abs: '<circle cx="24" cy="24" r="11"/><path d="M10 14a15 15 0 0 0 0 20M38 14a15 15 0 0 1 0 20"/><text x="24" y="27.4" text-anchor="middle" font-size="8.4" font-weight="800" fill="currentColor" stroke="none">ABS</text>',
  temp: `<path d="M24 8v19M24 11h5M24 16h5M24 21h5"/><circle cx="24" cy="29.5" r="3.6" fill="currentColor"/><path d="M8 37.5c2.7-1.8 5.3-1.8 8 0s5.3 1.8 8 0 5.3-1.8 8 0 5.3 1.8 8 0"/>`,
  hazard: '<path d="M24 7.5 41.5 38h-35Z"/><path d="M24 17.5 32.6 32.5H15.4Z"/>',
  door: '<path d="M18.5 9.5h11a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-24a3 3 0 0 1 3-3Z"/><path d="M15.5 17.5l-7 4M15.5 27.5l-7 4M32.5 17.5l7 4M32.5 27.5l7 4M19 19h10"/>',
  cruise: '<path d="M9.5 32a14.5 14.5 0 1 1 29 0"/><path d="M24 32l7-8.5" stroke-width="3"/><circle cx="24" cy="32" r="2.4" fill="currentColor"/><path d="M14 21.5l2 1.5M24 17.5v2.5M34 21.5l-2 1.5"/><path d="M33 38h8M38 35l3 3-3 3"/>',
  tpms: `<path d="M15 12c-3.5 3.5-5.5 8.2-5.5 13.3 0 3.3.9 6.4 2.4 9.2h24.2c1.5-2.8 2.4-5.9 2.4-9.2 0-5.1-2-9.8-5.5-13.3"/><path d="M14.5 34.5v3.5M20 34.5v3.5M28 34.5v3.5M33.5 34.5v3.5"/>${bang(24, 16.5, 25.5, 30)}`,
  airbag: '<circle cx="17" cy="10" r="3.4"/><path d="M15.5 16.5 13 29h9l4 9.5"/><path d="M13 29l-3 9"/><circle cx="31" cy="21" r="6.3"/>',
  glow: '<ellipse cx="13" cy="24" rx="5" ry="9.5"/><ellipse cx="20.3" cy="24" rx="5" ry="9.5"/><ellipse cx="27.6" cy="24" rx="5" ry="9.5"/><ellipse cx="34.9" cy="24" rx="5" ry="9.5"/>',
  highBeam: `${lampRight}<path d="M8 15h14M8 21h14M8 27h14M8 33h14"/>`,
  lowBeam: `${lampRight}<path d="M8.5 15.5l13 3M8.5 21.5l13 3M8.5 27.5l13 3M8.5 33.5l13 3"/>`,
  eco: '<rect x="6" y="14" width="36" height="20" rx="6"/><text x="24" y="28.2" text-anchor="middle" font-size="10.5" font-weight="800" fill="currentColor" stroke="none" letter-spacing=".6">ECO</text>',
  steering: `<circle cx="20" cy="24" r="12"/><circle cx="20" cy="24" r="3.2"/><path d="M8.6 21.5c3.6-1.3 7.5-2 11.4-2s7.8.7 11.4 2M18.4 27l-3.6 7.6M21.6 27l3.6 7.6"/>${bang(40.5, 14, 27, 32.5)}`,
  fuel: '<path d="M11 39V12.5a2.5 2.5 0 0 1 2.5-2.5h11a2.5 2.5 0 0 1 2.5 2.5V39M8 39h22M14.5 14h9v7h-9Z"/><path d="M27 20h3.5a2 2 0 0 1 2 2v9.5a2.5 2.5 0 0 0 5 0V18l-4-4.5"/>',
  signals: '<path d="M5 24l8.5-7.5v4.5h6v6h-6v4.5Z" fill="currentColor"/><path d="M43 24l-8.5-7.5v4.5h-6v6h6v4.5Z" fill="currentColor"/>',
};

export const dashIcon = (key, label, cls = 'dash-ico') =>
  `<svg class="${cls}" viewBox="0 0 48 48" role="img" aria-label="${label}" focusable="false" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${DASH_ICONS[key]}</svg>`;

// The symbols chart (public/img/dashboard-warning-lights-chart.svg): every light in one image,
// for anyone who wants to save or print it. Plain colours, since it's viewed outside the page.
export const LAMP = { red: '#ff5a47', amber: '#ffb627', green: '#46d17a', blue: '#5ea8ff' };
export function dashChart(items) {
  const cols = 7, tile = 180, tileH = 172, gap = 16, pad = 40, top = 132;
  const rows = Math.ceil(items.length / cols);
  const w = pad * 2 + cols * tile + (cols - 1) * gap;
  const h = top + rows * tileH + (rows - 1) * gap + 70;
  const legend = [['red', 'Red: stop safely'], ['amber', 'Yellow: check soon'], ['green', 'Green or blue: a system is on']]
    .map(([c, t], i) => `<circle cx="${pad + 8 + i * 300}" cy="101" r="8" fill="${LAMP[c]}"/><text x="${pad + 24 + i * 300}" y="107" font-size="19" font-weight="700" fill="#4a453e">${t}</text>`).join('');
  const tiles = items.map(([tone, key, label], i) => {
    const x = pad + (i % cols) * (tile + gap), y = top + Math.floor(i / cols) * (tileH + gap);
    return `<rect x="${x}" y="${y}" width="${tile}" height="${tileH}" rx="18" fill="#1e1c19"/>` +
      `<g transform="translate(${x + 48} ${y + 20}) scale(1.75)" color="${LAMP[tone]}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${DASH_ICONS[key]}</g>` +
      `<text x="${x + tile / 2}" y="${y + 146}" text-anchor="middle" font-size="16" font-weight="700" fill="#f4ecdf">${label}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Figtree, Helvetica, Arial, sans-serif">
<title>Dashboard warning lights chart: ${items.length} symbols and what they mean</title>
<rect width="${w}" height="${h}" fill="#f5efe4"/>
<text x="${pad}" y="66" font-size="40" font-weight="800" fill="#1e1c19">Dashboard warning lights</text>
${legend}
${tiles}
<text x="${w - pad}" y="${h - 28}" text-anchor="end" font-size="16" font-weight="700" fill="#4a453e">mrsakbardriving.ca/guides/dashboard-warning-lights</text>
</svg>
`;
}
