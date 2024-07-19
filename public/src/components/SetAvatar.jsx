import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate("/login");
    };
    checkUser();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <img src={loader} alt="loader" className="w-full max-w-xs" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12 min-h-screen bg-gray-900 text-white py-6">
          <div className="text-center">
            <h1 className="text-3xl">Pick an Avatar as your profile picture</h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={avatar}
                  className={`avatar w-24 h-24 p-2 rounded-full cursor-pointer transition-transform duration-500 ease-in-out ${
                    selectedAvatar === index
                      ? "border-4 border-purple-600"
                      : "border-4 border-transparent"
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
