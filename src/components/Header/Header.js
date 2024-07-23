import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { togglemenu } from "../../utils/appSlice";
import "./Header.scss";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    dispatch(togglemenu());
  };

  const handleLogout = () => {
    Cookies.remove('accessToken'); // Elimina el token de autenticación
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
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
        <button onClick={handleLogout} className="logout flex w-full hover:bg-red-50 rounded-lg pl-2 font-bold">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Header;
