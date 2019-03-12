// Requiring our models
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {

  app.get("/scrape", function(req, res) {
    res.send("Hello world");
  
    console.log("Working?");
  // axios.get("http://metalstorm.net/events/news.php").then(function(response) {
    var results = [];
  
    for(i=1; i<3; i++) {
      var n = i.toString();
      axios.get("http://www.blabbermouth.net/news/page/" + i).then(function(response) {
  
        var $ = cheerio.load(response.data);
        // console.log(response.data);
  
        
        // console.log(response.data);
        $(".category-news").each(function(i, element) {
          var result = {};
          //var title = $(element).children().text();
          // var title = $(element).find("a").attr("title");
          // var summary = $(element).children().text();
          // var link = "http://www.blabbermouth.net" + $(element).find("a").attr("href");
  
          result.title = $(element).find("a").attr("title");
          result.summary = $(element).children().text();
          result.link = "http://www.blabbermouth.net" + $(element).find("a").attr("href");
  
          console.log(result);
  
          // results.push({
          //   title: title,
          //   summary: summary,
          //   link: link
          // });
          // db.articles.insert({"title": title, "summary": summary, "link": link});
          db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
  
        });
  
        console.log(result);
        
      });
    }
  
  
  
  
  });



app.delete("/delete", function(req, res) {
  // Route for getting all Articles from the db
  console.log("deleted")
    // Grab every document in the Articles collection
    db.Article.deleteMany({})
      .then(function(dbArticle) {
         res.render("index");
        console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });



    app.put("/save/:id", function(req, res) {
      // Route for getting all Articles from the db
      console.log("save it now")
      console.log(req.params.id)
        // Grab every document in the Articles collection
        // db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id });
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
          .then(function(dbArticle) {
             res.render("index");
            console.log(dbArticle)
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
        });

        app.put("/remove/:id", function(req, res) {
          // Route for getting all Articles from the db
          console.log("remove it now")
          console.log(req.params.id)
            db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
              .then(function(dbArticle) {
                 res.render("index");
                console.log(dbArticle)
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
              });
            });

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

};