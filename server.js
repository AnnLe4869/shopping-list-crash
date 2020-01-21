const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on("error", err => console.error(err));

    // Use route
    app.use("/api/items", require("./routes/api/Item"));

    // Serve static assets if in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index/html"));
      });
    }
  } catch (err) {
    console.error(err);
  }
})();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Listening on port ${port}!`));
