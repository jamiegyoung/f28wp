import React from 'react';
import './LogoutButton.css'

const LogoutButton = () => {

  return <div
    className={`logout-button`}
    onClick={() => window.location.replace("/logout")}
  >
    <p className="noselect">Logout</p>
  </div>
}

export default LogoutButton;