import React, {useCallback, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {MovieItem} from '../components/MovieItem';
import {Screen} from '../components/Screen';

import {getFavorites as getPersistedFavorites} from '../services/persistor';

import {IMovie, IScreenProps} from '../util/interfaces';

export const Favorites: React.FC<IScreenProps> = ({navigation, route}) => {
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const getFavorites = async () => {
    const favoritesObj = await getPersistedFavorites();
    const results = Object.keys(favoritesObj).map(item => favoritesObj[item]);

    setFavorites(results);
  };

  const toMovie = (movie: IMovie) => {
    navigation.push('FavoriteMovie', {movie});
  };

  return (
    <Screen>
      <FlatList
        data={favorites}
        renderItem={({item}) => <MovieItem movie={item} toMovie={toMovie} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No movies in favorites found</Text>}
      />
    </Screen>
  );
};
