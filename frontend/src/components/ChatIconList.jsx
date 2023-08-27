import React from "react";

const ChatIconList = () => {
  const chatItems = [
    "David",
    "Bob",
    "Alice",
    "Charlie",
    "Frank",
    "Eva",

    "Grace",
  ];

  const getRandomBackgroundColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex space-x-2 mt-3 ml-2">
      {chatItems.map((chat, idx) => (
        <div
          key={idx}
          className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-white text-md font-bold ${getRandomBackgroundColor()}`}
        >
          {chat[0]}
        </div>
      ))}
    </div>
  );
};

export default ChatIconList;
