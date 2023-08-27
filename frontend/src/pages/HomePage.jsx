import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHome } from "react-icons/rx";

const HomePage = () => {
  const [isDragging, setIsDragging] = useState(false);

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
        className="bg-blue-200 h-full flex"
        style={{ width: "50%" }}
      >
        {/* profile column */}
        <div
          id="profileColumn"
          className="bg-gray-50 h-full"
          style={{ width: "250px" }}
        >
          {/* avatar row */}
          <div className="div flex items-center ml-2 mt-1">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQGRTSB6kPNtNg/profile-displayphoto-shrink_200_200/0/1665350444937?e=1698883200&v=beta&t=wG1IMvEzIkoM1hSGRSEbLcqkdahxcngwu78DpxmjRXw"
              alt=""
              className="w-[40px] h-[40px] rounded-full m-2"
            />
            <span className="text-md font-bold">Linh Mai</span>
          </div>
          {/* underline */}
          <div className="h-[1px] bg-gray-300 mx-3"></div>

            {/* home icon row */}
            <div className="div flex items-center ml-2 mt-1">
            <RxHome className="mx-2 mt-1 w-[40px] h-[40px] p-2"></RxHome>
            <span className="text-md ">Home</span>
          </div>

        </div>

        {/* search & room row */}
        <div className="flex-grow h-full bg-gray-100 pr-4">
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
        </div>
      </div>
      {/* draging handle */}
      <div
        id="dragHandle"
        className="bg-gray-300 h-full cursor-ew-resize"
        style={{ width: "5px" }}
      ></div>

      {/* right column */}
      <div id="rightColumn" className="bg-white flex-grow h-full"></div>
    </div>
  );
};

export default HomePage;
