const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const helmet = require("helmet");

const { UsersRoute } = require("./routes");

const app = express();
config(app);
loaders(app);

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", UsersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
