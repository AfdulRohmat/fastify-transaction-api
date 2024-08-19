import { FastifyInstance } from "fastify";
import { PaymentController } from "./payment.controller";
import { depositSchema, recurringPaymentSchema, transferSchema, withdrawalSchema } from "./payment.schema";
import { server } from "../../app";


export async function paymentRoutes(fastify: FastifyInstance) {
    const paymentController = new PaymentController()

    fastify.post('/deposit', {
        preHandler: [server.authenticate],
        schema: depositSchema,
    }, paymentController.depositHandler.bind(paymentController));

    fastify.post('/withdraw', {
        preHandler: [server.authenticate],
        schema: withdrawalSchema
    }, paymentController.withdrawHandler.bind(paymentController));

    fastify.post('/transfer', {
        preHandler: [server.authenticate],
        schema: transferSchema,
    }, paymentController.transferHandler.bind(paymentController));

    fastify.post('/recurring-payment', {
        preHandler: [server.authenticate],
        schema: recurringPaymentSchema
    }, paymentController.recurringPaymentsHandler.bind(paymentController));
}