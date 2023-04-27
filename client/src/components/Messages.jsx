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
          <BotMessage
            key={_id}
            id={_id}
            text={message}
            payload={payload}
            lastMessageId={messages[messages.length - 1]?._id}
          />
        ) : (
          <UserMessage key={_id} inputText={inputText} text={message} />
        );
      })}
      <div id={"el"} ref={el} />
    </div>
  );
}
