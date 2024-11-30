import lunchFood from "../asserts/Home/01_lunchImage.png";
import tea from "../asserts/Home/02_teaCups.png";
import customMessage from "../asserts/Home/03_customMessage.png";

export const CARD_DATA = [
  {
    id: 1,
    title: "Lunch Break",
    description: "Send a notification to update others about your lunch break",
    image: lunchFood,
    breaTime: 15,
    isTo: true,
    type: "lunch",
  },
  {
    id: 2,
    title: "Tea Break",
    description: "Send a notification to update others about your tea break",
    image: tea,
    isTo: false,
    type: "tea",
  },
  {
    id: 3,
    title: "Custom Break",
    description: "Send a notification to update others about your custom break",
    image: customMessage,
    breaTime: 10,
    isTo: true,
    type: "custom",
  },
];
