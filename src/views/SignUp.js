import React, { useState } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

import { Alert } from "../components/common/Alert";

export const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          name,
          email,
          password,
          password_confirmation: confirmPass,
        }
      );

      setShowConfirm(data.message);

      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (error) {
      setShowError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Link to="/" className="p-8 absolute ">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="arrow-left w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <div className="flex-1 flex flex-col justify-center my-auto p-12 pt-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex justify-center">
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                alt="Workflow"
              />
              <h2 className=" my-auto ml-4 text-3xl leading-9 font-extrabold text-gray-900">
                Fifafriends
              </h2>
            </div>

            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Comienza tu leyenda
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Usuario
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="my-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Confirma contraseña
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      id="confirm"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Registrarse
                    </button>
                  </span>
                </div>
              </form>
              <div className="p-4">
                {showConfirm && (
                  <Alert type="success" onClose={() => setShowConfirm(false)}>
                    {showConfirm}
                  </Alert>
                )}
                {showError && (
                  <Alert type="error" onClose={() => setShowError(false)}>
                    {showError}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
        />
      </div>
    </div>
  );
};
