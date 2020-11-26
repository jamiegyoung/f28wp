import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InstructionsPage.css";
import GoBackButton from "./GoBackButton/GoBackButton";

const InstructionsPage = () => {
  // psueodo hidden for opening animation
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
  // Render a div container with Tutorial info and a button that links to the StartMenu page.
  return (
    <div className={`instructions-container ${pseudoHidden ? "hidden" : ""}`}>
      <h1>Welcome to Type Titans</h1>
      <p>
        To play this game, you need to register an account{" "}
        <Link
          style={{
            color: "teal",
            marginTop: "50px",
          }}
          to="/register"
        >
          here
        </Link>
        .
      </p>
      <p>
        If you already own an account, however, you may login{" "}
        <Link
          style={{
            color: "teal",
            marginTop: "50px",
          }}
          to="/login"
        >
          here
        </Link>
        .
      </p>
      <p>The rules are simple: type to survive!</p>
      <p>So you are this little guy:</p>
      <pre
        style={{
          lineHeight: "30px",
          fontSize: "40px",
        }}
      >{`o
^/
^`}</pre>
      <p>And your enemies (bosses) will look something like this:</p>
      <div
        style={{
          display: "flex",
        }}
      >
        <pre>{` /‾‾|‾‾‾‾|‾‾‾‾|‾‾‾\\
|   |    |    |    |
|‾‾‾|‾‾‾‾|‾‾‾‾|‾‾‾‾|
|   |    |    |    |
|‾‾‾|‾‾‾‾|‾‾‾‾|‾‾‾‾|       ____
|   |    |    |    |     /     /
|___|____|____|____|   /      / 
|   \\    \\    \\    | / \\     /
|                   \\    ‾‾‾/
|     ‾‾‾‾\\/‾‾‾‾     \\     /
|     /‾‾‾‾‾‾‾‾\\       ‾‾‾/
|    |  { () }  |        |
|     \\________/         /
|     /        \\        / 
 \\_____________________/ `}</pre>
        <pre>{`        /\\
       /  \\
   |\\ /(.) \\  |\\
   )o)|_=_ |  )o)
  /o/(  ||  ) |o|
 / / (  ||  ) \\ \\
/ /  (  ||  )  \\ \\
| |  (  \\/  )  | |
\\ \\  (      )  / /
 \\ \`-' / \\ \`--' /
  \`._,'   \`._,'`}</pre>
        <pre>{`    \\___/    
    |{o}|
 ___|_=_|___
[  ^^^^^^^  ]
[  [ /-\\ ]  ]
[  [ |+| ]  ]
[  [ \\-/ ]  ]
'--[     ]--'
   |  |  |
   [ ]|[ ]
   |  |  |
   |__|__|`}</pre>
      </div>
      <p>
        Using your keyboard, type the words prompted in the combat bar and press
        the SPACE key or the ENTER key to attack. If you've made too grave a
        mistake, holding BACKSPACE on your keyboard will remove the entire word
        from the combat bar.
      </p>
      <p>
        Attacking the boss reduces their Health Points (represented by the
        hearts above their name). Kill the boss by attacking the boss
        successfully until they have no Hit Points left. Beware though! You only
        have 20 seconds to kill a boss and it will regenerate all of its health
        if not killed successfully.
      </p>
      <p>
        Killing bosses gives you Experience, which contributes to leveling your
        account up. The aim of the game is to hit max level, which is 100. Reach
        level 100 become the champion of titans!.
      </p>
      <p>
        Beware though! This is no easy feat, and many mortals have died trying
        so only take up this challenge if you dare.
      </p>
      <p>
        Worry not, though! You have friends that will help you along the way! Enjoy!.
      </p>
      <GoBackButton></GoBackButton>
    </div>
  );
};

export default InstructionsPage;
