const fse = require("fs-extra");
const path = require('path')
const ora = require("ora");

const app_dir = path.resolve(__dirname + "../../");
const server_dir = path.resolve(__dirname + "../../../server");

const spinner = ora("Starting").start();
spinner.prefixText = "app-scripts:"

if (fse.existsSync(server_dir + "/build")) {
  spinner.text = "Deleting previous build";
  spinner.color = "red";
  fse.rmdirSync(server_dir + "/build", { recursive: true });
}


if (fse.existsSync(app_dir + '/build')) {
  spinner.text = "Copying build to server"
  spinner.color = "green"
  fse.copySync(app_dir + '/build', server_dir + '/build')
}

if (fse.existsSync(server_dir + "/index.html")) {
  spinner.text = "Deleting previous index.js"
  spinner.color = "red";
  fse.unlinkSync(server_dir + "/index.html")
}

if (fse.existsSync(server_dir + '/build/index.html')) {
  spinner.text = "Copying index.html from build to server"
  spinner.color = "green"
  fse.copyFileSync(server_dir + '/build/index.html', server_dir + "/index.html")
}

spinner.succeed("Finished")