import { FastifyInstance } from "fastify";
import { PaymentController } from "./payment.controller";
import { depositSchema, recurringPaymentSchema, transferSchema, withdrawalSchema } from "./payment.schema";
import { server } from "../../app";


export async function paymentRoutes(fastify: FastifyInstance) {
    const paymentController = new PaymentController()

    fastify.post('/deposit', {
        preHandler: [server.authenticate],
        schema: {
            body: depositSchema
        }
    }, paymentController.depositHandler.bind(paymentController));

    fastify.post('/withdraw', {
        preHandler: [server.authenticate],
        schema: {
            body: withdrawalSchema
        }
    }, paymentController.withdrawHandler.bind(paymentController));

    fastify.post('/transfer', {
        preHandler: [server.authenticate],
        schema: {
            body: transferSchema
        }
    }, paymentController.transferHandler.bind(paymentController));

    fastify.post('/recurring-payment', {
        preHandler: [server.authenticate],
        schema: {
            body: recurringPaymentSchema
        }
    }, paymentController.recurringPaymentsHandler.bind(paymentController));
}