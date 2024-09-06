import { setBookCategory, setBooks } from "../../../state";
import axios from "axios";

// Function to fetch book categories
export const fetchCategories = async ({ dispatch }) => {
    console.log(process.env.REACT_APP_SERVER_API);
    try {
        const config = {
            method: "get",
            url: `${process.env.REACT_APP_SERVER_API}/book/categories`,
            headers: {
                'Content-Type': 'application/json' // Added Content-Type header
            },
        };
        const response = await axios.request(config);
        dispatch(
            setBookCategory({
                bookCategory: response.data.categories,
            })
        );
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

// Function to fetch books based on applied filters
export const fetchFilteredBooksApi = async ({ filter, dispatch, page }) => {

    // Create URLSearchParams for query parameters
    const queryParams = new URLSearchParams();
    if (filter.name) queryParams.append("name", filter.name);
    if (filter.category) queryParams.append("Category", filter.category);
    if (filter.minRent) queryParams.append("minRent", filter.minRent);
    if (filter.maxRent) queryParams.append("maxRent", filter.maxRent);
    queryParams.append("page", page);

    const config = {
        method: "get",
        url: `${process.env.REACT_APP_SERVER_API}/book/search?${queryParams.toString()}`,
        headers: {
            'Content-Type': 'application/json' // Added Content-Type header
        }
    };

    try {
        const response = await axios.request(config);

        if (response.data) {
            // Dispatch action to set the books in the state
            dispatch(setBooks({ books: response.data.data.page_data }));
            return {
                page_data: response.data.data.page_data,
                page_metadata: response.data.data.page_metadata,
            };
        }
    } catch (error) {
        console.error("Error fetching filtered books:", error);
    }
};
