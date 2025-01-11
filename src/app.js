const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Anjana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "weather App",
    name: "anjana Bhave",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help Page",
    name: "Anjana Bhave",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, lattitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(longitude, lattitude, (error, forecastdata) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help Article Not Found",
    name: "Anjana",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not Found",
    name: "Anjana",
  });
});

app.listen(port, () => {
  console.log("server is up at port " + port);
});
