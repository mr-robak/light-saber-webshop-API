require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT;

const products = JSON.parse(fs.readFileSync("./data/sabers.json"));

const orders = JSON.parse(fs.readFileSync("./data/orders.json"));

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});

app.post("/orders", (request, response) => {
  const newOrder = request.body;
  orders.orders.push(newOrder);

  const data = JSON.stringify(orders);

  fs.writeFile("./data/orders.json", data, (err) => {
    if (err) throw err;
  });
  response.sendStatus(200);
});

app.get("/products", (request, response) => {
  response.send(products);
});

app.put("/products", (request, response) => {
  const newSaber = request.body;
  const newStock = {
    sabers: [
      ...products.sabers,
      {
        ...newSaber,
        id: parseInt(newSaber.id),
        available: parseInt(newSaber.available),
        crystal: {
          ...newSaber.crystal,
          planet: parseInt(newSaber.crystal.planet),
        },
      },
    ],
  };

  const data = JSON.stringify(newStock);

  fs.writeFile("./data/sabers.json", data, (err) => {
    if (err) throw err;
  });
  response.send(newStock);
});

app.post("/admin", (request, response) => {
  const { ADMIN, PASSWORD, NAME, AGE } = process.env;
  if (request.body.name === ADMIN && request.body.password === PASSWORD) {
    response.send({ user: { name: NAME, age: AGE }, orders, products });
  } else {
    response.sendStatus(401);
  }
});

// app.get("/products/:id", (request, response) => {
//   const productId = parseInt(request.params.id);
//   console.log("Product requested ID:", productId);

//   const getProduct = sabers.find((saber) => {
//     // console.log(
//     //   "saber id",
//     //   saber.id,
//     //   "=== requested ID",
//     //   saber.id === productId
//     // );
//     return saber.id === productId;
//   });
//   // console.log(getProduct);
//   response.send(getProduct);
// });

app.get("/", (request, response) => {
  response.send(landingPageHtml);
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
