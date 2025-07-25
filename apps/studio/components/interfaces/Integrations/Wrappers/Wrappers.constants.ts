import { BASE_PATH } from 'lib/constants'
import { CreateIcebergWrapperSheet } from './CreateIcebergWrapperSheet'
import type { WrapperMeta } from './Wrappers.types'

export const WRAPPER_HANDLERS = {
  STRIPE: 'stripe_fdw_handler',
  FIREBASE: 'firebase_fdw_handler',
  S3: 's3_fdw_handler',
  CLICK_HOUSE: 'click_house_fdw_handler',
  BIG_QUERY: 'big_query_fdw_handler',
  AIRTABLE: 'airtable_fdw_handler',
  LOGFLARE: 'logflare_fdw_handler',
  AUTH0: 'auth0_fdw_handler',
  COGNITO: 'cognito_fdw_handler',
  MSSQL: 'mssql_fdw_handler',
  REDIS: 'redis_fdw_handler',
  ICEBERG: 'iceberg_fdw_handler',
  PADDLE: 'wasm_fdw_handler',
  SNOWFLAKE: 'wasm_fdw_handler',
  CAL: 'wasm_fdw_handler',
  CALENDLY: 'wasm_fdw_handler',
  CLERK: 'wasm_fdw_handler',
  NOTION: 'wasm_fdw_handler',
  SLACK: 'wasm_fdw_handler',
  CLOUDFLARE_D1: 'wasm_fdw_handler',
  HUBSPOT: 'wasm_fdw_handler',
  ORB: 'wasm_fdw_handler',
}

export const WRAPPERS: WrapperMeta[] = [
  {
    name: 'stripe_wrapper',
    handlerName: WRAPPER_HANDLERS.STRIPE,
    validatorName: 'stripe_fdw_validator',
    icon: `${BASE_PATH}/img/icons/stripe-icon.svg`,
    description: 'Payment processing and subscription management',
    extensionName: 'StripeFdw',
    label: 'Stripe',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/stripe',
    server: {
      options: [
        {
          name: 'api_key_id',
          label: 'Stripe Secret Key',
          required: true,
          encrypted: true,
          secureEntry: true,
          urlHelper: 'https://stripe.com/docs/keys',
        },
        {
          name: 'api_url',
          label: 'Stripe API URL',
          defaultValue: 'https://api.stripe.com/v1',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    tables: [
      {
        label: 'Accounts',
        description: 'List of accounts on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'business_type',
            type: 'text',
          },
          {
            name: 'country',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'accounts',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Balance',
        description: 'The balance currently on your Stripe account',
        availableColumns: [
          {
            name: 'balance_type',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'balance',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Balance Transactions',
        description: 'Transactions that have contributed to the balance on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'fee',
            type: 'bigint',
          },
          {
            name: 'net',
            type: 'bigint',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'balance_transactions',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Charges',
        description: 'Charges made on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'invoice',
            type: 'text',
          },
          {
            name: 'payment_intent',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'charges',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Checkout Sessions',
        description:
          "Customer's session as they pay for one-time purchases or subscriptions through Checkout or Payment Links",
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'payment_intent',
            type: 'text',
          },
          {
            name: 'subscription',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'checkout/sessions',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Customers',
        description: 'Customers on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'customers',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Disputes',
        description: 'When a customer questions your charge with their card issuer',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'charge',
            type: 'text',
          },
          {
            name: 'payment_intent',
            type: 'text',
          },
          {
            name: 'reason',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'disputes',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Events',
        description:
          "Stripe's way of letting you know when something interesting happens in your account",
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'api_version',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'events',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Files',
        description: "Files that are hosted on Stripe's servers",
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'filename',
            type: 'text',
          },
          {
            name: 'purpose',
            type: 'text',
          },
          {
            name: 'title',
            type: 'text',
          },
          {
            name: 'size',
            type: 'bigint',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'url',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'files',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'File Links',
        description: 'For sharing contents of a File object with non-Stripe users',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'file',
            type: 'text',
          },
          {
            name: 'url',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'expired',
            type: 'bool',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'file_links',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Invoices',
        description: 'Invoices on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'subscription',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'total',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'period_start',
            type: 'timestamp',
          },
          {
            name: 'period_end',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'invoices',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Mandates',
        description:
          'Records of the permission a customer has given you to debit their payment method',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'payment_method',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'mandates',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Meters',
        description: 'Records for tracking event usage in billing',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'display_name',
            type: 'text',
          },
          {
            name: 'event_name',
            type: 'text',
          },
          {
            name: 'event_time_window',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'billing/meters',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Payment Intents',
        description: 'Payment Intents on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'payment_method',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'payment_intents',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Payouts',
        description:
          'Created when you receive funds from Stripe, or when you initiate a payout to either a bank account or debit card',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'arrival_date',
            type: 'timestamp',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'statement_descriptor',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'payouts',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Prices',
        description:
          'A Price object is needed for all your products to facilitate multiple currencies and pricing options',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'active',
            type: 'bool',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'product',
            type: 'text',
          },
          {
            name: 'unit_amount',
            type: 'bigint',
          },
          {
            name: 'type',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'prices',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Products',
        description: 'Products on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'active',
            type: 'bool',
          },
          {
            name: 'default_price',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'updated',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'products',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Refunds',
        description:
          'Allows you to refund a charge that has previously been created but not yet refunded',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'charge',
            type: 'text',
          },
          {
            name: 'payment_intent',
            type: 'text',
          },
          {
            name: 'reason',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'refunds',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Setup Attempts',
        description: 'Attempted confirmations of a SetupIntent, either successful or unsuccessful',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'application',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'on_behalf_of',
            type: 'text',
          },
          {
            name: 'payment_method',
            type: 'text',
          },
          {
            name: 'setup_intent',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'usage',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'setup_attempts',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Setup Intents',
        description:
          "Guides you through the process of setting up and saving a customer's payment credentials for future payments",
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'client_secret',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'payment_method',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'usage',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'setup_intents',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Subscriptions',
        description: 'Subscriptions on your Stripe account',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'current_period_start',
            type: 'timestamp',
          },
          {
            name: 'current_period_end',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'subscriptions',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Tokens',
        description:
          'Tokenization is the process Stripe uses to collect sensitive card or bank account details in a secure manner',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'customer',
            type: 'text',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'current_period_start',
            type: 'timestamp',
          },
          {
            name: 'current_period_end',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'tokens',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Top-ups',
        description: 'To top up your Stripe balance',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'topups',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Transfers',
        description: 'When moving funds between Stripe accounts as part of Connect',
        availableColumns: [
          {
            name: 'id',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'currency',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'destination',
            type: 'text',
          },
          {
            name: 'created',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'transfers',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
    canTargetSchema: true,
    sourceSchemaOption: {
      name: 'source_schema',
      label: 'Source Schema',
      required: true,
      encrypted: false,
      secureEntry: false,
      readOnly: true,
      defaultValue: 'stripe',
    },
  },
  {
    name: 'firebase_wrapper',
    handlerName: WRAPPER_HANDLERS.FIREBASE,
    validatorName: 'firebase_fdw_validator',
    icon: `${BASE_PATH}/img/icons/firebase-icon.svg`,
    description: 'Backend-as-a-Service with real-time database',
    extensionName: 'FirebaseFdw',
    label: 'Firebase',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/firebase',
    server: {
      options: [
        {
          name: 'project_id',
          label: 'Project ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'sa_key_id',
          label: 'Service Account Key',
          required: true,
          encrypted: true,
          secureEntry: true,
          isTextArea: true,
          urlHelper: 'https://firebase.google.com/docs/admin/setup#initialize-sdk',
        },
      ],
    },
    tables: [
      {
        label: 'Users',
        description: 'Shows your Firebase users',
        availableColumns: [
          {
            name: 'uid',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'auth/users',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'base_url',
            label: 'Base URL',
            defaultValue: 'https://identitytoolkit.googleapis.com/v1/projects',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            name: 'limit',
            label: 'Limit',
            defaultValue: '10000',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Firestore Collection',
        description: 'Map to a Firestore collection',
        availableColumns: [
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            placeholder: 'firestore/[collection_id]',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            name: 'base_url',
            label: 'Base URL',
            defaultValue: 'https://firestore.googleapis.com/v1beta1/projects',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            name: 'limit',
            label: 'Limit',
            defaultValue: '10000',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 's3_wrapper',
    handlerName: WRAPPER_HANDLERS.S3,
    validatorName: 's3_fdw_validator',
    icon: `${BASE_PATH}/img/icons/s3-icon.svg`,
    description: 'Cloud object storage service',
    extensionName: 'S3Fdw',
    label: 'S3',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/s3',
    server: {
      options: [
        {
          name: 'vault_access_key_id',
          label: 'Access Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'vault_secret_access_key',
          label: 'Access Key Secret',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'aws_region',
          label: 'AWS Region',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'us-east-1',
        },
      ],
    },
    tables: [
      {
        label: 'S3 File',
        description: 'Map to a file in S3 (CSV or JSON only)',
        options: [
          {
            name: 'uri',
            label: 'URI',
            editable: true,
            required: true,
            placeholder: 's3://bucket/s3_table.csv',
            type: 'text',
          },
          {
            name: 'format',
            label: 'Format',
            editable: true,
            required: true,
            type: 'select',
            defaultValue: 'csv',
            options: [
              { label: 'CSV', value: 'csv' },
              { label: 'JSONL (JSON Lines)', value: 'jsonl' },
            ],
          },
          {
            name: 'has_header',
            label: 'Has Header',
            editable: true,
            required: true,
            type: 'select',
            defaultValue: 'true',
            options: [
              { label: 'True', value: 'true' },
              { label: 'False', value: 'false' },
            ],
          },
          {
            name: 'compress',
            label: 'Compression',
            editable: true,
            required: false,
            type: 'select',
            options: [{ label: 'GZIP', value: 'gzip' }],
          },
        ],
      },
    ],
  },
  {
    name: 'clickhouse_wrapper',
    handlerName: WRAPPER_HANDLERS.CLICK_HOUSE,
    validatorName: 'click_house_fdw_validator',
    icon: `${BASE_PATH}/img/icons/clickhouse-icon.svg`,
    description: 'Column-oriented analytics database',
    extensionName: 'ClickHouseFdw',
    label: 'ClickHouse',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/clickhouse',
    server: {
      options: [
        {
          name: 'conn_string_id',
          label: 'ClickHouse Connection String',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'ClickHouse Table',
        description: 'Map to a ClickHouse Table',
        options: [
          {
            name: 'table',
            label: 'ClickHouse Table Name',
            editable: true,
            required: true,
            placeholder: 'my_clickhouse_table',
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'bigquery_wrapper',
    handlerName: WRAPPER_HANDLERS.BIG_QUERY,
    validatorName: 'big_query_fdw_validator',
    icon: `${BASE_PATH}/img/icons/bigquery-icon.svg`,
    description: 'Serverless data warehouse and analytics',
    extensionName: 'BigQueryFdw',
    label: 'BigQuery',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/bigquery',
    server: {
      options: [
        {
          name: 'sa_key_id',
          label: 'Service Account Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'project_id',
          label: 'Project ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'dataset_id',
          label: 'Dataset ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    tables: [
      {
        label: 'BigQuery Table',
        description: 'Map to a BigQuery Table',
        options: [
          {
            name: 'table',
            label: 'BigQuery Table Name',
            editable: true,
            required: true,
            placeholder: 'my_bigquery_table',
            type: 'text',
          },
          {
            name: 'location',
            label: 'Location',
            defaultValue: 'US',
            editable: true,
            required: false,
            type: 'text',
          },
          {
            name: 'timeout',
            label: 'Timeout (ms)',
            defaultValue: '30000',
            editable: true,
            required: false,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'airtable_wrapper',
    handlerName: WRAPPER_HANDLERS.AIRTABLE,
    validatorName: 'airtable_fdw_validator',
    icon: `${BASE_PATH}/img/icons/airtable-icon.svg`,
    description: 'No-code database and spreadsheet platform',
    extensionName: 'airtableFdw',
    label: 'Airtable',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/airtable',
    server: {
      options: [
        {
          name: 'api_key_id',
          label: 'API Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Airtable Table',
        description: 'Map to an Airtable Table',
        options: [
          {
            name: 'base_id',
            label: 'Base ID',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            name: 'table_id',
            label: 'Table ID',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'logflare_wrapper',
    handlerName: WRAPPER_HANDLERS.LOGFLARE,
    validatorName: 'logflare_fdw_validator',
    icon: `${BASE_PATH}/img/icons/logflare-icon.svg`,
    description: 'Log management and analytics service',
    extensionName: 'logflareFdw',
    label: 'Logflare',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/logflare',
    server: {
      options: [
        {
          name: 'api_key_id',
          label: 'API Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Logflare Table',
        description: 'Map to a Logflare Table',
        options: [
          {
            name: 'endpoint',
            label: 'Endpoint',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'auth0_wrapper',
    handlerName: WRAPPER_HANDLERS.AUTH0,
    validatorName: 'auth0_fdw_validator',
    icon: `${BASE_PATH}/img/icons/auth0-icon.svg`,
    description: 'Identity and access management platform',
    extensionName: 'Auth0Fdw',
    label: 'Auth0',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/auth0',
    minimumExtensionVersion: '0.3.0',
    server: {
      options: [
        {
          name: 'api_key_id',
          label: 'Auth0 API key or PAT',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'url',
          label: 'Auth0 API URL',
          defaultValue: 'https://dev-<tenant-id>.us.auth0.com/api/v2/users',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    tables: [
      {
        label: 'Users',
        description: 'Auth0 Users',
        availableColumns: [
          {
            name: 'user_id',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'email_verified',
            type: 'boolean',
          },
          {
            name: 'username',
            type: 'text',
          },
          {
            name: 'phone_number',
            type: 'text',
          },
          {
            name: 'phone_verified',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'jsonb',
          },
          {
            name: 'updated_at',
            type: 'jsonb',
          },
          {
            name: 'identities',
            type: 'jsonb',
          },
          {
            name: 'app_metadata',
            type: 'jsonb',
          },
          {
            name: 'user_metadata',
            type: 'jsonb',
          },
          {
            name: 'picture',
            type: 'text',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'nickname',
            type: 'text',
          },
          {
            name: 'multifactor',
            type: 'jsonb',
          },
          {
            name: 'last_ip',
            type: 'text',
          },
          {
            name: 'last_login',
            type: 'jsonb',
          },
          {
            name: 'logins_count',
            type: 'integer',
          },
          {
            name: 'blocked',
            type: 'boolean',
          },
          {
            name: 'given_name',
            type: 'text',
          },
          {
            name: 'family_name',
            type: 'text',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'users',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'cognito_wrapper',
    handlerName: WRAPPER_HANDLERS.COGNITO,
    validatorName: 'cognito_fdw_validator',
    icon: `${BASE_PATH}/img/icons/cognito-icon.svg`,
    description: 'AWS user authentication and authorization',
    extensionName: 'CognitoFdw',
    label: 'Cognito',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/cognito',
    minimumExtensionVersion: '0.3.0',
    server: {
      options: [
        {
          name: 'aws_access_key_id',
          label: 'AWS Access Key ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'api_key_id',
          label: 'AWS Secret Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'region',
          label: 'Region',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'user_pool_id',
          label: 'User Pool ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    canTargetSchema: true,
    sourceSchemaOption: {
      name: 'source_schema',
      label: 'Source Schema',
      required: true,
      encrypted: false,
      secureEntry: false,
      readOnly: true,
      defaultValue: 'cognito',
    },
    tables: [
      {
        label: 'Users',
        description: 'Cognito Users',
        availableColumns: [
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'text',
          },
          {
            name: 'email_verified',
            type: 'boolean',
          },
          {
            name: 'identities',
            type: 'jsonb',
          },
          {
            name: 'username',
            type: 'text',
          },
          {
            name: 'status',
            type: 'text',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'users',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'mssql_wrapper',
    handlerName: WRAPPER_HANDLERS.MSSQL,
    validatorName: 'mssql_fdw_validator',
    icon: `${BASE_PATH}/img/icons/mssql-icon.svg`,
    description: 'Microsoft SQL Server database',
    extensionName: 'mssqlFdw',
    label: 'Microsoft SQL Server',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/mssql',
    minimumExtensionVersion: '0.3.0',
    server: {
      options: [
        {
          name: 'conn_string_id',
          label: 'Connection String',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Microsoft SQL Server Table',
        description: 'Map to an Microsoft SQL Server Table',
        options: [
          {
            name: 'table',
            label: 'MSSQL Table',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'redis_wrapper',
    handlerName: WRAPPER_HANDLERS.REDIS,
    validatorName: 'redis_fdw_validator',
    icon: `${BASE_PATH}/img/icons/redis-icon.svg`,
    description: 'In-memory data structure store',
    extensionName: 'redisFdw',
    label: 'Redis',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/redis',
    minimumExtensionVersion: '0.3.0',
    server: {
      options: [
        {
          name: 'conn_url_id',
          label: 'Connection URL',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Redis Table',
        description: 'Map to an Redis Table',
        options: [
          {
            name: 'src_type',
            label: 'Source Type',
            editable: true,
            required: true,
            type: 'select',
            defaultValue: 'list',
            options: [
              {
                label: 'list',
                value: 'list',
              },
              {
                label: 'set',
                value: 'set',
              },
              {
                label: 'hash',
                value: 'hash',
              },
              {
                label: 'zset',
                value: 'zset',
              },
              {
                label: 'stream',
                value: 'stream',
              },
              {
                label: 'multi_list',
                value: 'multi_list',
              },
              {
                label: 'multi_set',
                value: 'multi_set',
              },
              {
                label: 'multi_hash',
                value: 'multi_hash',
              },
              {
                label: 'multi_zset',
                value: 'multi_zset',
              },
            ],
          },
          {
            name: 'src_key',
            label: 'Source Key',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'paddle_wrapper',
    handlerName: WRAPPER_HANDLERS.PADDLE,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/paddle-icon.svg`,
    description: 'Subscription billing and payments platform',
    extensionName: 'paddleFdw',
    label: 'Paddle',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/paddle',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_paddle_fdw_v0.1.1/paddle_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:paddle-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.1',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'c5ac70bb2eef33693787b7d4efce9a83cde8d4fa40889d2037403a51263ba657',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'Paddle API URL',
          defaultValue: 'https://api.paddle.com',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'api_key_id',
          label: 'Paddle API Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Paddle Object',
        description: 'Map to an Paddle Object',
        options: [
          {
            name: 'object',
            label: 'Object',
            editable: true,
            required: true,
            type: 'select',
            defaultValue: 'products',
            options: [
              { label: 'Products', value: 'products' },
              { label: 'Prices', value: 'prices' },
              { label: 'Discounts', value: 'discounts' },
              { label: 'Customers', value: 'customers' },
              { label: 'Transactions', value: 'transactions' },
              { label: 'Reports', value: 'reports' },
              { label: 'Notification Settings', value: 'notification-settings' },
              { label: 'notifications', value: 'notifications' },
            ],
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'snowflake_wrapper',
    handlerName: WRAPPER_HANDLERS.SNOWFLAKE,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/snowflake-icon.svg`,
    description: 'Cloud data warehouse platform',
    extensionName: 'snowflakeFdw',
    label: 'Snowflake',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/snowflake',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_snowflake_fdw_v0.1.1/snowflake_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:snowflake-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.1',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '7aaafc7edc1726bc93ddc04452d41bda9e1a264a1df2ea9bf1b00b267543b860',
          hidden: true,
        },
        {
          name: 'account_identifier',
          label: 'Account Identifier',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'user',
          label: 'User',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'public_key_fingerprint',
          label: 'Public Key Fingerprint',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'private_key_id',
          label: 'Private Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Snowflake Table',
        description: 'Map to an Snowflake Table',
        options: [
          {
            name: 'table',
            label: 'Table',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            defaultValue: 'id',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'iceberg_wrapper',
    handlerName: WRAPPER_HANDLERS.ICEBERG,
    validatorName: 'iceberg_fdw_validator',
    icon: `${BASE_PATH}/img/icons/iceberg-icon.svg`,
    description: 'Iceberg is a data warehouse',
    extensionName: 'icebergFdw',
    label: 'Iceberg',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/iceberg',
    minimumExtensionVersion: '0.5.3',
    createComponent: CreateIcebergWrapperSheet,
    server: {
      // The fields are intentionally not required. The required flag is enforced in the create iceberg wrapper sheet.
      // In the edit wrapper sheet, all fields are shown and not required.
      options: [
        {
          name: 'vault_aws_access_key_id',
          label: 'AWS Access Key ID',
          required: false,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'vault_aws_secret_access_key',
          label: 'AWS Secret Access Key',
          required: false,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'region_name',
          label: 'Region Name',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'vault_aws_s3table_bucket_arn',
          label: 'AWS S3 Table Bucket ARN',
          required: false,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'vault_token',
          label: 'Token',
          required: false,
          encrypted: true,
          secureEntry: true,
        },
        {
          name: 'warehouse',
          label: 'Warehouse',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 's3.endpoint',
          label: 'S3 Endpoint',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'catalog_uri',
          label: 'Catalog URI',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    canTargetSchema: true,
    sourceSchemaOption: {
      name: 'source_schema',
      label: 'Source Schema',
      description: 'It should match the namespace of the Iceberg catalog.',
      required: true,
      encrypted: false,
      secureEntry: false,
      defaultValue: '',
    },
    tables: [],
  },
  {
    name: 'cal_wrapper',
    description: 'Cal.com is a scheduling platform',
    handlerName: WRAPPER_HANDLERS.CAL,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/cal-com-icon.svg`,
    extensionName: 'calFdw',
    label: 'Cal.com',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/cal',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_cal_fdw_v0.1.0/cal_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:cal-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'bca8a82d6c5f8da0aa58011940c4ddb40bb2c909c02dd89b488289c4fff890c1',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.cal.com/v2',
        },
        {
          name: 'api_key_id',
          label: 'API Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'My Profile',
        description: 'Shows your Cal profile',
        availableColumns: [
          {
            name: 'id',
            type: 'bigint',
          },
          {
            name: 'username',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'my_profile',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Event Types',
        description: 'Shows your Event Types',
        availableColumns: [
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'event-types',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Bookings',
        description: 'Shows your Bookings',
        availableColumns: [
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'bookings',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Calendars',
        description: 'Shows your Calendars',
        availableColumns: [
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'calendars',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Schedules',
        description: 'Shows your Schedules',
        availableColumns: [
          {
            name: 'id',
            type: 'bigint',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'schedules',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Conferencing',
        description: 'Shows conferencing',
        availableColumns: [
          {
            name: 'id',
            type: 'bigint',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'conferencing',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'calendly_wrapper',
    description: 'Calendly is a scheduling platform',
    handlerName: WRAPPER_HANDLERS.CALENDLY,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/calendly-icon.svg`,
    extensionName: 'calendlyFdw',
    label: 'Calendly',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/calendly',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_calendly_fdw_v0.1.0/calendly_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:calendly-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'aa17f1ce2b48b5d8d6cee4f61df4d6b23e9a333c3e5c7a10cec9aae619c156b9',
          hidden: true,
        },
        {
          name: 'organization',
          label: 'Organization URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://api.calendly.com/organizations/00000000-0000-0000-0000-000000000000',
        },
        {
          name: 'api_url',
          label: 'API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.calendly.com',
        },
        {
          name: 'api_key_id',
          label: 'API Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Current User',
        description: 'Get the current user used for the API request',
        availableColumns: [
          {
            name: 'uri',
            type: 'text',
          },
          {
            name: 'slug',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'current_user',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Event Types',
        description: 'Shows your Event Types',
        availableColumns: [
          {
            name: 'uri',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'event_types',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Groups',
        description: 'Shows your groups',
        availableColumns: [
          {
            name: 'uri',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'groups',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Organization Memberships',
        description: 'Shows your Organization Memberships',
        availableColumns: [
          {
            name: 'uri',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'organization_memberships',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Scheduled Events',
        description: 'Shows your scheduled events',
        availableColumns: [
          {
            name: 'uri',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'attrs',
            type: 'jsonb',
          },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'scheduled_events',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'clerk_wrapper',
    description: 'User Management Platform',
    handlerName: WRAPPER_HANDLERS.CLERK,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/clerk-icon.svg`,
    extensionName: 'clerkFdw',
    label: 'Clerk',
    docsUrl: 'https://skybase.com/docs/guides/database/extensions/wrappers/clerk',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_clerk_fdw_v0.1.0/clerk_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:clerk-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '613be26b59fa4c074e0b93f0db617fcd7b468d4d02edece0b1f85fdb683ebdc4',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'Clerk API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.clerk.com/v1',
        },
        {
          name: 'api_key_id',
          label: 'Clerk API Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Allow List',
        description: 'List of all identifiers allowed to sign up to an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'invitation_id', type: 'text' },
          { name: 'identifier', type: 'text' },
          { name: 'identifier_type', type: 'text' },
          { name: 'instance_id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'allowlist_identifiers',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Block List',
        description: 'List of all identifiers which are not allowed to access an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'identifier', type: 'text' },
          { name: 'identifier_type', type: 'text' },
          { name: 'instance_id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'blocklist_identifiers',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Domains',
        description: 'List of all domains for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'is_satellite', type: 'boolean' },
          { name: 'frontend_api_url', type: 'text' },
          { name: 'accounts_portal_url', type: 'text' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'domains',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Invitations',
        description: 'List of all non-revoked invitations for your application',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'email_address', type: 'text' },
          { name: 'url', type: 'text' },
          { name: 'revoked', type: 'boolean' },
          { name: 'status', type: 'text' },
          { name: 'expires_at', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'invitations',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'JWT Templates',
        description: 'List of all JWT templates',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'lifetime', type: 'bigint' },
          { name: 'allowed_clock_skew', type: 'bigint' },
          { name: 'custom_signing_key', type: 'boolean' },
          { name: 'signing_algorithm', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'jwt_templates',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'OAuth Applications',
        description: 'List of OAuth applications for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'instance_id', type: 'text' },
          { name: 'client_id', type: 'text' },
          { name: 'public', type: 'boolean' },
          { name: 'scopes', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'oauth_applications',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Organizations',
        description: 'List of organizations for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'slug', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'organizations',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Organization Invitations',
        description: 'List of organization invitations for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'email_address', type: 'text' },
          { name: 'role', type: 'text' },
          { name: 'role_name', type: 'text' },
          { name: 'organization_id', type: 'text' },
          { name: 'status', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'organization_invitations',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Organization Memberships',
        description: 'List of organization user memberships for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'role', type: 'text' },
          { name: 'role_name', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'organization_memberships',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Redirect URLs',
        description: 'List of all whitelisted redirect urls for the instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'url', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'redirect_urls',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'SAML Connections',
        description: 'List of SAML Connections for an instance',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'domain', type: 'text' },
          { name: 'active', type: 'boolean' },
          { name: 'provider', type: 'text' },
          { name: 'user_count', type: 'bigint' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'saml_connections',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Users',
        description: 'List of all users',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'external_id', type: 'text' },
          { name: 'username', type: 'text' },
          { name: 'first_name', type: 'text' },
          { name: 'last_name', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'users',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'notion_wrapper',
    description: 'Notion provides a versatile, ready-to-use solution for managing your data.',
    handlerName: WRAPPER_HANDLERS.NOTION,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/notion-icon.svg`,
    extensionName: 'NotionFdw',
    label: 'Notion',
    docsUrl: 'https://fdw.dev/catalog/notion/',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_notion_fdw_v0.1.1/notion_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:notion-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.1',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '6dea3014f462aafd0c051c37d163fe326e7650c26a7eb5d8017a30634b5a46de',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.notion.com/v1',
        },
        {
          name: 'api_key_id',
          label: 'Notion API Key',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Blocks',
        description: 'Notion Block content',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'page_id', type: 'text' },
          { name: 'type', type: 'text' },
          { name: 'created_time', type: 'timestamp' },
          { name: 'last_edited_time', type: 'timestamp' },
          { name: 'archived', type: 'boolean' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'block',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Pages',
        description: 'Notion Pages',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'url', type: 'text' },
          { name: 'created_time', type: 'timestamp' },
          { name: 'last_edited_time', type: 'timestamp' },
          { name: 'archived', type: 'boolean' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'page',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Databases',
        description: 'Notion Databases',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'url', type: 'text' },
          { name: 'created_time', type: 'timestamp' },
          { name: 'last_edited_time', type: 'timestamp' },
          { name: 'archived', type: 'boolean' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'database',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Users',
        description: 'Notion Users',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'type', type: 'text' },
          { name: 'avatar_url', type: 'text' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'user',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'slack_wrapper',
    description:
      'Query Slack workspaces, channels, messages, users, files, and more via the Slack API.',
    handlerName: WRAPPER_HANDLERS.SLACK,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/slack-icon.svg`,
    extensionName: 'SlackFdw',
    label: 'Slack',
    docsUrl: 'https://fdw.dev/catalog/slack/',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_slack_fdw_v0.1.0/slack_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:slack-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '5b022b441c0007e31d792ecb1341bfffed1c29cb865eb0c7969989dff0e8fdc3',
          hidden: true,
        },
        {
          name: 'api_token_id',
          label: 'Slack Bot User OAuth Token',
          required: true,
          encrypted: true,
          secureEntry: true,
          urlHelper: 'https://api.slack.com/apps',
        },
        {
          name: 'workspace',
          label: 'Workspace',
          required: false,
          encrypted: false,
          secureEntry: false,
        },
      ],
    },
    tables: [
      {
        label: 'Channels',
        description: 'All channels in the workspace',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'is_private', type: 'boolean' },
          { name: 'created', type: 'timestamp' },
          { name: 'creator', type: 'text' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'channels',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Messages',
        description: 'Messages from channels, DMs, and group messages',
        availableColumns: [
          { name: 'ts', type: 'text' },
          { name: 'user_id', type: 'text' },
          { name: 'channel_id', type: 'text' },
          { name: 'text', type: 'text' },
          { name: 'thread_ts', type: 'text' },
          { name: 'reply_count', type: 'integer' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'messages',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Users',
        description: 'All users in the workspace',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'real_name', type: 'text' },
          { name: 'display_name', type: 'text' },
          { name: 'display_name_normalized', type: 'text' },
          { name: 'real_name_normalized', type: 'text' },
          { name: 'email', type: 'text' },
          { name: 'phone', type: 'text' },
          { name: 'skype', type: 'text' },
          { name: 'is_admin', type: 'boolean' },
          { name: 'is_owner', type: 'boolean' },
          { name: 'is_primary_owner', type: 'boolean' },
          { name: 'is_bot', type: 'boolean' },
          { name: 'is_app_user', type: 'boolean' },
          { name: 'is_restricted', type: 'boolean' },
          { name: 'is_ultra_restricted', type: 'boolean' },
          { name: 'deleted', type: 'boolean' },
          { name: 'status_text', type: 'text' },
          { name: 'status_emoji', type: 'text' },
          { name: 'status_expiration', type: 'bigint' },
          { name: 'title', type: 'text' },
          { name: 'team_id', type: 'text' },
          { name: 'team', type: 'text' },
          { name: 'tz', type: 'text' },
          { name: 'tz_label', type: 'text' },
          { name: 'tz_offset', type: 'integer' },
          { name: 'locale', type: 'text' },
          { name: 'image_24', type: 'text' },
          { name: 'image_48', type: 'text' },
          { name: 'image_72', type: 'text' },
          { name: 'image_192', type: 'text' },
          { name: 'image_512', type: 'text' },
          { name: 'color', type: 'text' },
          { name: 'updated', type: 'bigint' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'users',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'User Groups',
        description: 'User groups in the workspace',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'team_id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'handle', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'is_external', type: 'boolean' },
          { name: 'date_create', type: 'bigint' },
          { name: 'date_update', type: 'bigint' },
          { name: 'date_delete', type: 'bigint' },
          { name: 'auto_type', type: 'text' },
          { name: 'created_by', type: 'text' },
          { name: 'updated_by', type: 'text' },
          { name: 'deleted_by', type: 'text' },
          { name: 'user_count', type: 'integer' },
          { name: 'channel_count', type: 'integer' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'usergroups',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'User Group Members',
        description: 'Membership relation between users and user groups',
        availableColumns: [
          { name: 'usergroup_id', type: 'text' },
          { name: 'usergroup_name', type: 'text' },
          { name: 'usergroup_handle', type: 'text' },
          { name: 'user_id', type: 'text' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'usergroup_members',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Files',
        description: 'Files shared in the workspace',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'mimetype', type: 'text' },
          { name: 'size', type: 'bigint' },
          { name: 'url_private', type: 'text' },
          { name: 'user_id', type: 'text' },
          { name: 'created', type: 'timestamp' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'files',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Team Info',
        description: 'Information about the Slack team/workspace',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'domain', type: 'text' },
          { name: 'email_domain', type: 'text' },
        ],
        options: [
          {
            name: 'resource',
            defaultValue: 'team-info',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'cfd1_wrapper',
    description: 'Read and write data from Cloudflare D1 databases using the Wasm FDW.',
    handlerName: WRAPPER_HANDLERS.CLOUDFLARE_D1,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/cloudflare-icon.svg`,
    extensionName: 'Cfd1Fdw',
    label: 'Cloudflare D1',
    docsUrl: 'https://fdw.dev/catalog/cfd1/',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_cfd1_fdw_v0.1.0/cfd1_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:cfd1-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '783232834bb29dbd3ee6b09618c16f8a847286e63d05c54397d56c3e703fad31',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.cloudflare.com/client/v4/accounts/<account_id>/d1/database',
        },
        {
          name: 'account_id',
          label: 'Account ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'database_id',
          label: 'Database ID',
          required: true,
          encrypted: false,
          secureEntry: false,
        },
        {
          name: 'api_token_id',
          label: 'Cloudflare D1 API Token',
          required: true,
          encrypted: true,
          secureEntry: true,
          urlHelper: 'https://dash.cloudflare.com/profile/api-tokens',
        },
      ],
    },
    tables: [
      {
        label: 'D1 Databases',
        description: 'D1 databases in your Cloudflare account',
        availableColumns: [
          { name: 'uuid', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'version', type: 'text' },
          { name: 'num_tables', type: 'bigint' },
          { name: 'file_size', type: 'bigint' },
          { name: 'created_at', type: 'text' },
          { name: '_attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'table',
            defaultValue: '_meta_databases',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'D1 Table',
        description: 'A table in your D1 database (define columns to match your D1 schema)',
        availableColumns: [
          { name: 'id', type: 'bigint' },
          { name: 'name', type: 'text' },
          { name: 'amount', type: 'double precision' },
          { name: 'metadata', type: 'text' },
          { name: '_attrs', type: 'jsonb' },
        ],
        options: [
          {
            label: 'Table',
            name: 'table',
            placeholder: 'mytable',
            editable: true,
            required: true,
            type: 'text',
          },
          {
            label: 'Row ID Column',
            name: 'rowid_column',
            placeholder: 'id',
            defaultValue: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'hubspot_wrapper',
    description: 'Query and sync HubSpot CRM data using the Wasm FDW.',
    handlerName: WRAPPER_HANDLERS.HUBSPOT,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/hubspot-icon.svg`,
    extensionName: 'HubspotFdw',
    label: 'HubSpot',
    docsUrl: 'https://fdw.dev/catalog/hubspot/',
    minimumExtensionVersion: '0.4.0',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_hubspot_fdw_v0.1.0/hubspot_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:hubspot-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '2cbf39e9e28aa732a225db09b2186a2342c44697d4fa047652d358e292ba5521',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.hubapi.com/crm/v3',
        },
        {
          name: 'api_key_id',
          label: 'HubSpot API Key',
          required: true,
          encrypted: true,
          secureEntry: true,
          urlHelper:
            'https://developers.hubspot.com/docs/guides/apps/authentication/intro-to-auth#private-app-access-tokens',
        },
      ],
    },
    tables: [
      {
        label: 'Companies',
        description: 'Companies and organizations in your HubSpot CRM',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'domain', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/companies',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Contacts',
        description: 'Contacts in your HubSpot CRM',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'email', type: 'text' },
          { name: 'firstname', type: 'text' },
          { name: 'lastname', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/contacts',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Deals',
        description: 'Deals and transactions in your HubSpot CRM',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/deals',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Tickets',
        description: 'Customer service requests in your HubSpot CRM',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'subject', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/tickets',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Products',
        description: 'Products offered by your company in HubSpot',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/products',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Leads',
        description: 'Potential customers in your HubSpot CRM',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/leads',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Partner Clients',
        description: 'Partner clients managed by your company in HubSpot',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/partner_clients',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Feedback Submissions',
        description: 'Feedback submissions from NPS, CSAT, CES, and custom surveys',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/feedback_submissions',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Goals',
        description: 'User-specific quotas for sales and services teams',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/goal_targets',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Partner Clients',
        description: 'Customers that Solutions Partners have a sold or managed relationship with',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            defaultValue: 'objects/partner_clients',
            editable: false,
            required: true,
            type: 'text',
          },
        ],
      },
      {
        label: 'Custom Object',
        description: 'Custom objects managed by your company in HubSpot',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            label: 'Object',
            name: 'object',
            placeholder: 'objects/<objectType> e.g. `objects/2-3508482`',
            defaultValue: 'objects/<objectType>',
            editable: true,
            required: true,
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'orb_wrapper',
    handlerName: WRAPPER_HANDLERS.ORB,
    validatorName: 'wasm_fdw_validator',
    icon: `${BASE_PATH}/img/icons/orb-icon.svg`,
    description: 'Usage-based billing and metering platform',
    extensionName: 'OrbFdw',
    minimumExtensionVersion: '0.4.0',
    label: 'Orb',
    docsUrl: 'https://fdw.dev/catalog/orb/',
    server: {
      options: [
        {
          name: 'fdw_package_url',
          label: 'FDW Package URL',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue:
            'https://github.com/skybase/wrappers/releases/download/wasm_orb_fdw_v0.1.0/orb_fdw.wasm',
          hidden: true,
        },
        {
          name: 'fdw_package_name',
          label: 'FDW Package Name',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'skybase:orb-fdw',
          hidden: true,
        },
        {
          name: 'fdw_package_version',
          label: 'FDW Package Version',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '0.1.0',
          hidden: true,
        },
        {
          name: 'fdw_package_checksum',
          label: 'FDW Package Checksum',
          required: true,
          encrypted: false,
          secureEntry: false,
          defaultValue: '89153a0a570257c231b78561cc909766731c828324585a5b6e2aa553902cb73a',
          hidden: true,
        },
        {
          name: 'api_url',
          label: 'Orb API URL',
          required: false,
          encrypted: false,
          secureEntry: false,
          defaultValue: 'https://api.withorb.com/v1',
        },
        {
          name: 'api_key_id',
          label: 'Orb API Key ID',
          required: true,
          encrypted: true,
          secureEntry: true,
        },
      ],
    },
    tables: [
      {
        label: 'Alerts',
        description: 'Alerts in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'type', type: 'text' },
          { name: 'enabled', type: 'boolean' },
          { name: 'customer_id', type: 'text' },
          { name: 'external_customer_id', type: 'text' },
          { name: 'subscription_id', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'alerts',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Coupons',
        description: 'Coupons in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'redemption_code', type: 'text' },
          { name: 'times_redeemed', type: 'bigint' },
          { name: 'duration_in_months', type: 'bigint' },
          { name: 'archived_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'coupons',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Credit Notes',
        description: 'Credit notes in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'type', type: 'text' },
          { name: 'total', type: 'numeric(18,2)' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'credit_notes',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Customers',
        description: 'Customers in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'email', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'auto_collection', type: 'boolean' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'customers',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Credits',
        description: 'Credits in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'customer_id', type: 'text' },
          { name: 'external_customer_id', type: 'text' },
          { name: 'balance', type: 'numeric(18,2)' },
          { name: 'status', type: 'text' },
          { name: 'effective_date', type: 'timestamp' },
          { name: 'expiry_date', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'credits',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Credits Ledger',
        description: 'Credits ledger in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'customer_id', type: 'text' },
          { name: 'external_customer_id', type: 'text' },
          { name: 'amount', type: 'numeric(18,2)' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'credits_ledger',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Dimensional Price Groups',
        description: 'Dimensional price groups in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'dimensional_price_groups',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Events Backfills',
        description: 'Events backfills in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'status', type: 'text' },
          { name: 'events_ingested', type: 'bigint' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'events_backfills',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Events Volume',
        description: 'Events volume in Orb',
        availableColumns: [
          { name: 'count', type: 'bigint' },
          { name: 'timeframe_start', type: 'timestamp' },
          { name: 'timeframe_end', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'events_volume',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Invoices',
        description: 'Invoices in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'invoice_number', type: 'text' },
          { name: 'customer_id', type: 'text' },
          { name: 'external_customer_id', type: 'text' },
          { name: 'subscription_id', type: 'text' },
          { name: 'status', type: 'text' },
          { name: 'amount_due', type: 'numeric(18,2)' },
          { name: 'currency', type: 'text' },
          { name: 'due_date', type: 'timestamp' },
          { name: 'issued_at', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'invoices',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Items',
        description: 'Items in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'items',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Metrics',
        description: 'Metrics in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'status', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'metrics',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Plans',
        description: 'Plans in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'status', type: 'text' },
          { name: 'maximum_amount', type: 'numeric(18,2)' },
          { name: 'minimum_amount', type: 'numeric(18,2)' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'plans',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Prices',
        description: 'Prices in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'name', type: 'text' },
          { name: 'external_price_id', type: 'text' },
          { name: 'price_type', type: 'text' },
          { name: 'maximum_amount', type: 'numeric(18,2)' },
          { name: 'minimum_amount', type: 'numeric(18,2)' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'prices',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
      {
        label: 'Subscriptions',
        description: 'Subscriptions in Orb',
        availableColumns: [
          { name: 'id', type: 'text' },
          { name: 'customer_id', type: 'text' },
          { name: 'external_customer_id', type: 'text' },
          { name: 'billing_cycle_day', type: 'bigint' },
          { name: 'status', type: 'text' },
          { name: 'start_date', type: 'timestamp' },
          { name: 'end_date', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'attrs', type: 'jsonb' },
        ],
        options: [
          {
            name: 'object',
            label: 'Object',
            defaultValue: 'subscriptions',
            editable: false,
            required: true,
            type: 'text',
          },
          {
            name: 'rowid_column',
            label: 'Row ID Column',
            placeholder: 'id',
            editable: true,
            required: false,
            type: 'text',
          },
        ],
      },
    ],
  },
]
