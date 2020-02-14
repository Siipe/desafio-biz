import axios from 'axios';
import nprogress from 'nprogress';
import Movie from './movie';

const baseURL = process.env.VUE_APP_BASE_URL;
const apiKey = process.env.VUE_APP_API_KEY;

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  nprogress.start();
  const params = config.params || new URLSearchParams();
  params.set('api_key', apiKey);
  config.params = params;
  return config;
}, (error) => {
  nprogress.done();
  return Promise.reject(error);
});

instance.interceptors.response.use((config) => {
  nprogress.done();
  return config;
}, (error) => {
  nprogress.done();
  return Promise.reject(error);
});


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
  const response = await instance.get('movie/popular');
  response.data.results = prepareMovieObjects(response.data.results);
  return response.data;
}

/**
 * Searches for movies by the given params
 * @returns {object}
 */
const search = async (params) => {
  const response = await instance.get('search/movie', { params });
  response.data.results = prepareMovieObjects(response.data.results);
  return response.data;
}

const getLanguages = async () => {
  const response = await instance.get('configuration/languages');
  return response.data;
};

export default {
  prepareMovieObjects,
  getPopular,
  search,
  getLanguages,
};
