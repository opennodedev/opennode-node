const { assert, expect } = require('chai');
const opennode = require('../src/lib');
opennode.setCredentials('1f758b02-3405-45cf-8d71-f4462282a7ca', 'dev');

describe('charge', function() {
  describe('charge info', function() {
    it('should return a charge object', async () => {

      let charge, err

      try {
        charge = await opennode.chargeInfo('47bb5224-bf50-49d0-a317-4adfd345221a');
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        assert.deepEqual(charge.id, '47bb5224-bf50-49d0-a317-4adfd345221a');
      }

    });
  });

  describe('create charge', function() {
    it('should return a charge object', async () => {

      let charge, err

      try {
        charge = await opennode.createCharge({
          amount: 10.5,
          currency: "USD",
          callback_url: "https://example.com/webhook/opennode",
          auto_settle: false
        });
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        expect(charge).to.have.ownProperty('id');
      }
    });
  });

  describe('create charge with invalid parameters', function() {
    it('should return a (400) Bad Request', async () => {

      let charge, err

      try {
        charge = await opennode.createCharge({
          "description": "hello world"
        });
      } catch (error) {
        err = error;
      }
      finally {
        assert.deepEqual(err.status, 400);
      }
    });
  });
});

describe('utils', function() {
  describe('list currencies', function() {
    it('should return an object with supported currencies', async () => {

      let currencies, err;

      try {
        currencies = await opennode.listCurrencies();
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        expect(currencies).to.an('array');
      }
    });
  });

  describe('list rates', function() {
    it('should return an object with live rates', async () => {

      let rates, err;

      try {
        rates = await opennode.listRates();
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        expect(rates).to.an('object');
      }
    });
  });
});

describe('withdrawals', function() {
  describe('get withdrawal info', function() {
    it('should return a withdrawal object', async () => {

      let rates, err;

      try {
        rates = await opennode.withdrawalInfo('73488531-d391-4de5-9468-0f72df85220c');
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        expect(rates).to.an('object');
      }
    });
  });

  describe('create a withdrawal with wrong permissions', function() {
    it('should return a (401) Unauthorized', async () => {

      let withdrawal, err;

      try {
        withdrawal = await opennode.initiateWithdrawal({
          amount: 100000,
          type: "chain"
        });
      } catch (error) {
        err = error;
      }
      finally {
        assert.deepEqual(err.status, 401);
      }
    });
  });
});

describe('webhook', function() {
  describe('verify webhook signature', function() {
    it('signatures should match', async () => {

      let result, err;
      const charge = {
        id: '22b13c2f-3297-422d-9e7c-4f9a35651d38',
        hashed_order: 'ec3978d14a2d547a174fd4980f562f1f4a12953f069d60844f99088c7cd77f1b'
      };

      try {
        result = await opennode.signatureIsValid(charge);
      } catch (error) {
        err = error;
      }
      finally {
        expect(result).to.be.true;
        expect(err).to.be.an('undefined');
      }
    });
  });
});

describe('account', function() {
  describe('get user balance', function() {
    it('should return a balance object', async () => {

      let balance, err;

      try {
        balance = await opennode.getBalance();
      } catch (error) {
        err = error;
      }
      finally {
        expect(err).to.be.an('undefined');
        expect(balance).to.an('object');
      }
    });
  });
});
