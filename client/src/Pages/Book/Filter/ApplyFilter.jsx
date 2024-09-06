import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../../Components/WidgetWrapper";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexEvenly from "../../../Components/FlexEvenly";
import FlexBetween from "../../../Components/FlexBetween";
import MyTitle from "../../../Components/MyCompoenents/MyTitle";
import { fetchCategories, fetchFilteredBooksApi } from "./bookFilter.api";
import { InfoOutlined } from "@mui/icons-material";

const initialFilter = {
  name: null,
  category: null,
  minRent: null,
  maxRent: null,
};

const ApplyFilter = ({ setBooksData, setLoading, booksData, loading }) => {
  const [filter, setFilter] = useState(initialFilter);
  const [pageMetadata, setPageMetadata] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.bookCategory);

  const fetchFilteredBooks = async (page = 1) => {
    try {
      const { page_data, page_metadata } = await fetchFilteredBooksApi({
        filter,
        dispatch,
        page,
      });
      setBooksData(page_data);
      setPageMetadata(page_metadata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchCategories({ dispatch });
    !booksData && fetchFilteredBooks();
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleApplyFilter = async () => {
    await fetchFilteredBooks();
  };

  const handlePageChange = async (direction) => {
    setLoading(true);
    if (direction === "next" && pageMetadata.next_page) {
      await fetchFilteredBooks(pageMetadata.next_page);
    } else if (direction === "previous" && pageMetadata.previous_page) {
      await fetchFilteredBooks(pageMetadata.previous_page);
    }
    setLoading(false);
  };

  return (
    <WidgetWrapper width={"100%"}>
      <FlexEvenly>
        <MyTitle
          txt={
            <FlexBetween margin={1}>
              Filter
              <Box flexGrow={1} />
            </FlexBetween>
          }
        />
      </FlexEvenly>
      <Typography variant="h6" color={"secondary"}>
        <InfoOutlined /> Use this to apply filter on books
      </Typography>

      <Box width={"100%"} padding={"1rem"}>
        <FlexEvenly flexDirection={"column"} flexWrap={"wrap"} gap={2}>
          <TextField
            fullWidth
            name="name"
            label="Book Name"
            variant="outlined"
            value={filter.name}
            onChange={handleInputChange}
          />
          <Select
            name="category"
            fullWidth
            value={filter.category || ""} // Default to empty string if no category is selected
            onChange={handleInputChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <FlexBetween gap={1}>
            <TextField
              fullWidth
              name="minRent"
              label="Min Rent"
              type="number"
              variant="outlined"
              value={filter.minRent}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              name="maxRent"
              label="Max Rent"
              type="number"
              variant="outlined"
              value={filter.maxRent}
              onChange={handleInputChange}
            />
          </FlexBetween>
          <FlexBetween gap={1}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </FlexBetween>
        </FlexEvenly>
      </Box>
      {pageMetadata && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Button
            variant="outlined"
            onClick={() => handlePageChange("previous")}
            disabled={!pageMetadata.previous_page}
          >
            Previous
          </Button>
          <Typography
            variant="body1"
            component="span"
            marginX={2}
          >{`Page ${pageMetadata.current_page} of ${pageMetadata.last_page}`}</Typography>
          <Button
            variant="outlined"
            onClick={() => handlePageChange("next")}
            disabled={!pageMetadata.next_page}
          >
            Next
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ApplyFilter;
