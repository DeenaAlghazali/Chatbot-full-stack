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

  let newMessage = `${text} `;
  payload?.meals?.forEach((meal) => {
    newMessage += `<br>${meal.name} ${meal.price}
      ${payload?.totalPrice ? `${meal?.quantity} ${meal?.total}` : ""} `;
  });
  newMessage += `${payload?.totalPrice ? `<br>${payload?.totalPrice} ` : ""}`;

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : parse(newMessage)}</div>
    </div>
  );
}
