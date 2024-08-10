import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';
import './css/FavoritesPage.css';
import { useIntl } from 'react-intl';

const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

function FavoritesPage() {
  const { formatMessage } = useIntl();
  const [favorites, setFavorites] = useState(getFavorites());

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'favorites') {
        setFavorites(getFavorites());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="no-favorites">
        <FaRegSadTear size={100} />
        <p>{formatMessage({ id: 'noFavoriteMovies' })}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{formatMessage({ id: 'favoriteMovies' })}</h1>
      <div className="row">
        {favorites.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{truncateOverview(movie.title, 25)}</h5>
                <p className="card-text">{truncateOverview(movie.overview, 50)}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">{formatMessage({ id: 'viewDetails' })}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function truncateOverview(overview, maxLength) {
  if (overview.length <= maxLength) {
    return overview;
  } else {
    return overview.substring(0, maxLength) + '...';
  }
}

export default FavoritesPage;
