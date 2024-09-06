import React, { useState } from "react";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  Box,
  Divider,
  TextField,
  Typography,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Loading from "../../Components/Loading/Loading";
import FlexEvenly from "../../Components/FlexEvenly";
import axios from "axios";
import FlexBetween from "../../Components/FlexBetween";
import MyButton from "../../Components/MyCompoenents/MyButton";
import { fetchUsersApi } from "../Book/book.api";
import { fetchBooksIssuedApi } from "./transactions.api";

const TransactionsByUser = () => {
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issuedTo, setIssuedTo] = useState();
  const [bookIssuedData, setBookIssuedData] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { users } = await fetchUsersApi({ name });
      setOptions(users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksIssued = async (userId, page = 1) => {
    try {
      const { booksIssued, currentPage, totalPages } =
        await fetchBooksIssuedApi({ userId, page });
      setBookIssuedData(booksIssued);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onNameChange = async (e) => {
    setName(e.target.value);
    setBookIssuedData();
    if (name.length > 1) await fetchUsers();
  };

  const fetchBookByUser = async (userId) => {
    setIssuedTo(userId);
    await fetchBooksIssued(userId);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    if (issuedTo) {
      fetchBooksIssued(issuedTo, page);
    }
  };

  return (
    <WidgetWrapper>
      <Typography variant="h2">Transaction By User</Typography>
      <FlexBetween margin={2} flexDirection={"column"}>
        <TextField
          fullWidth
          name="name"
          label="Search Name Here"
          variant="outlined"
          value={name}
          disabled={loading}
          onChange={onNameChange}
        />
        {loading ? (
          <Loading />
        ) : (
          <FlexEvenly
            width={"100%"}
            padding={1}
            flexDirection={"column"}
            gap={1}
          >
            {options.map((m) => (
              <Box
                borderRadius={2}
                width={"100%"}
                key={m._id}
                onClick={() => fetchBookByUser(m._id)}
                p={1}
                sx={{
                  cursor: "pointer",
                  color: issuedTo === m._id ? "white" : "primary",
                  background: issuedTo === m._id ? "blue" : "transparent",
                }}
              >
                {m.fullName}
              </Box>
            ))}
          </FlexEvenly>
        )}
      </FlexBetween>
      <Divider />
      <FlexBetween flexDirection={"column"}>
        {loading ? (
          <Loading />
        ) : bookIssuedData ? (
          bookIssuedData.length === 0 ? (
            <Box>No data exist for this user</Box>
          ) : (
            <>
              {bookIssuedData.map((m) => (
                <BookDataCard
                  key={m.bookId}
                  loading={loading}
                  setLoading={setLoading}
                  fetchBookByUser={fetchBookByUser}
                  userId={issuedTo}
                  book={m}
                />
              ))}
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: "20px" }}
              />
            </>
          )
        ) : (
          <>Enter User Name to get data</>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

const BookDataCard = ({
  book,
  userId,
  loading,
  setLoading,
  fetchBookByUser,
}) => {
  const { bookId, bookName, issuedAt, returnedAt } = book;
  const [open, setOpen] = useState(false); // State to handle dialog open/close

  // Handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const returnBook = async (bookId, userId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/transaction/return`,
        {
          bookId,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );

      fetchBookByUser(userId);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // Handle confirming the return
  const handleConfirmReturn = async () => {
    returnBook(bookId, userId);
    handleClose();
  };

  return (
    <>
      <Card style={{ maxWidth: 345, margin: "20px auto", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" margin={"auto"} padding={1} component="div">
            {bookName}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Book ID: {bookId}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Issued On: {format(new Date(issuedAt), "dd-MM-yyyy HH:mm:ss")}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {returnedAt != null ? (
              <>
                Returned On:{" "}
                {format(new Date(returnedAt), "dd-MM-yyyy HH:mm:ss")}
              </>
            ) : (
              <>
                <Box>Not Returned Yet</Box>
                <Box>Rent amount need to pay: {book.rent} </Box>
                <MyButton
                  label={"Return The Book"}
                  onclickHandle={handleClickOpen} // Open popup on click
                />
              </>
            )}
          </Typography>
        </CardContent>
      </Card>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Return Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The rent for the book "<strong>{bookName}</strong>" is{" "}
            <strong>{book.rent}</strong>. Do you want to return the book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmReturn} color="primary" autoFocus>
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionsByUser;
