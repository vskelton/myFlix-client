export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={movie.posterImage} alt={movie.title} />
    </div>
  );
};
