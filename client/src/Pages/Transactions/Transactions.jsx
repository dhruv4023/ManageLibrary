import React from "react";
import WidgetsOnPage from "../../Components/WidgetsOnPage";
import TransactionsByUser from "./TransactionsByUser";
import TransactionsByDateRange from "./TransactionsByDateRange.jsx";
import MyButton from "../../Components/MyCompoenents/MyButton.jsx";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  return (
    <WidgetsOnPage
      title={"All Transactions"}
      leftComponent={
        <>
          <MyButton
            onclickHandle={() => navigate("/")}
            label={"Transactions Filter"}
          />
          <TransactionsByUser />
        </>
      }
      rightComponent={<TransactionsByDateRange />}
    />
  );
};

export default Transactions;
