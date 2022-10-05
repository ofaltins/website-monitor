/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Oct 05 2022 15:36:34 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MAILGUN_API_KEY) {
  throw new Error("Please set `MAILGUN_API_KEY` value in environment variable");
}

const formData = require("form-data");
const Mailgun = require("mailgun.js");

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;

// mailgun instance and client both are attached to the `global` object
// in development to prevent creating new instances over and over.

let mailgun;
let mailgunClient;

if (process.env.NODE_ENV === "production") {
  // mailgun instance
  mailgun = new Mailgun(formData);
  // mailgun client
  mailgunClient = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
  });
} else {
  // fresh mailgun instance and client
  if (!global.mailgun || !global.mailgunClient) {
    global.mailgun = new Mailgun(formData);
    global.mailgunClient = global.mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY,
    });
  }

  // cached mailgun instance and client
  mailgun = global.mailgun;
  mailgunClient = global.mailgunClient;
}

module.exports = mailgunClient;
