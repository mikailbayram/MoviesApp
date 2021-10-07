import {IApi} from './interfaces';
import {API_URL, API_KEY} from './contants';

const defaultQuery: {[key: string]: string} = {
  language: 'en-US',
  api_key: API_KEY,
};

const queryString = (obj: {[key: string]: string}): string => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
};

const API: IApi = {
  movies: '/movie/popular',
  search: '/search/movie',
};

export const fetchMovies = async (page: number) => {
  const response = await fetch(
    `${API_URL}${API.movies}?${queryString({
      ...defaultQuery,
      page: page.toString(),
    })}`,
  ).then(res => res.json());

  if (!response.success && !response.results) {
    throw response;
  }

  return response;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${API_URL}${API.search}?${queryString({
      ...defaultQuery,
      query,
    })}`,
  ).then(res => res.json());

  if (!response.success && !response.results) {
    throw response;
  }

  return response;
};
