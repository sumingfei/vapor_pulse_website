const QRCode = require('qrcode');
const url = 'https://search.google.com/local/writereview?placeid=ChIJa5iB42uDToYRg7jh2Z3Xzbs';
QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#05060B', light: '#FFFFFF' } })
  .then(svg => { require('fs').writeFileSync('qr.svg', svg); console.log(svg.slice(0,200)); console.log('LEN', svg.length); });
