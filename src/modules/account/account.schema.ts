export const createAccountSchema = {
    type: 'object',
    required: ['type', 'balance'],
    properties: {
        type: { type: 'string', minLength: 1 },
        balance: { type: 'number', minimum: 0 },
        currency: { type: 'string', minLength: 3, maxLength: 3 },
    },
};

export const getAccountsSchema = {
    type: 'object',
    properties: {
        userId: { type: 'integer', minimum: 1 },
    },
};

export const getAccountHistorySchema = {
    type: 'object',
    properties: {
        accountId: { type: 'integer', minimum: 1 },
    },
};

// TypeScript types based on JSON Schema
export interface CreateAccountDTO {
    type: string;
    balance: number;
    currency: string;
}

export interface GetAccountsDTO {
    userId: number;
}

export interface GetAccountHistoryDTO {
    accountId: number;
}