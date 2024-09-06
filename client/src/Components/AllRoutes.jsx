import React from "react";
import { Routes, Route } from "react-router-dom";
import TransactionsPage from "../Pages/Transactions/Transactions.jsx";
import BookPage from "../Pages/Book/BookPage.jsx";
import BookFilterPage from "../Pages/Book/BookFilterPage.jsx";
import HomePage from "../Pages/Home/Home.jsx";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book/filter" element={<BookFilterPage />} />
      <Route path="/transactions/filter" element={<TransactionsPage />} />
      <Route path="/book/:bookId" element={<BookPage />} />
    </Routes>
  );
};
