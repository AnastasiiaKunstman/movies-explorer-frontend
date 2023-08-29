import { useState, useEffect } from 'react';

function useMoviesFilter(movies, str, checked = false) {
  const [filteredMovies, setFilteredMovies] = useState();

  useEffect(() => {
    const newMovies = [...movies].filter((movie) => {
      const nameFilter =
        movie.nameEN.toLowerCase().includes(str.toLowerCase().trim()) ||
        movie.nameRU.toLowerCase().includes(str.toLowerCase().trim());

      if (checked) {
        return nameFilter && movie.duration <= 40;
      }

      return nameFilter;
    });
    setFilteredMovies(newMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  return { filteredMovies };
};

export default useMoviesFilter;
