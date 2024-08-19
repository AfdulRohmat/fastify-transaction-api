import { FastifyReply, FastifyRequest } from "fastify";
import { AccountService } from "./account.service";
import { formatResponse } from "../../utils/responseFormatter";
import { CreateAccountDTO, GetAccountsDTO, GetAccountHistoryDTO } from "./account.schema";
import { UserPayload } from "../../types/user";

export class AccountController {
    private accountService = new AccountService();

    async createAccountHandler(
        request: FastifyRequest<{ Body: CreateAccountDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { type, balance, currency } = request.body;
            const { id: userId, ...rest } = request.user as UserPayload;

            const account = await this.accountService.createAccount(userId, type, balance, currency);
            return reply.send(formatResponse('success', account));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async getAccountsHandler(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try {
            const { id: userId, ...rest } = request.user as UserPayload;

            const accounts = await this.accountService.getAccounts(userId);
            return reply.send(formatResponse('success', accounts));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async getAccountHistoryHandler(
        request: FastifyRequest<{ Querystring: GetAccountHistoryDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { accountId } = request.query;
            const history = await this.accountService.getAccountHistory(accountId);
            return reply.send(formatResponse('success', history));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }
}