const OpenNodeClient = require('../submodules/client')
var instance = undefined;


function setCredentials(key = '', environment = 'live') {
  if (instance !== undefined) return;

  instance = new OpenNodeClient(key, environment);
}

async function createCharge(charge) {
  return await instance.createCharge(charge);
}

async function chargeInfo(id) {
  return await instance.chargeInfo(id);
}

async function listCharges() {
  return await instance.listCharges();
}

async function initiateWithdrawal(withdrawal) {
  return await instance.initiateWithdrawal(withdrawal);
}

async function withdrawalInfo(id) {
  return await instance.withdrawalInfo(id);
}

async function listWithdrawals() {
  return await instance.listWithdrawals();
}

async function listRates() {
  return await instance.listRates();
}

async function listCurrencies() {
  return await instance.listCurrencies();
}

async function userBalance() {
  return await instance.userBalance();
}

async function initiateWithdrawalAsync(withdrawal) {
  return await instance.initiateWithdrawalAsync(withdrawal);
}

async function verifySignature(charge) {
  return await instance.verifySignature(charge);
}

async function refundCharge(refund) {
  return await instance.refundCharge(refund);
}

async function listRefunds() {
  return await instance.listRefunds();
}

async function refundInfo(id) {
  return await instance.refundInfo(id);
}

async function initiatePayout(payout) {
  return await instance.initiatePayout(payout);
}

async function payoutInfo(id) {
  return await instance.payoutInfo(id);
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
  getBalance: userBalance,
  refundCharge: refundCharge,
  listRefunds: listRefunds,
  refundInfo: refundInfo,
  initiatePayout: initiatePayout,
  payoutInfo: payoutInfo
};

