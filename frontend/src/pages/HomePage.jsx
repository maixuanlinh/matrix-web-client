import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHome, RxPlus } from "react-icons/rx";

import ChatIconList from "../components/ChatIconList";

import AllRoomBar from "../components/AllRoomBar.jsx";
import SectionHeaderBar from "../components/SectionHeaderBar.jsx";
import PeopleList from "../components/PeopleList.jsx";
import RoomList from "../components/RoomList.jsx";
import ChatSection from "../components/ChatSection.jsx";
import { BsCheck, BsThreeDots } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { server } from "../server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import IntroSection from "../components/IntroSection";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const [isDragging, setIsDragging] = useState(false);
  const [isHomePopupVisible, setHomePopupVisible] = useState(false);
  const [isHomeOrAllRooms, setIsHomeOrAllRooms] = useState(false);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleHomeAndAllRoomsPopup = () => {
    setIsHomeOrAllRooms(!isHomeOrAllRooms);
    setHomePopupVisible(!isHomePopupVisible);
  };

  const logOut = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);

        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    const leftColumn = document.getElementById("leftColumn");
    const rightColumn = document.getElementById("rightColumn");
    const dragHandle = document.getElementById("dragHandle");

    const onMouseMove = (event) => {
      if (!isDragging) return;

      // Minimum width for left column (taking profileColumn's 250px width into account)
      const minLeftWidth = 250;
      const maxLeftWidth = window.innerWidth * 0.5;
      const leftColWidth = Math.min(
        maxLeftWidth,
        Math.max(minLeftWidth, event.clientX)
      );

      leftColumn.style.width = `${leftColWidth}px`;
      rightColumn.style.width = `${window.innerWidth - leftColWidth}px`;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    dragHandle.addEventListener("mousedown", (event) => {
      setIsDragging(true);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative h-screen flex">
      {/* left column */}
      <div
        id="leftColumn"
        className="bg-blue-200 h-full flex flex-row"
        style={{ width: "50%" }}
      >
        {/* profile column */}
        <div
          id="profileColumn"
          className="bg-gray-50 h-full px-2"
          style={{ flexShrink: 0 }}
        >
          <div className="relative">
            {/* avatar row */}
            <div
              className="div flex items-center ml-2 mt-1"
              onClick={() => setUserPopupVisible(!isUserPopupVisible)}
            >
              <img
                src={user?.avatar}
                alt=""
                className="w-[40px] h-[40px] rounded-full m-2"
              />
              <span className="text-md font-bold">{user?.name}</span>
            </div>

            {/* Popup */}
            {isUserPopupVisible && (
              <div className="absolute top-0 left-full w-[200px] bg-white z-20 mt-2 border border-gray-300 shadow-lg rounded-lg p-3">
                <h3 className="text-md font-bold text-gray-500 ml-2 mt-2 mb-3">
                  {user?.name}
                </h3>
                <span className="ml-2">@linhmai:matrix.org</span>
                <div className="h-[1px] bg-gray-300 mt-2"></div>
                <div
                  className={`flex items-center mx-2 mt-2 justify-left hover:bg-gray-200 cursor-pointer transition duration-300`}
                  onClick={logOut}
                >
                  <RiLogoutBoxFill className="text-gray-500 w-[25px] h-[25px] text-red-500 mr-2" />
                  Logout
                </div>
              </div>
            )}
          </div>

          {/* underline */}
          <div className="h-[1px] bg-gray-300 mx-3"></div>

          <div className="relative">
            {/* Home row */}
            <div
              className="flex items-center mx-2 mt-2 bg-gray-200 rounded-lg justify-between group hover:bg-gray-300 transition duration-300 cursor-pointer"
              onClick={() => setHomePopupVisible(!isHomePopupVisible)}
            >
              <div className="flex items-center">
                <RxHome className="mx-2 mt-1 w-[40px] h-[40px] p-2" />
                <span className="text-md ">
                  {isHomeOrAllRooms ? "All Rooms" : "Home"}
                </span>
              </div>

              <BsThreeDots className="text-gray-500 mt-1 w-[35px] h-[35px] p-2 group-hover:block hidden" />
            </div>

            {/* Popup */}
            {isHomePopupVisible && (
              <div className="absolute top-0 left-full w-[200px] bg-white z-20 mt-2 border border-gray-300 shadow-lg rounded-lg p-3">
                <span className="text-md font-bold text-gray-500 ml-2 mt-2 mb-3">
                  Home
                </span>

                <div className="h-[1px] bg-gray-300 mt-2"></div>
                <div
                  className={`flex items-center mx-2 mt-2 justify-between ${
                    isHomeOrAllRooms ? "text-blue-500" : "text-black"
                  }`}
                  onClick={handleHomeAndAllRoomsPopup}
                >
                  Show All Rooms
                  {isHomeOrAllRooms && (
                    <BsCheck className="text-gray-500 w-[25px] h-[25px] text-blue-500" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* create space row */}
          <div className="div flex items-center mx-2 mt-2">
            <RxPlus className="mx-2 mt-1 w-[40px] h-[40px] p-2" />
            <span className="text-md ">Create Space </span>
          </div>
        </div>

        <div className="flex-grow h-full bg-gray-100 pr-4 overflow-x-hidden">
          {/* search & room row */}
          <div className="w-[100%] relative mt-3 mr-2 ml-2">
            <input
              type="text"
              placeholder="Search ..."
              className="h-[40px] w-full px-2 border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
          </div>
          {/* underline */}
          <div className="h-[1px] bg-gray-300 ml-3 mt-2 mr-0"></div>
          {/* chat icons */}
          <div className="w-[100%] relative mt-3 mr-2 ml-2">
            <ChatIconList />
          </div>

          {/* All Room Bar */}
          <AllRoomBar
            isHomeorAllRooms={isHomeOrAllRooms}
            isHomeOrAllRooms={isHomeOrAllRooms}
            setIsHomeOrAllRooms={setIsHomeOrAllRooms}
          />

          {/* list of People */}
          <PeopleList />

          {/* list of Rooms */}
          <RoomList />
        </div>
      </div>
      {/* draging handle */}
      <div
        id="dragHandle"
        className="bg-gray-300 h-full cursor-ew-resize"
        style={{ width: "5px" }}
      ></div>

      {/* right column */}
      <div id="rightColumn" className="bg-white flex-grow h-[100%]">
        <IntroSection />
      </div>
    </div>
  );
};

export default HomePage;
