import React, { useState, useEffect, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import Messages from "./components/Messages";
import Input from "./components/Input";

import "./styles.css";
import Header from "./components/Header";

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (inputText !== "") {
        axios
          .post(`/`, { message: inputText })
          .then(() => axios.get("/getAllMessages"))
          .then((response) => setMessages(response.data));
      } else {
        axios.get("/getAllMessages")
        .then((response) => setMessages(response.data))
      }
    }
    fetchData();
  }, [inputText]);

  const send = async (text) => {
    setInputText(text);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages
        inputText={inputText}
        messages={messages}
        setMessages={setMessages}
      />
      <Input onSend={send} />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Chatbot />
  </StrictMode>
);
