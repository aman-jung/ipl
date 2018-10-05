const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.use(cors());

mongoose.connect("mongodb://localhost/ipl");

mongoose.connection.on("open", function() {
  console.log("mongodb is connected!!");
});
require("./routes/season")(app);
require("./routes/winner")(app);
require("./routes/extra")(app);
require("./routes/economy")(app);
require("./routes/story")(app);

app.listen(8080, () => {
  console.log("Server is up and running at port 5000");
});
