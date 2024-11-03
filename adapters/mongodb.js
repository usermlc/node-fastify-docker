const { MongoClient, ObjectId } = require("mongodb");
const { MONGODB_URI, MONGODB_DB } = require("./../config");

class MongoAdapter {
    static sharedInstance;

    /** @type {MongoClient} */
    #mongoClient;

    /** @type {import('mongodb').Db} */
    #database;

    constructor() {
        if (MongoAdapter.sharedInstance) {
            return MongoAdapter.sharedInstance;
        }

        this.#mongoClient = new MongoClient(MONGODB_URI);

        MongoAdapter.sharedInstance = this;

        return this;
    }

    async initializeConnection() {
        try {
            await this.#mongoClient.connect();
            console.log("Successfully connected to MongoDB database.");
        } catch (err) {
            console.error("Failed to connect to MongoDB:", err);
            throw err;
        }
    }

    get database() {
        return this.#mongoClient.db(MONGODB_DB);
    }

    async disconnect() {
        await this.#mongoClient.close();
    }

    toObjectId(id) {
        // Validate format before creating ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Error("Invalid format for MongoDB ID");
        }
        return ObjectId.createFromHexString(id);
    }
}

const mongoAdapter = new MongoAdapter();
Object.freeze(mongoAdapter);

module.exports.mongoAdapter = mongoAdapter;
