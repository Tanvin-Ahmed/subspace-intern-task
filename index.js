const express = require("express");
const router = require("./routes/routers");

const app = express();

app.use("/api", router);

app.listen(4000, () => console.log("listening on port 4000"));
