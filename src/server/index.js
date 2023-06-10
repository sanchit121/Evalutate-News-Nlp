var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

//double checking if you got your api key
console.log(`Your API key is ${process.env.API_KEY}`);

//POST Method
app.post("/add", async (req, res) => {
  //generates the api url, which we retrieve the url input from the handleSubmit
  console.log(req);
  const data = req.body;
  //it also fetches the url data
  console.log(data);
  const apiURL = await fetch(
    `${baseURL}?key=${apiKey}&url=${data.url}&lang=en`,
    { method: "POST" }
  );
  console.log(`Input url: ${data.url}`);

  //try convert the url data into a json and send, otherwise catch the error
  try {
    const result = await apiURL.json();
    res.send(result);
  } catch (error) {
    console.log("error", error);
  }
});
