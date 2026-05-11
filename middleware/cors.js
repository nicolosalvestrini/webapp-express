const cors = require("cors");

const corsPolicy = cors({
  origin: "http://localhost:5173",
});

module.exports = corsPolicy;
