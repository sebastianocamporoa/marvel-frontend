import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
} from "react-icons/ai";
import Cookies from 'js-cookie';

const Sidebar = () => {
  const isToggleMenu = useSelector((state) => state.app.isMenuOpen);
  const navigate = useNavigate();
  if (!isToggleMenu) return null;
  const handleLogout = () => {
    Cookies.remove('accessToken'); // Elimina el token de autenticación
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };
  return (
    <div className="p-5 shadow-lg w-1/6 h-screen overflow-y-auto">
      <ul>
        <li className="py-2 flex hover:bg-gray-200 rounded-lg pl-2 font-bold">
          <Link to="/" className="flex">
            {" "}
            <AiOutlineHome className="mr-5 mt-1 text-xl" /> Inicio
          </Link>
        </li>
        <li className="py-2 flex hover:bg-gray-200 rounded-lg pl-2 font-bold">
          <button onClick={handleLogout} className="flex w-full text-left">
            <span className="mr-5 mt-1 text-xl">🔒</span> Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
