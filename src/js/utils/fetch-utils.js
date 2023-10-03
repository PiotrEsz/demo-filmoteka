export function getFilteredMovies(arr, genres) {
  return arr.map(result => {
    const arrayOfGenresName = result.genre_ids.map(
      id => genres.find(genre => genre.id === id).name
    );
    return {
      ...result,
      allGenres: arrayOfGenresName.join(', '),
      previewGenres: `${arrayOfGenresName.slice(0, 2).join(', ')}${
        arrayOfGenresName.length > 2 ? `, ...` : ''
      }`,
    };
  });
}