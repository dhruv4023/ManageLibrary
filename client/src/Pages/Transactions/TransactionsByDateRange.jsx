import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Box,
  Pagination,
} from "@mui/material";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { handleFetchTransactionsApi } from "./transactions.api";

const TransactionsByDateRange = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [booksIssued, setBooksIssued] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFetchTransactions = async (currentPage = 1) => {
    try {
      const { page_data, total_page } = await handleFetchTransactionsApi({
        currentPage,
        startDate,
        endDate,
      });
      setBooksIssued(page_data);
      setTotalPages(total_page);
      setError("");
    } catch (err) {
      setError("Error fetching transactions. Please try again.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    handleFetchTransactions(value);
  };

  return (
    <WidgetWrapper maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Transactions By Date Range
      </Typography>

      <Box mb={2}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
        />

        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleFetchTransactions()}
      >
        Fetch Transactions
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {booksIssued.length > 0 ? (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Books Issued:
          </Typography>
          <List>
            {booksIssued.map((book) => (
              <ListItem key={book.bookId}>
                <ListItemText
                  primary={book.bookName}
                  secondary={
                    `Issued on: ${new Date(book.issuedAt).toLocaleDateString(
                      "en-GB"
                    )} | ` +
                    (book.returnedAt
                      ? `Returned on: ${new Date(
                          book.returnedAt
                        ).toLocaleDateString("en-GB")}`
                      : "Not returned yet")
                  }
                />
              </ListItem>
            ))}
          </List>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 3 }}
          />
        </Box>
      ) : (
        <Box>No data Found</Box>
      )}
    </WidgetWrapper>
  );
};

export default TransactionsByDateRange;
