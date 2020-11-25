const {
  uniqueNamesGenerator,
  adjectives,
  names,
} = require("unique-names-generator");
class Boss {
  constructor() {
    this.generateName();
    console.log(this.name);
    this.generateHealth();
  }

  generateHealth() {
    this.health = 100 + Math.random() * 25;
  }

  generateName() {
    const generatedName = uniqueNamesGenerator({
      dictionaries: [names, adjectives],
    }).split("_");

    this.name = `${generatedName[0]} the ${generatedName[1]}`;
  }


  decrementHealth() {

  }

  get experienceGiven() {

  }
}

module.exports = Boss;