const express = require('express');
const mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
var connection = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'brooklynBarDB'
});

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());

app.get('/barlist', function (req,res) {
  console.log("I recieved a GET request.");
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("SELECT * FROM barInfo", function(error,rows,fields) {
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
  });

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

app.post('/barlist', function (req,res) {
  console.log(req.body);
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("INSERT INTO barInfo (name, number, address) VALUES (?,?,?)",
      [req.body.name, req.body.number, req.body.address],
      function(error,doc) {
        if (error === null) {
          console.log("Query successful.");
          res.json(doc);
        } else {
          console.log("Query failed. " + error);
        }
      });
    } else {
      console.log("Error!");
    }
    db.release();
  });
});

app.delete('/barlist/:id', function (req,res) {
  var id = req.params.id;
  //console.log(id);
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("DELETE FROM barInfo WHERE id=? LIMIT 1", [id], function(error,doc) {
        if (error === null) {
          console.log("Query successful.");
          res.json(doc);
        } else {
          console.log("Query failed.");
        }
      });
    } else {
      console.log("Error!");
    }
    db.release();
  });
});

app.listen(3000);
console.log("Server running on port 3000");
