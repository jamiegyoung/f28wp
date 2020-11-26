import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GameBossHealthBar from "./GameBossHealthBar";
import GamePlayer from "./GamePlayer";

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
];

const GameBoss = ({ bossType, name, health, maxHealth, numPlayers, dead }) => {
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    if (isNaN(numPlayers) || numPlayers < 0) return;
    // Clamp the number of players at 500
    const getNumPlayers = () => {
      if (numPlayers > 500) return 500;
      return numPlayers;
    }

    setOtherPlayers(
      [...Array(getNumPlayers()).keys()].map((x) => (
        <GamePlayer
          isPlayer={false}
          key={x}
        ></GamePlayer>
      ))
    );
  }, [numPlayers]);

  useEffect(() => {
    if (dead) {
      
    }
  })

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
            <p></p>
            <GamePlayer isPlayer={true}></GamePlayer>
            <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
              {bossType}
            </pre>
            {otherPlayers}
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
            <GamePlayer isPlayer={true}></GamePlayer>
            <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
              {bossTypes[0]}
            </pre>
            <div style={{
              width: '400px',
              overflowX: 'visible',
              display: 'flex',
              flexWrap: 'nowrap'
            }}>
            {otherPlayers}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { GameBoss as default, bossTypes };
