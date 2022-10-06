/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Oct 05 2022 17:44:31 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const mailgunClient = require("../lib/mailgun");

if (!process.env.DOMAIN) {
  throw new Error("Please set `DOMAIN` value in environment variable");
}

if (!process.env.MAILGUN_EMAIL_FROM_NAME) {
  throw new Error(
    "Please set `MAILGUN_EMAIL_FROM_NAME` value in environment variable"
  );
}

if (!process.env.MAILGUN_EMAIL_TO) {
  throw new Error(
    "Please set `MAILGUN_EMAIL_FROM` value in environment variable"
  );
}

const DOMAIN = process.env.DOMAIN;
const MAILGUN_EMAIL_FROM_NAME = process.env.MAILGUN_EMAIL_FROM_NAME;
const MAILGUN_EMAIL_TO = process.env.MAILGUN_EMAIL_TO;

const sendEmail = (subject, body) =>
  mailgunClient.messages
    .create(DOMAIN, {
      from: `${MAILGUN_EMAIL_FROM_NAME} <events@${DOMAIN}>`,
      to: MAILGUN_EMAIL_TO,
      subject,
      text: body,
    })
    .then((res) => {
      console.log(`Email sent to ${MAILGUN_EMAIL_TO}`);
      //   console.log(res);
    })
    .catch((err) => {
      console.error(`Failed to send email to ${MAILGUN_EMAIL_TO}`);
      console.error(err);
    });

module.exports = sendEmail;
