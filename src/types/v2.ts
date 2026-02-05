export interface OpenNodePayoutTransferRequest {
  /** Use `id` for internal transfers. `managed` to transfers to managed accounts */
  type: "id" | "managed";
  /** Recipient's OpenNode ID (see Business profile page on dashboard) or managed account ID */
  address: string;
  /** Amount (denominated by {@link currency}) */
  amount: string;
  /** Currency of that transfer (if not set defaults to the same currenct as the payout source wallet) */
  currency?: string;
}

export interface OpenNodePayoutRequest {
  /** Your source wallet (e.g: BTC or USD/EUR/GBP) */
  wallet: string;

  transfers: OpenNodePayoutTransferRequest[];

  /** URL to receive webhooks for payout status updates */
  webhook_url?: string;

  external_funding?: boolean;
}

export interface OpenNodePayout {
  id: string;
  amount: number;
  status: string;
  currency: string;
  processed_at: number;
  created_at: number;
  fee: number;
  source_amount: number;
  source_fee: number;
  source_wallet: string;
  transfers: { id: string }[];
  external_funding: boolean;
}

export type OpenNodeExchangeRequest = {
  to: "btc" | "fiat";

  /** Amount intended to be exchanged in merchant's local currency. */
  fiat_amount?: number;

  /** Amount intended to be exchanged in satoshis. */
  btc_amount?: number;

  /** Defaults to `true` */
  auto_confirm?: boolean;
};

export interface OpenNodeExchange {
  success: boolean;
  id: string;
  btc_amount: number;
  fiat_amount: number;
  fiat_currency: string;
  expires_at: number;
}

export type OpenNodeWithdrawalRequest =
  | OpenNodeWithdrawalOnchainRequest
  | OpenNodeWithdrawalLnRequest
  | OpenNodeWithdrawalWireRequest;

export interface OpenNodeWithdrawalOnchainRequest {
  /**
   * Type `chain` (on-chain)
   */
  type: "chain";

  /**
   * Amount intended to be withdrawn from the account (denominated by {@link currency}).
   */
  amount: number;

  /** Defaults to `BTC` */
  currency?: string;

  /**
   * On-chain address that funds will be withdrawn to.
   */
  address: string;

  /**
   * URL to receive webhooks for withdrawal status updates
   */
  callback_url?: string;

  /** Source of funds to perform withdrawal. If `fiat` will convert the necessary amount and withdrawal */
  wallet?: "fiat" | "btc";

  /** Defaults to `true` */
  auto_confirm?: boolean;

  custom_id?: string;
}

export interface OpenNodeWithdrawalLnRequest {
  /**
   * Type `ln` (Lightning Network)
   */
  type: "ln";

  /**
   * Lightning Payment request.
   */
  payreq: string;

  /**
   * Amount intended to be withdrawn from the account (denominated in `sats` - only needed when payreq doesn't have amount).
   */
  amount?: number;

  /**
   * URL to receive webhooks for withdrawal status updates
   */
  callback_url?: string;

  /** Source of funds to perform withdrawal. If `fiat` will convert the necessary amount and withdrawal */
  wallet?: "fiat" | "btc";

  /** Defaults to `true` */
  auto_confirm?: boolean;

  custom_id?: string;
}

export interface OpenNodeWithdrawalWireRequest {
  /**
   * Type `wire` (bank transfer)
   */
  type: "wire";

  /**
   * Amount in user's fiat currency.
   */
  amount: number;
}

export interface OpenNodeWithdrawal {
  id: string;
  reference: string;
  type: string;
  amount: number;
  fee: number;
  fiat_value: number;
  custom_id: string;
  callback_url: string;
  processed_at: number;
  conversion?: {
    from: string;
    from_amount: number;
    to: string;
    to_amount: number;
  };
  expiry?: number;
  status: string;
}

export interface OpenNodeLnURLWithdrawalRequest {
  min_amt: number;
  max_amt: number;
  description: string;
  callback_url?: string;
  external_id?: string;
  expiry_date?: number;
}

export interface OpenNodeLightningInvoice {
  id: string;
  status: string;
  price: number;
  payreq: string;
  created_at: string;
  expires_at: string;
  settled_at: string | null;
  checkout_id: string;
}

export interface OpenNodeChargeV2 {
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
  /** ISO timestamp when charge expires and we stop monitoring for payments */
  expires_at: string;
  /** OpenNode fee in satoshis */
  fee: number;
  /** Value in merchant's account currency (e.g., if account is USD, this is in USD) */
  fiat_value: number;
  /** Original charge amount in the currency specified at creation */
  source_fiat_value: number;
  /** Currency code specified when creating the charge (e.g., USD, EUR) */
  currency: string;
  /** Whether the charge is configured to auto-settle to fiat */
  auto_settle: boolean;
  /** Optional notes attached to the charge */
  notes: string | null;
  /** Merchant's order ID if provided */
  order_id: string | null;
  /** On-chain payment details */
  onchain: unknown[];
  /** Lightning invoice details */
  lightning: OpenNodeLightningInvoice | null;
  /** Custom metadata provided at charge creation */
  metadata: Record<string, unknown>;
  /** Bitcoin address for on-chain payments */
  address: string;
  /** Whether the charge was exchanged to fiat */
  exchanged: boolean;
  /** Net fiat value after fees */
  net_fiat_value: number;
  /** Remaining amount in satoshis (for underpaid charges) */
  missing_amt: number;
  /** ISO timestamp when charge was settled, null if not yet settled */
  settled_at: string | null;
  /** Payment method used: lightning, onchain, or null if unpaid */
  payment_method: string | null;
  /** Time-to-live in minutes */
  ttl: number;
  /** Whether description hash was used for the lightning invoice */
  desc_hash: boolean;
  /** URL to the hosted checkout page */
  hosted_checkout_url: string;
  /** Customer site ID if applicable */
  customer_site_id: string | null;
}
