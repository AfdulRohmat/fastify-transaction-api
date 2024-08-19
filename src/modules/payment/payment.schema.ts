import { Decimal } from "@prisma/client/runtime/library";
import { RecurringPaymentInterval, RecurringPaymentStatus } from "./payment.service";
import { FastifySchema } from "fastify";

export const depositSchema: FastifySchema = {
    description: 'Deposit Money',
    tags: ['Payment / Transaction'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        required: ['accountId', 'amount'],
        properties: {
            accountId: { type: 'number' },
            amount: { type: 'number', minimum: 0.01 },
            currency: { type: 'string', minLength: 3, maxLength: 3 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Transaction ID',
                            example: 5
                        },
                        amount: {
                            type: 'string',
                            description: 'Transaction amount',
                            example: '1000000'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency of the transaction amount',
                            example: 'IDR'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp of the transaction',
                            example: '2024-08-19T23:41:52.024Z'
                        },
                        type: {
                            type: 'string',
                            description: 'Transaction type',
                            example: 'Deposit'
                        },
                        status: {
                            type: 'string',
                            description: 'Transaction status',
                            example: 'Pending'
                        },
                        fromAccountId: {
                            type: 'number',
                            description: 'ID of the source account (null for deposits)',
                            example: 2
                        },
                        toAccountId: {
                            type: 'number',
                            description: 'ID of the destination account (null for withdrawals)',
                            example: 1
                        }
                    },
                },
                message: { type: 'string' },
            },
        },
    },
};

// TypeScript types based on JSON Schema
export interface DepositDTO {
    accountId: number;
    amount: Decimal;
    currency: string;
}

export const withdrawalSchema: FastifySchema = {
    description: 'Withdraw Money',
    tags: ['Payment / Transaction'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        required: ['accountId', 'amount'],
        properties: {
            accountId: { type: 'number' },
            amount: { type: 'number', minimum: 0.01 },
            currency: { type: 'string', minLength: 3, maxLength: 3 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Transaction ID',
                            example: 5
                        },
                        amount: {
                            type: 'string',
                            description: 'Transaction amount',
                            example: '1000000'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency of the transaction amount',
                            example: 'IDR'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp of the transaction',
                            example: '2024-08-19T23:41:52.024Z'
                        },
                        type: {
                            type: 'string',
                            description: 'Transaction type',
                            example: 'Deposit'
                        },
                        status: {
                            type: 'string',
                            description: 'Transaction status',
                            example: 'Pending'
                        },
                        fromAccountId: {
                            type: 'number',
                            description: 'ID of the source account (null for deposits)',
                            example: 2
                        },
                        toAccountId: {
                            type: 'number',
                            description: 'ID of the destination account (null for withdrawals)',
                            example: 1
                        }
                    },
                },
                message: { type: 'string' },
            },
        },
    },

};

// TypeScript types based on JSON Schema
export interface WithdrawalDTO {
    accountId: number;
    amount: Decimal;
    currency: string;
}

export const transferSchema: FastifySchema = {
    description: 'Transfer Money to Other Account',
    tags: ['Payment / Transaction'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        required: ['fromAccountId', 'toAccountId', 'amount'],
        properties: {
            fromAccountId: { type: 'number' },
            toAccountId: { type: 'number' },
            amount: { type: 'number', minimum: 0.01 },
            currency: { type: 'string', minLength: 3, maxLength: 3 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Transaction ID',
                            example: 5
                        },
                        amount: {
                            type: 'string',
                            description: 'Transaction amount',
                            example: '1000000'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency of the transaction amount',
                            example: 'IDR'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp of the transaction',
                            example: '2024-08-19T23:41:52.024Z'
                        },
                        type: {
                            type: 'string',
                            description: 'Transaction type',
                            example: 'Deposit'
                        },
                        status: {
                            type: 'string',
                            description: 'Transaction status',
                            example: 'Pending'
                        },
                        fromAccountId: {
                            type: 'number',
                            description: 'ID of the source account (null for deposits)',
                            example: 2
                        },
                        toAccountId: {
                            type: 'number',
                            description: 'ID of the destination account (null for withdrawals)',
                            example: 1
                        }
                    },
                },
                message: { type: 'string' },
            },
        },
    },

};

// TypeScript types based on JSON Schema
export interface TransferDTO {
    fromAccountId: number;
    toAccountId: number;
    amount: Decimal;
    currency: string;
}

export const recurringPaymentSchema: FastifySchema = {
    description: 'Create Recurring Payment on Cron Job',
    tags: ['Payment / Transaction'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        required: ['accountId', 'amount', 'currency', 'interval', 'startDate'],
        properties: {
            accountId: { type: 'number' },
            amount: { type: 'string', pattern: '^[0-9]+(\\.[0-9]{1,2})?$' }, // To represent Decimal values accurately
            currency: { type: 'string', minLength: 3, maxLength: 3 }, // Currency code should be 3 characters
            interval: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'yearly'] },
            startDate: { type: 'string', format: 'date-time' }, // ISO 8601 format
            endDate: { type: 'string', format: 'date-time' }, // Optional end date in ISO 8601 format
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Transaction ID',
                            example: 5
                        },
                        amount: {
                            type: 'string',
                            description: 'Transaction amount',
                            example: '1000000'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency of the transaction amount',
                            example: 'IDR'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp of the transaction',
                            example: '2024-08-19T23:41:52.024Z'
                        },
                        type: {
                            type: 'string',
                            description: 'Transaction type',
                            example: 'Deposit'
                        },
                        status: {
                            type: 'string',
                            description: 'Transaction status',
                            example: 'Pending'
                        },
                        fromAccountId: {
                            type: 'number',
                            description: 'ID of the source account (null for deposits)',
                            example: 2
                        },
                        toAccountId: {
                            type: 'number',
                            description: 'ID of the destination account (null for withdrawals)',
                            example: 1
                        }
                    },
                },
                message: { type: 'string' },
            },
        },
    },

};

// TypeScript types based on JSON Schema
export interface RecurringPaymentDTO {
    accountId: number;
    amount: Decimal; // Use Decimal type from Prisma for precision
    currency: string;
    interval: RecurringPaymentInterval.DAILY | RecurringPaymentInterval.WEEKLY | RecurringPaymentInterval.MONTHLY | RecurringPaymentInterval.YEARLY;
    startDate: Date; // Use Date type for ISO 8601 format
    endDate?: Date; // Optional end date

}



