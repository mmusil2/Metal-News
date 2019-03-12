var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
// Route for getting all Articles from the db

  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
       res.render("index", {data: dbArticle});
       console.log(dbArticle)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});


app.get("/saved", function(req, res) {
  // Route for getting all Articles from the db
  console.log('go to saved articles');
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
         res.render("saved", {data: dbArticle});
         console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  
  });
};