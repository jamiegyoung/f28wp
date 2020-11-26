import levelUpSound1 from "./Media/Level_Up_1.wav";
import levelUpSound2 from "./Media/Level_Up_2.wav";
import levelUpSound3 from "./Media/Level_Up_3.wav";
import levelUpSound4 from "./Media/Level_Up_4.wav";

const audioArray = [
  new Audio(levelUpSound1),
  new Audio(levelUpSound2),
  new Audio(levelUpSound3),
  new Audio(levelUpSound4),
]

const rand = (arr) => {
  return Math.floor(Math.random() * (arr.length - 1) + 1);
};

const getLevelUpSound = () => {
  audioArray[rand(audioArray)].play();
};

export default getLevelUpSound;
