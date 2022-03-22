import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=af9604a5";

const movie1 = {
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
  Title: "Spider-Man",
  Type: "movie",
  Year: "2002",
  imdbID: "tt0145487",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const searchString = `${API_URL}&s=${title}`;
    const response = await fetch(`${searchString}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spider-man");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeHolder="Search for movies"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(search)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="Empty">
          <h2>"No Movies Found"</h2>
        </div>
      )}
    </div>
  );
};

export default App;
