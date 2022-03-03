var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");
var mysql = require('mysql2');

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});

const connection = mysql.createConnection({
  host: 'hu.yongan.tave.osdb.it',
  user: 'c181_Hu_Yong_An',
  password: 'UserDB01',
  database: 'c181_5AI_2021'
});

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  connection.query("SELECT * FROM User WHERE mail='"+req.query.mail+"' AND password='"+req.query.password+"';",
    function(err, results, fields) {
      if (Object.keys(results).length) {
        if (err) {
          console.log(err);
          res.status(400).json({message: "sign-up failed"});
        } else {
          res.status(200).json({message: "sign-up success"});
        }
      } else {
        res.status(400).json({message: "sign-up failed"});
      }
    }
  );

  // fs.readFile("users.json", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({ message: "errore generico" });
  //   } else {
  //     var login = false;
  //     var users = JSON.parse(data);
  //     users.forEach((a) => {
  //       if (a.mail === req.query.mail && a.password === req.query.password) {
  //         res.status(200).json({ message: "login effettuato" });
  //         login = true;
  //         return;
  //       }
  //     });
  //     if (!login) res.status(400).json({ message: "login failed" });
  //   }
  // });
});

apiServer.get("/api/reg", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  connection.query("INSERT INTO User(mail, password) VALUES('"+req.query.mail+"','"+req.query.password+"');",
    function(err, results, fields) {
      if (err) {
        res.status(400).json({message: "sign-up failed"});
      } else {
        res.status(200).json({message: "sign-up success"});
      }
    }
  );

  // fs.readFile("users.json", (err, data) => {
  //   if (err) {
  //     res.status(500).json({ message: "errore generico" });
  //   } else {
  //     var users = JSON.parse(data);
  //     users.push({mail:req.query.mail, password:req.query.password});
  //     fs.writeFile("users.json", JSON.stringify(users), (err) => {
  //       if (err) {
  //         res.status(400).json({message: "sign-up failed"});
  //       } else {
  //         res.status(400).json({message: "sign-up success"});
  //       }
  //     })
  //   }
  // });
});