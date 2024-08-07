import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slice";
import Loading from "react-loading";
import NewsCard from "../components/NewsCard";

// sayfa /health'te yenilenince tekrar gelmiyor :d

function Health() {
  const dispatch = useDispatch();
  const healthNews = useSelector((state) => state.news.categoryNews);
  const status = useSelector((state) => state.news.status);

  useEffect(() => {
    dispatch(fetchCategories("Health"));
  }, [dispatch]);


  if (status === "failed") {
    return <div>Error loading data</div>;
  }


  return (
    <div>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Loading type="spin" color="#000" height={50} width={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
          {healthNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
       
      )}
    </div>
  );
}
export default Health; 