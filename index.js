const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000; // use $PORT if it is defined otherwise use 4000 defined

const products = require("./data/sabers.json");
const sabers = products.sabers;
const orders = require("./data/orders.json");

// console.log("orders", orders);
// console.log("products", sabers);

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});

app.post("/orders", (request, response) => {
  // console.log("Request at /new_user", request.body);
  const newOrder = request.body;
  console.log("POST recieved at /orders", newOrder);
  response.sendStatus(200);
});

// app.get("/", (request, response) => {
//   response.send(landingPageHtml);
// });

app.get("/products", (request, response) => {
  response.send(products);
});

app.get("/products", (request, response) => {
  response.send(products);
});

app.get("/products/:id", (request, response) => {
  const productId = parseInt(request.params.id);
  console.log("Product requested ID:", productId);

  console.log(sabers[0].id);

  const getProduct = sabers.find((saber) => {
    // console.log(
    //   "saber id",
    //   saber.id,
    //   "=== requested ID",
    //   saber.id === productId
    // );
    return saber.id === productId;
  });
  // console.log(getProduct);
  response.send(getProduct);
});

const landingPageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lightsabers Shop Server</title>
</head>
<body>
    <h1>Server Running on port: ${port}</h1>
</body>
</html>`;
