/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UsersScreen from './src/screens/UsersScreen';
import WebviewScreen from './src/screens/WebviewScreen';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';




const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'rgba(255,255,255,0.0)'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen
            name="LoginScreen"
            options={{
              headerShown: false
            }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="HomeScreen"
            options={{
              headerShown: false
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="UsersScreen"
            options={{
              headerShown: false
            }}
            component={UsersScreen}
          />
          <Stack.Screen
            name="WebviewScreen"
            options={{
              headerShown: false
            }}
            component={WebviewScreen}
          />
        
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;