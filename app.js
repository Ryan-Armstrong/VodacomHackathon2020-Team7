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
  },
  post(url, body) {
    let query_params = extract_query_params(url)
    let data_model = this.get_data_model(query_params.model)
    let id = create_integer_id(data_model)
    data_model[id] = body
    var response = body
    response['id'] = id
    return response
  },
  get(url) {
    let query_params = extract_query_params(url)
    if (query_params.id == undefined)
    {
      return null
    }
    let data_model = this.get_data_model(query_params.model)
    if (data_model[query_params.id] == undefined)
    {
      return null
    } else
    {
      return data_model[query_params.id]
    }
  },
  put(url, body) {
    let query_params = extract_query_params(url)
    if (query_params.id == undefined)
    {
      return null
    }
    let data_model = this.get_data_model(query_params.model)
    if (data_model[query_params.id] == undefined)
    {
      return null
    } else
    {
      data_model[query_params.id] = body
      return data_model[query_params.id]
    }
  },
  destroy(url) {
    let query_params = extract_query_params(url)
    if (query_params.id == undefined)
    {
      return null
    }
    let data_model = this.get_data_model(query_params.model)
    if (data_model[query_params.id] != undefined)
    {
      delete data_model[query_params.id]
    }
    return null
  },
  get_data_model(model)
  {
    switch (model) {
      case 'card_types':
        return this.card_types
      case 'cards':
        return this.cards
      case 'retailer_types':
        return this.retailer_types
      case 'retailers':
        return this.retailers
      case 'advance_voucher_presets':
        return this.voucher_presets.advance
      case 'once_off_voucher_presets':
        return this.voucher_presets.once_off
      case 'voucher_states':
        return this.voucher_states
      case 'vouchers':
        return this.vouchers
      default:
        return null
    }
  }
})

const extract_query_params = (url) => {
  let query = url.split('/')
  var query_params = {
    model: query[1]
  }
  if (query.length == 3)
  {
    query_params['id'] = query[2]
  }
  return query_params
}

const create_integer_id = (model) => {
  let keys = Object.keys(model)
  var index = 0
  while (true) {
    if ( keys.includes(String(index)) ) {
      index += 1
    } else
    {
      break
    }
  }
  return index
}