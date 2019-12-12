import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import YelpDetails from './screens/YelpDetails'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  
  },

  YelpDetail: YelpDetails

}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#CD1305', fontColor: '#FFFFFF' },
    headerTintColor: '#FFFFFF'
  }
})

export default createAppContainer(AppNavigator)