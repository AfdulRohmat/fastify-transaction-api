import { FastifySchema } from "fastify";

export const createAccountSchema: FastifySchema = {
    description: 'Create Account',
    tags: ['Account'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        required: ['type', 'balance'],
        properties: {
            type: { type: 'string', minLength: 1 },
            balance: { type: 'number', minimum: 0 },
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
                            description: 'Account ID',
                            example: 3
                        },
                        type: {
                            type: 'string',
                            description: 'Account type',
                            example: 'rent'
                        },
                        balance: {
                            type: 'string',
                            description: 'Account balance',
                            example: '1500000'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency of the account balance',
                            example: 'IDR'
                        },
                        userId: {
                            type: 'number',
                            description: 'User ID associated with the account',
                            example: 1
                        }
                    },
                },
                message: { type: 'string' },
            },
        },
    },

};

export const getAccountsSchema: FastifySchema = {
    description: 'Get Accounts',
    tags: ['Account'],
    security: [{ BearerAuth: [] }],
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                description: 'Account ID',
                                example: 2
                            },
                            type: {
                                type: 'string',
                                description: 'Account type',
                                example: 'rent'
                            },
                            balance: {
                                type: 'string',
                                description: 'Account balance',
                                example: '3500000'
                            },
                            currency: {
                                type: 'string',
                                description: 'Currency of the account balance',
                                example: 'IDR'
                            },
                            userId: {
                                type: 'number',
                                description: 'User ID associated with the account',
                                example: 1
                            }
                        },
                    }
                },
                message: { type: 'string' },
            },
        },
    },
};

export const getAccountHistorySchema: FastifySchema = {
    description: 'Get History Transactions/Payments',
    tags: ['Account'],
    security: [{ BearerAuth: [] }],
    querystring: {
        type: 'object',
        properties: {
            accountId: { type: 'integer', minimum: 1 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                description: 'Transaction ID',
                                example: 4
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
                                example: '2024-08-19T13:49:00.285Z'
                            },
                            type: {
                                type: 'string',
                                description: 'Transaction type',
                                example: 'deposit'
                            },
                            status: {
                                type: 'string',
                                description: 'Transaction status',
                                example: 'completed'
                            },
                            fromAccountId: {
                                type: 'number',
                                description: 'ID of the source account (null for deposits)',
                                example: null
                            },
                            toAccountId: {
                                type: 'number',
                                description: 'ID of the destination account (null for withdrawals)',
                                example: 1
                            }
                        },
                    }
                },
                message: { type: 'string' },
            },
        },
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