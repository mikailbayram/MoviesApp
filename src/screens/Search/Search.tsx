import React, {useEffect, useState, useCallback} from 'react';
import {TextInput, FlatList, Text, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Screen} from '../../components/Screen';
import {MovieItem} from '../../components/MovieItem';

import {IScreenProps, IMovie} from '../../util/interfaces';
import {searchMovies} from '../../util/api';
import {debounce, filter} from 'lodash';

import {getFilteredMovies as getPersistedFilteredMovies} from '../../services/persistor';

import {styles} from './styles';

export const Search: React.FC<IScreenProps> = ({navigation}) => {
  const [results, setResults] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<{
    [key: string]: IMovie;
  }>({});

  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      getUnsearchableMovies();
    }, []),
  );

  const getUnsearchableMovies = async () => {
    const persistedFilteredMovies = await getPersistedFilteredMovies();

    setFilteredMovies(persistedFilteredMovies);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const {results} = await searchMovies('Spider Man');

      if (results.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }

      await getUnsearchableMovies();
      setLoading(false);
    }

    fetchData();
  }, []);

  const getSearchResults = async (queryText: string) => {
    if (queryText.length) {
      setLoading(true);
      const {results} = await searchMovies(queryText);
      if (results.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      const filteredResults = results.filter(item => {
        return !filteredMovies[item.id];
      });
      setResults(filteredResults);
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((queryText: string) => {
      getSearchResults(queryText);
    }, 500),
    [filteredMovies],
  );

  const handleTextChange = (text: string) => {
    debouncedSearch(text);
    setQuery(text);
  };

  const toMovie = (movie: IMovie) => {
    navigation.navigate('Movie', {movie});
  };

  return (
    <Screen>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie ..."
        returnKeyType={'search'}
        onChangeText={handleTextChange}
        value={query}
      />
      {loading ? (
        <ActivityIndicator size={30} style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={results}
          renderItem={({item}) => <MovieItem movie={item} toMovie={toMovie} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() =>
            isEmpty ? <Text>No search results found</Text> : null
          }
        />
      )}
    </Screen>
  );
};
