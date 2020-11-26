const {
  uniqueNamesGenerator,
  adjectives,
  names,
} = require("unique-names-generator");

class Boss {
  constructor() {
    this.name = "";
    this.generateName();
    this.generateHealth();
    this.generateType() 
    this.dead = false;
  }

  // generate the type (art style) of the boss
  generateType() {
    this.type = Math.floor((Math.random() * 11) + 1)
  }

  // reset the health if the boss doesn't die in the alloted time
  resetHealth() {
    this.health = this.initialHealth;
  }

  // generate the health and initial health for the boss
  generateHealth() {
    this.health = 1000 + Math.random() * 500;
    this.initialHealth = this.health;
  }

  // randomly generate a name for the boss
  generateName() {
    // Fun easter egg, dave the destroyer rocking up 1/1000
    const easterEgg = Math.floor(Math.random() * 1000 + 1);
    if (easterEgg == 1) {
      return "Dave";
    }

    // generate names from uniqueNamesGenerator's dictionary
    const generatedName = uniqueNamesGenerator({
      dictionaries: [names, adjectives],
    }).split("_");

    // Make the second word's first letter capital and return the generated name e.g. Eimile the Dangerous
    this.name = `${generatedName[0]} the ${
      generatedName[1][0].toUpperCase() + generatedName[1].slice(1)
    }`;
  }

  // decrease the health of the boss
  decrementHealth(damage) {
    this.health -= damage;
    // clamp the health at 0 if it goes below
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0
    }
  }
}

module.exports = Boss;
