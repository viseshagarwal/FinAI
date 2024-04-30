import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PaymentMethod from "layouts/accounts/components/PaymentMethod";
import Invoices from "layouts/accounts/components/Invoices";
import BillingInformation from "layouts/accounts/components/BillingInformation";
import Cookies from "js-cookie";
import AccountForm from "./accounts";
import { Balance } from "@mui/icons-material";
import Transactions from "layouts/transactions/components/Transactions";
import data from "layouts/dashboard/components/Projects/data";
function Accounts() {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const handleSubmit = (accountInfo) => {
    // Handle the submitted account information, e.g., send it to the server
    console.log("Submitted account info:", accountInfo);
  };
  useEffect(() => {
    const userIdFromCookie = Cookies.get("id");
    if (!userIdFromCookie) {
      console.error("User ID not found in cookie");
      return;
    }

    //console.log("User ID from cookie:", userIdFromCookie);

    setUserId(userIdFromCookie);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = async () => {
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
        //console.log("Fetched transactions:", data);

        setLoading(false);
      } else {
        console.error("Failed to fetch transactions");
        setShowForm(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setShowForm(true);
      setLoading(false);
    }
  };

  //console.log("Fetched transactions lmknjnj :", transactions[0]);
  //console.log("Fetched transactions lmknjnj :", transactions[0]?.credit_card_number);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    } else if (showForm) {
      return (
        <div>
          <h2>Add Account</h2>
          <AccountForm onSubmit={handleSubmit} />
        </div>
      );
    } else {
      // return (
      //   <Grid container spacing={3}>
      //     <Grid item xs={12} lg={8}>
      //       <Grid container spacing={3}>
      //         <Grid item xs={12} xl={6}>
      //           <MasterCard
      //             number={transactions[0]?.credit_card_number}
      //             holder={transactions[0]?.account_name}
      //             expires={transactions[0]?.cc_exp}
      //           />
      //         </Grid>
      //         <Grid item xs={12} md={6} xl={5}>
      //           <DefaultInfoCard
      //             icon="account_balance"
      //             title="Account Balance"
      //             description="Available Balance"
      //             value={`\u20B9${transactions[0]?.account_balance}`}
      //           />
      //         </Grid>
      //       </Grid>
      //     </Grid>
      //     <Grid item xs={12} lg={4}>
      //       <Transactions />
      //     </Grid>
      //   </Grid>
      // );
      return (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} xl={6}>
                  <MasterCard
                    number={transactions[0]?.credit_card_number}
                    holder={transactions[0]?.account_name}
                    expires={transactions[0]?.cc_exp}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={4}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Account Balance"
                    description="Available Balance"
                    value={`\u20B9${transactions[0]?.account_balance}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12} lg={4}>
            <Transactions />
          </Grid>
        </>
      );
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5}>
        <SoftBox mb={1.5}>{renderContent()}</SoftBox>
      </SoftBox>
      <br />
      <Footer />
    </DashboardLayout>
  );
}

export default Accounts;
