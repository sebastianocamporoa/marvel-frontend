import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { togglemenu } from "../../utils/appSlice";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(togglemenu());
  };

  return (
    <div className="grid grid-flow-col p-5 shadow-lg">
      <div className="flex items-center	col-span-1 text-3xl">
        <img
          onClick={() => handleToggleMenu()}
          className="h-[1.8rem] cursor-pointer"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp"
          alt="hamburger-menu"
        />
        <a href="/">
          <img
            className="header h-[1.8rem] mx-2"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            alt="Youtube-logo"
          />
        </a>
      </div>
      <div className=" flex col-span-10 pl-14">
        <input
          className="w-1/2 border border-gray-400 p-1 pl-3 rounded-l-full"
          placeholder="Search..."
          type="text"
          onChange={(e) => {
            console.log("cambia")
          }}
        />
        <button
          className="border border-gray-400 px-5 py-2 bg-gray-100 rounded-r-full"
          type="button"
        >
          <BiSearchAlt2 />
        </button>
      </div>
      <div>
      </div>
      <div className="flex col-span-1">
        <img
          className="h-8"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="user-logo"
        />
      </div>
    </div>
  );
};

export default Header;
