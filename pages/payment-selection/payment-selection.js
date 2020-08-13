const app = getApp()

Page({
  data: {
    retailer: null
  },
  onLoad(query) {
    this.setData({
      retailer: app.get('/retailers/' + query.retailer_id)
    })
  },
  next(){
    my.navigateTo({ url: '../card-selection/card-selection' });
  }
});
