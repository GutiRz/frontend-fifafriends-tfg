import React, { useContext } from "react";
import Transition from "../Transition.js";
import Axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const ProfileDropdown = ({ showProfile }) => {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async () => {
    const config = {
      Accept: "application/json",
      headers: { Authorization: token },
    };
    try {
      await Axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        config
      );
      setToken("");
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Transition
      show={showProfile}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
        <div className="py-1 rounded-md bg-white shadow-xs">
          {/* <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
          >
            Perfil
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
          >
            Preferencias
          </a> */}
          <button
            onClick={handleLogout}
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default ProfileDropdown;
