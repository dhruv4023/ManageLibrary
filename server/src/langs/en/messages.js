const MESSAGES = {
    // User
    1001: "User not found",
    // Transaction
    2000: "Transaction not found",
    2001: "Book already issued",
    2002: "Book issue history retrieved",
    2003: "No active transaction found for this book",
    2004: "Invalid date range",
    2005: "Book returned",
    2006: "Rent calculated successfully",
    2007: "Transaction data retrieved",
    // Book
    3001: "Book not found",
    3002: "Books data retrieved successfully",
    3003: "Books categories retrieved successfully",
    // General error message
    9999: "Internal Server Error",
};

const getMessage = messageCode => {
    if (typeof messageCode !== 'number') {
        return 'Invalid message code';
    }
    return MESSAGES[messageCode] || 'Unknown error code';
};

export default getMessage;
