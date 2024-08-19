import { FastifyInstance } from "fastify";
import { loginUserSchema, registerUserSchema } from "./user.schema";
import { UserController } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    const userController = new UserController();

    server.post(
        '/register', {
        schema: {
            body: registerUserSchema,
        },
    },
        userController.registerUserHandler.bind(userController)
    );

    server.post(
        '/login', {
        schema: {
            body: loginUserSchema,
        },
    },
        userController.loginUserHandler.bind(userController)
    );

    server.get(
        '/', {
        preHandler: [server.authenticate]
    },
        userController.getUserHandler.bind(userController)
    );

}

export default userRoutes