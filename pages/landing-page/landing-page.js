const app = getApp()

Page({
  data: {
    retailer_types: null,
    newestVoucher: null
  },
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    this.setData({
      retailer_types: app.get('/retailer_types'),
      newestVoucher: app.newestVoucher
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
  goto_retailer(event) {
    my.navigateTo({
      url: '../retailers/retailers?retailer_type=' + event.target.dataset.reference
    })
  }
});
