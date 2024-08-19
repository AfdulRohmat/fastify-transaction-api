import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import fastifyJwt, { JWT } from "@fastify/jwt";
import accountRoutes from "./modules/account/account.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import FastifyCron from 'fastify-cron';
import { PaymentService } from "./modules/payment/payment.service";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const server = Fastify({
    logger: true
})

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }
    export interface FastifyInstance {
        authenticate: any;
    }
}

// declare module "fastify-jwt" {
//     interface FastifyJWT {
//         user: {
//             id: number;
//             email: string;
//             username: string;
//         };
//     }
// }

// Register Swagger plugin
server.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'Fastify TRANSACTION API',
            description: 'API documentation',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            BearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Enter the token, including The "Bearer " prefix',
            },
        },
        security: [{ BearerAuth: [] }],
    },
});

// Register @fastify/swagger-ui plugin.
server.register(fastifySwaggerUi, {
    routePrefix: '/docs', // URL where the Swagger UI will be available
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: (request, reply, next) => next(),
        preHandler: (request, reply, next) => next(),
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
});

// Register the fastify-cron plugin
server.register(FastifyCron, {
    jobs: [
        {
            name: 'process-recurring-payments',
            cronTime: '0 * * * *', // Every hour
            onTick: async () => {
                const paymentService = new PaymentService();
                try {
                    await paymentService.processRecurringPayments();
                    server.log.info('Processed recurring payments successfully');
                } catch (error) {
                    server.log.error('Error processing recurring payments:', error);
                }
            },
            start: true, // Start the job immediately
            timeZone: 'Asia/Jakarta' // Adjust to your timezone
        }
    ]
});

server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    sign: {
        expiresIn: '15m' // Set expiration time to 15 minutes
    }
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        return reply.send(e);
    }
})

async function main() {
    server.register(userRoutes, { prefix: 'api/v1/users' })
    server.register(accountRoutes, { prefix: 'api/v1/accounts' });
    server.register(paymentRoutes, { prefix: 'api/v1/payments' });

    try {
        await server.listen(3000, "0.0.0.0", err => {
            console.log(`Error server :${err}`);
        })

        console.log(`Server ready at http://localhost:3000`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();