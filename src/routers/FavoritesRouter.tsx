import * as React from 'react';

import {IRouterProps} from '../util/interfaces';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {Favorites} from '../screens/Favorites';
import {Movie} from '../screens/Movie';

export const FavoritesRouter: React.FC<IRouterProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Favorites',
        }}
      />
      <Stack.Screen
        name="FavoriteMovie"
        component={Movie}
        options={{headerTitleAlign: 'center', headerTitle: 'Movie'}}
      />
    </Stack.Navigator>
  );
};
