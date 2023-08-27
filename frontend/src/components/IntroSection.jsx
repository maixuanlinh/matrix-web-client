import React from "react";
import GetStartedButton from "./GetStartedButton.jsx";
import { AiOutlineMessage } from "react-icons/ai";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";

const IntroSection = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQGRTSB6kPNtNg/profile-displayphoto-shrink_200_200/0/1665350444937?e=1698883200&v=beta&t=wG1IMvEzIkoM1hSGRSEbLcqkdahxcngwu78DpxmjRXw"
          alt=""
          className="w-[150px] h-[150px] rounded-full"
        />

        <h1 className="text-3xl font-bold mt-3 mb-1">Welcome Linh Mai</h1>
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
