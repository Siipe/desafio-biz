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
    favorite,
  }) {
    this.id = id;
    this.title = title;
    this.original_title = original_title;
    this.release_date = moment(release_date);
    this.popularity = popularity;
    this.overview = overview;
    this.vote_count = vote_count;
    this.poster_path = poster_path;
    this.original_language = original_language;
    this.genre_ids = genre_ids;
    this.vote_average = vote_average;
    this.favorite = Boolean(favorite);
  }

  /**
   * Checks whether the movie has a poster path
   * @returns {Boolean}
   */
  get hasPoster() {
    return Boolean(this.poster_path);
  }

  /**
   * Formats the release date with given pattern
   * @param {string} pattern
   * @returns {string}
   */
  getFormattedDate(pattern = 'DD/MM/YYYY') {
    return this.release_date.format(pattern);
  }

  /**
   * Concatenates the given size and the path for downloading the movie poster
   * @param {string} size
   * @returns {string|null}
   */
  getImagePathWithSize(size = 'w154') {
    if (!this.hasPoster) {
      return null;
    }
    const validSize = validSizes.includes(size) ? size : 'w154';
    return `${validSize}${this.poster_path}`;
  }
}
