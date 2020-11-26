import deathSound1 from "./Media/Boss_Death_1.wav";
import deathSound2 from "./Media/Boss_Death_2.wav";
import deathSound3 from "./Media/Boss_Death_3.wav";
import deathSound4 from "./Media/Boss_Death_4.wav";

// Define a collection of audio files to be used when Deaths happen.
const audioArray = [ 
  new Audio(deathSound1),
  new Audio(deathSound2),
  new Audio(deathSound3),
  new Audio(deathSound4),
];

const rand = (arr) => { // Randomize the death sounds above.
  return Math.floor(Math.random() * (arr.length - 1) + 1);
};

// randomly pick one of the sounds in the array
const getDeathSound = () => {
  audioArray[rand(audioArray)].play();
};

export default getDeathSound;
