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

export interface OpenNodeLightningInvoice {
  id?: string;
  status?: string;
  price?: number;
  payreq: string;
  created_at?: string;
  expires_at: string;
  settled_at?: string | null;
  checkout_id?: string;
}

export interface OpenNodeCharge {
  /** Unique charge identifier */
  id: string;
  /** Charge description provided at creation */
  description: string;
  /** Amount in satoshis */
  price: number;
  /** Charge status: unpaid, paid, processing, underpaid, refunded, expired, failed */
  status: string;
  /** ISO timestamp when charge was created */
  created_at: string;
  /** ISO timestamp when charge expires */
  expires_at?: string;
  /** OpenNode fee in satoshis */
  fee?: number;
  /** Value in merchant's account currency */
  fiat_value: number;
  /** Original charge amount in the currency specified at creation */
  source_fiat_value: number;
  /** Currency code specified when creating the charge */
  currency: string;
  /** Whether the charge is configured to auto-settle to fiat */
  auto_settle?: boolean;
  /** Optional notes attached to the charge */
  notes?: string | null;
  /** Merchant's order ID if provided */
  order_id?: string | null;
  /** On-chain payment details */
  onchain?: unknown[];
  /** Lightning invoice details */
  lightning?: OpenNodeLightningInvoice | null;
  /** Custom metadata provided at charge creation */
  metadata?: Record<string, unknown>;
  /** Bitcoin address for on-chain payments */
  address: string;
  /** Whether the charge was exchanged to fiat */
  exchanged?: boolean;
  /** Net fiat value after fees */
  net_fiat_value?: number;
  /** Remaining amount in satoshis (for underpaid charges) */
  missing_amt?: number;
  /** ISO timestamp when charge was settled */
  settled_at?: string | null;
  /** Payment method used: lightning, onchain, or null if unpaid */
  payment_method?: string | null;
  /** Time-to-live in minutes */
  ttl?: number;
  /** Whether description hash was used */
  desc_hash?: boolean;
  /** URL to the hosted checkout page */
  hosted_checkout_url?: string;
  /** Customer site ID if applicable */
  customer_site_id?: string | null;
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
