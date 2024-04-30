import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import Cookies from "js-cookie";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const loginFunc = (event) => {
    event.preventDefault();

    setSigningIn(true);
    setError("");

    fetch(`http://localhost:8000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Signed in successfully") {
          setSigningIn(false);
          Cookies.set("id", data.id, { expires: 7 });
          navigate("/dashboard");
        } else {
          setSigningIn(false);
          setError(data.error || "Error signing in");
        }
      })
      .catch((error) => {
        setSigningIn(false);
        setError("Error signing in");
      });
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={loginFunc}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          {signingIn ? (
            <SoftButton variant="gradient" color="info" fullWidth disabled>
              <CircularProgress size={24} color="inherit" />
            </SoftButton>
          ) : (
            <SoftButton variant="gradient" color="info" fullWidth type="submit">
              Sign In
            </SoftButton>
          )}
        </SoftBox>
        {error && (
          <SoftTypography variant="caption" color="error">
            {error}
          </SoftTypography>
        )}
        {/* <SoftBox mt={3} mb={1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography variant="caption" fontWeight="bold" ml={1}>
            Remember me
          </SoftTypography>
        </SoftBox> */}
        <SoftBox mt={2} mb={1}>
          <Link to="/authentication/sign-up">
            <SoftTypography variant="body2" color="text">
              Dont have an account?
            </SoftTypography>
          </Link>
        </SoftBox>
        {/* <Socials /> */}
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
