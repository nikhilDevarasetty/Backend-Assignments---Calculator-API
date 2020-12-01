const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here
const threshold = 1000000;
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 + num2;
  if (typeof num1 === "string" || typeof num2 === "string") {
    res.status(400).send({ message: "Invalid data types" });
  } else if (num1 < -threshold || num2 < -threshold || result < -threshold) {
    res.status(400).send({ message: "Underflow" });
  } else if (num1 > threshold || num2 > threshold || result > threshold) {
    res.status(400).send({ message: "Overflow" });
  } else {
    res.send({
      message: "the sum of given two numbers",
      sum: result,
    });
  }
});
app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 - num2;
  if (typeof num1 === "string" || typeof num2 === "string") {
    res.status(500).send({ message: "Invalid data types" });
  } else if (num1 < -threshold || num2 < -threshold || result < -threshold) {
    res.status(500).send({ message: "Underflow" });
  } else if (num1 > threshold || num2 > threshold || result > threshold) {
    res.status(500).send({ message: "Overflow" });
  } else {
    res.send({
      message: "the difference of given two numbers",
      difference: result,
    });
  }
});
app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  if (typeof num1 === "string" || typeof num2 === "string") {
    res.status(500).send({ message: "Invalid data types" });
  } else if (num1 < -threshold || num2 < -threshold || result < -threshold) {
    res.status(500).send({ message: "Underflow" });
  } else if (num1 > threshold || num2 > threshold || result > threshold) {
    res.status(500).send({ message: "Overflow" });
  } else {
    res.send({
      message: "The product of given numbers",
      result: result,
    });
  }
});
app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 / num2;
  if (typeof num1 === "string" || typeof num2 === "string") {
    res.send({ status: "error", message: "Invalid data types" });
  } else if (num2 === 0) {
    res.send({ status: "error", message: "Cannot divide by zero" });
  } else if (num1 < -threshold || num2 < -threshold || result < -threshold) {
    res.status(500).send({ message: "Underflow" });
  } else if (num1 > threshold || num2 > threshold || result > threshold) {
    res.status(500).send({ message: "Overflow" });
  } else {
    res.send({
      message: "The division of given numbers",
      result: result,
    });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
