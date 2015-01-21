var Promise = require('bluebird')
var http    = require('superagent')
var uuid    = require('uuid')

class FidorClient {
  constructor(options) {
    this.url         = options.url
    this.accessToken = options.accessToken
    this.accountId   = options.accountId
  }

  sendPayment(options) {
    var _this = this

    return new Promise(function(resolve, reject) {
      var payment = {
        amount: options.amount,
        external_uid: options.uid || uuid.v4(),
        account_id: _this.accountId,
        access_token: _this.accessToken,
        remote_name: options.recipient,
        remote_iban: options.iban,
        remote_bic: options.bic,
        subject: options.message
      }

      http
        .post(_this.url + '/sepa_credit_transfers')
        .set('Content-Type', 'application/json')
        .send(payment)
        .end(function(error, response) {
          if (error) {
            return reject(error)
          } else {
            if (response.body.error) {
              return reject(response.body.error)
            }
            resolve(response.body)
          }
        })
    })
  }

  getPayment(id) {
    var _this = this

    return new Promise(function(resolve, reject) {
      return http
        .get(_this.url + '/sepa_credit_transfers/' + id)
        .end(function(error, response) {
          if (error) {
            return reject(error)
          } else {
            resolve(response.body)
          }
        })
    })
  }
}

module.exports = FidorClient
