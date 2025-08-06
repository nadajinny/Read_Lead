import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './src/components/Header';
import Home from './src/screens/Home';
import BookSearch from './src/screens/BookSearch';
import LocationMap from './src/screens/LocationMap';
import TravelDiary from './src/screens/TravelDiary';
import CulturalEvents from './src/screens/CulturalEvents';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <Header />
          <View style={styles.content}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="BookSearch" component={BookSearch} />
              <Stack.Screen name="LocationMap" component={LocationMap} />
              <Stack.Screen name="TravelDiary" component={TravelDiary} />
              <Stack.Screen name="CulturalEvents" component={CulturalEvents} />
            </Stack.Navigator>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  content: {
    flex: 1,
  },
});
