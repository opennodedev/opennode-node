const axios = require('axios');
const crypto = require('crypto');
const version = 'npm-opennode-v1.2.0';


class OpenNodeClient {
  constructor(key = '', environment = 'live') {
    this.api_key = key;
    this.instance = axios.create();
    this.instance_v2 = axios.create();
    this.env = environment;
    this.instance.defaults.baseURL = (environment === 'live') ? 'https://api.opennode.com/v1' : 'https://dev-api.opennode.com/v1';
    this.instance.defaults.timeout = 15000;
    this.instance.defaults.headers = { 'Authorization': this.api_key, 'user_agent': version };
    this.instance_v2.defaults.baseURL = (this.env === 'live') ? 'https://api.opennode.com/v2' : 'https://dev-api.opennode.com/v2';
    this.instance_v2.defaults.timeout = 15000;
    this.instance_v2.defaults.headers = { 'Authorization': this.api_key, 'user_agent': version };
  }

  async createCharge(charge) {
    try {

      const response = await this.instance.post(`/charges`, charge);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async chargeInfo(id) {
    try {
      const response = await this.instance.get(`/charge/${id}`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async listCharges() {
    try {

      const response = await this.instance.get(`/charges`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async initiateWithdrawal(withdrawal) {
    try {
      console.warn(`This method is deprecated and not recommend for use. Please use the asynchronous version (initiateWithdrawalAsync)`);

      const response = await this.instance.post(`/withdrawals`, withdrawal);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async withdrawalInfo(id) {
    try {

      const response = await this.instance.get(`/withdrawal/${id}`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async listWithdrawals() {
    try {

      const response = await this.instance.get(`/withdrawals`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async listRates() {
    try {

      const response = await this.instance.get(`/rates`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async listCurrencies() {
    try {

      const response = await this.instance.get(`/currencies`);
      return response.data.data;

    } catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async userBalance() {
    try {
      const response = await this.instance.get(`/account/balance`);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async initiateWithdrawalAsync(withdrawal) {
    try {
      const response = await this.instance_v2.post('/withdrawals', withdrawal);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  verifySignature(charge) {
    const hash = crypto.createHmac('sha256', this.api_key).update(charge.id).digest('hex');
    return hash === charge.hashed_order;
  }

  async refundCharge(refund) {
    try {
      const response = await this.instance.post(`/refunds`, refund);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async listRefunds() {
    try {
      const response = await this.instance.get(`/refunds`);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async refundInfo(id) {
    try {
      const response = await this.instance.get(`/refund/${id}`);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async initiatePayout(payout) {
    try {
      const response = await this.instance_v2.post('/payouts', payout);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async payoutInfo(id) {
    try {
      const response = await this.instance_v2.get(`/payout/${id}`);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }

  async createLnUrlWithdrawal(withdrawal) {
    try {
      const response = await this.instance_v2.post(`/lnurl-withdrawal`, withdrawal);
      return response.data.data;
    }
    catch (error) {
      throw Exception(error.response.status, error.response.statusText, error.response.data.message);
    }
  }
}

function Exception(statusCode, statusText, message) {
  var error = new Error(message);
  error.name = statusText;
  error.status = statusCode;

  return error;
}


module.exports = OpenNodeClient;
