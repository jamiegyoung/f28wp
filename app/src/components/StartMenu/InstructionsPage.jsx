import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./InstructionsPage.css";
import GoBackButton from "./GoBackButton/GoBackButton";

const InstructionsPage = () => {
  const [pseudoHidden, setPseudoHidden] = useState(true);
  const isComponentLoaded = useRef(true)

  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      setPseudoHidden(false);
    }, 200);

    return () => {
      isComponentLoaded.current = false;
    }
  }, [])

  return <div className={`instructions-container ${pseudoHidden ? 'hidden' : ''}`}>
    <h1>Welcome to Type Titans</h1>
    <p>To play the game, you need to register an account{" "}
    <Link
        style={{
            color: "teal",
            marginTop: "50px",
        }}
          to="/register">here</Link>.
    </p>
    <p>If you already own an account, however, you may login{" "}
    <Link
        style={{
            color: "teal",
            marginTop: "50px",
        }}
          to="/login">here</Link>.
    </p>
    <p>The rules are simple: type to survive. (!!!!!!)</p>
    <p>So you are this little guy:</p>
    <pre></pre>
    <p>And your enemies (bosses) will look something like this:</p>
    <pre>       _\_/_
     | O O |
     | ¬¬¬ |
      [:::]
 /\/\[   //]/\/\
 [      ///    ]
 [  [  ///  ]  ]
 [  [ ///   ]  ]
 [::[///    ]::]
 \\\[-------]///
    |   |   |
    |[ ]|[ ]|
    |   |   |
    |   |   |
    ~~~~ ~~~~</pre>
    <p>Using your keyboard, type the words prompted in the combat bar and press the SPACE key or the ENTER key to attack. If you've made too grave a mistake, holding BACKSPACE on your keyboard will entire word in the combat bar.</p>
    <p>Attacking the boss reduces their Health Points (represented by the hearts above their name). Kill the boss by attacking the boss successfully until they have no Hit Points left, so you may move on to the next. Beware though! You only have 20 seconds to kill a boss.</p>
    <p>Killing bosses gives you Experience, which contributes to leveling your account up. The aim of the game is to hit max level, which is 100. Reach level 100 and kill the final boss to be the victor.</p>
    <p>Beware though! This is no easy feat, and many mortals have died trying so only take up this challenge if you dare.</p>
    <p>Worry not, though! You have friends that will help you along the way ;).</p>
    <GoBackButton></GoBackButton>
  </div>
}

export default InstructionsPage;