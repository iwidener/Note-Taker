const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.get("/", function(req, res) {
 fs.readFile("/index", function(err, data) {
     res.send(data.toString());
 });
});

app.listen(PORT, function () {
    console.log("Listening on PORT: http://localhost:" + PORT);
});