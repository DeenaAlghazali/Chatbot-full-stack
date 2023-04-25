import React from "react";
import parse from "html-react-parser";

export default function BotMessage({ text, payload }) {
  let newMessage = `${text} `;
  payload?.meals?.forEach((meal) => {
    newMessage += `<br>${meal.name} ${meal.price}
      ${payload?.totalPrice ? `${meal?.quantity} ${meal?.total}` : ""} `;
  });
  newMessage += `${payload?.totalPrice ? `<br>${payload?.totalPrice} ` : ""}`;

  return (
    <div className="message-container">
      <div className="bot-message">{parse(newMessage)}</div>
    </div>
  );
}
