import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentService } from "./payment.service";
import { CreateAccountDTO } from "../account/account.schema";
import { DepositDTO, RecurringPaymentDTO, TransferDTO, WithdrawalDTO } from "./payment.schema";
import { formatResponse } from "../../utils/responseFormatter";
import { UserPayload } from "../../types/user";

export class PaymentController {
    private paymentService = new PaymentService()

    async depositHandler(
        request: FastifyRequest<{ Body: DepositDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { accountId, amount, currency } = request.body;
            const transaction = await this.paymentService.deposit(accountId, amount, currency);

            return reply.send(formatResponse('success', transaction));

        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async withdrawHandler(
        request: FastifyRequest<{ Body: WithdrawalDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { accountId, amount, currency } = request.body;
            const transaction = await this.paymentService.withdraw(accountId, amount, currency);

            return reply.send(formatResponse('success', transaction));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async transferHandler(
        request: FastifyRequest<{ Body: TransferDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { fromAccountId, toAccountId, amount, currency } = request.body;
            const transaction = await this.paymentService.transfer(fromAccountId, toAccountId, amount, currency);

            return reply.send(formatResponse('success', transaction));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async recurringPaymentsHandler(
        request: FastifyRequest<{ Body: RecurringPaymentDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { id: userId, ...rest } = request.user as UserPayload
            const { accountId, amount, currency, interval, startDate, endDate } = request.body;

            const recurringPayment = await this.paymentService.createRecurringPayment(
                {
                    userId,
                    accountId,
                    amount, // Convert amount to Decimal
                    currency,
                    interval,
                    startDate: new Date(startDate), // Convert startDate to Date
                    endDate: endDate ? new Date(endDate) : undefined,
                }
            )

            return reply.send(formatResponse('success', recurringPayment));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

}