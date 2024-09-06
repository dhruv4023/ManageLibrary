import axios from "axios";

// Function to fetch transactions within a specific date range and page
export const handleFetchTransactionsApi = async ({ currentPage, startDate, endDate }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_API}/transaction/books-issued-range?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=10`
        );
        return {
            page_data: response.data.data.page_data,
            total_page: response.data.data.page_metadata.total_page,
        };
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
};

// Function to fetch books issued to a specific user by their ID
export const fetchBooksIssuedApi = async ({ userId, page }) => {
    try {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_API}/transaction/books-issued/user/${userId}?page=${page}&limit=5`, // Limit set to 5
            headers: {
                'Content-Type': 'application/json' // Added Content-Type header
            },
        };
        const response = await axios.request(config);
        return {
            booksIssued: response.data.data.booksIssued,
            currentPage: response.data.data.currentPage,
            totalPages: response.data.data.totalPages,
        };
    } catch (error) {
        console.error("Error fetching books issued to user:", error);
    }
};
