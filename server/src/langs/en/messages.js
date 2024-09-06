const MESSAGES = {
    // User
    1001: "User not found",
    // Transaction
    2000: "Transaction not found",
    2001: "Book already issued",
    2002: "Book issue history retrived",
    2003: "No active transaction found for this book",
    2004: "Invalid date range",
    2005: "Book returned",
    2006: "Rent calculated success",
    2007:"Transaction data retrived",
    // Book
    3001: "Book not found",

    // General error message
    9999: 'Internal Server Error',
};

const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;
