import React, { useEffect } from "react";
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
        flexDirection: "column",
      }}>
          <h1 style = {{
              color: "white",
              marginTop: "50px",
          }}>Username or password not found! Please click <Link
          style={{
            color: "white",
            marginTop: "50px",
          }}
          to="/login"
        >here</Link> to go back or register.</h1>
      </div>
}

export default LoginFail