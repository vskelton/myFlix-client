import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies, user, token, onLoggedOut }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setUsername(data.Username);
          setEmail(data.Email);
          setBirthday(data.Birthday);
          setFavoriteMovies(data.FavoriteMovies || []);
        })
        .catch((error) => console.error("Error fetching user data", error));
    }
  }, [user, token]);

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile");
        }
      })
      .catch((error) => console.error("Error updating profile", error));
  };

  const handleDelete = () => {
    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          onLoggedOut();
          navigate("/");
        } else {
          alert("Failed to delete the profile");
        }
      })
      .catch((error) => console.error("Error deleting profile:", error));
  };

  const favoriteMoviesList = movies.filter((m) => favoriteMovies.includes(m._id));

  const handleAddFavorite = (movieId) => {
    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies);
      })
      .catch((error) => console.error("Error adding to favorites", error));
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://vanessamovieapi-02068b25de4f.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies);
      })
      .catch((error) => console.error("Error removing from favorites", error));
  };

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="profile-view">
      <h3>Profile Details</h3>
      <p>Username: {userData.Username}</p>
      <p>Email: {userData.Email}</p>
      <p>Birthday: {userData.Birthday}</p>

      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="updateUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="updatePassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="updateEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="updateBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>

      <Button variant="danger" onClick={handleDelete}>
        Delete Profile
      </Button>

      <h3>Favorite Movies</h3>
      {favoriteMoviesList.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <ul>
          {favoriteMoviesList.map((movie) => (
            <li key={movie._id}>
              <MovieCard
                movie={movie}
                isFavorite={favoriteMovies.includes(movie._id)}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
