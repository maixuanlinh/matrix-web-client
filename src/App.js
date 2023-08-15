import React, { useState, useEffect } from "react";
import matrix from "matrix-js-sdk";
import "./App.css";
import profile from "./profilepicture.jpg"

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState(null);

  const matrixClient = matrix.createClient({
    baseUrl: "https://matrix.org",
    accessToken: "syt_bGluaG1haQ_IKNqjhoOggNrwUklowbN_2UOiQB",
    userId: "@linhmai:matrix.org",
  });

  useEffect(() => {
    matrixClient.startClient({ initialSyncLimit: 10 });

    matrixClient.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (event.getType() === "m.room.message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          event.getContent().body,
        ]);
      }
    });

    // Try to create a room on component mount
    const initialRoomAlias = `chat_room_${Date.now()}`;
    createRoom(initialRoomAlias);
  }, []);

  const createRoom = (alias) => {
    matrixClient
      .createRoom({
        room_alias_name: alias,
        visibility: "private",
      })
      .then((response) => {
        setRoomId(response.room_id);
      })
      .catch((error) => {
        if (error.errcode === "M_ROOM_IN_USE") {
          // If room alias is taken, try a new alias
          const newAlias = `chat_room_${Date.now()}`;
          createRoom(newAlias);
        } else {
          console.error("Error creating the room:", error);
        }
      });
  };

  const handleSend = () => {
    if (roomId) {
      const content = {
        body: input,
        msgtype: "m.text",
      };

      matrixClient
        .sendMessage(roomId, content)
        .then(() => {
          setInput("");
        })
        .catch((error) => {
          console.error("Error sending the message:", error);
        });
    } else {
      console.error("Room ID is not available.");
    }
  };

  return (
<div className="container">
    <h1 className="title">Matrix Chat App</h1>
    <div className="chat-box">
        {messages.map((message, index) => (
            <div key={index} className="message-row">
                <img src={profile} alt="avatar" className="avatar"/>
                <div className="message user">
                    {message}
                </div>
            </div>
        ))}
    </div>
    <div className="input-section">
        <input className="input" value={input} onChange={e => setInput(e.target.value)} />
        <button className="send-button" onClick={handleSend}>Send</button>
    </div>
</div>

);
}

export default App;
