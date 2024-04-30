// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(""); // State to hold user_id

  useEffect(() => {
    // Fetch transactions from the backend when the component mounts
    const userIdFromCookie = Cookies.get("id");
    setUserId(userIdFromCookie);
    fetchTransactions(userIdFromCookie); // Pass userIdFromCookie to fetchTransactions
    // console.log("called");
  }, []);
  const fetchTransactions = async (userId) => {
    // Accept userId as parameter
    try {
      const response = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users_id: userId }), // Send userId as users_id in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={3}>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {transactions.map((transaction) => {
            const description =
              transaction.description +
              "\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Transaction Date:  " +
              transaction.DateTime;

            // Use case-insensitive comparison
            const color = transaction.type === "Expense" ? "error" : "success";
            const icon = transaction.type === "Expense" ? "arrow_downward" : "arrow_upward";
            const value =
              transaction.type === "Expense"
                ? "\xa0 - ₹\xa0\xa0" + transaction.amount
                : "\xa0 + ₹\xa0" + transaction.amount;
            return (
              <Transaction
                key={transaction.transaction_id}
                color={color}
                icon={icon}
                name={transaction.category}
                description={description}
                value={value}
              />
            );
          })}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Transactions;
