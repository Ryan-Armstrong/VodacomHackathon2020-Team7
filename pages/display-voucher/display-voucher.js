const QRCode = require('/node_modules/qrcode-generator/qrcode.js');
Page({
  data: {},
  onLoad() {
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData('2243579F!');
    qr.make();
    this.setData({qrImageUrl: qr.createDataURL()});
  },
});
