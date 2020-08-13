
# API Functionality Reproduction
## POST
```
console.log(this.post('/vouchers', {a: 'b'}))
```
|  
|
## GET
```
console.log(this.get('/vouchers/4'))
```
|  
|
## PUT
```
this.put('/vouchers/4', {
  "method": "once_off",
  "total_amount": 55.00,
  "card": "2",
  "created_at": "2020-07-24",
  "expires_at": "2020-08-24",
  "state": "payment_failed",
  "advance": {
    "amount": 0.00,
    "due_date": null,
    "paid": true
  },
  "pay_now": {
    "amount": 50.00,
    "bonus": 5.00
  }
})
```
This will update this voucher to have used card 2 instead of card 3  
|  
|
## DESTROY
```
this.destroy('/vouchers/3')
console.log(this.vouchers['3'])
```
|  
|
## extract_query_params( url ) --- (GET, PUT, DESTROY)
Given an "API URL", this function will separate the URL into the model and the id for the API request. That is, given:
```
'/vouchers/3'
```
The response of this function will be:
```
query_params: {
  model: 'vouchers',
  id: '3'
}
```
|  
|
## extract_query_params( url ) --- (POST)
If the API request does not define the id of the object, such as wiht a POST, then the returned query_params will only contain the model to use. That is, given:
```
'/vouchers'
```
The response of this function will be:
```
query_params: {
  model: 'vouchers'
}
```