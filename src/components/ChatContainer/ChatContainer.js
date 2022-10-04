import React, { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import { recieveMessageRoute } from "../../utils/APIRoutes";
import ChatInput from "../ChatInput/ChatInput";
import Logout from "../Logout/Logout";

const ChartContainer = (props) => {
  const { currentChat } = props;
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const getMessages = async () => {
    const response = await axios.get(recieveMessageRoute);
    return response.data;
  };

  useEffect(() => {
    const data = getMessages();
    setMessages(data);
  }, []);
  const handleSendMsg = () => {};
  return (
    <div className="container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChartContainer;
