const request = require("request");

const forecast = (longitude, lattitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=38623b7e5dab656f2d40cd81a65f363c&query=" +
    lattitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true, rejectUnauthorized: false }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degree out. It feels like " +
          body.current.feelslike +
          " degress out.The humidity is " +
          body.current.humidity +
          "% period."
      );
    }
  });
};

module.exports = forecast;
