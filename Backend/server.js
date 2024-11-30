require("dotenv").config(); // Add this line to load the environment variables

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = 3001;

// Get Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Access account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Access auth token
const client = twilio(accountSid, authToken);

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