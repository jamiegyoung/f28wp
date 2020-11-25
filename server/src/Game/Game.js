const Player = require("./Player");
const Boss = require("./Boss");
const randomWords = require("random-words");

class Game {
  // Start game
  constructor(io) {
    this.io = io;
    this.boss = new Boss();
    // Used for the visual aspect of other players
    this.players = [];
    this.sockets = [];
    this.startGameLoop();
    this.handleGameConnections();
  }

  addPlayer(player) {
    this.players.push(player);
  }

  // Recursivley remove players in-case there are multiple
  removePlayer(player) {
    const index = this.players.indexOf(player.id);
    if (index > -1) {
      this.players.splice(index, 1);
      this.removePlayer(player);
    }
  }

  static generateDamageWords() {
    return randomWords({ min: 18, max: 20 });
  }

  startGameLoop() {
    setInterval(() => {
      if (this.boss.dead) {
        const uniquePlayers = [...new Set(this.players)];
        uniquePlayers.forEach((player) => {
          player.addExperience(this.boss.experienceGiven);
        });
        this.boss = new Boss();
      }

      if (!this.boss.dead) {
        this.boss.resetHealth();
      }

      this.wordList = Game.generateDamageWords().map((x) => x.toUpperCase());
      this.sockets.forEach((socket) => {
        this.sendGameInfo(socket);
        socket.emit("sentence", this.wordList);
      });
    }, 20000);
  }

  handleGameConnections() {
    this.io.on("connection", (socket) => {
      const userId = socket.request.session.user_id;
      const userSid = socket.request.session.user_sid;
      // Stops one person connecting twice (prevents duplicate logins and therefore duplicate experience)
      if (!userSid) return;
      if (!userId) return;
      if (this.players.includes(userId)) return;
      console.log("adding player");
      this.sockets.push(socket);
      const player = new Player(userId);
      this.addPlayer(player);
      this.sendGameInfo(socket);

      socket.on("message", async (data) => {
        if (this.wordList && this.wordList.includes(data)) {
          const playerCount = [...new Set(this.players)].length;
          const damage = await player.getDamage(data.length);
          const damagedCalced =
            damage / playerCount +
            damage / (playerCount * (playerCount * (damage / 25)));
          console.log(this.boss.health);
          console.log(damagedCalced);
          this.boss.decrementHealth(damagedCalced);
          this.sendGameInfo(socket);
        }
      });

      const gameInfoInterval = setInterval(() => {
        this.sendGameInfo(socket);
      }, 2500);

      socket.on("disconnect", () => {
        clearInterval(gameInfoInterval);
        console.log("user disconnected");
        player.addExperience(100);
        player.savePlayer();
        this.removePlayer(player);
        this.sockets.pop(socket);
      });
    });
  };

  sendGameInfo(socket) {
    socket.emit("gameInfo", {
      name: this.boss.name,
      health: this.boss.health,
      maxHealth: this.boss.initialHealth,
      experienceWorth: this.boss.experienceGiven,
      dead: this.boss.dead,
      type: this.boss.type,
    });
  }
}

module.exports = { Game, Player, Boss };
