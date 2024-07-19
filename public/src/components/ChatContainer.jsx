import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[700px] bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
          />
          <h3 className="text-2xl font-semibold">{currentChat.username}</h3>
        </div>
        <Logout />
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-800 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700">
        {messages.map((message) => (
          <div
            key={uuidv4()}
            ref={scrollRef}
            className={`flex ${
              message.fromSelf ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`flex items-center ${
                message.fromSelf ? "flex-row-reverse" : ""
              }`}
            >
              {!message.fromSelf && (
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-purple-500 shadow-md mr-2"
                />
              )}
              <div
                className={`p-3 max-w-xs rounded-lg text-sm ${
                  message.fromSelf
                    ? "bg-purple-700 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
