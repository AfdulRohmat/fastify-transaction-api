import { FastifyInstance } from "fastify";
import { AccountController } from "./account.controller";
import { createAccountSchema, getAccountsSchema, getAccountHistorySchema } from "./account.schema";
import { server } from "../../app";
import { getUserSchema } from "../user/user.schema";

async function accountRoutes(fastify: FastifyInstance) {
  const accountController = new AccountController();

  fastify.post(
    '/create-account', {
    preHandler: [server.authenticate],
    schema: createAccountSchema,
  },
    accountController.createAccountHandler.bind(accountController)
  );

  fastify.get(
    '/', {
    preHandler: [server.authenticate],
    schema: getAccountsSchema
  },
    accountController.getAccountsHandler.bind(accountController)
  );

  fastify.get(
    '/history', {
    preHandler: [server.authenticate],
    schema: getAccountHistorySchema
  },
    accountController.getAccountHistoryHandler.bind(accountController)
  );
}

export default accountRoutes;