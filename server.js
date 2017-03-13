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
});

app.get('/barlist/:id', function(req,res) {
  var id = req.params.id;
  console.log(id);
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("SELECT * FROM barInfo WHERE id=? LIMIT 1", [id], function(error,doc) {
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

app.post('/barlist', function(req,res) {
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

app.put('/barlist/:id', function(req,res) {
  console.log(req.body);
  connection.getConnection(function(error,db) {
    if (error === null) {
      console.log("Connected!");
      db.query("UPDATE `barinfo` SET `name`=?,`number`=?,`address`=? WHERE id=?",
      [req.body.name, req.body.number, req.body.address, req.params.id],
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
  });
});

app.delete('/barlist/:id', function(req,res) {
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
