import levelUpSound1 from "./Media/Level_Up_1.wav";
import levelUpSound2 from "./Media/Level_Up_2.wav";
import levelUpSound3 from "./Media/Level_Up_3.wav";
import levelUpSound4 from "./Media/Level_Up_4.wav";

// Define a collection of audio files to be used when the player levels up.
const audioArray = [
  new Audio(levelUpSound1),
  new Audio(levelUpSound2),
  new Audio(levelUpSound3),
  new Audio(levelUpSound4),
];

const rand = (arr) => {
  // Randomize the sounds above.
  return Math.floor(Math.random() * (arr.length - 1) + 1);
};

// randomly pick one of the sounds in the array
const getLevelUpSound = () => {
  audioArray[rand(audioArray)].play();
};

export default getLevelUpSound;
