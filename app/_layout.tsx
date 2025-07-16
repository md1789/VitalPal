import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from '../components/screens/OnboardingScreen';
import QuestionnaireScreen from '../components/screens/QuestionnaireScreen';
import { Colors } from '../constants/Colors';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { UserAnswers } from '../types';
import AuthScreen from './auth';

type ScreenType = 'auth' | 'onboarding' | 'questionnaire' | 'main';

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('auth');
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has completed onboarding before
  useEffect(() => {
    checkOnboardingStatus();
  }, [user]);

  const checkOnboardingStatus = async () => {
    try {
      if (user) {
        // User is authenticated, check onboarding status
        const hasCompletedOnboarding = await AsyncStorage.getItem(`hasCompletedOnboarding_${user.uid}`);
        const savedUserAnswers = await AsyncStorage.getItem(`userAnswers_${user.uid}`);
        
        if (hasCompletedOnboarding === 'true') {
          setCurrentScreen('main');
          if (savedUserAnswers) {
            setUserAnswers(JSON.parse(savedUserAnswers));
          }
        } else {
          setCurrentScreen('onboarding');
        }
      } else {
        // User is not authenticated, show auth screen
        setCurrentScreen('auth');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setCurrentScreen(user ? 'onboarding' : 'auth');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('questionnaire');
  };

  const handleOnboardingSkip = async () => {
    try {
      if (user) {
        await AsyncStorage.setItem(`hasCompletedOnboarding_${user.uid}`, 'true');
        setCurrentScreen('main');
      }
    } catch (error) {
      console.error('Error saving onboarding skip:', error);
    }
  };

  const handleQuestionnaireComplete = async (answers: UserAnswers) => {
    try {
      setUserAnswers(answers);
      if (user) {
        await AsyncStorage.setItem(`hasCompletedOnboarding_${user.uid}`, 'true');
        await AsyncStorage.setItem(`userAnswers_${user.uid}`, JSON.stringify(answers));
      }
      setCurrentScreen('main');
    } catch (error) {
      console.error('Error saving questionnaire answers:', error);
    }
  };

  // Show loading spinner while checking auth state
  if (authLoading || isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray[50]
      }}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen />;
      case 'onboarding':
        return (
          <OnboardingScreen 
            onNext={handleOnboardingComplete}
          />
        );
      case 'questionnaire':
        return <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />;
      case 'main':
        return <Stack screenOptions={{ headerShown: false }} />;
      default:
        return <AuthScreen />;
    }
  };

  return renderScreen();
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}