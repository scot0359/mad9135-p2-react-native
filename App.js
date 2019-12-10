import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  
  },

}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: 'hsl(220, 100%, 80%)' }
  }
})

export default createAppContainer(AppNavigator)

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Home />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
