import mongoose from "mongoose";
import config from "../config/config.js";


// Connect to the first database
const db1 = mongoose.createConnection(config.database.db_url, {
    dbName: config.database.db_name_1, // First database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db1.on("connected", () => {
    console.log("Connected to the database " + config.database.db_name_1);
});

db1.on("error", (e) => {
    console.log(config.database.db_name_1 + " database not connected: ", e);
});

// Connect to the second database
const db2 = mongoose.createConnection(config.database.db_url, {
    dbName: config.database.db_name_2, // Second database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db2.on("connected", () => {
    console.log("Connected to the database " + config.database.db_name_2);
});

db2.on("error", (e) => {
    console.log(config.database.db_name_2 + " database not connected: ", e);
});

// Import the schemas
import userSchema from "./users.model.js";
import bookSchema from "./books.model.js"; // Assuming you have a separate schema for books
import TransactionSchema from "./transactions.model.js"; // Assuming you have a separate schema for books

// Define models for each database connection
const db = {
    Users: db1.model("Users", userSchema),
    Books: db1.model("Books", bookSchema),
    Transactions: db2.model("Transactions", TransactionSchema),
};

export default db;
