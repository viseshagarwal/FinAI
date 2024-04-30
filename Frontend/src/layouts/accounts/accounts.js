import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import SoftInput from "components/SoftInput";
import PropTypes from "prop-types";

function AccountForm({ onSubmit }) {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "",
    accountName: "",
    balance: "",
    cardType: "", // Added state for card type
    cardNumber: "", // Added state for card number
    cvv: "", // Added state for CVV
    expiryDate: "", // Added state for expiry date
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    let formData = { ...accountInfo };

    // Modify cardNumber, cvv, and expiryDate fields based on cardType
    if (formData.cardType === "credit") {
      formData = {
        ...formData,
        cc_number: formData.cardNumber,
        cc_cvv: formData.cvv,
        cc_expiry_date: formData.expiryDate,
      };
      delete formData.cardNumber; // Remove cardNumber field
      delete formData.cvv; // Remove cvv field
      delete formData.expiryDate; // Remove expiryDate field
    } else if (formData.cardType === "debit") {
      formData = {
        ...formData,
        dd_number: formData.cardNumber,
        dd_cvv: formData.cvv,
        dd_expiry_date: formData.expiryDate,
      };
      delete formData.cardNumber; // Remove cardNumber field
      delete formData.cvv; // Remove cvv field
      delete formData.expiryDate; // Remove expiryDate field
    }

    // Send data to the server
    try {
      const response = await fetch("http://localhost:8000/add-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Call the onSubmit function if submission is successful
      onSubmit();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error here
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <SoftInput
              label="Account Number"
              name="accountNumber"
              placeholder="Account Number"
              value={accountInfo.accountNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SoftInput
              label="Account Name"
              name="accountName"
              placeholder="Account Name"
              value={accountInfo.accountName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SoftInput
              label="Balance"
              name="balance"
              placeholder="Balance"
              value={accountInfo.balance}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="cardType"
                name="cardType"
                value={accountInfo.cardType}
                onChange={handleChange}
                row // Set row to display radio buttons side by side
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
                  </Grid>
                  <Grid item>
                    <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <SoftInput
              label="Card Number"
              name="cardNumber"
              placeholder="Card Number"
              value={accountInfo.cardNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SoftInput
              label="CVV"
              name="cvv"
              placeholder="CVV"
              value={accountInfo.cvv}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SoftInput
              label="Expiry Date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={accountInfo.expiryDate}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
AccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // onSubmit prop is required and must be a function
};

export default AccountForm;
