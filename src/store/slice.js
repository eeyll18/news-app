import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mainData: [],
  news: [],
  categoryNews: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  categoryStatus: "idle",
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_MOCKAPI_KEY);
    // geriye return
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    searchNews: (state, action) => {
      state.news = state.mainData.filter((news) =>
        news.title.toLowerCase().includes(action.payload?.toLowerCase())
      );
    },
    fetchCategories: (state, action) => {
      state.categoryNews = state.mainData.filter(
        (news) => news.category.toLowerCase() === action.payload?.toLowerCase()
      );
    },
    toggleFavorite: (state, action) => {
      const { newsItem, isAuthenticated } = action.payload; // gelen haberi almak
      if (!isAuthenticated) {
        alert("you need to be logged in to add favorites");
        return;
      } else {
        const index = state.favorites.findIndex(
          (item) => item.id === newsItem.id
        ); // haber favorilerde var mı kontrolü
        if (index >= 0) {
          // haber favorilerde varsa
          state.favorites.splice(index, 1); // haberi favorilerden çıkarma
        } else {
          state.favorites.push(newsItem); // favorilere ekleme
        }
        localStorage.setItem('favorites',JSON.stringify(state.favorites));
      }
    },
    // TODO: tekrar kullanıcı giriş yaptığında favorileri getirme - olmadı henüz
    setFavorites:(state,action)=>{
      state.favorites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
        state.mainData = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { searchNews, fetchCategories, toggleFavorite,setFavorites } =
  newsSlice.actions;
export default newsSlice.reducer;
