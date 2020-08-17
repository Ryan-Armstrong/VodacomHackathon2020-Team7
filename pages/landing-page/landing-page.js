const app = getApp()

Page({
  data: {
    retailerTypes: null,
    newestVoucher: null,
    retailerTypes: null,
    pastVouchers: null,
    voucherTypes: null,
    retailerSelection: false,
    retailers: null,
    tabs: [
      {
        title: 'Vouchers',
      },
      {
        title: 'Past Purchases',
      },
    ],
    activeTab: 0
  },
  onLoad(query) {
    this.setData({ retailers: null, retailerSelection: false });
  },
  onReady() {
    this.setData({
      retailerTypes: app.retailer_types,
      newestVoucher: app.newestVoucher, 
      pastVouchers: app.vouchers,
      voucherTypes: app.voucherTypes
    })
  },
  onShow() {
    // Page display
  },
  onHide() {
    // Page hidden
  },
  onUnload() {
    // Page is closed
  },
  onTitleClick() {
    // Title clicked
  },
  onPullDownRefresh() {
    // Page is pulled down
  },
  onReachBottom() {
    // Page is pulled to the bottom
  },
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/landing-page/landing-page',
    };
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  next(){
    my.navigateTo({
      url: '../vouchers/vouchers'
    })
  },
  gotoRetailer(event) {
    let retailer_type = event.target.dataset.reference;
    if (retailer_type != undefined)
    {
      var retailers = {}
      let retailer_ids = Object.keys(app.retailers)
      for (var i = 0; i < retailer_ids.length; i++)
      {
        let key = retailer_ids[i]
        if (app.retailers[key].retailer_type == retailer_type)
        {
          retailers[key] = app.retailers[key]
        }
      }
    }
    this.setData({ retailers: retailers, retailerSelection: true });
  },
  gotoPaymentSelect(event) {
    my.navigateTo({
      url: '../payment-selection/payment-selection?retailerId=' + event.target.dataset.id
    })
  },
  onShowDetails(event){
    my.navigateTo({
      url: '../display-voucher/display-voucher?voucherId=' + event.target.dataset.cardId
    })
    
  },
  settleNewestPayment(event){
    let newVoucher = this.data.newestVoucher
    app.paymentInformation = {
      voucherId: newVoucher.id,
      retailer: newVoucher.retailer.id,
      voucherType: 'settlement',
      advanceAmount: newVoucher.advance.amount,
      settlementPeriod: newVoucher.advance.settlementPeriod,
      onceOffAmount: newVoucher.pay_now.amount,
      bonusAmount: newVoucher.pay_now.bonus,
      totalAmount: newVoucher.total_amount
    }
    my.navigateTo({
      url: '../card-selection/card-selection?voucherId=' + event.target.dataset.cardId
    })
  },
  settlePayment(event) {
    let voucher = app.get('/vouchers/' + event.target.dataset.cardId)
    app.paymentInformation = {
      voucherId: voucher.id,
      retailer: voucher.retailer.id,
      voucherType: 'settlement',
      advanceAmount: voucher.advance.amount,
      settlementPeriod: voucher.advance.settlementPeriod,
      onceOffAmount: voucher.pay_now.amount,
      bonusAmount: voucher.pay_now.bonus,
      totalAmount: voucher.total_amount
    }
    my.navigateTo({
      url: '../card-selection/card-selection?voucherId=' + event.target.dataset.cardId
    })
  }
});
