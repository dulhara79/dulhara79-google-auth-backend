import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./configs";
import logger from "./util/logger";
import { connect } from "./util/database.connection";
import { googleAuth } from "./configs/google.auth";
// import { routesInit } from "./api/routes";
import { routesInit } from "./api/routes";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  // this should initialize before passport.session() and passport.initialize()
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.DB_CONNECTION_STRING }),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 100000),
      maxAge: 100000,
    },
  })
);

app.use(passport.session());
app.use(passport.initialize());

// console.log(Date.now());

app.get("/", (req, res, next) => {
  res.send(`<h2>📚  Welcome to the Library Management System API </h2>
  <a href='http://localhost:8090/auth/google'>Loging using Google account</a>`);
  next();
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect();
  routesInit(app, passport);
  googleAuth(passport);
  /* 
  logger.info("Testing the logger");
  logger.warn("Testing the logger");
  logger.error("Testing the logger"); 
  */
});

//-----------------------------------------------------------------

/* 
import 'dotenv/config';
import express from "express";
import cors from "cors";

import { connect } from './util/database.connection'; // Ensure the path is correct
import logger from './util/logger'; // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || "8090";

const startServer = async () => {
  await connect();
  // Rest of your server startup code
  logger.info(`Server is running on port ${PORT}`);
}

startServer();

app.use(cors());
app.use(express.json({ limit: "10mb"}));

app.get("/", (req, res, next) => {
  res.send("<h2>📚  Welcome to the Library Management System API </h2>");
  next();
})

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  // connect();
  /* 
  logger.info("Testing the logger");
  logger.warn("Testing the logger");
  logger.error("Testing the logger"); 
  */
// })
