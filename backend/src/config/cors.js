import { WHITELIST_DOMAINS } from "../constants/index.js";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config();

// Define the corsOptions object
const corsOptions = {
  origin: function (origin, callback) {
    // Allow API calls using Postman in the dev environment
    console.log("🚀 ~ env.NODE_ENV:", process.env.NODE_ENV);
    if (!origin && process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    // Check if the origin is in the whitelist
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    // If the domain is not allowed, return an error
    return callback(
      new Error(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    );
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS allows receiving cookies from the request
  credentials: true,
};

// Export the corsOptions object with a specific name
export default corsOptions;
