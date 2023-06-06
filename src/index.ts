import { OpenNodeClient } from "./client";
import { OpenNodeEnv, v1, v2 } from "./types";

export { OpenNodeClient } from "./client";
export { OpenNodeError } from "./OpenNodeError";
export * from "./types";

let instance!: OpenNodeClient;

export function setCredentials(
  key: string,
  environment: OpenNodeEnv = "live"
): void {
  if (instance !== undefined) {
    process.emitWarning(
      "opennode.setCredentials was called multiple times",
      "OpenNode-SetCred",
      "OPND001"
    );
    return;
  }

  instance = new OpenNodeClient(key, environment);
}

export function createCharge(
  charge: v1.OpenNodeChargeRequest
): Promise<v1.OpenNodeCharge> {
  return instance.createCharge(charge);
}

export function chargeInfo(id: string): Promise<v1.OpenNodeCharge> {
  return instance.chargeInfo(id);
}

export function listCharges(): Promise<v1.OpenNodeCharge[]> {
  return instance.listCharges();
}

export function initiateWithdrawal(
  withdrawal: v1.OpenNodeWithdrawalRequest
): Promise<v1.OpenNodeWithdrawal> {
  return instance.initiateWithdrawal(withdrawal);
}

export function initiateExchange(
  exchange: v2.OpenNodeExchangeRequest
): Promise<v2.OpenNodeExchange> {
  return instance.initiateExchange(exchange);
}

export function withdrawalInfo(id: string): Promise<v1.OpenNodeWithdrawal> {
  return instance.withdrawalInfo(id);
}

export function listWithdrawals(): Promise<v1.OpenNodeWithdrawal[]> {
  return instance.listWithdrawals();
}

export function listRates(): Promise<v1.OpenNodeRates> {
  return instance.listRates();
}

export function listCurrencies(): Promise<string[]> {
  return instance.listCurrencies();
}

/** @deprecated Use {@link accountBalance} */
export function getBalance(): Promise<v1.OpenNodeBalance> {
  return instance.userBalance();
}

export function accountBalance(): Promise<v1.OpenNodeBalance> {
  return instance.accountBalance();
}

export function initiateWithdrawalAsync(
  withdrawal: v2.OpenNodeWithdrawalOnchainRequest
): Promise<v2.OpenNodeWithdrawal> {
  return instance.initiateWithdrawalAsync(withdrawal);
}

export function signatureIsValid(charge: v1.OpenNodeChargeWebhook): boolean {
  return instance.verifySignature(charge);
}

export function refundCharge(
  refund: v1.OpenNodeRefundRequest
): Promise<v1.OpenNodeRefund> {
  return instance.refundCharge(refund);
}

export function listRefunds(): Promise<v1.OpenNodeRefund[]> {
  return instance.listRefunds();
}

export function refundInfo(id: string): Promise<v1.OpenNodeRefund> {
  return instance.refundInfo(id);
}

export function initiatePayout(
  payout: v2.OpenNodePayoutRequest
): Promise<v2.OpenNodePayout> {
  return instance.initiatePayout(payout);
}

export function payoutInfo(id: string): Promise<v2.OpenNodePayout> {
  return instance.payoutInfo(id);
}

export function createLnUrlWithdrawal(
  withdrawal: v2.OpenNodeLnURLWithdrawalRequest
): Promise<v2.OpenNodeWithdrawal> {
  return instance.createLnUrlWithdrawal(withdrawal);
}
