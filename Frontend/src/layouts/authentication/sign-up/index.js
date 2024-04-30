import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();

  // Add new state variables for error messages
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSetAgreement = () => setAgreement(!agreement);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signupFunc = (event) => {
    event.preventDefault();

    // Reset error messages
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");

    // Validate name
    if (!nameInput) {
      setNameError("Name is required");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(nameInput)) {
      setNameError("Name can only contain alphabets");
      return;
    }

    // Validate phone
    if (!phoneInput) {
      setPhoneError("Phone number is required");
      return;
    } else if (!/^[0-9]{10}$/.test(phoneInput)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate email
    if (!emailInput) {
      setEmailError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!passwordInput) {
      setPasswordError("Password is required");
      return;
    } else if (passwordInput.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else if (
      !/[A-Z]/.test(passwordInput) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput) ||
      !/[0-9]/.test(passwordInput)
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one special character, and one number"
      );
      return;
    }

    if (agreement) {
      setSigningUp(true);
      fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          phone: phoneInput,
          email: emailInput,
          password: passwordInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Signed up successfully") {
            setSigningUp(false);
            Cookies.set("id", data.insertId, { expires: 7 });
            navigate("/dashboard");
          } else {
            console.error("Error signing up:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        });
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Create an account to access exclusive features and personalized content."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={signupFunc}>
            <SoftBox mb={2}>
              <SoftInput
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                placeholder="Name"
              />
              {nameError && <div style={{ color: "red" }}>{nameError}</div>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                value={phoneInput}
                onChange={(event) => setPhoneInput(event.target.value)}
                placeholder="Phone No. "
              />
              {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                value={emailInput}
                onChange={(event) => setEmailInput(event.target.value)}
                type="email"
                placeholder="Email"
              />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              {signingUp ? (
                <SoftButton variant="gradient" color="dark" fullWidth disabled>
                  <CircularProgress size={24} color="inherit" />
                </SoftButton>
              ) : (
                <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                  Sign Up
                </SoftButton>
              )}
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
