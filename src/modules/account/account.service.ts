import { PrismaClient } from "@prisma/client";


export class AccountService {
    private prisma = new PrismaClient();

    async createAccount(userId: number, type: string, balance: number, currency: string) {
        return this.prisma.account.create({
            data: {
                userId,
                type,
                balance,
                currency
            },
        });
    }

    async getAccounts(userId: number) {
        return this.prisma.account.findMany({
            where: { userId },
        });
    }

    async getAccountHistory(accountId: number) {
        return this.prisma.transaction.findMany({
            where: { OR: [{ fromAccountId: accountId }, { toAccountId: accountId }] },
            orderBy: { timestamp: 'desc' },
        });

    }
}