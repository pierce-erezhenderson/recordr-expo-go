import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { API_URL } from './services/apiService'; 
import * as SplashScreen from 'expo-splash-screen';

// Screens
import RecognizeScreen from './screens/RecognizeScreen.jsx';

// Contexts
import { RecognizeProvider } from "./utils/RecognizeContext.jsx";
import { SuccessProvider } from "./utils/SuccessContext.jsx";
import { LoadingProvider } from "./utils/LoadingContext.jsx";


const Stack = createStackNavigator();
console.log('App started. API_URL:', API_URL);
SplashScreen.preventAutoHideAsync();


export default function App() {        // get rid of this it's not doing much!
  
  const [loaded, error] = useFonts({
    'SuisseScreen-Regular': require('./assets/SuisseScreen-Regular.ttf'),
    'SuisseScreen-Bold': require('./assets/SuisseScreen-Bold.ttf'),
    'SuisseWorks-Bold': require('./assets/SuisseWorks-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

    return (
      <RecognizeProvider>
        <SuccessProvider>
          <LoadingProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="Recognize">
                      <Stack.Screen 
                          name="Recognize" 
                          component={RecognizeScreen} 
                          options={{ headerShown: false}}
                      />
                  </Stack.Navigator>
              </NavigationContainer>
          </LoadingProvider>
        </SuccessProvider>
      </RecognizeProvider>
  );
}

