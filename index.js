const express = require("express");
const cors = require("cors");
const fs = require("fs");
// console.log("Hello World!");

const app = express();
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000; // use $PORT if it is defined otherwise use 4000 defined

const db = require("./db.json");
const doctors = db.doctors;
const patients = db.patients;

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});

app.post("/new_user", (request, response) => {
  // console.log("Request at /new_user", request.body);
  const newPatient = request.body;
  console.log("POST recieved at /new_user", newPatient);
  response.sendStatus(200);
});

app.get("/", (request, response) => {
  response.send(landingPageHtml);
});

app.get("/doctors", (request, response) => {
  response.send(doctors);
});

app.get("/patients", (request, response) => {
  response.send(patients);
});

app.get("/patients/:id", (request, response) => {
  const urlId = request.params.id;
  console.log("Patient data requested from url:", urlId);

  const getPatient = patients.find((patient) => {
    // console.log("patient", patient.id, "-- ID", patient.id === urlId);
    return patient.id === urlId;
  });
  //   console.log(getPatient);
  response.send(getPatient);
});

const landingPageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patients Server</title>
</head>
<body>
    <h1>Server Running on port: ${port}</h1>
</body>
</html>`;
