import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Cookies from "js-cookie";
import { createTheme } from "@mui/material/styles";
function Tables() {
  const [budgets, setBudgets] = useState([]); // State to hold budget data
  const [openDialog, setOpenAddDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromCookie = Cookies.get("id");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchBudgets(userIdFromCookie); // Corrected userId parameter here
    } else {
      console.error("User ID not found in cookie");
    }
  }, []);

  const fetchBudgets = async (userId) => {
    try {
      const response = await fetch("http://localhost:8000/get-budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch budgets");
      }
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500], // Custom primary color
      },
      secondary: {
        main: green[500], // Custom secondary color
      },
    },
  });

  const handleAddBudget = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmitNewBudget = () => {
    const data = {
      user_id: userId,
      category,
      budget_name: budgetName,
      amount,
      description,
    };

    fetch("http://localhost:8000/add-budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        handleCloseAddDialog(); // Close the dialog on success
        fetchBudgets(userId); // Refresh the data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Budgets</SoftTypography>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAddBudget}
                  style={{ marginRight: "25px" }}
                >
                  Add Budget
                </Button>
              </ThemeProvider>
            </div>
          </SoftBox>
        </Card>
      </SoftBox>
      <Dialog open={openDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Budget</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                value={category}
                onChange={handleChangeCategory}
                fullWidth
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  Select Category
                </MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Household">Household</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="budget_name"
                label="Name"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="amount"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleSubmitNewBudget} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer
        component={Card}
        style={{ marginTop: "20px", borderRadius: "15px", padding: "16px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
                  padding: "8px",
                  paddingRight: "250px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  borderRight: "1px solid black",
                  padding: "8px",
                  paddingRight: "50px",
                }}
              >
                Category
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  borderRight: "1px solid black",
                  padding: "8px",
                }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderTop: "2px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "2px solid black",
                  padding: "8px",
                }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.budget_id}>
                <TableCell align="left">{budget.budget_name}</TableCell>
                <TableCell align="left">{budget.category}</TableCell>
                <TableCell align="left">{budget.description}</TableCell>
                <TableCell align="right">{budget.budget_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br /> <br /> <br /> <br /> <br />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
