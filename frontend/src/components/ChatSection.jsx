import React, { useState, useEffect, useRef } from "react";

import matrix from "matrix-js-sdk";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { RxBell } from "react-icons/rx";
import { HiInformationCircle } from "react-icons/hi";
import { BsArrowDown, BsArrowDownCircle, BsArrowDownCircleFill, BsBellFill, BsSearch, BsThreeDots } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
function ChatSection() {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState(null);

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false); // State to handle visibility of emoji picker
  const [chosenEmoji, setChosenEmoji] = useState(null); // State to store chosen emoji
  const chatboxRef = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
 // Log the entire emoji object
    setChosenEmoji(emojiObject);
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setEmojiPickerVisible(false);
};



  console.log("react app access token", process.env.REACT_APP_ACCESS_TOKEN);
  const matrixClient = matrix.createClient({
    baseUrl: "https://matrix.org",
    accessToken: "syt_bGluaG1haQ_mqykSMcolXYJUzHFPYul_2Ej2hQ",
    userId: "@linhmai:matrix.org",
  });

  useEffect(() => {
    matrixClient.startClient({ initialSyncLimit: 10 });

    matrixClient.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (event.getType() === "m.room.message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            body: event.getContent().body,
            timestamp: event.getTs(), // Extracting the timestamp here
          },
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

  const scrollToBottom = () => {
    if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
};


  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between bg-white shadow-md">
        <div className="div flex items-center ml-2 mt-1">
          <div className="w-[40px] h-[40px] bg-red-500 rounded-full m-2 text-white justify-center items-center flex font-bold text-md">
            N
          </div>
          <span className="text-md font-bold">
            # New Chat Room - SSH Communication Securities
          </span>
        </div>

        <div className="flex items-center mr-3">
          <IoIosCall className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <FaVideo className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <AiOutlineSearch className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <HiDocumentText className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <BsBellFill className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <HiInformationCircle className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
        </div>
      </div>

      {/* underline */}
      <div className="h-px bg-gray-300 mx-3"></div>

      {/* Chat box with scroll */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-white mb-[50px]" ref={chatboxRef}>
        {messages.map((message, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQGRTSB6kPNtNg/profile-displayphoto-shrink_200_200/0/1665350444937?e=1698883200&v=beta&t=wG1IMvEzIkoM1hSGRSEbLcqkdahxcngwu78DpxmjRXw"
              alt="avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="message user flex-col bg-white text-black rounded-lg py-2 px-4">
              <h3 className="font-bold text-blue">Linh Mai</h3>
              <p className="text-md">{message.body}</p>
              <span className="text-sm text-gray-400 mt-2">
                {new Date(message.timestamp).toLocaleString()}{" "}
                {/* Convert timestamp to a readable date-time format */}
              </span>
            </div>
          </div>
        ))}

        <BsArrowDownCircleFill className="absolute bottom-[100px] right-[30px] mb-5 mr-5 text-gray-700 hover:text-gray-500 w-[40px] h-[40px] p-2" 
        onClick={scrollToBottom}
        />
      </div>

      {/* Fixed input section at the bottom */}
      <div className="border-t bg-white p-3 fixed bottom-0 w-[100vw] flex items-center">
        <input
          className="flex w-[500px] border rounded px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              // Check if Enter is pressed without the Shift key
              handleSend();
              e.preventDefault(); // Prevent a new line from being added to the input
            }
          }}
        />


        <div className="flex">
        <MdEmojiEmotions
            className="text-gray-500 mt-1 w-[40px] h-[40px] p-2"
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          />
          <GrAttachment className="text-gray-500 mt-1 w-[40px] h-[40px] p-2" />
          <BsThreeDots className="text-gray-500 mt-1 w-[40px] h-[40px] p-2 cursor-pointer" />
         
        </div>
        {emojiPickerVisible && (
          <div className="absolute bottom-[60px] left-500px z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatSection;
