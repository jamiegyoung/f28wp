import keyDown1 from "./KeyboardMedia/key_down_1.mp3";
import keyDown2 from "./KeyboardMedia/key_down_2.mp3";
import keyDown3 from "./KeyboardMedia/key_down_3.mp3";
import keyDown4 from "./KeyboardMedia/key_down_4.mp3";
import keyDown5 from "./KeyboardMedia/key_down_5.mp3";

import keyUp1 from "./KeyboardMedia/key_up_1.mp3";
import keyUp2 from "./KeyboardMedia/key_up_2.mp3";
import keyUp3 from "./KeyboardMedia/key_up_3.mp3";
import keyUp4 from "./KeyboardMedia/key_up_4.mp3";
import keyUp5 from "./KeyboardMedia/key_up_5.mp3";

// load all the sounds into an array
const keyDowns = [
  new Audio(keyDown1),
  new Audio(keyDown2),
  new Audio(keyDown3),
  new Audio(keyDown4),
  new Audio(keyDown5),
]

// load all the sounds into an array
const keyUps = [
  new Audio(keyUp1),
  new Audio(keyUp2),
  new Audio(keyUp3),
  new Audio(keyUp4),
  new Audio(keyUp5),
]

const rand = (arr) => {
  return Math.floor(Math.random() * (arr.length - 0) + 0);
};

// randomly pick one of the sounds in either array
const getKeyboardSound = (type) => {
  if (type === "down") {
    return keyDowns[rand(keyDowns)]
  }

  if (type === "up") {
    return keyUps[rand(keyUps)]
  }
};

export default getKeyboardSound;
