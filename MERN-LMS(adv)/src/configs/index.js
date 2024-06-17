const config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDERICT_URI: process.env.GOOGLE_REDERICT_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
}

export default config;

//--------------------------------------------------

/* const config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URL,
}

export default config;
 */