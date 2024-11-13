import { useEffect, useState } from "react";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://vanessamovieapi-02068b25de4f.herokuapp.com/movies",  {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((moviesFromApi) => {
       dispatch(setMovies(moviesFromApi));
    });
  }, [token, dispatch]);

    return (
      <BrowserRouter>
        <NavigationBar 
          user={user}
          token={token}
          onLoggedOut={() => {
            dispatch(setUser(null));
            setToken(null);
            localStorage.clear();
          }}
        />
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/users"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
      />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                  dispatch(setUser(user));
                  setToken(token);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                }} /> 
              </Col>
            )
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies} />
              </Col>
            )
          }
        />
        <Route
          path="/users/${user.Username}"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col md={8}>
                <ProfileView 
                  user={user}
                  token={localStorage.getItem("token")}
                  movies={movies}
                  setUser={(updatedUser) => dispatch(setUser(updatedUser))}
                />
              </Col>
            )
          }
          />
        <Route 
          path="/"
          element={
            <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
          }
        />
      </Routes>
    </Row>
  </BrowserRouter>
);
};