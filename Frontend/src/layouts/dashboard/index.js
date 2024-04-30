import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Transactions from "layouts/transactions/components/Transactions";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
//import dotenv from "dotenv";

//dotenv.config();
function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [transaction1, setTransaction1] = useState([]);
  const [userId, setUserId] = useState("");
  const [debts, setDebts] = useState([]);
  const [responseText, setResponseText] = useState("");
  const MODEL_NAME = "gemini-pro";

  useEffect(() => {
    const userIdFromCookie = Cookies.get("id");
    if (!userIdFromCookie) {
      console.error("User ID not found in cookie");
      return;
    }

    setUserId(userIdFromCookie);
    fetchTransactions(userIdFromCookie);
    fetchDebts(userIdFromCookie);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  const fetchAccounts = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const response = await fetch("http://localhost:8000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTransactions = async (userId) => {
    try {
      const response = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users_id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransaction1(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchDebts = async (userId) => {
    try {
      const response = await fetch("http://localhost:8000/getDebts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch debts");
      }

      const data = await response.json();
      setDebts(data.debts);
    } catch (error) {
      console.error("Error fetching debts:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} xl={6}>
              <DefaultInfoCard
                icon="account_balance"
                title="Account Balance"
                description="Available Balance"
                value={`\u20B9${transactions[0]?.account_balance}`}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox>
          <Grid item xs={12} lg={4}>
            <Transactions />
          </Grid>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
