# OpenNode Node.js Library

[![Version](https://img.shields.io/npm/v/opennode.svg)](https://www.npmjs.org/package/opennode)
[![Build Status](https://travis-ci.org/opennodedev/opennode-node.svg?branch=master)](https://travis-ci.org/opennodedev/opennode-node)
[![Try opennode on RunKit](https://badge.runkitcdn.com/opennode.svg)](https://npm.runkit.com/opennode)

The OpenNode Node library provides convenient access to the OpenNode API from
applications written in server-side JavaScript.

## Documentation

See the [API docs](https://opennode.co/docs).

## Installation

Install the package with:

    npm install opennode --save

## Usage

The package needs to be configured with your account's secret key which is
available in your [OpenNode Dashboard](https://opennode.co/settings/api).
value:

``` js
const opennode = require('opennode');
opennode.setCredentials('MY_API_KEY', 'dev'); //if no parameter given, default environment is 'live'

try {
  const charge = await opennode.createCharge({
    amount: 10.5,
    currency: "USD",
    callback_url: "https://example.com/webhook/opennode",
    auto_settle: false
  });
}
catch (error) {
  console.error(`${error.status} | ${error.message}`);
}
```

### Using Promises

Every method returns a chainable promise which can be used instead of a regular
callback:

```js
// Create a new charge
opennode.createCharge({
  amount: 10.5,
  currency: "USD",
  callback_url: "https://example.com/webhook/opennode",
  auto_settle: false
}).then(charge => {
  console.log(charge);
})
.catch(error => {
  console.error(`${error.status} | ${error.message}`);
});
```

### Webhook signing

OpenNode can send signed webhook events that notify your aplication any time a specific event occurs. You can read more about it [here](https://opennode.co/docs).

You can verify if a webhook was sent by OpenNode by comparing the signatures.

```js

function handleWebhook (req, res) {
  const charge = req.body;
  const isValid = opennode.signatureIsValid(charge);

  if (isValid){
    //Handle event
  }

  return res.sendStatus(200);
}
```
