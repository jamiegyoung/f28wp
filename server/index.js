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
const { Game, Player } = require('./src/Game/Game')
const User = require("./src/User");
const rateLimit = require("express-rate-limit");
const database = require("./src/databaseHandler");
const bcrypt = require("bcryptjs");

const storeOptions = {
  dir: __dirname + "/src/",
};

// 30284 is the development port. If there is no environment variable PORT it just uses the config
const port = process.env.PORT || config.port;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const sessionMiddleware = session({
    store: new SqliteStore(storeOptions), // use sqlite3 for session storage
    resave: false,
    saveUninitialized: false,
    secret: config.sessionSecret,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
});

app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

app.use(express.static(__dirname + "/build"));

// Set a 1 hour rate limit on account creation
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

const loginUser = async (username, password, req, res) => {
  const user = new User();

  try {
    user.setUsername(username);
  } catch (error) {
    return invalidInput(res, error);
  }

  const dbResUser = await database.getUser(user);

  const handleFailedLogin = () => // Handle what happens when username or password don't match
  res
    .status(401)
    .redirect("/login-failed");

  if (!dbResUser) return handleFailedLogin(); // If log doesn't, redirect to UserAlreadyExists page.

  if (await bcrypt.compare(password, dbResUser.pass)) {
    // 200 OK
    const sid = uuidv4();
    req.session.user_sid = sid;
    return res.status(200).redirect("/game");
  }
  // 401 Unauthorized
  return handleFailedLogin();
};

app.post("/api/authenticate-user", accountLoginLimiter, async (req, res) => {

  // Inform the user if the username or password or both are missing from the query

  if (!req.body.username && !req.body.password)
    return invalidInput(res, "Missing username and password");

  if (!req.body.username) return invalidInput(res, "Missing username");

  if (!req.body.password) return invalidInput(res, "Missing password");

  loginUser(req.body.username, req.body.password, req, res);
})

// api for creating the user
app.post("/api/create-user", accountCreationLimiter, async (req, res) => {
  // Define a new user and set the username & password
  console.log(req.body);
  // Inform the user if the username or password or both are missing from the query
  if (!req.body.username && !req.body.password)
    return invalidInput(res, "Missing username and password");

  if (!req.body.username) return invalidInput(res, "Missing username");

  if (!req.body.password) return invalidInput(res, "Missing password");
  
  // Define a new user
  const user = new User();

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

  // Check if the user exists before creating it. If it doesn't, redirect to UserAlreadyExists page.
  if (await database.checkUserExists(user)) {
    return res
      .status(409)
      .redirect("/user-exists");
  }

  // create the user in the database
  await database.createUser(user);

  // send HTTP code 201 (created)
  // res.status(201).send({
  //   success: true,
  // });

  loginUser(req.body.username, req.body.password, req, res);
});

app.get("/game", (req, res) => {
  if (!sessionChecker(req)) {
    return res.redirect("/");
  }
  res.sendFile(__dirname + "/index.html");
});

// Serve the react app
app.get("*", (req, res) => {
  if (sessionChecker(req)) {
    return res.redirect("/game");
  }
  res.sendFile(__dirname + "/index.html");
});

// TODO refactor
const game = new Game();

// on connection
io.on("connection", (socket) => {
  if (!socket.request.session.user_sid) return;
  socket.emit("sentence", Game.generateDamageWords());
  const sentenceInterval = setInterval(() => {
    socket.emit("sentence", Game.generateDamageWords());
  }, 10000);
});

server.listen(port, () => console.log(`started server on port ${port}`));