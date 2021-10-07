import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  movieItemWrapper: {flex: 1 / 3, height: 150, margin: 5},
  movieItem: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    justifyContent: 'flex-end',
  },
  movieTitle: {fontWeight: 'bold', color: '#fff', fontSize: 12},
  error: {
    backgroundColor: '#ff6766',
    padding: 20,
    borderRadius: 6,
  },
  errorTitle: {fontSize: 18, fontWeight: 'bold'},
});
