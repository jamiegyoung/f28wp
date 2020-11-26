const Player = require("./Player");
const Boss = require("./Boss");
const randomWords = require("random-words");

class Game {
  // Start game
  constructor(io) {
    this.io = io;
    this.boss = new Boss();
    // As bizarre as it seems, unique players are used for damage calculation and visual aspects,
    // players is used for experience addition as multiple connections need to be handled so
    // xp cannot be duplicated
    this.uniquePlayers = [];
    this.players = [];
    this.sockets = [];
    this.startGameLoop();
    this.handleGameConnections();
  }

  addUniquePlayer(player) {
    this.uniquePlayers.push(player);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removeSocket(socket) {
    const index = this.sockets.findIndex(
      (x) => x.request.session.user_id == socket.request.session.user_id
    );
    if (index > -1) {
      this.sockets.splice(index, 1);
    }
  }

  // Recursively remove players in-case there are multiple
  removePlayer(player) {
    // Find player to remove
    const index = this.players.findIndex((x) => x.id == player.id);
    // remove player
    if (index > -1) {
      this.players.splice(index, 1);
    }
    // If the player was the last of its own id, remove the unique also
    const playerStillExists = this.players.find((x) => x.id === player.id);
    if (!playerStillExists) {
      const uniqueIndex = this.uniquePlayers.findIndex(
        (x) => x.id === player.id
      );
      if (uniqueIndex > -1) {
        this.uniquePlayers.splice(uniqueIndex, 1);
      }
    }
  }

  static generateDamageWords() {
    return randomWords({ min: 18, max: 20 });
  }

  async sendPlayerInfo(player, socket) {
    socket.emit("playerInfo", {
      level: await player.getLevel()
    });
  }

  startGameLoop() {
    setInterval(() => {
      if (this.boss.dead) {
        this.uniquePlayers.forEach(async (player) => {
          await player.addExperience(this.boss.experienceGiven * 10);
        });
        this.boss = new Boss();
      }

      if (!this.boss.dead) {
        this.boss.resetHealth();
        this.uniquePlayers.forEach(async (player) => {
          await player.addExperience(this.boss.experienceGiven / 10);
        });
      }

      this.wordList = Game.generateDamageWords().map((x) => x.toUpperCase());
      this.sockets.forEach((socket) => {
        this.sendGameInfo(socket);
        socket.emit("sentence", this.wordList);
        const player = new Player(socket.request.session.user_id);
        this.sendPlayerInfo(player, socket)
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
      this.sockets.push(socket);
      this.sendGameInfo(socket);
      const player = new Player(userId);
      this.sendPlayerInfo(player, socket)
      // const userInfoLoop = setInterval(() => {
      //   this.sendPlayerInfo(player, socket)
      // }, 5000);

      socket.on("message", async (data) => {
        if (this.wordList && this.wordList.includes(data)) {
          const damage = await player.getDamage(data.length);
          const damagedCalced =
            damage / this.uniquePlayers.length +
            damage /
              (this.uniquePlayers.length *
                (this.uniquePlayers.length * (damage / 25)));
          this.boss.decrementHealth(damagedCalced);
          this.sendGameInfo(socket);
        }
      });

      const gameInfoInterval = setInterval(() => {
        this.sendGameInfo(socket);
      }, 2500);

      socket.on("disconnect", () => {
        // clearInterval(userInfoLoop)
        clearInterval(gameInfoInterval);
        console.log("user disconnected");
        player.addExperience(100);
        player.savePlayer();
        this.removePlayer(player);
        this.removeSocket(socket);
      });

      this.addPlayer(player);
      console.log("user connected");
      if (this.uniquePlayers.find((x) => x.id == userId)) return;
      this.addUniquePlayer(player);
    });
  }



  sendGameInfo(socket) {
    socket.emit("gameInfo", {
      name: this.boss.name,
      health: this.boss.health,
      maxHealth: this.boss.initialHealth,
      experienceWorth: this.boss.experienceGiven,
      dead: this.boss.dead,
      type: this.boss.type,
      numOtherPlayers: this.uniquePlayers.length - 1
    });
  }
}

module.exports = { Game, Player, Boss };
