import hitSound1 from "./Media/Hit_Hurt_1.wav";
import hitSound2 from "./Media/Hit_Hurt_2.wav";
import hitSound3 from "./Media/Hit_Hurt_3.wav";

// load all the sounds into an array
const audioArray = [
  new Audio(hitSound1),
  new Audio(hitSound2),
  new Audio(hitSound3),
]

const rand = (arr) => {
  return Math.floor(Math.random() * (arr.length - 1) + 1);
};

// randomly pick one of the sounds in the array
const getHitSound = () => {
  audioArray[rand(audioArray)].play();
};

export default getHitSound;
