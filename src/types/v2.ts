export interface OpenNodePayoutTransferRequest {
  /** Use type=email for internal transfers, type=managed to transfers to managed accounts */
  type: "email" | "managed";
  /** Recipient's OpenNode ID or managed account ID */
  address: string;
  /** Amount in source wallet's currency - i.e. if wallet=USD, amount is in USD */
  amount: string;
}

export interface OpenNodePayoutRequest {
  /** Your source wallet (e.g: BTC or USD/EUR/GBP) */
  wallet: string;

  transfers: OpenNodePayoutTransferRequest[];

  /** URL to receive webhooks for payout status updates */
  webhook_url?: string;
}

export interface OpenNodePayout {
  id: string;
  amount: number;
  status: string;
  currency: string;
  processed_at: string;
  created_at: string;
}

export interface OpenNodeExchangeFiatRequest {
  to: "fiat";

  /** Amount intended to be exchanged in merchant's local currency. */
  fiat_amount: number;
}

export interface OpenNodeExchangeBTCRequest {
  to: "btc";

  /** Amount intended to be exchanged in satoshis. */
  btc_amount: number;
}

export type OpenNodeExchangeRequest =
  | OpenNodeExchangeFiatRequest
  | OpenNodeExchangeBTCRequest;

export interface OpenNodeExchange {
  success: boolean;
  id: string;
  btc_amount: number;
  fiat_amount: number;
  fiat_currency: string;
}

export type OpenNodeWithdrawalRequest = OpenNodeWithdrawalOnchainRequest;

export interface OpenNodeWithdrawalOnchainRequest {
  /**
   * Determines type of the withdrawal.
   *
   * Options: `chain` (on-chain), `ln` (Lightning Network), `wire` (bank transfer)
   */
  type: "chain" | "ln" | "wire";

  /**
   * Amount intended to be withdrawn from the account.
   *
   * Required for type `chain` and `wire`.
   *
   * Amount in satoshis when type `chain` and `ln`.
   * Amount in user's fiat currency when type `wire`.
   */
  amount: number;

  /**
   * Address that funds will be withdrawn to.
   *
   * Required for type `chain` and `ln` withdrawals.
   *
   * Type `chain`: On-chain address. \
   * Type `ln`: Lightning Payment request.
   */
  address: string;

  /**
   * URL to receive webhooks for withdrawal status updates
   */
  callback_url: string;
}

export interface OpenNodeWithdrawal {
  id: string;
  reference: string;
  type: string;
  amount: number;
  fee: number;
  fiat_value: string;
  custom_id: string;
  callback_url: string;
  processed_at: number;
  status: string;
}

export interface OpenNodeLnURLWithdrawalRequest {
  min_amt: number;
  max_amt: number;
  callback_url?: string;
  external_id?: string;
  expiry_date?: string;
  description?: string;
}
