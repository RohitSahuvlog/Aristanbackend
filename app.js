const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: ["localhost:8001"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

// import routes
const user = require("./controller/user");
const product = require("./controller/product");
const payment = require("./controller/payment");
const order = require("./controller/order");

app.use("/api/v2/user", user);
app.use("/api/v2/order", order);
app.use("/api/v2/product", product);
app.use("/api/v2/payment", payment);

// it's for ErrorHandling
app.use(ErrorHandler);
module.exports = app;
