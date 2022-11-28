const xlsxFile = require("read-excel-file/node");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

xlsxFile("./Environment_Details.xlsx").then((rows) => {
  let Url = rows[0][1];
  let UserName = rows[1][1];
  let password = rows[2][1];
  localStorage.setItem("Url", Url);
  localStorage.setItem("UserName", UserName);
  localStorage.setItem("Password", password);
});

module.exports = { xlsxFile };
