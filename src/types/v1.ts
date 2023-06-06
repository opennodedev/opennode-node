export interface OpenNodeChargeRequest {
  /**
   * Amount intended to be collected.
   * The default currency is in 'satoshis', specify 'currency' param for fiat amounts
   */
  amount: number;

  /**
   * Three-letter ISO currency code, in uppercase.
   * If specified will generate a charge for the equivalent amount of BTC at the current exchange rates
   */
  currency?: string;

  /** Arbitrary description string that will be attached to the charge */
  description?: string;

  /** Payers email for merchants internal use */
  customer_email?: string;

  /** Payers email for sending payment receipt after successful payment */
  notif_email?: string;

  /** Payers name for merchants internal use */
  customer_name?: string;

  /** Order id for merchants internal use */
  order_id?: string;

  /** URL to receive webhooks for payment status updates */
  callback_url?: string;

  /** URL to redirect user after successful payment */
  success_url?: string;

  /** Auto convert payment to fiat on successful payment (account fiat wallet must be enabled) */
  auto_settle?: boolean;

  /**
   * time to live in minutes.
   *
   * Min: `10` \
   * Max(Default): `1440` (24H)
   */
  ttl?: number;

  metadata?: Record<string, any>;

  /**
   * Basis points to auto convert checkout to `BTC`
   *
   * Max: `10000` (100%)
   */
  split_to_btc_bps?: number;

  /** Whether OpenNode should send an email to {@link notif_email} */
  notify_receiver?: boolean;

  /** Whether OpenNode should require KYC check of the payer */
  kyc_required?: boolean;

  /** Whether description should only be shown as a sha256 hash */
  desc_hash?: string;
}

export type OpenNodeChargeWebhook = { hashed_order: string } & OpenNodeCharge;

export interface OpenNodeCharge {
  id: string;
  description: string;
  amount: number;
  missing_amt: number;
  status: string;
  fiat_value: number;
  source_fiat_value: number;
  currency: string;
  created_at: number;
  order_id: string;
  address: string;
  metadata?: OpenNodeChargeMetadata;
  expires_at?: string;
  auto_settle?: boolean;
  chain_invoice?: OpenNodeOnchainInvoice;
  transactions?: OpenNodeChargeTransaction[];
}

export interface OpenNodeOnchainInvoice {
  address: string;
  settled_at: number;
  tx: string;
}

export interface OpenNodeChargeTransaction {
  address: string;
  created_at: number;
  settled_at: number;
  tx: string;
  status: string;
  amount: number;
}

export interface OpenNodeChargeMetadata {
  email: string;
  invoice_id: string;
}

export interface OpenNodeWithdrawalRequest {
  /** Determines type of the withdrawal. */
  type: "chain" | "ln" | "wire";

  /**
   * Amount intended to be withdrawn from the account.
   *
   * Required for type "chain" and "wire".
   *
   * Amount in satoshis when type "chain" and "ln". \
   * Amount in user's fiat currency when type "wire".
   */
  amount?: number;

  /**
   * Address that funds will be withdrawn to.
   *
   * Required for type "chain" and "ln" withdrawals. \
   * Type "chain": On-chain address \
   * Type "ln": Lightning Payment request.
   */
  address?: string;

  /** URL to receive webhooks for withdrawal status updates */
  callback_url?: string;
}

export interface OpenNodeWithdrawal {
  id: string;
  email: string;
  address: string;
  amount: string;
  fee: string;
  tx: string;
  status: string;
  created_at: number;
  processed_at: string;
  checkout_id: string;
}

/**
 * To avoid listing all possible currencies as nullable we set it as a record.
 *
 * E.g. if you account has USD as currency then it would be `{ USD: number }`
 */
type UserCurrencyRecord = {
  [fiatIso: string]: number;
};

export type OpenNodeRates = Record<
  string,
  { BTC: number; currency: string } & UserCurrencyRecord
>;

export interface OpenNodeBalance {
  balance: {
    BTC: number;
  } & UserCurrencyRecord;
}

export interface OpenNodeRefundRequest {
  /** Underpaid charge ID */
  checkout_id: string;

  /** Bitcoin address to send the funds */
  address: string;

  /** Buyer email to get notified of the refund */
  email?: string;
}

export interface OpenNodeRefund {
  id: string;
  email: string;
  address: string;
  amount: string;
  fee: string;
  tx: string;
  status: string;
  created_at: number;
  processed_at: string;
  checkout_id: string;
}
