import React from 'react';
import {StatusBar, View, SafeAreaView, StyleSheet} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Screen: React.FC<Props> = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" translucent />
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    paddingBottom: 0,
    height: '100%',
  },
});
