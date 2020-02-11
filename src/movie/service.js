import axios from 'axios';
import Movie from './movie';

const baseURL = 'https://api.themoviedb.org/3/';
const apiKey = '712d3949e81088a58139e11a6bf5c14f';

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const params = config.params || new URLSearchParams();
  params.set('api_key', apiKey);
  config.params = params;
  return config;
}, (error) => Promise.reject(error));

/**
 * Converts each retrieved movie to an instance of the Movie class
 * @param {array} movies
 * @returns {Movie[]}
 */
const prepareMovieObjects = (movies = []) => {
  return movies.map((movie) => new Movie(movie))
}

/**
 * Searches for most popular movies
 * @returns {object}
 */
const getPopular = async () => {
  const result = await instance.get('movie/popular');
  result.data.results = prepareMovieObjects(result.data.results);
  return result.data;
}

/**
 * Searches for movies by the given params
 * @returns {object}
 */
const search = async (params) => {
  const result = await instance.get('search/movie', { params });
  result.data.results = prepareMovieObjects(result.data.results);
  return result.data;
}

export default {
  getPopular,
  search,
  prepareMovieObjects,
};
