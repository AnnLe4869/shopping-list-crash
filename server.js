const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on("error", err => console.error(err));
    app.use("/api/items", require("./routes/api/Item"));
  } catch (err) {
    console.error(err);
  }
})();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Listening on port 3000!`));
