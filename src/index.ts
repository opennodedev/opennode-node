import { OpenNodeClient, OpenNodeEnv } from "./client";
import {
  OpenNodeBalance,
  OpenNodeCharge,
  OpenNodeChargeRequest,
  OpenNodeChargeWebhook,
  OpenNodeRates,
  OpenNodeRefund,
  OpenNodeRefundRequest,
  OpenNodeWithdrawal,
  OpenNodeWithdrawalRequest,
} from "./types/v1";
import * as v2 from "./types/v2";
import {
  OpenNodeExchangeRequest,
  OpenNodeLnURLWithdrawalRequest,
  OpenNodePayoutRequest,
  OpenNodeWithdrawalOnchainRequest,
} from "./types/v2";

export { OpenNodeClient, OpenNodeEnv } from "./client";
export { OpenNodeError } from "./OpenNodeError";
export * as v1 from "./types/v1";
export * as v2 from "./types/v2";

let instance!: OpenNodeClient;

export function setCredentials(
  key: string,
  environment: OpenNodeEnv = "live"
): void {
  if (instance !== undefined) {
    return;
  }

  instance = new OpenNodeClient(key, environment);
}

export function createCharge(
  charge: OpenNodeChargeRequest
): Promise<OpenNodeCharge> {
  return instance.createCharge(charge);
}

export function chargeInfo(id: string): Promise<OpenNodeCharge> {
  return instance.chargeInfo(id);
}

export function listCharges(): Promise<OpenNodeCharge[]> {
  return instance.listCharges();
}

export function initiateWithdrawal(
  withdrawal: OpenNodeWithdrawalRequest
): Promise<OpenNodeWithdrawal> {
  return instance.initiateWithdrawal(withdrawal);
}

export function initiateExchange(
  exchange: OpenNodeExchangeRequest
): Promise<v2.OpenNodeExchange> {
  return instance.initiateExchange(exchange);
}

export function withdrawalInfo(id: string): Promise<OpenNodeWithdrawal> {
  return instance.withdrawalInfo(id);
}

export function listWithdrawals(): Promise<OpenNodeWithdrawal[]> {
  return instance.listWithdrawals();
}

export function listRates(): Promise<OpenNodeRates> {
  return instance.listRates();
}

export function listCurrencies(): Promise<string[]> {
  return instance.listCurrencies();
}

/** @deprecated Use {@link accountBalance} */
export function userBalance(): Promise<OpenNodeBalance> {
  return instance.userBalance();
}

export function accountBalance(): Promise<OpenNodeBalance> {
  return instance.accountBalance();
}

export function initiateWithdrawalAsync(
  withdrawal: OpenNodeWithdrawalOnchainRequest
): Promise<v2.OpenNodeWithdrawal> {
  return instance.initiateWithdrawalAsync(withdrawal);
}

export function signatureIsValid(charge: OpenNodeChargeWebhook): boolean {
  return instance.verifySignature(charge);
}

export function refundCharge(
  refund: OpenNodeRefundRequest
): Promise<OpenNodeRefund> {
  return instance.refundCharge(refund);
}

export function listRefunds(): Promise<OpenNodeRefund[]> {
  return instance.listRefunds();
}

export function refundInfo(id: string): Promise<OpenNodeRefund> {
  return instance.refundInfo(id);
}

export function initiatePayout(
  payout: OpenNodePayoutRequest
): Promise<v2.OpenNodePayout> {
  return instance.initiatePayout(payout);
}

export function payoutInfo(id: string): Promise<v2.OpenNodePayout> {
  return instance.payoutInfo(id);
}

export function createLnUrlWithdrawal(
  withdrawal: OpenNodeLnURLWithdrawalRequest
): Promise<v2.OpenNodeWithdrawal> {
  return instance.createLnUrlWithdrawal(withdrawal);
}
