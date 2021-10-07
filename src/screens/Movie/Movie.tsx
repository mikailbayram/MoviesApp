import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, View, Pressable} from 'react-native';

import {Screen} from '../../components/Screen';

import {IScreenProps} from '../../util/interfaces';
import {generateImageUrl} from '../../util/generateImageUrl';

import {
  getFromFavorites,
  addToFavorites as persistAddToFavorites,
  removeFromFavorites as persistRemoveFromFavorites,
  getFromFilteredMovies,
  addToFilteredMovies as persistAddToFilteredMovies,
  removeFromFilteredMovies as persistRemoveFromFilteredMovies,
} from '../../services/persistor';

import {styles} from './styles';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Movie: React.FC<IScreenProps> = ({route}) => {
  const {movie} = route.params;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRemovedFromSearch, setIsRemovedFromSearch] =
    useState<boolean>(false);

  useEffect(() => {
    checkIsFavorite();
    checkIsRemovedFromSearch();
  }, []);

  const checkIsFavorite = async () => {
    try {
      const item = await getFromFavorites(movie.id);
      setIsFavorite(!!item);
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavorites = async () => {
    await persistAddToFavorites(movie);
    setIsFavorite(true);
  };

  const removeFromFavorites = async () => {
    await persistRemoveFromFavorites(movie);
    setIsFavorite(false);
  };

  const checkIsRemovedFromSearch = async () => {
    try {
      const item = await getFromFilteredMovies(movie.id);
      setIsRemovedFromSearch(!!item);
    } catch (err) {
      console.log(err);
    }
  };

  const addToFilteredMovies = async () => {
    await persistAddToFilteredMovies(movie);
    setIsRemovedFromSearch(true);
  };

  const removeFromFilteredMovies = async () => {
    await persistRemoveFromFilteredMovies(movie);
    setIsRemovedFromSearch(false);
  };

  return (
    <Screen>
      <ImageBackground
        source={generateImageUrl(movie.poster_path)}
        style={styles.movieItemWrapper}>
        <View style={styles.movieItem}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.overview}>{movie.overview}</Text>
      <View style={styles.actionItemsWrapper}>
        <View style={styles.ratingWrapper}>
          <FontAwesome5 name="star" size={30} color="#f4c518" solid />
          <Text style={styles.rating}>
            {movie.vote_average}/10 ({movie.vote_count})
          </Text>
        </View>
        <View style={styles.actionItems}>
          <Pressable
            style={styles.actionItemWrapper}
            onPress={isFavorite ? removeFromFavorites : addToFavorites}>
            <FontAwesome5
              name="heart"
              size={30}
              color={isFavorite ? 'red' : 'gray'}
              solid={isFavorite}
            />
          </Pressable>
          <Pressable
            style={styles.actionItemWrapper}
            onPress={
              isRemovedFromSearch
                ? removeFromFilteredMovies
                : addToFilteredMovies
            }>
            <FontAwesome5
              name="search-minus"
              size={30}
              color={isRemovedFromSearch ? 'blue' : 'gray'}
            />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
};
