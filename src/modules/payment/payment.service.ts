import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export enum TransactionStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    FAILED = 'Failed',
}

export enum TransactionType {
    DEPOSIT = 'Deposit',
    WITHDRAWAL = 'Withdrawal',
    TRANSFER = 'Transfer',
    RECURRING_PAYMENT = 'Recurring Payment',
}

export enum RecurringPaymentStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

export enum RecurringPaymentInterval {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export class PaymentService {
    private prisma = new PrismaClient();

    async deposit(accountId: number, amount: Decimal, currency: string) {
        const transaction = await this.prisma.transaction.create({
            data: {
                amount,
                currency,
                type: TransactionType.DEPOSIT,
                status: TransactionStatus.PENDING,
                toAccountId: accountId,
            },
        });

        // Simulate processing
        return this.processTransaction(transaction);
    }

    async withdraw(accountId: number, amount: Decimal, currency: string) {
        const account = await this.prisma.account.findUnique({ where: { id: accountId } });
        if (!account || account.balance < amount) {
            throw new Error('Insufficient funds');
        }

        const transaction = await this.prisma.transaction.create({
            data: {
                amount,
                currency,
                type: TransactionType.WITHDRAWAL,
                status: TransactionStatus.PENDING,
                fromAccountId: accountId,
            },
        });

        // Simulate processing
        return this.processTransaction(transaction);
    }

    async transfer(fromAccountId: number, toAccountId: number, amount: Decimal, currency: string) {
        const fromAccount = await this.prisma.account.findUnique({ where: { id: fromAccountId } });
        if (!fromAccount || fromAccount.balance < amount) {
            throw new Error('Insufficient funds');
        }

        const transaction = await this.prisma.transaction.create({
            data: {
                amount,
                currency,
                type: TransactionType.TRANSFER,
                status: TransactionStatus.PENDING,
                fromAccountId,
                toAccountId,
            },
        });

        // Simulate processing
        return this.processTransaction(transaction);
    }

    async createRecurringPayment(data: {
        userId: number;
        accountId: number;
        amount: Decimal;
        currency: string;
        interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
        startDate: Date;
        endDate?: Date;
    }) {
        const recurringPayment = await this.prisma.recurringPayment.create({
            data: {
                userId: data.userId,
                accountId: data.accountId,
                amount: data.amount,
                currency: data.currency,
                interval: data.interval,
                startDate: data.startDate,
                endDate: data.endDate,
                status: RecurringPaymentStatus.ACTIVE
            },
        });

        return recurringPayment;
    }

    async processRecurringPayments() {
        const today = new Date();

        // Fetch all active recurring payments that need to be processed
        const duePayments = await this.prisma.recurringPayment.findMany({
            where: {
                status: RecurringPaymentStatus.ACTIVE,
                AND: [
                    { startDate: { lte: today } },
                    {
                        OR: [
                            {
                                endDate: {
                                    gte: today
                                }
                            },
                            {
                                endDate: null
                            }
                        ]
                    } // Check if endDate is valid or null
                ]
            }
        });

        for (const payment of duePayments) {
            if (this.isPaymentDueToday(payment, today)) {
                try {
                    // Create a transaction for each due recurring payment
                    await this.createTransactionForPayment(payment);
                } catch (error) {
                    console.error(`Failed to process payment ${payment.id}:`, error);
                    // Handle error (e.g., log it, notify the user, etc.)
                }
            }
        }
    }

    private isPaymentDueToday(payment: any, today: Date): boolean {
        const startDate = new Date(payment.startDate);

        switch (payment.interval) {
            case 'daily':
                return true; // Daily payments are due every day
            case 'weekly':
                return startDate.getDay() === today.getDay();
            case 'monthly':
                return startDate.getDate() === today.getDate();
            case 'yearly':
                return startDate.getMonth() === today.getMonth() && startDate.getDate() === today.getDate();
            default:
                return false;
        }
    }

    private async createTransactionForPayment(payment: any) {
        // Ensure sufficient funds and create transaction
        const account = await this.prisma.account.findUnique({ where: { id: payment.accountId } });

        if (!account || account.balance < payment.amount) {
            throw new Error('Insufficient funds');
        }

        // Check if the account has sufficient funds
        if (account.balance < payment.amount) {
            throw new Error(`Insufficient funds in account ${payment.accountId}`);
        }

        const transaction = await this.prisma.transaction.create({
            data: {
                amount: payment.amount,
                currency: payment.currency,
                type: TransactionType.WITHDRAWAL,
                status: TransactionStatus.PENDING,
                fromAccountId: payment.accountId,
            },
        });

        // Process transaction
        await this.processTransaction(transaction);
    }

    private async processTransaction(transaction: any) {
        // Simulate a delay for processing
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update transaction status to completed
        await this.prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: TransactionStatus.COMPLETED },
        });

        // Update account balances
        if (transaction.type === TransactionType.DEPOSIT) {
            await this.prisma.account.update({
                where: { id: transaction.toAccountId },
                data: { balance: { increment: transaction.amount } },
            });
        } else if (transaction.type === TransactionType.WITHDRAWAL) {
            await this.prisma.account.update({
                where: { id: transaction.fromAccountId },
                data: { balance: { decrement: transaction.amount } },
            });
        } else if (transaction.type === TransactionType.TRANSFER) {
            await this.prisma.account.update({
                where: { id: transaction.fromAccountId },
                data: { balance: { decrement: transaction.amount } },
            });

            await this.prisma.account.update({
                where: { id: transaction.toAccountId },
                data: { balance: { increment: transaction.amount } },
            });
        }

        return transaction;
    }
}