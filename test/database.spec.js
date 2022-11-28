var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "10.0.6.10",
  port: "3306",
  user: "uroot",
  password: "proot",
  database: "multicore",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});
