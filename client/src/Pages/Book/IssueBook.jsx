import React, { useState, useEffect } from "react";
import WidgetWrapper from "../../Components/WidgetWrapper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading/Loading";
import FlexEvenly from "../../Components/FlexEvenly";
import { fetchUsersApi } from "./book.api.js";
import { issueBookApi } from "./book.api.js";

const IssueBook = ({
  setLoading,
  bookId,
  setcurrentHolder,
  currentHolder,
  loading,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [issuingTo, setIssuingTo] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { users } = await fetchUsersApi({ name });
      setOptions(users || []); // Adjust based on your API response structure
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  useEffect(() => {}, [options]);

  const onNameChange = async (e) => {
    setName(e.target.value);
    if (name.length > 1) await fetchUsers();
  };

  const handleClose = () => {
    setOptions([]);
    setName("");
    setOpenDialog(false);
  };
  
  const handleIssueBook = async () => {
    setLoading(true);
    await issueBookApi({ bookId, userId: issuingTo }).then((d) =>
      setcurrentHolder({
        _id: issuingTo,
        fullName: options.filter((f) => f._id === issuingTo)[0].fullName,
      })
    );
    setLoading(false);
    setOpenDialog(false);
  };
  return (
    <WidgetWrapper>
      {loading ? (
        <Loading />
      ) : currentHolder === false ? (
        <>
          <Button
            sx={{ background: "blue", color: "black", fontWeight: 700 }}
            onClick={() => handleClickOpen()}
          >
            Issue This Book
          </Button>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>Issue Book</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                name="name"
                label="Enter Name Here"
                variant="outlined"
                value={name}
                disabled={loading}
                onChange={onNameChange}
              />
              {loading ? (
                <Loading />
              ) : (
                <FlexEvenly padding={1} flexDirection={"column"} gap={1}>
                  {options.map((m) => (
                    <Box
                      key={m._id}
                      onClick={() => setIssuingTo(m._id)}
                      p={1}
                      sx={{
                        cursor: "pointer",
                        color: issuingTo === m._id ? "white" : "primary",
                        background:
                          issuingTo === m._id ? "blue" : "transparent",
                      }}
                    >
                      {m.fullName}
                    </Box>
                  ))}
                </FlexEvenly>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "red" }}>
                Cancel
              </Button>
              <Button
                onClick={handleIssueBook}
                disabled={loading}
                color="primary"
              >
                Issue
              </Button>
            </DialogActions>
          </Dialog>{" "}
        </>
      ) : (
        currentHolder && (
          <>
            <Typography variant="h3">
              current Issuer: {currentHolder.fullName}
            </Typography>
          </>
        )
      )}
    </WidgetWrapper>
  );
};

export default IssueBook;
