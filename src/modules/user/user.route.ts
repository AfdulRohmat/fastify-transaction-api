import { FastifyInstance } from "fastify";
import { getUserSchema, loginUserSchema, registerUserSchema } from "./user.schema";
import { UserController } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    const userController = new UserController();

    server.post(
        '/register', {
        schema: registerUserSchema
    },
        userController.registerUserHandler.bind(userController)
    );

    server.post(
        '/login', {
        schema: loginUserSchema,
    },
        userController.loginUserHandler.bind(userController)
    );

    server.get(
        '/', {
        preHandler: [server.authenticate],
        schema: getUserSchema
    },
        userController.getUserHandler.bind(userController)
    );

}

export default userRoutes