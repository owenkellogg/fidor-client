# Fidor Client

Send SEPA payments from a Fidor account using the Fidor API

## Installation

````
npm install --save fidor-client
````

## Configuration

Fidor Client requires a valid Fidor account id and oauth access token,
which can be obtained by registering a bank account and user at the [Fidor Developer Portal](https://developer.fidor.de/)

## Usage

````
var FidorClient = require('fidor-client');

var fidor = new FidorClient({
  url: 'sandbox.api.fidor.de',
  accountId: 123,
  accessToken: 45678
});

fidor.sendPayment({
  amount: 11595,
  iban: 'LT121000011101001000',
  uid: '2d3312af-f2ad-4d3a-a177-9fa1708083cc',
  recipient: 'Steven Zeiler',
  message: 'Payment for Services rendered'
})
.then(function(payment) {
  // payment was sucessful
})
.error(function(error) {
  // payment failed
})
````

