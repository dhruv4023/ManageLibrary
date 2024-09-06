import React, { useEffect, useState } from "react";
import WidgetsOnPage from "../../Components/WidgetsOnPage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { fetchBookIssuers } from "./book";
import Loading from "../../Components/Loading/Loading";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../Components/FlexBetween";
import IssueBook from "./IssueBook";

const BookPage = () => {
  const books = useSelector((s) => s.books);
  const { bookId } = useParams();
  const currentBook = books.filter((f) => f._id === bookId)[0];
  const [loading, setLoading] = useState(false);
  const [pastIssues, setPastIssues] = useState();
  const [currentHolder, setcurrentHolder] = useState();
  const [totalRent, setTotalRent] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchBookIssuers({ bookId })
      .then((d) => {
        setPastIssues(d.issuers);
        setcurrentHolder(d.currentHolder);
        setTotalRent(d?.totalRent ? d?.totalRent : 0);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [bookId]);
  return (
    <WidgetsOnPage
      title={currentBook.bookName}
      rightComponent={
        <PastIssuer
          totalRent={totalRent}
          pastIssues={pastIssues}
          loading={loading}
        />
      }
      leftComponent={
        <IssueBook
          setcurrentHolder={setcurrentHolder}
          bookId={bookId}
          setLoading={setLoading}
          currentHolder={currentHolder}
          loading={loading}
        />
      }
    />
  );
};

export default BookPage;

const PastIssuer = ({ pastIssues, totalRent, loading }) => {
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h4" fontWeight={700}>
          Past Issuers
        </Typography>
        <Box flexGrow={1}></Box>
        <Typography variant="h4" fontWeight={700}>
          Total rent:{totalRent}
        </Typography>
      </FlexBetween>
      <FlexBetween margin={1}>
        {loading ? (
          <Loading />
        ) : pastIssues?.length > 0 ? (
          pastIssues.map((m) => {
            <Box margin={1} padding={1}>
              {"=> " + m.fullName}
            </Box>;
          })
        ) : (
          <Box> No past history</Box>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};
