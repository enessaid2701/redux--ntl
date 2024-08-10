import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../api/tmdbApi';
import { useIntl } from 'react-intl';

const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

const addFavorite = (movie) => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, movie];
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event('storage'));
};

const removeFavorite = (movieId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event('storage'));
};

const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some(movie => movie.id === movieId);
};

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieData = await fetchMovieById(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    getMovie();
  }, [id]);

  if (!movie) return <div>{formatMessage({ id: 'loading' })}</div>;

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setMovie({ ...movie });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid"
            alt={movie.title}
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>
            <strong>{formatMessage({ id: 'releaseDate' })}:</strong> {movie.release_date}
          </p>
          <p>
            <strong>{formatMessage({ id: 'rating' })}:</strong> {movie.vote_average}
          </p>
          <button 
            className={`btn ${isFavorite(movie.id) ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite(movie.id) ? formatMessage({ id: 'removeFromFavorites' }) : formatMessage({ id: 'addToFavorites' })}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
