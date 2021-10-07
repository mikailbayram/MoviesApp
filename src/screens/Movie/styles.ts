import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  movieItemWrapper: {height: 200},
  movieItem: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    justifyContent: 'flex-end',
  },
  movieTitle: {fontWeight: 'bold', color: '#fff', fontSize: 18},
  overview: {
    marginTop: 20,
    fontSize: 14,
  },
  actionItemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2,
  },
  actionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItemWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
    minWidth: 80,
  },
  actionItemText: {
    fontSize: 10,
  },
});
