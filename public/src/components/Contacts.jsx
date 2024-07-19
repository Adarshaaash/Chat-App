import React, { useState, useEffect } from "react";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const getUserData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    getUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420]">
          <div className="flex items-center justify-center gap-4">
            <h3 className="text-white uppercase">Chat-App</h3>
          </div>
          <div className="flex flex-col items-center gap-2.5 overflow-auto">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact w-[90%] min-h-[5rem] cursor-pointer rounded-md p-2 flex gap-4 items-center transition duration-500 ease-in-out ${
                    index === currentSelected
                      ? "bg-[#9a86f3]"
                      : "bg-[#ffffff34]"
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-12"
                    />
                  </div>
                  <div className="username">
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-8 bg-[#0d0d30]">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-16 max-w-full"
              />
            </div>
            <div className="username">
              <h2 className="text-white">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
