import React from 'react';
import { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { API_URL } from './services/apiService'; 
import * as SplashScreen from 'expo-splash-screen';

// Screens
import RecognizeScreen from './screens/RecognizeScreen.jsx';

// UIs
import SignInScreen from './components/views/SignInView';
import SignUpScreen from './components/views/SignUpView';

// Contexts
import { RecognizeProvider } from "./utils/RecognizeContext.jsx";
import { SuccessProvider } from "./utils/SuccessContext.jsx";
import { LoadingProvider } from "./utils/LoadingContext.jsx";
import { AuthProvider, useAuth } from "./utils/AuthContext";

const Stack = createStackNavigator();
console.log('App started. API_URL:', API_URL);
SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen 
          name="Recognize" 
          component={RecognizeScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
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
    <AuthProvider>
      <RecognizeProvider>
        <SuccessProvider>
          <LoadingProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </LoadingProvider>
        </SuccessProvider>
      </RecognizeProvider>
    </AuthProvider>
  );
}