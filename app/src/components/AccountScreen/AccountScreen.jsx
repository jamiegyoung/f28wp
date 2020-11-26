import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountForm from "./AccountForm/AccountForm";
import "./AccountScreen.css";

const AccountScreen = ({ registration }) => {
  // pseudohidden for fading in the account screen
  const [pseudoHidden, setPseudoHidden] = useState(true);
  const isComponentLoaded = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      setPseudoHidden(false);
    }, 200);

    return () => {
      isComponentLoaded.current = false;
    };
  }, []);

  // username and password text and input field
  // TODO: remove link when building
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className={`account-container ${pseudoHidden ? "hidden" : ""}`}
    >
      {/* pass registration type to account form */}
      <AccountForm registration={registration}></AccountForm>
      {/* Depending on the type of registration, change the text and redirect link */}
      {registration ? (
        <Link
          style={{
            color: "white",
            marginTop: "50px",
          }}
          to="/login"
        >
          Already have an account? click here to login!
        </Link>
      ) : (
        <Link
          style={{
            color: "white",
            marginTop: "50px",
          }}
          to="/register"
        >
          Don't have an account? click here to register!
        </Link>
      )}
    </div>
  );
};

export default AccountScreen;
