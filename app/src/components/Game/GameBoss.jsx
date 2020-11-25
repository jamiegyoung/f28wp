import React from "react";

const GameBoss = () => {
  const bossTypes = [
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
    `    !\\\\!//!
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
   ---- ----
    `
  ];

  return (
    <pre style={{ color: "#eeee", fontSize: "20px", marginBottom: "0px" }}>
      {bossTypes[6]}
    </pre>
  );
};

export default GameBoss;
