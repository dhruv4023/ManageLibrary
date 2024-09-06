import React from "react";
import {
  Paper,
  Typography,
  
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../../Components/FlexBetween";
import FlexEvenly from "../../../Components/FlexEvenly";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        onClick={() => navigate(`/book/${book._id}`)}
        elevation={3}
        sx={{
          width: "100%",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        <FlexBetween flexGrow={1}>
          <Typography variant="h4" align="center">
            {book.bookName}
          </Typography>
        </FlexBetween>
        <FlexEvenly flexDirection={"column"}>
          <Typography variant="body1" color="text.secondary" align="center">
            {`Category: ${book.category}`}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {`Rent Per Day: $${book.rentPerDay}`}
          </Typography>
        </FlexEvenly>
      </Paper>
    </>
  );
};

export default BookCard;
