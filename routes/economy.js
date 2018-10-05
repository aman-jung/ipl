const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var db = mongoose.connection;

module.exports = app => {
  app.get("/economy", (req, res) => {
    var first, last;
    var year = [];
    db.collection("matches")
      .find({ season: 2015 })
      .toArray(function(err, result) {
        if (err) return err;
        for (var i = 0; i < result.length; i++) {
          year[i] = result[i].id;
        }
        first = year[0];
        last = year[year.length - 1];
        db.collection("deliveries")
          .aggregate([
            {
              $match: {
                match_id: { $lt: last },
                $and: [{ match_id: { $gt: first } }]
              }
            },
            {
              $group: {
                _id: { bowler: "$bowler" },
                count: { $sum: "$total_runs" }
              }
            },
            {
              $sort: { count: 1 }
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
  });
};
