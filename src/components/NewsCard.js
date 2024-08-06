import React, { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slice";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";

export default function NewsCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const favorites = useSelector((state) => state.news.favorites);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Auth durumunu
  const isFavorite = favorites.some((favorite) => favorite.id === item.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = () => {
    console.log("Current User:", currentUser); 
    console.log("Is Authenticated:", isAuthenticated); 
    if (isAuthenticated) {
      dispatch(toggleFavorite({ newsItem: item, isAuthenticated }));
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="p-2 text-black ">
      <div
        key={item.id}
        className="rounded-lg shadow-xl overflow-hidden hover:shadow-pink-200 transition duration-200 aspect-w-1 aspect-h-1 
        flex flex-col h-full border justify-start bg-gray-100 "
      >
        <div className="h-full flex flex-col">
          <div>
            <img
              src={item.image}
              alt={item.id}
              className="h-auto w-full max-w-s rounded-lg "
            />
          </div>
          <div className="p-10 flex flex-col flex-grow justify-between ">
            <h2 className="text-xl font-bold mb-3 ">{item.title}</h2>
            <p className="text-gray-700 ">{item.description}</p>
            <div className="flex flex-row justify-between items-center">
              <Link
                className="bg-pink-200 rounded-lg hover:bg-pink-300 py-2 px-2 text-center"
                to={`/news/${item.id}`}
              >
                Read More
              </Link>
              <div className="cursor-pointer" onClick={handleFavoriteClick}>
                {isFavorite ? (
                  <MdFavorite fontSize="1.5rem" />
                ) : (
                  <MdFavoriteBorder fontSize="1.5rem" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* login reqired modalı */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-center">Login Required</h2>
        <p className="mb-4">
          Please log in to add this news to your favorites.
        </p>
        <div className="flex justify-center items-center">
        <button
          className="bg-pink-500 text-white py-2 px-8 m-3 rounded hover:bg-pink-600"
          onClick={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
        >
          Log In
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-8 m-3 rounded hover:bg-blue-600"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Cancel
        </button>
        </div>
        
      </Modal>
    </div>
  );
}
