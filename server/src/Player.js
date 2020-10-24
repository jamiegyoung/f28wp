class Player {
  id;
  experience;

  constructor(id, experience) {
    this.id = id;
    this.experience = experience;
  }

  get level() {
    const level = Math.floor(25 * Math.log((this.experience / 2000) + 1)) + 1;
    if (level > 100) {
      return 100
    }
    return level
  }

  get health() {
    return 95 * e ** (Player.level/100)
  }

  get damage() {
    return 20 * e ** (Player.level/105)
    
  }


}

module.exports = { Player }