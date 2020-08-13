const app = getApp()

Page({
  data: {
    retailer: null,
    voucherTypes: null,
    advanceVoucherPresets: null,
    advanceSettlementPeriods: null,
    onceOffVoucherPresets: null,
    voucherType: 'once_off',
    advanceAmount: 0.0,
    settlementPeriod: null,
    onceOffAmount: 0.0,
    bonusAmount: 0.0,
    totalAmount: 0.0
  },
  onLoad(query) {
    this.setData({
      retailer: app.get('/retailers/' + query.retailerId),
      voucherTypes: app.get('/voucherTypes'),
      advanceSettlementPeriods: app.get('/advance_settlements'),
    })
    this.setData({
      advanceVoucherPresets: app.get('/advance_voucher_presets?ids=' + this.data.retailer.advance.presets),
      onceOffVoucherPresets: app.get('/once_off_voucher_presets?ids=' + this.data.retailer.once_off.presets)
    })
  },
  setAdvanceAmount(event) {
    this.setData({
      advanceAmount: event.target.dataset.amount
    })
    this.updateTotalAmount()
  },
  setOnceOffAmount(event) {
    let onceOffAmount = event.target.dataset.amount
    var bonusAmount = onceOffAmount * ( this.data.retailer.once_off.bonus_percentage / 100.0 )
    if ( bonusAmount > this.data.retailer.once_off.bonus_flat_limit )
    {
      bonusAmount = this.data.retailer.once_off.bonus_flat_limit
    }
    this.setData({
      onceOffAmount: onceOffAmount,
      bonusAmount: bonusAmount
    })
    this.updateTotalAmount()
  },
  setVoucherType(event) {
    let voucherType = event.target.dataset.voucherType
    this.setData({
      voucherType: voucherType
    })
    if (voucherType == 'advance')
    {
      this.setData({
        onceOffAmount: 0.0,
        bonusAmount: 0.0
      })
    } else if (voucherType == 'once_off')
    {
      this.setData({
        advanceAmount: 0.0,
        settlementPeriod: null
      })
    }
    this.updateTotalAmount()
  },
  setSettlementPeriod(event) {
    this.setData({
      settlementPeriod: event.target.dataset.days
    })
  },
  updateTotalAmount() {
    this.setData({
      totalAmount: this.data.advanceAmount + this.data.onceOffAmount + this.data.bonusAmount
    })
  },
  gotoCardSelect() {
    if (this.validatePaymentOptions())
    {
      app.paymentInformation = {
        retailer: this.data.retailer.id,
        voucherType: this.data.voucherType,
        advanceAmount: this.data.advanceAmount,
        settlementPeriod: this.data.settlementPeriod,
        onceOffAmount: this.data.onceOffAmount,
        bonusAmount: this.data.bonusAmount,
        totalAmount: this.data.totalAmount
      }
      my.navigateTo({
        url: '../card-selection/card-selection'
      })
    }
  },
  validatePaymentOptions() {
    if (this.data.voucherType == 'once_off' || this.data.voucherType == 'partial')
    {
      if (this.data.onceOffAmount <= 0.0)
      {
        return false
      }
    } if (this.data.voucherType == 'advance' || this.data.voucherType == 'partial')
    {
      if (this.data.advanceAmount <= 0.0)
      {
        return false
      } if (this.data.settlementPeriod == null)
      {
        return false
      }
    }
    return true
  }
})
