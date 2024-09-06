import axios from "axios";

export const fetchBookIssuersApi = async ({ bookId }) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_API}/transaction/book-issuers/${bookId}`,
            headers: {
                'Content-Type': 'application/json' // Only Content-Type header added
            }
        };

        const response = await axios.request(config);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching book issuers:', error);
    }
};

export const fetchUsersApi = async ({ name }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_API}/user/get/name/${name}`,
            {
                headers: {
                    'Content-Type': 'application/json' // Only Content-Type header added
                }
            }
        );
        return { users: response.data.data.users };
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const issueBookApi = async (data) => {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER_API}/transaction/issue`,
        headers: {
            'Content-Type': 'application/json' // Only Content-Type header added
        }
    };

    try {
        const response = await axios.post(config.url, JSON.stringify(data), { headers: config.headers });

        if (response.data.success) {
            alert("Book issued successfully");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            alert(error.response.data.message);
        } else {
            console.log(error);
        }
    }
};
