import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "react-loading";

export default function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const news = useSelector((state) => state.news.news);
  const status = useSelector((state) => state.news.status);

  useEffect(() => {
    const item = news.find((item) => item.id === id);
    setNewsItem(item);
  }, [id, news]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading type="spin" color="#000" height={50} width={50} />
      </div>
    );
  }

  if (!newsItem) {
    return <div>Error: News item not found.</div>;
  }

  return (
    <div className="p-6  max-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
        <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto rounded-lg mb-4" />
        <p className="text-gray-700 mb-4">{newsItem.description}</p>
        <p className="text-gray-900">{newsItem.content}</p>
      </div>
    </div>
  );
}


