import { Decimal } from "@prisma/client/runtime/library";
import { RecurringPaymentInterval, RecurringPaymentStatus } from "./payment.service";

export const depositSchema = {
    type: 'object',
    required: ['accountId', 'amount'],
    properties: {
        accountId: { type: 'number' },
        amount: { type: 'number', minimum: 0.01 },
        currency: { type: 'string', minLength: 3, maxLength: 3 },
    },
};

// TypeScript types based on JSON Schema
export interface DepositDTO {
    accountId: number;
    amount: Decimal;
    currency: string;
}

export const withdrawalSchema = {
    type: 'object',
    required: ['accountId', 'amount'],
    properties: {
        accountId: { type: 'number' },
        amount: { type: 'number', minimum: 0.01 },
        currency: { type: 'string', minLength: 3, maxLength: 3 },
    },
};

// TypeScript types based on JSON Schema
export interface WithdrawalDTO {
    accountId: number;
    amount: Decimal;
    currency: string;
}

export const transferSchema = {
    type: 'object',
    required: ['fromAccountId', 'toAccountId', 'amount'],
    properties: {
        fromAccountId: { type: 'number' },
        toAccountId: { type: 'number' },
        amount: { type: 'number', minimum: 0.01 },
        currency: { type: 'string', minLength: 3, maxLength: 3 },
    },
};

// TypeScript types based on JSON Schema
export interface TransferDTO {
    fromAccountId: number;
    toAccountId: number;
    amount: Decimal;
    currency: string;
}

export const recurringPaymentSchema = {
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



