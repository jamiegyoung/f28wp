import React from "react";
import { useState } from "react";
import "./AccountForm.css";


const AccountForm = ({ registration }) => {
  // is same is true if the password confirmation is the same as the passsword
  const [isSame, setIsSame] = useState(false);

  const handleConfirmPasswordValue = (e) => {
    // If it is the login form, confirmation password checking is not required
    if (!registration) return;

    // Get the password and confirm password values
    const passwordInput = document.getElementById("password-input");
    const confirmPasswordInput = document.getElementById(
      "confirm-password-input"
    );

    // If they are the same, set same as true
    if (confirmPasswordInput.value === passwordInput.value) {
      return setIsSame(true);
    }
    // Else set it to false
    setIsSame(false);
  };

  return (
    <form
      className="account-form"
      action={`/api/${
        // Depending on the value of registration, 
        // it will either post to the login api or the user creation api
        registration ? "create-user" : "authenticate-user"
      }`}
      method="POST"
    >
      {/* Value will change depending on if it is the registration form or not */}
      <h1>{registration ? "Sign Up" : "Login"}</h1>
      <label>Username:</label>
      <input type="text" name="username" placeholder="Username" required />
      <label>Password:</label>
      <input
        id="password-input"
        onChange={handleConfirmPasswordValue}
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      {/* Password confirmation will not appear if it is the login form */}
      {registration ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Confirm password</label>
          <input
            id="confirm-password-input"
            // generate classname based on is the same, allowing for different colours if not
            className={`${isSame ? "same" : "not-same"}`}
            onChange={handleConfirmPasswordValue}
            type="password"
            placeholder="Password"
            required
          />
        </div>
      ) : (
        null
      )}
      {/* if it is not same and the registration form, the button is  disabled */}
      <button className={isSame || !registration ? '' : 'disabled'} disabled={!isSame && registration} type="submit">
        {/* generate inner text based on registration type */}
        {registration ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};

export default AccountForm;
