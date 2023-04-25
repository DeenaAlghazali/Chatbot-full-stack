import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

export default function Messages({ messages, inputText }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="messages">
      {messages?.map(({ _id, message, type, payload }) => {
        return type === "sent" ? (
          <BotMessage key={_id} text={message} payload={payload} />
        ) : (
          <UserMessage key={_id} inputText={inputText} text={message} />
        );
      })}
      <div id={"el"} ref={el} />
    </div>
  );
}
