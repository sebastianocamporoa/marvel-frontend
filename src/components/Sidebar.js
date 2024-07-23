import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
} from "react-icons/ai";

const Sidebar = () => {
  const isToggleMenu = useSelector((state) => state.app.isMenuOpen);
  if (!isToggleMenu) return null;
  
  return (
    <div className="p-5 shadow-lg w-1/6 h-screen overflow-y-auto">
      <ul>
        <li className="py-2 flex hover:bg-gray-200 rounded-lg pl-2 font-bold">
          <Link to="/" className="flex">
            {" "}
            <AiOutlineHome className="mr-5 mt-1 text-xl" /> Inicio
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
