import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineUserAdd, BsCheck } from "react-icons/ai";
import { BsCheck2, BsHouseAdd } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { MdPublic } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AllRoomBar = ({ isHomeOrAllRooms, setIsHomeOrAllRooms }) => {
  const [activeHome, setActiveHome] = useState(false);

  const [activeButton, setActiveButton] = useState(false);
  const navigate = useNavigate();
  const homePopupRef = useRef(null);
  const buttonPopupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        homePopupRef.current &&
        !homePopupRef.current.contains(event.target)
      ) {
        setActiveHome(false);
      }
      if (
        buttonPopupRef.current &&
        !buttonPopupRef.current.contains(event.target)
      ) {
        setActiveButton(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup when the component unmounts or re-renders
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[100%] flex relative mt-3 mr-2 ml-3 justify-between">
      <div
        className="flex items-center font-bold hover:bg-gray-200 pl-2 rounded-lg cursor-pointer"
        onClick={() => setActiveHome(!activeHome)}
      >
        {isHomeOrAllRooms ? "All Rooms" : "Home"}
        <AiOutlineDown className="mx-2 mt-1 w-[30px] h-[30px] p-2" />
      </div>

      {/* Home/All Rooms Popup */}
      {activeHome && (
        <div
          ref={homePopupRef}
          className="absolute top-full left-0 w-[200px] bg-white z-20 mt-2 border border-gray-300 shadow-lg rounded-lg p-3"
        >
          <div
            className={`flex items-center mx-2  justify-between ${
              isHomeOrAllRooms ? "text-blue-500" : "text-black"
            }`}
            onClick={() => {
              setIsHomeOrAllRooms(!isHomeOrAllRooms);
              setActiveHome(!activeHome);
            }}
          >
            Show All Rooms
            {isHomeOrAllRooms && (
              <BsCheck2 className="text-gray-500 w-[25px] h-[25px] text-blue-500" />
            )}
          </div>
        </div>
      )}

      <RxPlus
        className="mx-2 mt-1 w-[35px] h-[35px] p-2 bg-gray-300 m-1 rounded-lg cursor-pointer"
        onClick={() => setActiveButton(!activeButton)}
      />

      {/* Button Popup */}
      {activeButton && (
        <div
          ref={buttonPopupRef}
          className="absolute top-full right-0 w-[200px] bg-white z-20 mt-2 border border-gray-300 shadow-lg rounded-lg p-3 "
        >
          <div
            className={`flex items-center mx-2 justify-left hover:bg-gray-200 transition duration-300 cursor-pointer ${
              isHomeOrAllRooms ? "text-blue-500" : "text-black"
            }`}

            onClick={() => {
                console.log("clicked");
                setActiveButton(!activeButton);
            }}
          >
            <AiOutlineUserAdd className="w-[36px] h-[36px] p-2" />
            Start new chat
          </div>
          <div
            className={`flex items-center mx-2 mt-2 justify-left hover:bg-gray-200 transition duration-300 cursor-pointer ${
              isHomeOrAllRooms ? "text-blue-500" : "text-black"
            }`}

            onClick={() => {
                console.log("clicked");
                setActiveButton(!activeButton);
                navigate("/new-room");

            }}
          >
            <BsHouseAdd className="w-[36px] h-[36px] p-2" />
            New Room
          </div>

          <div
            className={`flex items-center mx-2 mt-2 justify-left hover:bg-gray-200 transition duration-300 cursor-pointer ${
              isHomeOrAllRooms ? "text-blue-500" : "text-black"
            }`}
            onClick={() => {
                console.log("clicked");
                setActiveButton(!activeButton);
            }}
          >
            <MdPublic className="w-[36px] h-[36px] p-2" />
            Join Public Room
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRoomBar;
