const app = getApp()

Page({
  data: {
    retailers: null
  },
  onLoad(query) {
    let retailer_type = query.retailer_type
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
    this.setData({ retailers: retailers })
  },
  goto_payment_select(event) {
    my.navigateTo({
      url: '../payment-selection/payment-selection?retailer_id=' + event.target.dataset.id
    })
  }
})
