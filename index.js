let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();

let apiRoutes = require("./api-routes");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/vaxified", { useNewUrlParser: true });
var db = mongoose.connection;

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

var port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Welcome to the Vaxification API"));

app.use("/api", apiRoutes);

app.listen(port, function () {
  console.log("Running on port " + port);
});
