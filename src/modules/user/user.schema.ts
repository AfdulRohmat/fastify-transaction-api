
export const registerUserSchema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
        username: { type: 'string', minLength: 2 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
    },
};

export const loginUserSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
    },
};

// TypeScript types based on JSON Schema
export interface RegisterRequestDTO {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}
