# TRANSACTION / PAYMENT API

## Introduction & Features

This project is built with Fastify, Prisma, and PostgreSQL. It allows users to:

- **Create Accounts**: Users can register and manage their accounts.
- **Perform Transactions**: Users can execute various types of transactions, including deposits, transfers, and withdrawals.
- **Set Up Automatic Payments**: Users can plan and automate recurring payments.
- **View Transaction History**: Users can view their past transactions.

## Installation
Prerequisites
- Node.js (>=14.x)
- Docker (for database)
- Docker Compose (for orchestrating services)

## Setup
### 1. Clone the Repository:
```bash
git clone https://github.com/AfdulRohmat/fastify-transaction-api.git
cd your-repository
```
### 2. Install dependencies:
```bash
npm install
```
### 3. Setup environment variables:
- Create a .env file in the root of the project and add the following variables:
```env
DATABASE_URL="postgresql://postgres:password123@localhost:54320/transaction-db?schema=public"
```
### 4. Start the PostgreSQL database using Docker:
```bash
docker-compose up -d
```
### 5. Run Prisma migrations:
```bash
npx prisma migrate dev
```

## Usage
### 1. To start the Fastify server, use:
```bash
npm start
```
### 2. To start the Swagger doc, use:
```text
http://localhost:3000/docs
```

## API ENDPOINT
### Here is the example of the API endpoints, you can find it more detail in Swagger doc or just import the Postman Collection:
```text
POST /api/v1/users/login - User login
POST /api/v1/users/register - User registration
POST /api/v1/users/ - Information user that currently login

GET /api/v1/accounts/create-account - Creeate account
GET /api/v1/accounts - List accounts
GET /api/v1/accounts/history - List transactions 

POST /api/v1/payments/deposit - Deposit funds
POST /api/v1/payments/withdraw - Withdraw funds
POST /api/v1/payments/transfer - Transfer funds
POST /api/v1/payments/recurring-payment - Set Recurring Payment
```



