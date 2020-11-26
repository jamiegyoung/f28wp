import React from "react";
import "./LogoutButton.css";

const LogoutButton = () => {
  // Button that will be placed in the bottom left corner of the game for the user log out at any point.

  return (
    <div
      className={`logout-button`}
      // Handle logging out by sending the user to the /logout url which is handled in index.js in the server.
      onClick={() => window.location.replace("/logout")}
    >
      <p className="noselect">Logout</p>
    </div>
  );
};

export default LogoutButton;
