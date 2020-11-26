import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GameBossHealthBar from "./GameBossHealthBar";
import GamePlayer from "./GamePlayer";
import getDeathSound from "./getDeathSound";
import getLevelUpSound from "./getLevelUpSound";

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
|     ‾‾‾‾\/‾‾‾‾      \\     /
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

  useEffect(() => {
    if (bossHealth > health) {
      setDamaged(true);
      // do damage anim
      setTimeout(() => {
        setDamaged(false);
      }, 200);
    }
    setBossHealth(health);
  }, [health]);

  useEffect(() => {
    if (dead && !isDead) {
      getDeathSound();
    }
    setDead(dead);
  }, [dead]);

  useEffect(() => {
    if (isNaN(numPlayers) || numPlayers < 0) return;
    // Clamp the number of players at 500
    const getNumPlayers = () => {
      if (numPlayers > 500) return 500;
      return numPlayers;
    };

    setOtherPlayers(
      [...Array(getNumPlayers()).keys()].map((x) => (
        <GamePlayer isPlayer={false} key={x}></GamePlayer>
      ))
    );
  }, [numPlayers]);

  useEffect(() => {
    if (level > playerLevel) {
      getLevelUpSound();
      setPlayerLevel(level);
    }
  }, [level]);

  return (
    <div>
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
            }}
          >
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
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "24px",
                }}
              >
                LVL.{playerLevel}
              </p>
              <GamePlayer isPlayer={true}></GamePlayer>
            </div>
            <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
              {damaged
                ? bossType
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
              {otherPlayers}
            </div>
          </div>
        </div>
      ) : (
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
