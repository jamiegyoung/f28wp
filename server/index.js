// TODO refactor (can probably split game and regular api up)
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const SqliteStore = require("connect-sqlite3")(session);
const { v4: uuidv4 } = require("uuid");
const config = require("./src/config.json");
const { Game } = require("./src/Game/Game");
const User = require("./src/User");
const rateLimit = require("express-rate-limit");
const database = require("./src/databaseHandler");
const bcrypt = require("bcryptjs");

const storeOptions = {
  dir: __dirname + "/src/",
};

// 30284 is the development port. If there is no environment variable PORT it just uses the config
const port = process.env.PORT || config.port;

// Allow for reading of cookies
app.use(cookieParser());

// Allow for reading of JSON
app.use(bodyParser.json());

// Allow for reading of forms
app.use(bodyParser.urlencoded({ extended: true }));

// define session storage for remembering users
const sessionMiddleware = session({
  store: new SqliteStore(storeOptions), // use sqlite3 for session storage
  resave: false,
  saveUninitialized: false,
  secret: config.sessionSecret,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
});

// use the session storage with express
app.use(sessionMiddleware);

// use the session storage with socket
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// expose build as static
app.use(express.static(__dirname + "/build"));

// Set a 1 hour rate limit on account creation per IP
const accountCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Please do not create too many accounts!",
});

const accountLoginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  message: "Please do not login too many times!",
});

// check if the user has a session id
const sessionChecker = (req) => {
  if (req.session.user_sid) {
    return true;
  }
  return false;
};

// Generic bad request response for any unprocessable queries
const invalidInput = (res, msg) => {
  res.status(400).send({ success: false, error: msg });
};

// handle logging in the user, called both when logging in and after registering
const loginUser = async (username, password, req, res) => {
  const user = new User();

  // attempt to set the username and password and return an invalid input if it fails
  try {
    user.setUsername(username);
  } catch (error) {
    return invalidInput(res, error);
  }

  const dbResUser = await database.getUser(user);

  const handleFailedLogin = () => res.status(401).redirect("/login-failed");

  // if the user doesn't exist in the database
  if (!dbResUser) return handleFailedLogin();

  // compare the password with the hash using bcrypt
  if (await bcrypt.compare(password, dbResUser.pass)) {
    // 200 OK
    // generate a uuid and assign it to the user
    const sid = uuidv4();
    req.session.user_id = dbResUser.id;
    req.session.user_sid = sid;
    // redirect them to the game
    return res.status(200).redirect("/game");
  }
  // 401 Unauthorized
  return handleFailedLogin();
};

// Required as server is on a reverse proxy
app.set('trust proxy', 1);

// Authorizing Login
app.post("/api/authenticate-user", accountLoginLimiter, async (req, res) => {
  // Inform the user if the username or password or both are missing from the query

  // if a username or password wasn't sent send the appropriate response
  if (!req.body.username && !req.body.password)
    return invalidInput(res, "Missing username and password");

  if (!req.body.username) return invalidInput(res, "Missing username");

  if (!req.body.password) return invalidInput(res, "Missing password");

  // login the user
  loginUser(req.body.username, req.body.password, req, res);
});

// api for creating the user
app.post("/api/create-user", accountCreationLimiter, async (req, res) => {
  // Inform the user if the username or password or both are missing from the query
  if (!req.body.username && !req.body.password)
    return invalidInput(res, "Missing username and password");

  if (!req.body.username) return invalidInput(res, "Missing username");

  if (!req.body.password) return invalidInput(res, "Missing password");

  // Define a new user and set the username & password
  const user = new User();

  // attempt to set username
  try {
    user.setUsername(req.body.username);
  } catch (error) {
    return invalidInput(res, error);
  }

  try {
    // Need to await password due to hashing
    await user.setPassword(req.body.password);
  } catch (error) {
    return invalidInput(res, error);
  }

  // Check if the username already exists before creating a new user.
  if (await database.checkUserExists({ name: user.getUsername() })) {
    // If the username exists, redirect to UserAlreadyExists page.
    return res.status(409).redirect("/user-exists");
  }

  // create the user in the database
  await database.createUser(user);

  loginUser(req.body.username, req.body.password, req, res);
});

// Handle logging out. This is redirected to from the logout button on the GameContent page
app.get("/logout", (req, res) => {
  // Rid of user's unique id and session id, then redirect to StartMenu
  req.session.user_id = undefined;
  req.session.user_sid = undefined;
  res.redirect("/");
});

app.get("/game", (req, res) => {
  // if the user is not logged in, send them back to the home screen
  if (!sessionChecker(req)) {
    return res.redirect("/");
  }
  // else return the standard file
  res.sendFile(__dirname + "/index.html");
});

// Serve the react app
app.get("*", (req, res) => {
  // if the user is logged in, send them to /game
  if (sessionChecker(req)) {
    return res.redirect("/game");
  }
  res.sendFile(__dirname + "/index.html");
});

// TODO refactor
const game = new Game(io);

// on connection
server.listen(port, () => console.log(`started server on port ${port}`));
