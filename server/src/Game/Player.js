const db = require('../databaseHandler');

class Player {
  constructor(id) {
    this.id = id;
  }

  // get the player's experience
  async getExperience() {
    const player = await db.getPlayer(this.id)
    if (player && player.experience) {
      return player.experience
    }
    return 0;
  }

  // get the player's level based on experience
  async getLevel() {
    const level = Math.floor(25 * Math.log(await this.getExperience() / 2000 + 1)) + 1;
    if (level > 100) {
      return 100;
    }
    return level;
  }

  // get the player's damage based on level
  async getDamage(wordLength) {
    return wordLength * (20 * Math.pow(Math.E, await this.getLevel() / 105));
  }

  // add experience to the user
  async addExperience(xp) {
    await db.savePlayer(this.id, (await this.getExperience()) + xp)
  }

  // save the user
  async savePlayer() {
    db.savePlayer(this.id, await this.getExperience())
  }
}

module.exports = Player