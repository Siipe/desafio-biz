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

const prepareMovieObjects = (data) => {
  const newData = data;
  newData.results = newData.results.map((movie) => new Movie(movie));
  return newData;
}

const getPopular = async () => {
  const result = await instance.get('movie/popular');
  return prepareMovieObjects(result.data);
}

const search = async () => {
  const params = new URLSearchParams({ query: 'John Wick' });
  const result = await instance.get('search/movie', { params });
  return prepareMovieObjects(result.data);
}

export default {
  getPopular,
  search,
};
