const axios = require("axios");
const crypto = require("crypto");
const version = "npm-opennode-v1.1.0";
let instance = undefined;
let api_key;
let env;

function setCredentials(key = "", environment = "live") {
  if (instance != undefined) return;

  api_key = key;
  instance = axios.create();
  env = environment;
  instance.defaults.baseURL =
    environment === "live"
      ? "https://api.opennode.co/v1"
      : "https://dev-api.opennode.co/v1";
  instance.defaults.timeout = 15000;
  instance.defaults.headers = { Authorization: api_key, user_agent: version };
}

async function createCharge(charge) {
  try {
    const response = await instance.post(`/charges`, charge);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function chargeInfo(id) {
  try {
    const response = await instance.get(`/charge/${id}`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function listCharges() {
  try {
    const response = await instance.get(`/charges`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function initiateWithdrawal(withdrawal) {
  try {
    console.warn(
      `This method is deprecated and not recommend for use. Please use the asynchronous version (initiateWithdrawalAsync)`
    );

    const response = await instance.post(`/withdrawals`, withdrawal);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function withdrawalInfo(id) {
  try {
    const response = await instance.get(`/withdrawal/${id}`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function listWithdrawals() {
  try {
    const response = await instance.get(`/withdrawals`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function listRates() {
  try {
    const response = await instance.get(`/rates`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function listCurrencies() {
  try {
    const response = await instance.get(`/currencies`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function userBalance() {
  try {
    const response = await instance.get(`/account/balance`);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function initiateWithdrawalAsync(withdrawal) {
  try {
    let new_instance = axios.create();
    new_instance.defaults.baseURL =
      env === "live"
        ? "https://api.opennode.co/v2"
        : "https://dev-api.opennode.co/v2";
    new_instance.defaults.timeout = 15000;
    new_instance.defaults.headers = {
      Authorization: api_key,
      user_agent: version
    };

    const response = await new_instance.post("/withdrawals", withdrawal);
    return response.data.data;
  } catch (error) {
    throw Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.message
    );
  }
}

async function verifySignature(charge) {
  const hash = crypto
    .createHmac("sha256", api_key)
    .update(charge.id)
    .digest("hex");
  return hash === charge.hashed_order;
}

function Exception(statusCode, statusText, message) {
  let error = new Error(message);
  error.name = statusText;
  error.status = statusCode;

  return error;
}

module.exports = {
  setCredentials: setCredentials,
  createCharge: createCharge,
  chargeInfo: chargeInfo,
  listCharges: listCharges,
  initiateWithdrawal: initiateWithdrawal,
  initiateWithdrawalAsync: initiateWithdrawalAsync,
  withdrawalInfo: withdrawalInfo,
  listWithdrawals: listWithdrawals,
  listRates: listRates,
  listCurrencies: listCurrencies,
  signatureIsValid: verifySignature,
  getBalance: userBalance
};
