import axios, { AxiosInstance } from "axios";
import { createHmac } from "node:crypto";
import { deprecate } from "node:util";
import { OpenNodeError } from "./OpenNodeError";
import { OpenNodeEnv } from "./types";
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

const version = require("../package.json")?.version || "local";
const packageVersion = `npm-opennode-v${version}`;

export class OpenNodeClient {
  public env: OpenNodeEnv;

  private api_key: string;
  private instanceV1: AxiosInstance;
  private instanceV2: AxiosInstance;

  constructor(key: string, environment: OpenNodeEnv = "live") {
    this.api_key = key;
    this.env = environment;

    const createInstance = (version: string): AxiosInstance => {
      const client = axios.create({
        baseURL:
          environment === "live"
            ? `https://api.opennode.com/${version}`
            : `https://dev-api.opennode.com/${version}`,
        timeout: 15000,
        headers: {
          Authorization: this.api_key,
          Connection: "Keep-Alive",
          "Content-Type": "application/json",
          "Keep-Alive": "timeout=10",
          "User-Agent": packageVersion,
        },
      });

      client.interceptors.response.use(
        // normalize responses
        ({ data }) => ("data" in data ? data.data : data),
        (err) => {
          if (axios.isAxiosError(err)) {
            // added to keep compatibility with previous versions
            throw new OpenNodeError(
              err.message,
              err.response?.statusText,
              err.response?.status
            );
          }

          if (err instanceof Error) throw err;

          return err;
        }
      );

      return client;
    };

    this.instanceV1 = createInstance("v1");
    this.instanceV2 = createInstance("v2");
  }

  async createCharge(charge: OpenNodeChargeRequest): Promise<OpenNodeCharge> {
    return this.instanceV1.post(`/charges`, charge);
  }

  async chargeInfo(id: string): Promise<OpenNodeCharge> {
    return this.instanceV1.get(`/charge/${id}`);
  }

  async listCharges(): Promise<OpenNodeCharge[]> {
    return this.instanceV1.get(`/charges`);
  }

  initiateWithdrawal = deprecate(
    (withdrawal: OpenNodeWithdrawalRequest): Promise<OpenNodeWithdrawal> => {
      return this.instanceV1.post(`/withdrawals`, withdrawal);
    },
    "This method is deprecated and not recommend for use. Please use the asynchronous version (initiateWithdrawalAsync)",
    "OPN001"
  );

  async withdrawalInfo(id: string): Promise<OpenNodeWithdrawal> {
    return this.instanceV1.get(`/withdrawal/${id}`);
  }

  async listWithdrawals(): Promise<OpenNodeWithdrawal[]> {
    return this.instanceV1.get(`/withdrawals`);
  }

  async listRates(): Promise<OpenNodeRates> {
    return this.instanceV1.get(`/rates`);
  }

  async listCurrencies(): Promise<string[]> {
    return this.instanceV1.get(`/currencies`);
  }

  /** @deprecated Use {@link accountBalance} */
  async getBalance() {
    return this.accountBalance();
  }

  /** @deprecated Use {@link accountBalance} */
  async userBalance() {
    return this.accountBalance();
  }

  async accountBalance(): Promise<OpenNodeBalance> {
    return this.instanceV1.get(`/account/balance`);
  }

  verifySignature(charge: OpenNodeChargeWebhook): boolean {
    const hash = createHmac("sha256", this.api_key)
      .update(charge.id)
      .digest("hex");
    return hash === charge.hashed_order;
  }

  async refundCharge(refund: OpenNodeRefundRequest): Promise<OpenNodeRefund> {
    return this.instanceV1.post(`/refunds`, refund);
  }

  async listRefunds(): Promise<OpenNodeRefund[]> {
    return this.instanceV1.get(`/refunds`);
  }

  async refundInfo(id: string): Promise<OpenNodeRefund> {
    return this.instanceV1.get(`/refund/${id}`);
  }

  async initiatePayout(
    payout: v2.OpenNodePayoutRequest
  ): Promise<v2.OpenNodePayout> {
    return this.instanceV2.post(`/payouts`, payout);
  }

  async payoutInfo(id: string): Promise<v2.OpenNodePayout> {
    return this.instanceV2.get(`/payout/${id}`);
  }

  async initiateExchange(
    exchange: v2.OpenNodeExchangeRequest
  ): Promise<v2.OpenNodeExchange> {
    return this.instanceV2.post("/exchanges", exchange);
  }

  async initiateWithdrawalAsync(
    withdrawal: v2.OpenNodeWithdrawalRequest
  ): Promise<v2.OpenNodeWithdrawal> {
    return this.instanceV2.post("/withdrawals", withdrawal);
  }

  async createLnUrlWithdrawal(
    lnUrlWithdrawal: v2.OpenNodeLnURLWithdrawalRequest
  ): Promise<v2.OpenNodeWithdrawal> {
    return this.instanceV2.post(`/lnurl-withdrawal`, lnUrlWithdrawal);
  }
}
