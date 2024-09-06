import dotenv from 'dotenv';
dotenv.config();

export default {
    // database details
    database: {
        db_url: process.env.DB_URL || "mongodb://127.0.0.1:27017",
        db_name_1: process.env.DB_NAME || "BooksDB",
        db_name_2: process.env.DB_NAME_2 || "TransactionsDB",
    },
    //  ssl Keys details
    certificate: {
        privkey: process.env.SERVER_KEY || "ssl/server-key.pem",
        fullchain: process.env.SERVER_CERT || "ssl/server-cert.pem",
    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.APP_PORT || 5000,
    node_env: process.env.NODE_ENV || 'development',
    origin_url_list: process.env.ORIGIN_URL_LIST || '[ "http://localhost:3000" ]',
    jwt_secret: process.env.JWT_SECRET,
    DEGUB: process.env.DEGUB || false,
}; 
