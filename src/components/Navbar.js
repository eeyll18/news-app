import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { searchNews } from "../store/slice";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(searchNews(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const logoutButton = () => {
    setIsModalOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav className={`p-4 shadow-xl `}>
      <div className=" flex flex-wrap items-center justify-between mx-auto p-1">
        <div className="flex items-center space-x-3 rtl:space-x-reverse ">
          <Link
            to="/"
            className="self-center text-3xl text-pink-500 font-semibold whitespace-nowrap ml-16"
          >
            NewsApp
          </Link>
        </div>

        <div className="flex-grow flex justify-center items-center ml-36">
          <div className="relative">
            <svg
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="text"
              className="block w-72 pl-10 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search News.."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-10 mr-10 ">
          <Link to="/" className="text-lg font-medium hover:text-pink-500">
            Home
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className="text-lg font-medium focus:outline-none  hover:text-pink-500 mr-10"
            >
              Categories
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute top-10 left-0 z-10 bg-white mt-2 py-2 w-48 border rounded-lg shadow-xl`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  to="/health"
                  className="block px-4 py-2 hover:text-pink-500"
                >
                  Health
                </Link>
                <Link
                  to="/technology"
                  className="block px-4 py-2  hover:text-pink-500"
                >
                  Technology
                </Link>
                <Link
                  to="/sports"
                  className="block px-4 py-2  hover:text-pink-500"
                >
                  Sports
                </Link>
              </div>
            )}
            {currentUser ? (
              <>
                <Link
                  to="/favorites"
                  className="text-lg font-medium hover:text-pink-500 mr-10"
                >
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  className="text-lg font-medium hover:text-pink-500 mr-10"
                >
                  Profile
                </Link>
                <button
                  onClick={modalOpen}
                  className="text-lg font-medium hover:text-pink-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-lg font-medium hover:text-pink-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* favorite login modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="mb-4 font-semibold text-center">
          Are you sure you want to log out?
        </p>
        <div className=" flex justify-center items-center">
          <button
            className="bg-pink-500 text-white py-2 px-2 m-3  rounded hover:bg-pink-600"
            onClick={logoutButton}
          >
            Log Out
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-3 m-3 rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
