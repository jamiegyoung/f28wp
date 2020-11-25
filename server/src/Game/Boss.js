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

  generateType() {
    this.type = Math.floor(Math.random() * (10 - 1) + 1)
  }

  resetHealth() {
    this.health = this.initialHealth;
  }

  generateHealth() {
    this.health = 1000 + Math.random() * 500;
    this.initialHealth = this.health;
  }

  generateName() {
    // Fun easter egg, dave the destroyer rocking up 1/1000
    const easterEgg = Math.floor(Math.random() * 1000 + 1);
    if (easterEgg == 1) {
      return "Dave";
    }

    const generatedName = uniqueNamesGenerator({
      dictionaries: [names, adjectives],
    }).split("_");

    // Make the second character capital and return the generated name e.g. Eimile the Dangerous
    this.name = `${generatedName[0]} the ${
      generatedName[1][0].toUpperCase() + generatedName[1].slice(1)
    }`;
  }

  decrementHealth(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0
    }
  }

  get experienceGiven() {
    // TODO: calculate experience
    return 100;
  }
}

module.exports = Boss;
