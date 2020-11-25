const Player = require("./Player");
const Boss = require("./Boss");
const randomWords = require("random-words");

class Game {
  // Start game
  constructor() {
    console.log("starting game!");
    this.boss = new Boss();

    // Used for the visual aspect of other players
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player.id);
  }

  removePlayer(player) {
    this.player.pop(player.id);
  }

  playerDidDamage(player, word) {
    // player.
  }

  static generateDamageWords() {
    return randomWords({ min: 3, max: 10})
  }
}

module.exports = { Game, Player, Boss };