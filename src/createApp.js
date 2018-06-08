const fs = require("fs");
const { promisify } = require("util");
const ncp = promisify(require("ncp").ncp);
const path = require("path");

module.exports = name => {
  fs.mkdirSync(name);
  const ignoredFiles = fs
    .readFileSync(`${__dirname}/../boilerplate/.gitignore.template`)
    .toString("utf-8")
    .split("\n");
  const filter = file =>
    !ignoredFiles.some(ignored => file.indexOf(ignored) >= 0);

  ncp(`${__dirname}/../boilerplate`, name, { filter }).then(() => {
    fs.renameSync(
      path.join(name, ".gitignore.template"),
      path.join(name, ".gitignore")
    );
    console.log(
      "Your app is ready! Now run the following commands to get started:\n"
    );
    console.log(`  cd ${name}`);
    console.log("  npm install");
    console.log("  npm start\n");
  });
};
