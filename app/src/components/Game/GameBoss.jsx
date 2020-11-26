import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GameBossHealthBar from "./GameBossHealthBar";
import GamePlayer from "./GamePlayer";
import getDeathSound from "./getDeathSound";
import getLevelUpSound from "./getLevelUpSound";

// Below are all the different sprites the user can get.
// These are stored client side as they are tiny and are often reused
// All sprites are credited
const bossTypes = [
  // Made by Jamie Young
  ` ______
|  __  \\
|_|  \\  |
  ___/  /
 /  ___/
/  /
|  |
|__|
 __
|__|
  `,
  // Made by Jamie Young
  `     ___
    |¬ ¬|
    | ~ |
 ___ \\_/ ___
[           ]
[ [ [] [] ] ]
[ [ [] [] ] ]
[ [ [] [] ] ]
'--[     ]--'
   |  |  |
   [ ]|[ ]
   |  |  |
   |  |  |
   ~~~ ~~~`,
  // Made by Jamie Young
  `     _____
    | ¬ ¬ |
    |  ~  |
     [===]
 ___[     ]___
[             ]
[  [   -   ]  ]
[  [  ---  ]  ]
[  [ ----- ]  ]
'--[-------]--'
   |   |   |
   |[ ]|[ ]|
   |   |   |
   |   |   |
   ~~~~ ~~~~`,
  //  Made by James Roundtree
  `     _____
    | ¬ ¬ |
    | ::: |
     [===]
____[ \\ / ]____
[    \\ / /    ]
[  [  / /  ]  ]
[  [ / /   ]  ]
[__[/ /    ]__]
\\\\\\[-------]///
   |   |   |
   |[ ]|[ ]|
   |   |   |
   |   |   |
   ~~~~ ~~~~`,
  //  Made by James Roundtree
  `    \\___/    
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
   |__|__|`,
  //  Made by James Roundtree
  `     _____
    | \\ / |
    | *** |
     [---]
*---[     ]---*
[      !      ]
[  [       ]  ]
[  [ .. .. ]  ]
[..[ .. .. ]..]
\\\\\\[-------]///
   |   |   |
   |[ ]|[ ]|
   |   |   |
   |   |   |
   ~~~~ ~~~~`,
  //  Made by James Roundtree
  `      _____
     |[] []|
     | ;;; |
      [   ]
 ^___[/\\ /\\]___^
<|    \\ \\ /    |>
 |  [ /\\ \\  ]  |
 |  [/ /\\ \\ ]  |
 |__[_/  \\_\\]__|
 (()[-----[!]())
    |   |   |
    |( )|( )|
    |   |   |
    |   |   |
    ~~~~ ~~~~`,
  //  Made by James Roundtree
  `     !\\\\!//!
     |<> <>|
     }.---.{
      [xxx]
 .___[^    ]___.
 [    \\ \\   ]  ]
 [  [ <\\ \\  ]  ]
 [  [  \\\\ \\ ]  ]
 /  [:__\\\\_\\]  \\
 VVV[===¬===]VVV
    |   |   |
    |< >|< >|
    |   |   |
    |   |   |
    ---- ----`,
  //  Made by James Roundtree
  `   /-/___\\-\\
  /-|[\\ /]|-\\
  \\v\\ <v> /v/
 \\ V \\___/ V /
/|\\_[-   -]_/|\\
[-----   -----]
[--[-[] []-]--]
[--[-[] []-]--]
[  [-[] []-]  ]
{{}[-------]{}}
   |   |   |
   |[ ]|[ ]|
   |   |   |
   |   |   |
   ---- ----`,
  //  Made by James Roundtree & Jamie Young
  `     @___@
     |(.)|
__---|_=_|---__
[ [ ^^^^^^^ ] ]
[ [ [ /-\\ ] ] ]
[ [ [ |+| ] ] ]
'-[ [ \\-/ ] ]-'
  '-[     ]-'
    |  |  |
    [ ]|[ ]
    |  |  |
    |__|__|`,
  //  Made by Jamie Young
  `        /\\
       /  \\
   |\\ /(.) \\  |\\
   )o)|_=_ |  )o)
  /o/(  ||  ) |o|
 / / (  ||  ) \\ \\
/ /  (  ||  )  \\ \\
| |  (  \\/  )  | |
\\ \\  (      )  / /
 \\ \`-' / \\ \`--' /
  \`._,'   \`._,'`,
  //  Made by James Roundtree
  ` /‾‾|‾‾‾‾|‾‾‾‾|‾‾‾\\
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
 \\_____________________/ `,
];

const GameBoss = ({
  bossType,
  name,
  health,
  maxHealth,
  numPlayers,
  dead,
  level,
}) => {
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [playerLevel, setPlayerLevel] = useState(0);
  const [isDead, setDead] = useState(false);
  const [bossHealth, setBossHealth] = useState();
  const [damaged, setDamaged] = useState(false);

  // if the boss' health changes
  useEffect(() => {
    // if the new health is less than the old health
    if (bossHealth > health) {
      setDamaged(true);
      // do damage anim for .2 seconds
      setTimeout(() => {
        setDamaged(false);
      }, 200);
    }
    setBossHealth(health);
    // eslint-disable-next-line
  }, [health]);

  // if the boss dies
  useEffect(() => {
    // set dead and play sound
    if (dead && !isDead) {
      getDeathSound();
    }
    setDead(dead);
    // eslint-disable-next-line
  }, [dead]);

  // if the number of players in the game changes
  useEffect(() => {
    if (isNaN(numPlayers) || numPlayers < 0) return;
    // Clamp the number of players at 500
    const getNumPlayers = () => {
      if (numPlayers > 500) return 500;
      return numPlayers;
    };
    // Generate an array of GamePlayer components
    setOtherPlayers(
      [...Array(getNumPlayers()).keys()].map((x) => (
        <GamePlayer isPlayer={false} key={x}></GamePlayer>
      ))
    );
  }, [numPlayers]);

  // if the user's level changes
  useEffect(() => {
    // play the level up sound
    if (level > playerLevel) {
      getLevelUpSound();
      setPlayerLevel(level);
    }
    // eslint-disable-next-line
  }, [level]);

  return (
    <div>
      {/* if the boss exists, display it, else display the question mark */}
      {name && health ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            
          }}
        >
          <h1
            style={{
              color: "#eeee",
              fontWeight: "normal",
              margin: "0"
            }}
          >
            {/* use the name of the boss name prop */}
            {name}
          </h1>
          <GameBossHealthBar
            max={maxHealth}
            current={health}
          ></GameBossHealthBar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginRight: '10px'
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "24px",
                }}
              >
                {/* display the user's level */}
                Lv.{playerLevel}
              </p>
              {/* add the player to the game */}
              <GamePlayer isPlayer={true}></GamePlayer>
            </div>
            <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
              {damaged
                ? // if the boss is damaged, randomly add spaces to the sprite in order to generate a damaged looking boss
                  bossType
                    .split("")
                    .map((x) =>
                      Math.random() > 0.1
                        ? x
                        : Math.random() >= 0.5
                        ? " " + x
                        : x + " "
                    )
                    .join("")
                : bossType}
            </pre>
            <div
              style={{
                maxWidth: "400px",
                overflowX: "visible",
                display: "flex",
                flexWrap: "nowrap",
                paddingLeft: "50px",
              }}
            >
              {/* display the other players */}
              {otherPlayers}
            </div>
          </div>
        </div>
      ) : (
        // the below component is the same as the other one, just a different type
        // this could probably be refactored in the future
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: "#eeee",
              fontWeight: "normal",
            }}
          >
            Waiting...
          </h1>
          <GameBossHealthBar></GameBossHealthBar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px 50px 0px 0px",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "24px",
                  margin: "0px 0px 5px 0px",
                }}
              >
                LVL.{playerLevel}
              </p>
              <GamePlayer isPlayer={true}></GamePlayer>
            </div>
            <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
              {bossTypes[0]}
            </pre>
            <div
              style={{
                maxWidth: "400px",
                overflowX: "visible",
                display: "flex",
                flexWrap: "nowrap",
                paddingLeft: "50px",
              }}
            >
              {otherPlayers}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { GameBoss as default, bossTypes };
