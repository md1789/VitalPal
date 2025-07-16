import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import Button from '../ui/Button';

interface OnboardingScreenProps {
  onNext: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext }) => {
  return (
    <LinearGradient
      colors={[Colors.primary[500], Colors.secondary[500]]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="heart" size={48} color="white" />
        </View>
        <Text style={styles.title}>VitalPal</Text>
        <Text style={styles.subtitle}>Your AI-powered wellness companion</Text>
        <Text style={styles.description}>
          Personalized wellness plans, smart tracking, and a supportive community to help you achieve your health goals.
        </Text>
        <Button onPress={onNext} style={styles.startButton}>
          Get Started
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 320,
    alignSelf: 'center',
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontSize: 16,
  },
  startButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default OnboardingScreen;