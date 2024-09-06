import { setBookCategory, setBooks } from "../../../state";
import axios from "axios"
export const fetchCategories = async ({ dispatch }) => {
    try {
        const config = {
            method: "get",
            url: `${process.env.REACT_APP_SERVER_API}/book/categories`,
            headers: {},
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

export const fetchFilteredBooksApi = async ({ filter, dispatch, page }) => {

    const queryParams = new URLSearchParams();
    if (filter.name) queryParams.append("name", filter.name);
    if (filter.category) queryParams.append("Category", filter.category);
    if (filter.minRent) queryParams.append("minRent", filter.minRent);
    if (filter.maxRent) queryParams.append("maxRent", filter.maxRent);
    queryParams.append("page", page);

    const config = {
        method: "get",
        url: `${process.env.REACT_APP_SERVER_API
            }/book/search?${queryParams.toString()}`,
    };

    const response = await axios.request(config);

    if (response.data) {
        dispatch(setBooks({ books: response.data.data.page_data }));
        return {
            page_data: (response.data.data.page_data),
            page_metadata: (response.data.data.page_metadata),
        }
    }

};