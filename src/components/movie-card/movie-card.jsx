import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
    onClick={() => {
      onMovieClick(movie);
    }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.proptypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
