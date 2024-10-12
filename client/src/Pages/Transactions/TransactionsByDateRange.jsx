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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { handleFetchTransactionsApi } from "./transactions.api";
import Loading from "../../Components/Loading/Loading";
import { InfoOutlined, InfoRounded } from "@mui/icons-material";

const TransactionsByDateRange = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [booksIssued, setBooksIssued] = useState();
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notreturned, setNotreturned] = useState(false);

  const handleFetchTransactions = async (currentPage = 1) => {
    setLoading(true);
    try {
      const { page_data, total_page } = await handleFetchTransactionsApi({
        currentPage,
        startDate,
        endDate,
        notreturned,
      });
      setBooksIssued(page_data);
      setTotalPages(total_page);
      setError("");
    } catch (err) {
      setError("Error fetching transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    handleFetchTransactions(value);
    setLoading(false);
  };

  const handleNotReturnedChange = (event) => {
    setNotreturned(event.target.value === "true");
  };

  return (
    <WidgetWrapper maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Transactions By Date Range
      </Typography>
      <Typography variant="h6" color={"secondary"}>
        <InfoOutlined /> Use this to retrieve transactions by date range
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
        <FormControl component="fieldset">
          <Typography variant="subtitle1" gutterBottom>
            Filter by Return Status:
          </Typography>
          <RadioGroup
            row
            value={notreturned.toString()}
            onChange={handleNotReturnedChange}
          >
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="All Transactions"
            />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Only Not Returned Yet"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        disabled={loading}
        color="primary"
        onClick={() => handleFetchTransactions()}
        sx={{ my: 2 }}
      >
        Fetch Transactions
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          {booksIssued ? (
            booksIssued.length > 0 ? (
              <>
                <Divider />
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{ my: 2 }}
                />
                <Divider />
                <Box mt={4}>
                  <Typography variant="h5" gutterBottom>
                    Books Issued:
                  </Typography>
                  <List>
                    {booksIssued.map((book) => (
                      <ListItem key={book.bookId}>
                        <ListItemText
                          primary={
                            book.bookName + " issued to " + book.fullName
                          }
                          secondary={
                            `Issued on: ${new Date(
                              book.issuedAt
                            ).toLocaleDateString("en-GB")} | ` +
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
                </Box>
              </>
            ) : (
              <Box>No data Found</Box>
            )
          ) : (
            <Box padding={2}>
              <InfoRounded />
              Enter start and end Date to see the data{" "}
            </Box>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default TransactionsByDateRange;
