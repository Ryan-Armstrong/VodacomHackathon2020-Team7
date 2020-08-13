const advance_voucher_presets = require('./data/advance_voucher_presets.json')
const card_types = require('./data/card_types.json')
const cards = require('./data/cards.json')
const once_off_voucher_presets = require('./data/once_off_voucher_presets.json')
const retailer_types = require('./data/retailer_types.json')
const retailers = require('./data/retailers.json')
const voucher_states = require('./data/voucher_states.json')
const vouchers = require('./data/vouchers.json')

App({
  card_types: null,
  cards: null,
  retailer_types: null,
  retailers: null,
  voucher_presets: {
    advance: null,
    once_off: null
  },
  voucher_states: null,
  vouchers: null,
  onLaunch(options) {
    this.card_types = card_types
    this.cards = cards
    this.retailer_types = retailer_types
    this.retailers = retailers
    this.voucher_presets.advance = advance_voucher_presets
    this.voucher_presets.once_off = once_off_voucher_presets
    this.voucher_states = voucher_states
    this.vouchers = vouchers
  },
  onShow(options) {
    //
  }
})
