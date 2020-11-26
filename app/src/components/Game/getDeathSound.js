import deathSound1 from "./Media/Boss_Death_1.wav";
import deathSound2 from "./Media/Boss_Death_2.wav";
import deathSound3 from "./Media/Boss_Death_3.wav";
import deathSound4 from "./Media/Boss_Death_4.wav";

const audioArray = [ // Define a collection of audio files to be used when Deaths happen.
  new Audio(deathSound1),
  new Audio(deathSound2),
  new Audio(deathSound3),
  new Audio(deathSound4),
]

const rand = (arr) => { // Randomize the death sounds above.
  return Math.floor(Math.random() * (arr.length - 1) + 1);
};

const getDeathSound = () => { // Select and play on kill event from the randomizer algorithm defined above.
  audioArray[rand(audioArray)].play();
};

export default getDeathSound;
