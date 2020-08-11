const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const weather =
    "http://api.weatherstack.com/current?access_key=ac914ced5e4dd7b642bf0cfad20a5620&query=" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude) +
    "&units=m";

  request({ url: weather, json: true }, (error, response) => {
    const { temperature, wind_speed } = response.body.current;
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature,
        wind_speed,
      });
    }
  });
};

module.exports = forecast;
