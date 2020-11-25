const sqlite3 = require("sqlite3");
const { promisify } = require("util");
// const User = require("./User");

const db = new sqlite3.Database("./src/database.db");

const database = exports;

// promisify the methods so callbacks aren't needed
const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);

database.getUser = async (user) =>
  await dbGet("SELECT * FROM users WHERE name = ? COLLATE NOCASE", [
    user.getUsername(),
  ]);

database.createUser = async (user) => {
  // insert the id, username and password into the database
  const err = await dbRun(
    "INSERT INTO users VALUES (?, ?, ?)",
    user.id,
    user.getUsername(),
    user.getPassword()
  );
  // if there was an error when doing so, throw it
  if (err) throw new Error("Failed to create account");
};

// if the username, ignoring caps, exists return true and if not return false
database.checkUserExists = (user) => {
  if (user.name) {
    return dbGet(
      // potentially a redundent await
      "SELECT id FROM users WHERE name = ? COLLATE NOCASE",
      [user.name]
    )
      ? true
      : false;
  }
  return dbGet(
    // potentially a redundent await
    "SELECT id FROM users WHERE id = ? COLLATE NOCASE",
    [user.id]
  )
    ? true
    : false;
};

database.getPlayer = (id) => dbGet("SELECT * FROM players WHERE id = ?", [id]);

database.updatePlayerExperience = (id, experience) => {
  console.log(experience);
  dbRun("UPDATE players SET experience = ? WHERE id = ?", [experience, id]);
};

database.savePlayer = async (id, experience) => {
  if (!(await this.getPlayer(id))) {
    return dbRun("INSERT INTO players VALUES (?, ?)", [id, experience]);
  }
  this.updatePlayerExperience(id, experience);
};
