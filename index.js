require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Names } = require("./sequelize");

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
});

// Localhost
app.listen(port, () => {
  console.log("API at localhost:" + port);
});

app.get("/allnames", (req, res) => {
  Names.findAll()
     .then((allNames) => {
      console.log(">>> Fetch all statuses successful.");
        res.json(allNames);
     })
     .catch((error) => {
        console.log(">>> Couldn't fetch statuses data.");
        console.log("> Error: " + error);
     });
});

app.post("/addnames",  (req, res, next) => {
  Names.create(req.body)
     .then((names) => {
        console.log(">>> Comment submitted successfully.");
        console.log("> Response: " + JSON.stringify(names));
        res.json(names);
     })
     .catch((error) => {
        console.log(">>> Couldn't submit the comment.");
        console.log("> Error: " + error);
        res.status(400).end();
     });
});
// Get names by alphabetical order
app.get("/sortnames", (req, res) => {
  Names.findAll({
    order: [
      ['name', 'ASC'],
    ]
  }) 
     .then((allNames) => {
      console.log(">>> Fetch all statuses successful.");
      
      res.json(allNames);
     })
     .catch((error) => {
        console.log(">>> Couldn't fetch statuses data.");
        console.log("> Error: " + error);
     });
});
// Most popular names by amount
app.get("/mostpopular", (req, res) => {
  Names.findAll({
    order: [
      ['amount', 'DESC'],
    ]
  }) 
     .then((allNames) => {
      console.log(">>> Fetch all statuses successful.");
      
      res.json(allNames);
     })
     .catch((error) => {
      console.log(">>> Couldn't fetch statuses data.");
        console.log("> Error: " + error);
     });
});
// Count how many different names there is
app.get("/countnames", (req, res) => {
  Names.findAndCountAll({
  }) 
     .then((allNames) => {
      console.log(">>> Fetch all statuses successful.");
      res.json(allNames);
     })
     .catch((error) => {
      console.log(">>> Couldn't fetch statuses data.");
        console.log("> Error: " + error);
     });
});
// Count how many names there is by amounts
app.get("/countamount", (req, res) => {
  Names.sum("amount") 
     .then((sum) => {
      console.log(">>> Fetch all statuses successful.");
      res.json(sum);
     })
     .catch((error) => {
      console.log(">>> Couldn't fetch statuses data.");
        console.log("> Error: " + error);
     });
});



