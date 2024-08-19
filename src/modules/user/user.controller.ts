import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequestDTO, RegisterRequestDTO } from "./user.schema";
import { formatResponse } from "../../utils/responseFormatter";
import { server } from "../../app";
import { UserPayload } from "../../types/user";
import { UserService } from "./user.service";

export class UserController {
    private userService = new UserService();

    async registerUserHandler(
        request: FastifyRequest<{ Body: RegisterRequestDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { username, email, password } = request.body;

            const user = await this.userService.createUser(username, email, password);
            return reply.send(formatResponse('success', {
                id: user.id,
                username: user.username,
                email: user.email
            },
                "Registration process success"));

        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }

    async loginUserHandler(
        request: FastifyRequest<{ Body: LoginRequestDTO }>,
        reply: FastifyReply
    ) {
        try {
            const { email, password } = request.body;
            const user = await this.userService.authenticateUser(email, password);
            const token = server.jwt.sign({ id: user.id, username: user.username, email: user.email });

            return reply.send(formatResponse('success', {
                user, token
            },
                "Login process success"));
        } catch (error: any) {
            return reply.code(401).send({ error: error.message });
        }
    }

    async getUserHandler(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try {
            // Access user information from JWT payload
            const { id, username, email } = request.user as UserPayload; // The data included in the token payload
            const user = await this.userService.getUser(email);

            return reply.send(formatResponse('success', user, "Success get data"));
        } catch (error: any) {
            return reply.send(formatResponse('error', null, error.message));
        }
    }
}



