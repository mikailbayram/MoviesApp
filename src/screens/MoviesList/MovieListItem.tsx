import React from 'react';
import {View, Text, ImageBackground, Pressable} from 'react-native';

import {IMovie} from '../../util/interfaces';
import {generateImageUrl} from '../../util/generateImageUrl';

import {styles} from './styles';

export const MoviesListItem: React.FC<{
  movie: IMovie;
  toMovie(movie: IMovie): void;
}> = ({movie, toMovie}) => {
  return (
    <Pressable style={styles.movieItemWrapper} onPress={() => toMovie(movie)}>
      <ImageBackground source={generateImageUrl(movie.poster_path)}>
        <View style={styles.movieItem}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
