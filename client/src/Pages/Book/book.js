
import axios from "axios";
export
    const fetchBookIssuers = async ({ bookId }) => {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:5000/api/transaction/book-issuers/${bookId}`,
                headers: {}
            };

            const response = await axios.request(config);
            return ((response.data.data));
        } catch (error) {
            console.error('Error fetching book issuers:', error);
        }
    };



export const issueBook = async (data) => {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/transaction/issue',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        // Passing the URL and data separately in axios.post
        const response = await axios.post(config.url, JSON.stringify(data), { headers: config.headers });

        if (response.data.success) {
            alert("Book issued successfully");
        }
    } catch (error) {
        if (error.response.data)
            alert(error.response.data.message);
        else console.log(error);
    }
};
