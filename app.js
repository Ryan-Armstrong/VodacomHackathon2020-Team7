const advance_voucher_presets = require('./data/advance_presets.json')
const advance_voucher_settlement_periods = require('./data/advance_settlement_periods.json')
const card_types = require('./data/card_types.json')
const cards = require('./data/cards.json')
const once_off_voucher_presets = require('./data/once_off_presets.json')
const retailer_types = require('./data/retailer_types.json')
const retailers = require('./data/retailers.json')
const voucher_states = require('./data/voucher_states.json')
const voucherTypes = require('./data/voucher_types.json')
const vouchers = require('./data/vouchers.json')

App({
  card_types: null,
  cards: null,
  retailer_types: null,
  retailers: null,
  voucher_presets: {
    advance: null,
    advanceSettlementPeriods: null,
    once_off: null
  },
  voucher_states: null,
  vouchers: null,
  paymentInformation: null,
  onLaunch(options) {
    this.card_types = card_types
    this.cards = cards
    this.retailer_types = retailer_types
    this.retailers = retailers
    this.voucher_presets.advance = advance_voucher_presets
    this.voucher_presets.advanceSettlementPeriods = advance_voucher_settlement_periods
    this.voucher_presets.once_off = once_off_voucher_presets
    this.voucher_states = voucher_states
    this.voucherTypes = voucherTypes
    this.vouchers = vouchers
  },
  onShow(options) {
    //
  },
  post(url, body) {
    let query_params = extract_query_params(url)
    let data_model = this.get_data_model(query_params.model)
    let id = create_integer_id(data_model)
    var response = body
    response['id'] = id
    data_model[id] = response
    return response
  },
  get(url) {
    let query_params = extract_query_params(url)
    let data_model = this.get_data_model(query_params.model)
    if (query_params.id != undefined)
    {
      if (data_model[query_params.id] == undefined)
      {
        return null
      } else
      {
        return data_model[query_params.id]
      }
    } else if (query_params.ids != undefined)
    {
      var response_data = {}
      for (var i = 0; i < query_params.ids.length; i++)
      {
        let data = data_model[query_params.ids[i]]
        if (data != undefined)
        {
          response_data[query_params.ids[i]] = data
        }
      }
      return response_data
    } else
    {
      return data_model
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
      case 'advance_settlements':
        return this.voucher_presets.advanceSettlementPeriods
      case 'once_off_voucher_presets':
        return this.voucher_presets.once_off
      case 'voucher_states':
        return this.voucher_states
      case 'voucherTypes':
        return this.voucherTypes
      case 'vouchers':
        return this.vouchers
      default:
        return null
    }
  }
})

const extract_query_params = (url) => {
  let query = url.split('/')
  var query_params = {}
  if (query.length == 2)
  {
    let index_params = query[1].split('?')
    if (index_params.length == 1)
    {
      query_params['model'] = query[1]
    } else
    {
      query_params['model'] = index_params[0]
      query_params['ids'] = index_params[1].split('ids=')[1].split(',')
    }
  } else if (query.length == 3)
  {
    query_params['model'] = query[1]
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