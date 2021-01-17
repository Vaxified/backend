let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();
const uri = "mongodb+srv://henry123:henry123@cluster0.tainw.mongodb.net/vaxified?retryWrites=true&w=majority";

let apiRoutes = require("./api-routes");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true });
var db = mongoose.connection;

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

var port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Welcome to the Vaxification API"));

app.use("/api", apiRoutes);

app.listen(port, function () {
  console.log("Running on port " + port);
});
