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

  // removes a socket from the game
  removeSocket(socket) {
    // find the index and splice it from the array of sockets
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

  // generate the words to send to the user
  static generateDamageWords() {
    return randomWords({ min: 18, max: 20 });
  }

  // send the player level to the player
  async sendPlayerInfo(player, socket) {
    socket.emit("playerInfo", {
      level: await player.getLevel(),
    });
  }

  // the main game loop, each round lasts 20 seconds and the user has to beat the boss in that time
  // if they beat the boss in that time they get some experience
  startGameLoop() {
    setInterval(async () => {
      // if the boss is dead
      if (this.boss.dead) {
        // give all unique players experience
        this.uniquePlayers.forEach(async (player) => {
          await player.addExperience(100);
        });
        // make a new boss as the old one is dead
        this.boss = new Boss();
      }

      if (!this.boss.dead) {
        this.boss.resetHealth();
      }

      // generate a new word list
      this.wordList = Game.generateDamageWords().map((x) => x.toUpperCase());

      setTimeout(() => {
        // for each socket, give them the sentence and provide them with their player info
        this.sockets.forEach((socket) => {
          this.sendGameInfo(socket);
          socket.emit("sentence", this.wordList);
          const player = new Player(socket.request.session.user_id);
          this.sendPlayerInfo(player, socket);
        });
      }, 1000);
    }, 20000);
  }

  handleGameConnections() {
    // when a user connects to the websocket
    this.io.on("connection", (socket) => {
      const userId = socket.request.session.user_id;
      const userSid = socket.request.session.user_sid;
      // if they don't have a user_sid or id they get ignored
      if (!userSid) return;
      if (!userId) return;
      // push their socket to sockets for interaction in the game lop
      this.sockets.push(socket);
      // send them the current game state
      this.sendGameInfo(socket);
      // create a new player instance for them
      const player = new Player(userId);
      this.sendPlayerInfo(player, socket);

      // when the server receieves a message
      socket.on("message", async (data) => {
        // if the wordlist contains the data sent (the word was sent as completed)
        if (this.wordList && this.wordList.includes(data)) {
          // calculate the playeers damage and decrement the bosses health
          const damage = await player.getDamage(data.length);
          const damagedCalced =
            damage / this.uniquePlayers.length +
            damage /
              (this.uniquePlayers.length *
                (this.uniquePlayers.length * (damage / 25)));
          this.boss.decrementHealth(damagedCalced);
          // send the game info after this action
          this.sendGameInfo(socket);
        }
      });

      // send the game info every 2.5 seconds
      const gameInfoInterval = setInterval(() => {
        this.sendGameInfo(socket);
      }, 2500);

      // when the user disconnects
      socket.on("disconnect", () => {
        // stop the game info loop
        clearInterval(gameInfoInterval);
        console.log("user disconnected");
        // save the player then remove them
        player.savePlayer();
        this.removePlayer(player);
        this.removeSocket(socket);
      });

      // add the player to players
      this.addPlayer(player);
      console.log("user connected");
      // if the player is unique then add them to unique players, else don't
      if (this.uniquePlayers.find((x) => x.id == userId)) return;
      this.addUniquePlayer(player);
    });
  }

  // send the game information ot the user
  sendGameInfo(socket) {
    socket.emit("gameInfo", {
      name: this.boss.name,
      health: this.boss.health,
      maxHealth: this.boss.initialHealth,
      dead: this.boss.dead,
      type: this.boss.type,
      numOtherPlayers: this.uniquePlayers.length - 1,
    });
  }
}

module.exports = { Game, Player, Boss };
