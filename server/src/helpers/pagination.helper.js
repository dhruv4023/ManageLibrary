// Utility functions for paginating user lists

const getPaginationMetadata = ({ page, limit }) => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit) || 0;
    const endIndex = parseInt(startIndex) + parseInt(limit) || 10;
    return { startIndex, endIndex };
}


const getRecursivePaginatedResponse = (data, page, limit, totalCount) => {
    return {
        page_data: data,
        page_metadata: {
            total_data: parseInt(totalCount),
            last_page: Math.ceil(totalCount / limit),
            current_page: parseInt(page),
            previous_page: parseInt(page) > 1 ? parseInt(page) - 1 : null,
            next_page: page < Math.ceil(totalCount / limit) ? parseInt(page) + 1 : null,
            total_page: Math.ceil(totalCount / limit)
        },
    };
};


export { getPaginationMetadata, getRecursivePaginatedResponse };
