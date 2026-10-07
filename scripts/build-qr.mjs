// QR codes for desktop visitors: scan to call (call-qr.svg) and scan to text (msg-qr.svg).
import QR from 'qrcode';
import fs from 'node:fs';

const MSG = "Hi Mrs. Akbar, I'd like to book a driving lesson.";
const make = async (data, cls, file) => {
  let svg = await QR.toString(data, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#211e1aff', light: '#00000000' } });
  svg = svg.replace('<svg ', `<svg class="${cls}" aria-hidden="true" focusable="false" `).replace(/ width="[^"]*"| height="[^"]*"/g, '');
  fs.writeFileSync(new URL(`../src/partials/${file}`, import.meta.url), svg);
  console.log(`${file} written`);
};
await make('tel:+14164575778', 'call-qr__code', 'call-qr.svg');
await make(`SMSTO:+14164575778:${MSG}`, 'msg-qr__code', 'msg-qr.svg');
