const app = getApp()

Page({
  data: {
    cards: null,
    card: null,
    currentIndex: 0
  },
  onLoad() {
    this.setData({
      cards: app.get('/cards')
    })
  },
  setCard(event) {
    this.setData({
      card: this.data.cards[event.target.dataset.id]
    })
    
    app.paymentInformation['card'] = this.data.card
    my.navigateTo({
      url: '../payment-summary/payment-summary'
    })
  }
})
