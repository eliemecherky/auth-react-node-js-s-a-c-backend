const allowedOrigins = require("./allowedOrigins");

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //ya3ne byesta2bel ay ma3loumet bel headers w bel cookies
  optionsSuccessStatus: 200,
};

module.exports = corsOption;
