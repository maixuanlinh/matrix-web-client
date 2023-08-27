import React, { useState } from "react";
import { AiFillBell, AiFillNotification, AiOutlineDown } from "react-icons/ai";
import { RxArrowDown, RxBell, RxDropdownMenu, RxPlus } from "react-icons/rx";
import {BsThreeDots} from "react-icons/bs";
import SectionHeaderBar from "./SectionHeaderBar";

const PeopleList = () => {

  const [active, setActive] = useState(true);
  const chatItems = ["David", "Bob", "Alice", "Charlie"];

  const getRandomBackgroundColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-green-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <> 
     {/* SectionHeaderBar */}
     <SectionHeaderBar section="People" active={active} setActive={setActive} />

      {active && chatItems.map((chat, idx) => (
        <div className="w-[100%] group flex relative mt-1 mr-2 ml-3 mb-3 justify-between hover:bg-gray-300 rounded-lg cursor-pointer">
          <div className="flex items-center">
          <div
          key={idx}
          className={`w-[36px] h-[36px] rounded-full mr-2 flex items-center justify-center text-white text-md font-bold ${getRandomBackgroundColor()}`}
        >
          {chat[0]}
        </div>
            {chat}
          </div>
          <div className="flex items-center hidden group-hover:flex">
          <BsThreeDots className="text-gray-500  mt-1 w-[35px] h-[35px] p-2" />
          <AiFillBell className="text-gray-500 mr-2  mt-1 w-[35px] h-[35px] p-2 m-1" />
          </div>
       
        </div>
      ))}
    </>
  );
};

export default PeopleList;
