const QRCode = require('/node_modules/qrcode-generator/qrcode.js')
const app = getApp()

Page({
  data: {
    card: null,
    retailer: null,
    voucherType: null,
    advanceAmount: 0.0,
    settlementPeriod: null,
    onceOffAmount: 0.0,
    bonusAmount: 0.0,
    totalAmount: 0.0,
    paymentState: null,
    showLoadingModal: false
  },
  onLoad() {
    let paymentInformation = app.paymentInformation
    this.setData({
      card: paymentInformation.card,
      retailer: app.get('/retailers/' + paymentInformation.retailer),
      voucherType: paymentInformation.voucherType,
      advanceAmount: paymentInformation.advanceAmount,
      settlementPeriod: paymentInformation.settlementPeriod,
      onceOffAmount: paymentInformation.onceOffAmount,
      bonusAmount: paymentInformation.bonusAmount,
      totalAmount: paymentInformation.totalAmount
    })
  },
  createVoucher() {
    this.setData({
      showLoadingModal: true
    })
    this.performPayment(this.data.voucherType)
    var expiry_date = new Date()
    var current_date = new Date()
    var dtF = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
    current_date = dtF.formatToParts(current_date)
    current_date = current_date[2]['value'] + ' ' + current_date[0]['value'] + ' ' + current_date[4]['value']
    expiry_date = dtF.formatToParts(expiry_date.setMonth(expiry_date.getMonth() + 1))
    expiry_date = expiry_date[2]['value'] + ' ' + expiry_date[0]['value'] + ' ' + expiry_date[4]['value']

    if (this.data.voucherType == 'settlement')
    {
      this.setData({
        paymentState: 'payment_settled'
      })
    }
    var request_body = {
      "method": this.data.voucherType,
      "total_amount": this.data.totalAmount,
      "card": this.data.card.id,
      "state": this.data.paymentState,
      "retailer": this.data.retailer.id,
      "created_at": current_date,
      "expires_at": expiry_date
    }
    if (this.data.voucherType == 'once_off' || this.data.voucherType == 'partial')
    {
      request_body['pay_now'] = {
        amount: this.data.onceOffAmount,
        bonus: this.data.bonusAmount
      }
    } if (this.data.voucherType == 'advance' || this.data.voucherType == 'partial')
    {
      request_body['advance'] = {
        amount: this.data.advanceAmount,
        due_date: new Date(Date.now() + parseInt(this.data.settlementPeriod)*24*60*60*1000),
        paid: false
      }
    }
    var response_body = null
    if (this.data.voucherType == 'settlement')
    {
      response_body = app.put('/vouchers/' + app.paymentInformation.voucherId, request_body)
    } else
    {
      response_body = app.post('/vouchers', request_body)
    }
    app.setNewestVoucher(response_body)
    console.log(response_body)
    setTimeout(() => {
      this.setData({
        showLoadingModal: false
      })
      my.redirectTo({
        url: '../display-voucher/display-voucher?id=' + response_body.id
      })
    }, Math.random() * 6000)
  },
  performPayment(voucherType) {
    if (voucherType == 'once_off')
    {
      if (Math.random() < 0.05)
      {
        this.setData({
          paymentState: "payment_failed"
        })
      } else
      {
        this.setData({
          paymentState: "payment_success"
        })
      }
    } else if (voucherType == 'partial')
    {
      if (Math.random() < 0.05)
      {
        this.setData({
          paymentState: "payment_failed"
        })
      } else
      {
        this.setData({
          paymentState: "payment_partial_completion"
        })
      }
    } else
    {
      this.setData({
        paymentState: "payment_not_settled"
      })
    }
  }
})