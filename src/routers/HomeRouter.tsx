import * as React from 'react';
import {Pressable} from 'react-native';

import {IRouterProps} from '../util/interfaces';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

import {MoviesList} from '../screens/MoviesList';
import {Movie} from '../screens/Movie';
import {Search} from '../screens/Search/Search';

export const HomeRouter: React.FC<IRouterProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesList"
        component={MoviesList}
        options={({navigation, route}) => ({
          headerTitleAlign: 'center',
          headerTitle: 'Movies',
          headerRight: () => {
            return (
              <Pressable
                hitSlop={25}
                onPress={() => navigation.navigate('Search')}
                style={{marginRight: 20}}>
                <FontAwesome5
                  name="search"
                  size={25}
                  color="black"
                  solid={false}
                />
              </Pressable>
            );
          },
        })}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{headerTitleAlign: 'center', headerTitle: 'Movie'}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerTitleAlign: 'center', headerTitle: 'Search'}}
      />
    </Stack.Navigator>
  );
};
