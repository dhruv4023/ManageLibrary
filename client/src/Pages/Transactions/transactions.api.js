
import axios from "axios";
export const handleFetchTransactionsApi = async ({ currentPage, startDate, endDate, }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/transaction/books-issued-range?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=10`
    );
    return {
        page_data: response.data.data.page_data,
        total_page: response.data.data.page_metadata.total_page
    }
}

export const fetchBooksIssuedApi = async ({ userId, page }) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER_API}/transaction/books-issued/user/${userId}?page=${page}&limit=5`, // Limit set to 5
        headers: {},
    };
    const response = await axios.request(config);
    return {
        booksIssued: response.data.data.booksIssued,
        currentPage: response.data.data.currentPage,
        totalPages: response.data.data.totalPages,
    };
}