import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function BotMessage({ id, text, payload, lastMessageId }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== lastMessageId) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [id, lastMessageId]);

  let newMessage;
  if (payload?.meals) {
    newMessage = `<p>${text}</p>
    <table className="table-style">
      <thead>
        <tr>
          <th>Meal Name</th>
          <th>Price</th>
          ${payload?.totalPrice ? `<th>Quantity</th><th>Total</th>` : ""}
        </tr>
      </thead>
      <tbody>`;
    payload?.meals?.forEach((meal) => {
      newMessage += `<tr><td>${meal.name}</td><td>${meal.price}</td>${
        payload?.totalPrice ? <td>${meal?.quantity}</td> : ""
      }${payload?.totalPrice ? <td>${meal?.total}</td> : ""}</tr>`;
    });
    newMessage += "</tbody></table>";
  } else {
    newMessage = `${text}` ;
  }
  newMessage += `${
    payload?.totalPrice ? `<br>${payload?.totalPrice} shekel ` : ""
  }`;

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : parse(newMessage)}</div>
    </div>
  );
}