import { FastifySchema } from "fastify";

export const registerUserSchema: FastifySchema = {
    description: 'Register',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            username: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
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
                        id: { type: 'number', },
                        username: { type: 'string', },
                        email: { type: 'string', },
                    }
                },
                message: { type: 'string' },
            },
        },
    },

};

export const loginUserSchema: FastifySchema = {
    description: 'Login',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
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
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'number', },
                                username: { type: 'string', },
                                email: { type: 'string', },
                                password: { type: 'string', }
                            }
                        },
                        token: { type: 'string', }
                    }
                },
                message: { type: 'string' },
            },
        },
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


// Schema For Swagger
export const getUserSchema: FastifySchema = {
    description: 'Get user that currently login',
    tags: ['User'],
    security: [{ BearerAuth: [] }],  // This line protects the route with the Bearer token
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
                message: { type: 'string' },
            },
        },
    },
};