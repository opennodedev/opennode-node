# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-02-06

### Fixed

- `createCharge()` now returns consistent V2 response format matching `chargeInfo()`
  - `amount` → `price`
  - `lightning_invoice` → `lightning`
  - Timestamps now ISO 8601 format
- `chargeInfo()` now returns all fields from V1 (`callback_url`, `success_url`, `notif_email`, `uri`)
- Consolidated `OpenNodeCharge` type - removed separate `OpenNodeChargeV2`

### Changed

- `chargeInfo()` is now a superset of `createCharge()` (contains all fields plus extras like `fee`, `net_fiat_value`, etc.)

## [2.0.0] - 2026-02-05

### ⚠️ BREAKING CHANGES

- `chargeInfo()` now uses V2 endpoint (`/v2/charge/{id}`) with a different response shape:
  - `amount` → `price` (amount in satoshis)
  - `lightning_invoice` → `lightning` (full invoice object with additional fields)
  - `transactions` → `onchain` (on-chain payment details)
  - Timestamps now ISO 8601 format (`"2026-02-05T17:50:33.004Z"`) instead of Unix timestamps

### Added

- Top-level `expires_at` field - ISO timestamp when we stop monitoring for payments
- `lightning.id` - unique identifier for the lightning invoice
- `lightning.status` - invoice status (`pending`, `paid`, `expired`)
- `lightning.checkout_id` - parent charge ID
- `lightning.settled_at` - ISO timestamp when payment was received
- JSDoc descriptions for all `OpenNodeChargeV2` fields
- TypeScript types for V2 API responses (`OpenNodeChargeV2`)

### Fixed

- `fiat_value` now returns correct value (was incorrect in V1 response)
- `source_fiat_value` now returns correct value (was incorrect in V1 response)
- `auto_settle` now returns correct value (was incorrect in V1 response)

### Migration Guide

```diff
// Field name changes
- charge.amount
+ charge.price

- charge.lightning_invoice
+ charge.lightning

- charge.lightning_invoice.payreq
+ charge.lightning.payreq

- charge.transactions
+ charge.onchain

// Timestamp format changes
- charge.created_at  // 1770313833 (Unix)
+ charge.created_at  // "2026-02-05T17:50:33.004Z" (ISO)

// New fields
+ charge.expires_at           // when charge expires
+ charge.lightning.id         // invoice ID
+ charge.lightning.status     // invoice status
+ charge.lightning.settled_at // when paid
```

## [1.x.x] and earlier

See [GitHub releases](https://github.com/opennodedev/opennode-node/releases) for previous versions.
