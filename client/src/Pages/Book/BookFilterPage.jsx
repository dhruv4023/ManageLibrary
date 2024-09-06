import React, { useEffect, useState } from "react";
import ApplyFilter from "./Filter/ApplyFilter";
import DisplayBooks from "./Filter/DisplayBooks";
import WidgetsOnPage from "../../Components/WidgetsOnPage";
import MyButton from "../../Components/MyCompoenents/MyButton";
import { useNavigate } from "react-router-dom";

const BookFilterPage = () => {
  const [booksData, setBooksData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [booksData, loading]);

  const navigate = useNavigate();
  return (
    <WidgetsOnPage
      title={"All Books"}
      leftComponent={
        <>
          <MyButton
            onclickHandle={() => navigate("/transactions/filter")}
            label={"Transactions Filter"}
          />
          <ApplyFilter
            booksData={booksData}
            setBooksData={setBooksData}
            setLoading={setLoading}
            loading={loading}
          />
        </>
      }
      rightComponent={<DisplayBooks loading={loading} booksData={booksData} />}
    />
  );
};

export default BookFilterPage;
