const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const ora = require("ora");
const sqlite3 = require("sqlite3");
const spinner = ora("").start();
const open = require("open");

const handleDatabase = () => {
  spinner.text = "Checking database";
  const dbPath = path.resolve("src/database.db");
  try {
    const db = new sqlite3.Database(dbPath);
    db.get("SELECT * FROM users", (err) => {
      if (err) {
        createUsersTable(db);
      }
      db.close();
    });
  } catch (error) {
    spinner.warn(
      "Potential invalid database setup, an error occurred when attempting to fix"
    );
  }
};

const createUsersTable = (db) => {
  spinner.text = "Creating users table in database";
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id varchar(36), name varchar(16), pass varchar(128))",
    (_runRes, err) => {
      if (err)
        spinner.warn(
          "An error occured when attempting to create the users table"
        );
    }
  );
};

const handleConfig = () => {
  spinner.text = "Checking config";
  // Resolve the config path
  const configPath = path.resolve("src/config.json");

  // Generate config if it doesnt exist
  if (!fs.existsSync(configPath)) {
    spinner.text = "Generating config";
    spinner.color = "blue";

    const configData = JSON.stringify(
      {
        sessionSecret: uuidv4(),
        port: 30284,
      },
      undefined,
      2
    );

    // Write the JSON string data to the config
    try {
      spinner.text = "Writing config";
      fs.writeFileSync(configPath, configData, { flag: "wx" });
    } catch (error) {
      spinner.warn(
        "Failed to write config file, maybe other instances of the server are running?"
      );
    }
  }
};

const checkIndexHtml = () => {
  if (!fs.existsSync(path.resolve("index.html"))) {
    spinner.warn(
      "index.html does not exist, did you potentially forget to `yarn build` the app?"
    );
  }
};

const checkBuildFolder = () => {
  if (!fs.existsSync(path.resolve("build"))) {
    spinner.warn(
      "The build directory does not exist, did you potentially forget to `yarn build` the app?"
    );
  }
};

const checkAppBuild = () => {
  checkIndexHtml();
  checkBuildFolder();
};

spinner.prefixText = "server-scripts:";

handleConfig();
handleDatabase();
checkAppBuild();

spinner.prefixText = "";

const config = require("../src/config.json");
const port = process.env.PORT || config.port;
spinner.succeed(
  `Successfully initialized start-up, opening http://localhost:${port}`
);

open(`http://localhost:${port}`);