import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {IMovie} from '../util/interfaces';
import {generateImageUrl} from '../util/generateImageUrl';

export const MovieItem: React.FC<{
  movie: IMovie;
  toMovie(movie: IMovie): void;
}> = ({movie, toMovie}) => {
  return (
    <Pressable style={styles.wrapper} onPress={() => toMovie(movie)}>
      <Image
        source={generateImageUrl(movie.poster_path)}
        style={styles.movieItemImage}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {movie.overview}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    width: Dimensions.get('window').width - 100,
  },
  movieItemImage: {width: 75, height: 75, borderRadius: 6},
  textWrapper: {
    marginLeft: 10,
    padding: 5,
  },
});
