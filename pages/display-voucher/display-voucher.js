const QRCode = require('/node_modules/qrcode-generator/qrcode.js');
const app = getApp()

Page({
  data: {
    voucher: null
  },
  onLoad(query) {
    let voucher = app.get('/vouchers/' + query.voucherId);
    const retailers = app.get('/retailers');

    voucher.retailerName = retailers[voucher.retailer]?retailers[voucher.retailer]: voucher.retailer;
    this.setData({
      voucher: voucher
    });

    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(voucher.code);
    qr.make();
    this.setData({qrImageUrl: qr.createDataURL()});
  },
  toHome(){
    my.redirectTo({
      url: '../landing-page/landing-page'
    })
  }


})





/* 
  onLoad() {
  },
  */