import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./store/slice";
import NewsList from "./pages/NewsList";
import Navbar from "./components/Navbar";
import Health from "./pages/Health";
import Pagination from "./components/Pagination";
import "./App.css";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsDetail from "./pages/NewsDetail";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const news = useSelector((state) => state.news.news);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col h-screen ">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 overflow-y-auto p-4 ${
            isSidebarOpen ? "ml-25" : ""
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NewsList news={currentItems} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(news.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                </>
              }
            />
            <Route path="/news/:id" element={<NewsDetail />} />

            <Route path="/health" element={<Health />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
