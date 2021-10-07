import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeRouter} from './routers/HomeRouter';
import {FavoritesRouter} from './routers/FavoritesRouter';

import NetInfo from '@react-native-community/netinfo';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen
            name="FavoritesRouter"
            component={FavoritesRouter}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({focused}) => {
                return (
                  <FontAwesome5
                    name="heart"
                    size={24}
                    color={focused ? 'red' : '#8e8e93'}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="HomeRouter"
            component={HomeRouter}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({focused}) => {
                return (
                  <FontAwesome5
                    name="film"
                    size={24}
                    color={focused ? 'blue' : '#8e8e93'}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      {!isConnected && (
        <View style={styles.noInternetWrapper}>
          <FontAwesome5 name="wifi" size={75} />

          <Text style={styles.noInternetText}>
            Please check your Internet connection
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noInternetWrapper: {
    position: 'absolute',
    zIndex: 2,
    bottom: 50,
    width: '90%',
    marginLeft: '5%',
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 6,
    padding: 20,
  },
  noInternetText: {flexShrink: 1, marginLeft: 10},
});

export default App;
