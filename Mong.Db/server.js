var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var dbURL = `mongodb://floyd:${
  process.env.DBPASS
}@ds163822.mlab.com:63822/todo-persist`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// init project
var Message = mongoose.model("Message", {
  message: String
});

app.get("/", function(request, response) {
  response.redirect("https://codesandbox.io/embed/n5zrxrm55p"); //response.sendFile(__dirname + '/views/index.html');
});

app.get("/get", function(req, res) {
  Message.find({}, function(err, messages) {
    if (err) throw err;
    res.send(messages);
  });
});

app.post("/add", function(req, res) {
  var message = new Message(req.body);

  message.save(function(err) {
    if (err) throw err;
  });

  res.sendStatus(200);
});

app.delete("/delete", function(req, res) {
  var deleted = req.body.message;
  Message.findOne({ message: deleted }).deleteOne(err => {
    if (err) throw err;
  });
  res.send(`${deleted} was successfully deleted!`);
});

mongoose.connect(
  dbURL,
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log("mongo db connection works");
  }
);

app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + this.address().port);
});
