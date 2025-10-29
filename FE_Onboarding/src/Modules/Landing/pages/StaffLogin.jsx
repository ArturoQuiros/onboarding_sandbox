import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../Global/auth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient";
import { useStaffAuth } from "../../../Global/Context";
import styles from "./StaffLogin.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

export const StaffLogin = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const { login } = useStaffAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleRedirect = async () => {
      setLoading(true);
      try {
        const response = await instance.handleRedirectPromise();
        if (response) {
          const token = response.accessToken;
          const email = response.account?.username;

          if (!email) {
            throw new Error(
              "Unable to retrieve the email from your Microsoft account."
            );
          }

          // Save token and email in sessionStorage for persistence
          sessionStorage.setItem("accessToken", token);
          sessionStorage.setItem("userEmail", email);
          sessionStorage.setItem("userType", "staff");

          // Initial login with email (without Authorization token)
          const loginResponse = await axiosClient.post(
            "/User/Inside/LogIn",
            { email: email },
            {
              headers: {
                Authorization: undefined, // Remove token for this endpoint
              },
            }
          );

          // Keep Microsoft token for future authenticated requests
          login(loginResponse.data);
          navigate("/admin");
        }
      } catch (error) {
        console.error(
          "Error processing Microsoft login redirect or API login:",
          error
        );
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userEmail");
        setErrorMsg(
          "Unable to sign in with Microsoft. Please verify your account and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [instance, navigate, login]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Error initiating Microsoft login:", error);
      setErrorMsg("Unable to sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src="/onboarding_logo_black.png"
        alt="BDO Black Logo"
      />
      <button
        className={styles.msButton}
        onClick={handleLogin}
        disabled={loading}
      >
        <img
          src="https://static.cdnlogo.com/logos/m/95/microsoft.svg"
          alt="Microsoft"
          className={styles.msLogo}
        />
        {loading ? "Signing in..." : "Sign in with Microsoft"}
      </button>
      {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
      <p className={styles.backLink}>
        <a onClick={() => navigate("/")} className={styles.backButton}>
          Back to Home
        </a>
      </p>
    </div>
  );
};
