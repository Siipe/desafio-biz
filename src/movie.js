import moment from 'moment-timezone';

const validSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780'];

export default class Movie {
  constructor({
    id,
    title,
    original_title,
    release_date,
    popularity,
    overview,
    vote_count,
    poster_path,
    original_language,
    genre_ids,
    vote_average,
  }) {
    this.id = id;
    this.title = title;
    this.originalTitle = original_title;
    this.releaseDate = moment(release_date);
    this.popularity = popularity;
    this.overview = overview;
    this.voteCount = vote_count;
    this.posterPath = poster_path;
    this.originalLanguage = original_language;
    this.genreIds = genre_ids;
    this.voteAverage = vote_average;
  }

  /**
   * Checks whether the movie has a poster path
   * @returns {Boolean}
   */
  hasPoster() {
    return Boolean(this.posterPath);
  }

  /**
   * Formats the release date with given pattern
   * @param {string} pattern
   * @returns {string}
   */
  getFormattedDate(pattern = 'DD/MM/YYYY') {
    return this.releaseDate.format(pattern);
  }

  /**
   * Concatenates the given size and the path for downloading the movie poster
   * @param {string} size
   * @returns {string|null}
   */
  getImagePathWithSize(size = 'w92') {
    if (!this.hasPoster()) {
      return null;
    }
    const validSize = validSizes.includes(size) ? size : 'w92';
    return `${validSize}${this.posterPath}`;
  }
}
