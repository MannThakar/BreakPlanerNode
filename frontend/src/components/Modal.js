import React, { useState, useEffect } from "react";
import axios from "axios";
import { successToast, errorToast } from "../utils/helper";

const Modal = ({ isVisible, closeModal, data }) => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const formatTime12hr = (hours, minutes) => {
    const period = hours >= 12 ? "PM" : "AM";
    let hourIn12 = hours % 12;
    if (hourIn12 === 0) hourIn12 = 12; // Handle midnight and noon
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${hourIn12}:${formattedMinutes} ${period}`;
  };

  // Function to format time to 24-hour format for input fields
  const formatTime24hr = (hours, minutes) => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isVisible) {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      setFromTime(formatTime24hr(hours, minutes)); // Set 24-hour formatted time for input

      const breakTimeInMinutes = data.breaTime || 0;
      const toTimeDate = new Date(
        currentTime.getTime() + breakTimeInMinutes * 60000
      ); // Add breakTime in minutes
      const toHours = toTimeDate.getHours();
      const toMinutes = toTimeDate.getMinutes();
      setToTime(formatTime24hr(toHours, toMinutes)); // Set 24-hour formatted time for input
    }
  }, [isVisible, data.breaTime]);

  const handleChangeFrom = (event) => {
    setFromTime(event.target.value);
  };

  const handleChangeTo = (event) => {
    setToTime(event.target.value);
  };

  const lunchMessage = `Hey good afternoon! I'm taking my ${
    data.title
  } from ${formatTime12hr(
    parseInt(fromTime.split(":")[0]),
    parseInt(fromTime.split(":")[1])
  )} and will give you a call around ${formatTime12hr(
    parseInt(toTime.split(":")[0]),
    parseInt(toTime.split(":")[1])
  )}.`;

  const teaMessage = `Hey good afternoon! I'm taking my ${
    data.title
  } from ${formatTime12hr(
    parseInt(fromTime.split(":")[0]),
    parseInt(fromTime.split(":")[1])
  )} and will call you back soon.`;

  const customMessage = ``;

  const message =
    data.type === "lunch"
      ? lunchMessage
      : data.type === "tea"
      ? teaMessage
      : customMessage;

  const handleSend = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://breakplanernode.onrender.com/send-sms",
        {
          to: number,
          message: message, // Replace with the message you want to send
        }
      );

      if (response.data.success === true) {
        successToast("Message sent successfully");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error sending SMS:", error);
      errorToast("Error sending SMS");
      setLoading(false);
    }
  };

  const handleSelect = (event) => {
    setNumber(event.target.value);
  };

  if (!isVisible) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{data.title}</h3>
        <p className="py-4">{data.description}</p>
        <div className="flex justify-between">
          <div className="w-full">
            <label className="label">From</label>
            <input type="time" value={fromTime} onChange={handleChangeFrom} />
          </div>

          {data.isTo === true && (
            <div className="w-full">
              <label className="label">To</label>
              <input type="time" value={toTime} onChange={handleChangeTo} />
            </div>
          )}
        </div>
        <div className="w-full mt-5">
          <select class="select select-bordered w-full" onChange={handleSelect}>
            <option disabled selected>
              Please select a person
            </option>
            <option value={"+919429543753"}>Heli</option>
            <option value={"+918200873635"}>Mann</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="label">Message</label>
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            placeholder="Your message.."
            rows={5}
            value={message} // Bind the message to the value
          />
        </div>
        <div className="modal-action">
          <button
            className="btn bg-error text-white hover:bg-red-700"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="btn btn-success text-white"
            onClick={handleSend}
            disabled={!number || loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs text-white"></span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
