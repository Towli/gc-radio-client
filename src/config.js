const config = {};

if (process.env.NODE_ENV === "production") {
  config.API_URI = "https://gc-radio-backend.herokuapp.com/search";
  config.WEBSOCKET_URI = "https://gc-radio-backend.herokuapp.com/";
}

if (process.env.NODE_ENV === "development") {
  config.API_URI = "http://localhost:3001/search";
  config.WEBSOCKET_URI = "http://localhost:3001";
  config.DOMAIN = "https://localhost:3000";
}

export { config };
