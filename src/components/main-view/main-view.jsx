import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A skilled thief, who steals corporate secrets through dream-sharing technology, is given a chance to have his past crimes forgiven if he can implant another person's idea into their subconscious.",
      posterImage: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRqhsSA3e6Kw-EAbjneujrnhXKq7Ugl5L5Wh0yyLC92qimzfJw",
      genre: "Sci-Fi",
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American filmmaker known for his complex storytelling and psychological depth. He is regarded as one of the most innovative and influential directors in modern cinema.",
        birthYear: 1970,
        deathYear: null,
      },
    },
    {
      id: 2,
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      posterImage: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRsh_qdacnVvke0oo237dKnhGVpAelf8TElc6fSuhQaBlFIITew",
      genre: "Crime",
      director: {
        name: "Francis Ford Coppola",
        bio: "Francis Ford Coppola is an American director, producer, and screenwriter, known for his work on 'The Godfather' series. He is a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.",
        birthYear: 1939,
        deathYear: null,
      },
    },
    {
      id: 3,
      title: "Spirited Away",
      description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      posterImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlyek7tCF3dXq_2y6E5NGajum2a_s8clAIu6WrdOxsO_Drmi04",
      genre: "Fantasy",
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki is a Japanese film director, producer, screenwriter, animator, author, and manga artist. A co-founder of Studio Ghibli, he is widely regarded as one of the most accomplished filmmakers in animation history.",
        birthYear: 1941,
        deathYear: null,
      },
    },
  ]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>
  );
};