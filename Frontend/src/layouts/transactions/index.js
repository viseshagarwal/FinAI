// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Select } from "@mui/material";

import React, { useState, useEffect } from "react";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import Transactions from "layouts/transactions/components/Transactions";

import Cookies from "js-cookie";

function Transactions1() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomeCategory, setIncomeCategory] = useState("");
  const [userId, setUserId] = useState(""); // State to hold user_id

  useEffect(() => {
    // Retrieve user_id from cookie on component mount
    const userIdFromCookie = Cookies.get("id");
    setUserId(userIdFromCookie);
  }, []); // Emp
  //console.log(userId);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenIncome = () => {
    setIncomeOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleIncomeClose = () => {
    setIncomeOpen(false);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleIncomeChangeCategory = (event) => {
    setIncomeCategory(event.target.value);
  };
  const handleAddExpense = () => {
    const expenseData = {
      user_id: userId, // Include user_id in the transaction data
      category: category,
      amount: amount,
      description: description,
      transactionDate: "2024-02-24",
    };

    fetch("http://localhost:8000/addExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add expense");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Expense added successfully:", data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };
  const handleAddIncome = () => {
    const incomeData = {
      user_id: userId, // Include user_id in the transaction data
      category: incomeCategory,
      amount: amount,
      description: description,
      transactionDate: "2024-02-24 10:00:00",
    };

    fetch("http://localhost:8000/addIncome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add income");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Income added successfully:", data);
        handleIncomeClose();
      })
      .catch((error) => {
        console.error("Error adding income:", error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftBox mb={3} sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                  sx={{ color: "white", backgroundColor: "#3f51b5" }}
                >
                  Add Expense
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpenIncome}
                  sx={{ color: "white", backgroundColor: "#4caf50" }}
                >
                  Add Income
                </Button>

                <Dialog open={open} onClose={handleClose} maxWidth="sm">
                  <DialogTitle>Add Expense Transaction</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                      <Select
                        labelId="category-label"
                        id="category"
                        value={category}
                        onChange={handleChangeCategory}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select a category
                        </MenuItem>
                        <MenuItem value={"Food"}>Food</MenuItem>
                        <MenuItem value={"Household"}>Household</MenuItem>
                        <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Description"
                      onChange={(event) => setDescription(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Amount"
                      onChange={(event) => setAmount(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Transaction Date"
                      onChange={(event) => setTransactionDate(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddExpense} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={incomeOpen} onClose={handleIncomeClose} maxWidth="sm">
                  <DialogTitle>Add Income Transaction</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                      <Select
                        labelId="income-category-label"
                        id="income-category"
                        value={incomeCategory}
                        onChange={handleIncomeChangeCategory}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select a category
                        </MenuItem>
                        <MenuItem value={"Salary"}>Salary</MenuItem>
                        <MenuItem value={"Business"}>Business</MenuItem>
                        <MenuItem value={"Investment"}>Investment</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Description"
                      onChange={(event) => setDescription(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Amount"
                      onChange={(event) => setAmount(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Transaction Date"
                      onChange={(event) => setTransactionDate(event.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleIncomeClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddIncome} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </SoftBox>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Transactions1;
