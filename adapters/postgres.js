const { PrismaClient } = require("@prisma/client");

class PostgresDatabaseAdapter {
    static singletonInstance;

    /** @type { import('@prisma/client').PrismaClient} */
    #client;

    constructor() {
        if (PostgresDatabaseAdapter.singletonInstance) {
            return PostgresDatabaseAdapter.singletonInstance;
        }

        this.#client = new PrismaClient();

        PostgresDatabaseAdapter.singletonInstance = this;
        return this;
    }

    async initializeConnection() {
        const result = await this.#client.$queryRaw`SELECT 1=1;`;

        if (result) {
            console.log("Successfully connected to PostgreSQL database.");
        }

        return !!result;
    }

    get prismaClient() {
        return this.#client;
    }

    async executeQuery(model, action, parameters) {
        try {
            return await this.#client[model][action](parameters);
        } catch (error) {
            console.error("An error occurred during the Prisma query execution:", error);
            throw error;
        }
    }

    async terminateConnection() {
        await this.#client.$disconnect();
    }
}

const postgresDatabaseAdapter = new PostgresDatabaseAdapter();
Object.freeze(postgresDatabaseAdapter);

module.exports = { postgresDatabaseAdapter };
