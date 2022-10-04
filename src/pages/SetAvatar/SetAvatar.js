import axios from "axios";
import loader from "../../assets/loader.gif";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setAvatarRoute } from "../../utils/APIRoutes";
import './SetAvatar.css';

const SetAvatar = () => {
  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState('');

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  }, []);

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onload = (e) => {
      setSelectedAvatar(reader.result);
      setAvatarFile(file);
    }
  }

  const setProfilePicture = async () => {
    setIsLoading(true)
    if (avatarFile === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      
      const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, 
        formData
      );
      setIsLoading(false)
      if (data.isSet) {
        console.log(data)
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const setAvatar = async () => {
      const data = [];
      for (let i = 0; i < 1; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    setAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <input type="file" onChange={fileSelectedHandler}/>
          <div className="avatars">  
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={(selectedAvatar ? selectedAvatar : `data:image/svg+xml;base64,${avatar}`)}
                    alt="avatar"
                    key={avatar}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SetAvatar;
