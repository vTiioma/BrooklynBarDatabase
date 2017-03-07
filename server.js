const express = require('express');
const mysql = require('mysql');

var app = express();
var connection = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'brooklynBarconnection'
});

app.use(express.static(__dirname + "/public"))

app.get('/barlist', function (req,res) {
  console.log("I recieved a GET request.");
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("SELECT * FROM brooklynBarconnection", function(error,rows,fields) {
        if (error === null) {
          console.log("Query successful.");
          res.json(rows);
        } else {
          console.log("Query failed.");
        }
      });
    } else {
      console.log("Error!");
    }
    db.release();
  })

  // bar1 = {
  //   name: "First Bar",
  //   number: "(111) 111-1111",
  //   address: "123 Fake st."
  // };
  //
  // bar2 = {
  //   name: "Second Bar",
  //   number: "(222) 222-2222",
  //   address: "456 Fake st."
  // };
  //
  // bar3 = {
  //   name: "Third Bar",
  //   number: "(333) 333-3333",
  //   address: "789 Fake st."
  // };
  //
  // var barlist = [bar1,bar2,bar3];
  // res.json(barlist);
});

app.listen(3000);
console.log("Server running on port 3000");
