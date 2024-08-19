
import { FastifyRequest } from "fastify";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { PrismaClient } from "@prisma/client";

export class UserService {
    private prisma = new PrismaClient();

    async createUser(username: string, email: string, password: string) {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);

        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });

        return user;
    }

    async authenticateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    async getUser(email: string) {

        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        return user;
    }
}


