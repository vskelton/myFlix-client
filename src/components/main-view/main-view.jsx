import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://vanessamovieapi-02068b25de4f.herokuapp.com/movies",  {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((moviesFromApi) => {
       setMovies(moviesFromApi);
    });
  }, [token]);

    return (
      <BrowserRouter>
        <NavigationBar 
          user={user}
          token={token}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/users"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
              </>
            }
      />
      <Route
        path="/login"
        element={
          <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                localStorage.setItme("user", JSON.stringify(user));
                localStorage.setItem("token", token);
              }} /> 
            </Col>
          )}
          </>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <Col md={8}>
              <MovieView movies={movies} />
            </Col>
          )}
          </>
        }
        />
        <Route 
        path="/"
        element={
          <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie._id} md={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
            </>
          )}
          </>
        }
        />
        </Routes>
      </Row>
    </BrowserRouter>
  );
  };