const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

// routing
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ridels",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address",
    });
  }

  // geocode / geolocation
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { temperature, wind_speed }) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          temperature,
          wind_speed,
          location,
        });
      });
    }
  );
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "ridels",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "help page not found",
    name: "ridels",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "ridels",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "pages not found",
    name: "ridels",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
