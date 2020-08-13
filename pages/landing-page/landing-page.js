const app = getApp()

Page({
  data: {
    retailer_types: null
  },
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    this.setData({
      retailer_types: app.get('/retailer_types')
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
  next(){
    my.navigateTo({
      url: '../vouchers/vouchers'
    })
  },
  goto_retailer(event) {
    let retailer_reference = event.target.dataset.reference
    my.navigateTo({
      url: '../retailers/retailers?retailer_type=' + retailer_reference
    })
  }
});
