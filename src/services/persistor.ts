import AsyncStorage from '@react-native-async-storage/async-storage';

import {IMovie} from '../util/interfaces';

const FAVORITES_KEY = 'favorites';
const FILTERED_MOVIES_KEY = 'filtered_movies';

export const addToFavorites = async (movie: IMovie) => {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  if (value !== null) {
    const favorites = JSON.parse(value);
    favorites[movie.id] = movie;
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } else {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify({[movie.id]: movie}),
    );
  }
};

export const removeFromFavorites = async (movie: IMovie) => {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  if (value !== null) {
    const favorites = JSON.parse(value);
    delete favorites[movie.id];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const getFromFavorites = async (movieId: string) => {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  const favorites = JSON.parse(value || '{}');

  return favorites[movieId];
};

export const getFavorites = async () => {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  const favorites = JSON.parse(value || '{}');

  return favorites;
};

export const addToFilteredMovies = async (movie: IMovie) => {
  const value = await AsyncStorage.getItem(FILTERED_MOVIES_KEY);
  if (value !== null) {
    const filteredMovies = JSON.parse(value);
    filteredMovies[movie.id] = movie;
    await AsyncStorage.setItem(
      FILTERED_MOVIES_KEY,
      JSON.stringify(filteredMovies),
    );
  } else {
    await AsyncStorage.setItem(
      FILTERED_MOVIES_KEY,
      JSON.stringify({[movie.id]: movie}),
    );
  }
};

export const removeFromFilteredMovies = async (movie: IMovie) => {
  const value = await AsyncStorage.getItem(FILTERED_MOVIES_KEY);
  if (value !== null) {
    const filteredMovies = JSON.parse(value);
    delete filteredMovies[movie.id];
    await AsyncStorage.setItem(
      FILTERED_MOVIES_KEY,
      JSON.stringify(filteredMovies),
    );
  }
};

export const getFromFilteredMovies = async (movieId: string) => {
  const value = await AsyncStorage.getItem(FILTERED_MOVIES_KEY);
  const filteredMovies = JSON.parse(value || '{}');

  return filteredMovies[movieId];
};

export const getFilteredMovies = async () => {
  const value = await AsyncStorage.getItem(FILTERED_MOVIES_KEY);
  const filteredMovies = JSON.parse(value || '{}');

  return filteredMovies;
};
