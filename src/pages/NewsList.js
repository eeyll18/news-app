import React from "react";
import { useSelector } from "react-redux";
import NewsCard from "../components/NewsCard";
import Loading from "react-loading";

const NewsList = ({news}) => {
  const status = useSelector((state) => state.news.status);

  return (
    <div >
      {status==='loading' ? (
        <div className="flex justify-center items-center h-screen">
          <Loading type="spin" color="#1F2937" height={50} width={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;