import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import {MoviesListItem} from './MovieListItem';
import {Screen} from '../../components/Screen';

import {IScreenProps, IMovie} from '../../util/interfaces';

import {fetchMovies} from '../../util/api';
import {styles} from './styles';

export const MoviesList: React.FC<IScreenProps> = ({navigation}) => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const {results} = await fetchMovies(page);
        setMovies(currentMovies =>
          page > 1 ? [...currentMovies, ...results] : results,
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const toMovie = (movie: IMovie) => {
    navigation.navigate('Movie', {movie});
  };

  return (
    <Screen>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviesListItem movie={item} toMovie={toMovie} />
        )}
        ListHeaderComponent={() => {
          if (movies.length === 0 && error) {
            return (
              <View style={styles.error}>
                <Text style={styles.errorTitle}>An error occured</Text>
                <Text>Try pulling down to retry</Text>
              </View>
            );
          } else {
            return null;
          }
        }}
        keyExtractor={item => item.id}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => setPage(currentPage => currentPage + 1)}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={() => setPage(1)}
      />
    </Screen>
  );
};
