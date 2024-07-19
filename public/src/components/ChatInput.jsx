import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import "tailwindcss/tailwind.css";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
      <div className="relative mr-4">
        <BsEmojiSmileFill
          onClick={handleEmojiPickerhideShow}
          className="text-2xl text-yellow-400 cursor-pointer"
        />
        {showEmojiPicker && (
          <div className="absolute top-[-350px]">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <form
        className="flex-grow flex items-center bg-white bg-opacity-20 rounded-full px-4"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="flex-grow bg-transparent text-white outline-none placeholder-white"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-blue-500 hover:bg-blue-700 rounded-full text-white flex items-center justify-center transition duration-300"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
