import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext, onSkip }) => {
  const handleGetStarted = () => {
    onNext();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary[500], Colors.secondary[500]]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary[600]} />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="heart" size={48} color="white" />
        </View>
        
        <Text style={styles.title}>VitalPal</Text>
        <Text style={styles.subtitle}>Your AI-powered wellness companion</Text>
        
        <Text style={styles.description}>
          Personalized wellness plans, smart tracking, and a supportive community to help you achieve your health goals.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="analytics" size={24} color="white" style={styles.featureIcon} />
            <Text style={styles.featureText}>Smart Health Analytics</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="people" size={24} color="white" style={styles.featureIcon} />
            <Text style={styles.featureText}>Supportive Community</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="trophy" size={24} color="white" style={styles.featureIcon} />
            <Text style={styles.featureText}>Achievement Tracking</Text>
          </View>
        </View>
        
        <Button onPress={handleGetStarted} style={styles.startButton}>
          <Text style={styles.startButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.primary[600]} style={styles.buttonIcon} />
        </Button>
        
        {onSkip && (
          <Text style={styles.skipText} onPress={handleSkip}>
            Skip for now
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  description: {
    color: Colors.white,
    opacity: 0.85,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    fontSize: 17,
    maxWidth: width * 0.8,
  },
  featuresContainer: {
    marginBottom: 50,
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    marginRight: 16,
    opacity: 0.9,
  },
  featureText: {
    color: Colors.white,
    fontSize: 16,
    opacity: 0.9,
    fontWeight: '500',
  },
  startButton: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: Colors.primary[600],
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  skipText: {
    color: Colors.white,
    fontSize: 16,
    opacity: 0.8,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default OnboardingScreen;