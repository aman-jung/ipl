const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var db = mongoose.connection;

module.exports = app => {
  app.get("/story", (req, res) => {
    db.collection("deliveries")
      .aggregate([
        {
          $group: {
            _id: { batsman: "$batsman" },
            count: { $sum: "$total_runs" }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 5
        }
      ])
      .toArray()
      .then(
        result => {
          res.json({ result: result });
        },
        err => {
          res.status(404).send(err);
        }
      );
  });
};
