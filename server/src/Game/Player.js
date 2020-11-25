const db = require('../databaseHandler');

class Player {
  constructor(id) {
    this.id = id;
    this.getExperience();
  }

  async getExperience() {
    if (this.experience) return this.experience;
    const player = await db.getPlayer(this.id)
    console.log('getting db xp');
    if (player && player.experience) {
      this.experience = player.experience;
      return this.experience
    }
    this.experience = 0
    return this.experience;
  }

  async getLevel() {
    const level = Math.floor(25 * Math.log(await this.getExperience() / 2000 + 1)) + 1;
    if (level > 100) {
      return 100;
    }
    return level;
  }

  async getDamage(wordLength) {
    return wordLength * (20 * Math.pow(Math.E, await this.getLevel() / 105));
  }

  async addExperience(xp) {
    this.experience = await this.getExperience() + xp;
    console.log(this.experience);
  }

  async savePlayer() {
    db.savePlayer(this.id, await this.getExperience())
  }
}

module.exports = Player