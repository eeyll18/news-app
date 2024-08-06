import React from "react";
import { useSelector } from "react-redux";
import NewsCard from "../components/NewsCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.news.favorites);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
        {favorites.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
