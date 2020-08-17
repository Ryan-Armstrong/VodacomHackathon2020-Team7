const QRCode = require('/node_modules/qrcode-generator/qrcode.js');
const app = getApp()

Page({
  data: {
    voucher: null
  },
  onLoad(query) {
    this.setData({
      voucher: app.get('/vouchers/' + query.voucherId)
    })
    console.log(this.data.voucher)
  }
})








/* 
  onLoad() {
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData('2243579F!');
    qr.make();
    this.setData({qrImageUrl: qr.createDataURL()});
  },
  */