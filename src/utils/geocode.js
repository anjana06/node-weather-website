const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5qYW5hMTk5NyIsImEiOiJjbTVoeXR1ZjAwbDcwMm1zZmNjeWJ1M2o5In0.SxxnD6c9DfwPA6_q582-WQ&limit=1";

  request({ url, json: true, rejectUnauthorized: false }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.features.length === 0) {
      callback(
        {
          error: "Unable to find the location please try other search.",
        },
        undefined
      );
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        lattitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
