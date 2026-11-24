// Regenerates qr-rewards.svg for the mystery giveaway poster (needs `npm i qrcode`).
const QRCode = require('qrcode');
const url = 'https://vaporpulseshop.com/rewards';
QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#05060B', light: '#FFFFFF' } })
  .then(svg => { require('fs').writeFileSync('qr-rewards.svg', svg); console.log('wrote qr-rewards.svg for', url); });
