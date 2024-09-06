import React from "react";
import { Box } from "@mui/material";
import Loading from "../../../Components/Loading/Loading";
import BookCard from "./BookCard";
import FlexBetween from "../../../Components/FlexBetween";

const DisplayBooks = ({ booksData, loading }) => {
  return (
    <FlexBetween
      flexDirection={"column"}
      flexWrap={"wrap"}
      padding={"0.5rem"}
      width={"100%"}
      gap={1}
    >
      {loading ? (
        <Loading />
      ) : booksData ? (
        booksData.map((book) => <BookCard key={book._id} book={book} />)
      ) : (
        <Box>No books found as per applied filter</Box>
      )}
    </FlexBetween>
  );
};

export default DisplayBooks;
