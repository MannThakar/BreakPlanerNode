import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import twilio from "twilio";

const app = express();
const port = process.env.PORT || 3001;

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Get from .env
const authToken = process.env.TWILIO_AUTH_TOKEN; // Get from .env
const client = twilio(accountSid, authToken); // Create the Twilio client with SID and Auth Token

app.use(cors());
app.use(bodyParser.json());

app.post("/send-sms", (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).send({
      success: false,
      error: "Recipient number and message are required.",
    });
  }

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Use Twilio phone number from env
      to: to, // Recipient number
    })
    .then((message) =>
      res.status(200).send({ success: true, messageSid: message.sid })
    )
    .catch((error) => {
      console.error("Error:", error.message);
      res.status(500).send({ success: false, error: error.message });
    });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
