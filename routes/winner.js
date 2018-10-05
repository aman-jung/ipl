const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var db = mongoose.connection;

module.exports = app => {
  app.get("/query2", (req, res) => {
    db.collection("matches")
      .aggregate([
        {
          $group: {
            _id: "$winner",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
      .toArray()
      .then(
        result => {
          res.json({ winner: result });
        },
        err => {
          res.status(404).send(err);
        }
      );
  });
};
