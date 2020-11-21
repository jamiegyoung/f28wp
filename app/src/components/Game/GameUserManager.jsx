import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const GameUserManager = (props) => {
  const [userAccount, setUserAccount] = useState();

  //TODO:
  //  - add periodic checks to an api to see if the user is valid
  
  // replace loading spinner with a login form
  return (
    <div>
      {userAccount ? (
        props.children
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
};

export default GameUserManager;
