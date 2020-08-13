const app = getApp()

Page({
  data: {
    cards: null
  },
  onLoad() {
    this.setData({
      cards: app.get('/cards')
    })
  },
  next(){
    my.navigateTo({ url: '../payment-summary/payment-summary' });
  }
});
