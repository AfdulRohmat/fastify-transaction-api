import { FastifyInstance } from "fastify";
import { AccountController } from "./account.controller";
import { createAccountSchema, getAccountsSchema, getAccountHistorySchema } from "./account.schema";
import { server } from "../../app";

async function accountRoutes(fastify: FastifyInstance) {
  const accountController = new AccountController();

  fastify.post(
    '/create-account', {
    preHandler: [server.authenticate],
    schema: {
      body: createAccountSchema,
    },
  },
    accountController.createAccountHandler.bind(accountController)
  );

  fastify.get(
    '/', {
    preHandler: [server.authenticate],
  },
    accountController.getAccountsHandler.bind(accountController)
  );

  fastify.get(
    '/history', {
    preHandler: [server.authenticate],
    schema: {
      querystring: getAccountHistorySchema,
    },
  },
    accountController.getAccountHistoryHandler.bind(accountController)
  );
}

export default accountRoutes;