import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const LoginFail = () => {
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{
        maxWidth: '500px',
        backgroundColor: '#212121',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }}>
        <h1
        className="noselect"
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Username or password not found! Please click{" "}
          <Link
            style={{
              color: '#80c3ea'
            }}
            to="/login"
          >
            here
          </Link>
          {" "}to go back or register.
        </h1>
      </div>
    </div>
  );
};

export default LoginFail;
