import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import App from "./App";
import TvShows from "./pages/TvShows/TvShows";
import Movie from "./pages/Movie/Movie";
import SuggestionTvShowsPage from "./pages/TvShows/SuggestionTvShowsPage";
import SuggestionMoviePage from "./pages/Movie/SuggestionMoviePage";
import NewAndPopularPage from "./pages/NewAndPopular/NewAndPopularPage";
import MyList from "./components/MyList/MyList";
import Kids from "./pages/Kids/Kids";
import MovieVideo from "./pages/Video/MovieVideo";
import TvShowsVideo from "./pages/Video/TvShowsVideo";
import Home from "./pages/Home/Home";
import KidsVideo from "./pages/Video/KidsVideo";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv-suggestion" element={<SuggestionTvShowsPage />} />
        <Route path="/movie-suggestion" element={<SuggestionMoviePage />} />
        <Route path="/latest" element={<NewAndPopularPage />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/movie-video/:id" element={<MovieVideo />} />
        <Route path="/tv-video/:id" element={<TvShowsVideo />} />
        <Route path="/tv-kids/:id" element={<KidsVideo />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
      </Routes>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
