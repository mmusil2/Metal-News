// Dependencies
var express = require("express");
// var mongojs = require("mongojs");

var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Database configuration
// var databaseUrl = "metalnews";
// var collections = ["articles"];

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// app.get("/scraper", function(req, res) {
//   res.send("Hello world");


// // axios.get("http://metalstorm.net/events/news.php").then(function(response) {
//   var results = [];

//   for(i=1; i<3; i++) {
//     var n = i.toString();
//     axios.get("http://www.blabbermouth.net/news/page/" + i).then(function(response) {

//       var $ = cheerio.load(response.data);
//       // console.log(response.data);

      
//       // console.log(response.data);
//       $(".category-news").each(function(i, element) {
//         var result = {};
//         //var title = $(element).children().text();
//         // var title = $(element).find("a").attr("title");
//         // var summary = $(element).children().text();
//         // var link = "http://www.blabbermouth.net" + $(element).find("a").attr("href");

//         result.title = $(element).find("a").attr("title");
//         result.summary = $(element).children().text();
//         result.link = "http://www.blabbermouth.net" + $(element).find("a").attr("href");

//         console.log(result);

//         // results.push({
//         //   title: title,
//         //   summary: summary,
//         //   link: link
//         // });
//         // db.articles.insert({"title": title, "summary": summary, "link": link});
//         db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, log it
//           console.log(err);
//         });

//       });

//       console.log(results);
      
//     });
//   }
// });


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
