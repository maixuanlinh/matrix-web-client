import React from "react";
import GetStartedButton from "./GetStartedButton.jsx";
import { AiOutlineMessage } from "react-icons/ai";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";

const IntroSection = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-[100%] h-[100vh] flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src={user?.avatar}
          alt=""
          className="w-[150px] h-[150px] rounded-full"
        />

        <h1 className="text-3xl font-bold mt-3 mb-1">{`Welcome ${user?.name}`}</h1>
        <h2 className="text-gray-500 text-2xl mb-6">
          Now let's help you get started
        </h2>

        <div className="flex">
          <GetStartedButton text="Send a Direct Message">
            <AiOutlineMessage className="w-[36px] h-[36px] mb-2" />
          </GetStartedButton>

          <GetStartedButton text="Explore Public Rooms">
            <RiCompassDiscoverFill className="w-[36px] h-[36px] mb-2" />
          </GetStartedButton>

          <GetStartedButton text="Create a Group Chat">
            <HiUserGroup className="w-[36px] h-[36px] mb-2" />
          </GetStartedButton>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
