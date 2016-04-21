var express = require("express");
var app = express();
var path = require("path");
var index = require("./routes/index");
var math = require("./routes/math");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("port", (process.env.PORT || 5000));

app.use("/math", math);
app.use("/", index);

app.listen(app.get("port"), function(){
    console.log("What up Kappa? Port: ", app.get("port"));
});
