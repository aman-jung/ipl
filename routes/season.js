const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var db = mongoose.connection;

module.exports = app => {
  app.get("/query1", (req, res) => {
    db.collection("matches")
      .aggregate([
        {
          $group: {
            _id: "$season",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
      .toArray()
      .then(
        result => {
          res.json({ result: result });
        },
        err => {
          res.status(401).send(err);
        }
      );
  });
};
