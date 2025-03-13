require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { createServer } = require("http");
require("express-group-routes");
const bodyParser = require("body-parser");
const { applicantRouter, adminRouter } = require("./router/main.router");
const { initEnv } = require("./middleware/utils");

const app = express();
const httpServer = createServer(app);
initEnv();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: false,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API running 🥳");
});

app.group("/api/v1", (router) => {
  router.use("/applicant", applicantRouter);
  router.use("/admin", adminRouter);
});

httpServer.listen(process.env.APP_PORT || 3006, () => {
    console.log(`Listening to Port: ${httpServer.address().port}`);
  });
