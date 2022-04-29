export = OpenNodeClient;

export type WithdrawalStatus = "failed" | "confirmed";

export type ChargeLifecycleStatus =
  | "unpaid"
  | "expired"
  | "processing"
  | "paid"
  | "underpaid"
  | "refunded";

export interface Refund {
  id: string;
  email: string;
  address: string;
  amount: number;
  fee: number;
  tx: any;
  status: string;
  created_at: number;
  processed_at: number;
  checkout_id: number;
};

/**
 * @param key (defaults to '')
 * @param environment (defaults to 'dev')
 */
declare class OpenNodeClient {
  constructor(key?: string, environment?: string);
  api_key: string;
  env: string;

  /**
   * Create a charge request.
   * @param amount Charge's price in satoshis, unless currency parameter is used.
   * @param notif_email Email to send payment receipt (customer).
   * @param success_url URL to redirect user after payment.
   * @param auto_settle Convert to merchant's currency (needs Bank account enabled).
   * @param ttl Charge's TTL (time to live) in minutes. Minimum 10, Maximum: 1440 (24H).
   */
  createCharge(charge: {
    amount: number;
    description?: string;
    currency?: string;
    customer_email?: string;
    notif_email?: string;
    customer_name?: string;
    order_id?: string;
    callback_url?: string;
    success_url?: string;
    auto_settle?: boolean;
    ttl?: number;
  }): Promise<{
    id: string;
    description: string;
    desc_hash: boolean;
    created_at: number;
    status: ChargeLifecycleStatus;
    amount: number;
    callback_url: string;
    success_url: string;
    hosted_checkout_url: string;
    order_id: string;
    currency: string;
    source_fiat_value: number;
    fiat_value: number;
    auto_settle: boolean;
    notif_email: string;
    address: string;
    metadata: any;
    chain_invoice: { address: string };
    uri: string;
    ttl: number;
    lightning_invoice: {
      expires_at: number;
      payreq: string;
    };
  }>;

  /**
   * Fetch account balances.
   */
  userBalance(): Promise<{ balance: { BTC: number; USD: number } }>;

  /**
   * Fetch list of currencies.
   */
  listCurrencies(): Promises<string[]>;

  /**
   * Fetch information about a specific charge by id.
   */
  chargeInfo(id: string): Promise<{
    id: string;
    description: string;
    amount: number;
    missing_amt: number;
    status: ChargeLifecycleStatus;
    fiat_value: number;
    source_fiat_value: number;
    currency: string;
    created_at: number;
    order_id: string;
    address: string;
    metadata: any;
    expires_at: string;
    auto_settle: boolean;
    lightning_invoice: {
      created_at: number;
      expires_at: number;
      payreq: string;
      settled_at: string;
    };
    chain_invoice: { address: string };
    transactions: any[];
    uri: string;
  }>;

  /**
   * Fetch a list of paid charges.
   */
  listCharges(): Promise<any[]>;

  /**
   * Fetch a list of rates by key pairs
   */
  listRates(): Promise<any>;

  /**
   * Verify signature by charge details.
   */
  verifySignature(charge: { id: string; hashed_order: string }): boolean;

  /**
   * Refund a given charge.
   */
  refundCharge(refund: {
    checkout_id: string;
    address: string;
    email?: string;
  }): Promise<Refund>;

  /**
   * Fetch a list of refunds.
   */
  listRefunds(): Promise<Refund[]>;

  /**
   * Fetch information about a given refund by id.
   */
  refundInfo(id: string): Promise<Refund>;

  /**
   * Initiate a payout.
   */
  initiatePayout(payout: {
    transfers: {
      type: string;
      address: string;
      amount: string;
    }[];
    wallet: string;
  }): Promise<{
    id: string;
    amount: number;
    status: string;
    currency: string;
    processed_at: string;
    created_at: string;
  }>;

  /**
   * Fetch information about a given payout by id.
   */
  payoutInfo(id: string): Promise<any>;

  /**
   * Fetch information about a given payout by id.
   * @param external_id An optional external ID to reference the withdrawal.
   */
  createLnUrlWithdrawal(withdrawal: {
    min_amt: number;
    max_amt: number;
    callback_url?: string;
    external_id?: string;
    expiry_date?: string;
    description?: string;
  }): Promise<any>;

  /**
   * Initiate a withdrawal.
   * @param type Types: "chain" (on-chain), "ln" (Lightning Network), "wire" (bank transfer)
   * @param amount Amount in satoshis for types "chain" and "ln" - Amount in user's fiat currency when type ="wire". Required for type "chain" and "wire".
   * @param address Type "chain": Bitcoin address, Type: "ln": Lightning Payment request. Not necessary for type "wire"
   */
  initiateWithdrawalAsync(withdrawal: {
    type: string;
    amount?: number;
    address?: string;
    callback_url?: string;
  }): Promise<{
    id: string;
    type: string;
    amount: number;
    reference: string;
    fee: number;
    status: string;
    processed_at: number;
  }>;

  /**
   * Fetch information about a given withdrawal by id.
   */
  withdrawalInfo(id: string): Promise<{
    id: string;
    amount: amount;
    type: string;
    reference: string;
    status: WithdrawalStatus;
    address: string;
    fee: number;
    fiat_value: number;
  }>;
}
