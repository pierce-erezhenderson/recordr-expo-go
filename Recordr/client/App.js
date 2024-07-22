import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { RecognizeProvider } from './utils/RecognizeContext.jsx';
import RecognizeScreen from './screens/RecognizeScreen.jsx';
import { RecognizeProvider } from "./utils/RecognizeContext.jsx";
import { SuccessProvider } from "./utils/SuccessContext.jsx";
import { API_URL } from './services/apiService'; 
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

console.log('App started. API_URL:', API_URL);


export default function App() {        // get rid of this it's not doing much!
    
    let [fontsLoaded] = useFonts({
        'SuisseScreen-Regular': require('./assets/SuisseScreen-Regular.ttf'),
        'SuisseScreen-Bold': require('./assets/SuisseScreen-Bold.ttf'),
        'SuisseWorks-Bold': require('./assets/SuisseWorks-Bold.ttf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    
    return (
        <RecognizeProvider>
          <UI />
        </RecognizeProvider>
      );
    }

function UI() {

    return (
        <RecognizeProvider>
          <SuccessProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="Recognize">
                      <Stack.Screen 
                          name="Recognize" 
                          component={RecognizeScreen} 
                          options={{ headerShown: false}}
                      />
                  </Stack.Navigator>
              </NavigationContainer>
          </SuccessProvider>
        </RecognizeProvider>
  );
}

