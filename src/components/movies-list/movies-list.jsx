import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../movie-card/moviecard";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const dispatch = useDispatch();

    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(filter)
  );

  const favoriteMoviesList = movies.filter((m) => favoriteMovies.includes(m._id)) || [];


  const handleAddFavorite = (movieId) => {
    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      setFavoriteMovies(data.FavoriteMovies || []);
    })
    .catch((error) => console.error("Error adding to favorites", error));
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      setFavoriteMovies(data.FavoriteMovies);
    })
    .catch((error) => console.error("Error removing from favorites", error));
  };
  

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie}
              isFavorite={favoriteMovies.includes(movie._id)}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite} />
            </Col>
          ))
        )}
      </Row>
     </>
    );
};