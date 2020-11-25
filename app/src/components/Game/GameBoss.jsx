import React from "react";
import GameBossHealthBar from "./GameBossHealthBar";

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

const GameBoss = ({ bossType, name, health, maxHealth }) => {
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
          <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
            {bossType}
          </pre>
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
            Loading...
          </h1>
          <GameBossHealthBar></GameBossHealthBar>
          <pre style={{ color: "#eeee", fontSize: "18px", margin: "0px" }}>
            {bossTypes[0]}
          </pre>
        </div>
      )}
    </div>
  );
};

export { GameBoss as default, bossTypes };
