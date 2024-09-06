import React from "react";
import WidgetsOnPage from "../../Components/WidgetsOnPage";
import TransactionsByUser from "./TransactionsByUser";
import TransactionsByDateRange from "./TransactionsByDateRange.jsx";

const Transactions = () => {
  return (
    <WidgetsOnPage
      title={"All Transactions"}
      leftComponent={<TransactionsByUser />}
      rightComponent={<TransactionsByDateRange />}
    />
  );
};

export default Transactions;
