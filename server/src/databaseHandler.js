const sqlite3 = require("sqlite3")
const { promisify } = require("util");

const db = new sqlite3.Database('./src/database.db');

const database = exports;

// promisify the methods so callbacks aren't needed
const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);


database.createUser = async (user) => {
    // insert the id, username and password into the database
    const err = await dbRun(
        'INSERT INTO users VALUES (?, ?, ?)',
        user.id,
        user.getUsername(),
        user.getPassword()
    );
    // if there was an error when doing so, throw it
    if (err) throw new Error('Failed to create account')
}

// if the username, ignoring caps, exists return true and if not return false
database.checkUserExists = async (user) => await dbGet(
    'SELECT id FROM users WHERE name = ? COLLATE NOCASE',
    [user.getUsername()])
    ? true : false