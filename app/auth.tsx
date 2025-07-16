import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    PhoneAuthProvider,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithCredential as signInWithPhoneCredential
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { auth } from '../config/firebase'; // Adjust path to your firebase config
import { Colors } from '../constants/Colors';

// For Google Sign-In
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// For Facebook Sign-In
import * as Facebook from 'expo-auth-session/providers/facebook';

WebBrowser.maybeCompleteAuthSession();

type AuthMode = 'signin' | 'signup' | 'phone' | 'forgot';

const AuthScreen: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Google Auth
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  // Facebook Auth
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: 'YOUR_FACEBOOK_APP_ID',
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token, access_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      handleSocialSignIn(credential, 'Google');
    }
  }, [googleResponse]);

  useEffect(() => {
    if (facebookResponse?.type === 'success') {
      const { access_token } = facebookResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      handleSocialSignIn(credential, 'Facebook');
    }
  }, [facebookResponse]);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (authMode === 'signin' || authMode === 'signup') {
      if (!email.trim() || !email.includes('@')) {
        newErrors.email = 'Valid email is required';
      }
      if (!password || password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (authMode === 'signup' && password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (authMode === 'phone') {
      if (!phoneNumber.trim() || phoneNumber.length < 10) {
        newErrors.phoneNumber = 'Valid phone number is required';
      }
    }

    if (authMode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        newErrors.email = 'Valid email is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (authMode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Signed in successfully!');
        router.push('/onboarding');
      } else if (authMode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
        router.push('/onboarding');
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Note: Phone auth requires additional setup with reCAPTCHA for web
      // and proper configuration for mobile platforms
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber}`;
      
      // This is a simplified version - you'll need to implement proper reCAPTCHA
      // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      // const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
      
      // For now, simulate the process
      Alert.alert('Phone Auth', 'Phone authentication would be implemented here with proper reCAPTCHA setup');
      
    } catch (error: any) {
      console.error('Phone auth error:', error);
      Alert.alert('Error', error.message || 'Phone authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerification = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter verification code');
      return;
    }

    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithPhoneCredential(auth, credential);
      Alert.alert('Success', 'Phone verified successfully!');
      router.push('/onboarding');
    } catch (error: any) {
      console.error('Phone verification error:', error);
      Alert.alert('Error', error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (credential: any, provider: string) => {
    setLoading(true);
    try {
      await signInWithCredential(auth, credential);
      Alert.alert('Success', `Signed in with ${provider} successfully!`);
      router.push('/onboarding');
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      Alert.alert('Error', error.message || `${provider} authentication failed`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent! Check your inbox.');
      setAuthMode('signin');
    } catch (error: any) {
      console.error('Password reset error:', error);
      Alert.alert('Error', error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case 'signin':
        return (
          <>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              error={errors.email}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />
            <Button 
              onPress={handleEmailAuth} 
              disabled={loading}
              style={styles.primaryButton}
            >
              {loading ? <ActivityIndicator color="white" /> : 'Sign In'}
            </Button>
          </>
        );

      case 'signup':
        return (
          <>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              error={errors.email}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.confirmPassword}
            />
            <Button 
              onPress={handleEmailAuth} 
              disabled={loading}
              style={styles.primaryButton}
            >
              {loading ? <ActivityIndicator color="white" /> : 'Create Account'}
            </Button>
          </>
        );

      case 'phone':
        return (
          <>
            {!showVerificationInput ? (
              <>
                <Input
                  label="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="+1 (555) 123-4567"
                  error={errors.phoneNumber}
                />
                <Button 
                  onPress={handlePhoneAuth} 
                  disabled={loading}
                  style={styles.primaryButton}
                >
                  {loading ? <ActivityIndicator color="white" /> : 'Send Verification Code'}
                </Button>
              </>
            ) : (
              <>
                <Input
                  label="Verification Code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder="Enter 6-digit code"
                />
                <Button 
                  onPress={handlePhoneVerification} 
                  disabled={loading}
                  style={styles.primaryButton}
                >
                  {loading ? <ActivityIndicator color="white" /> : 'Verify Code'}
                </Button>
              </>
            )}
          </>
        );

      case 'forgot':
        return (
          <>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              error={errors.email}
            />
            <Button 
              onPress={handleForgotPassword} 
              disabled={loading}
              style={styles.primaryButton}
            >
              {loading ? <ActivityIndicator color="white" /> : 'Reset Password'}
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[Colors.primary[500], Colors.secondary[500]]}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="heart" size={48} color="white" />
            </View>
            <Text style={styles.title}>VitalPal</Text>
            <Text style={styles.subtitle}>
              {authMode === 'signin' && 'Welcome back!'}
              {authMode === 'signup' && 'Create your account'}
              {authMode === 'phone' && 'Sign in with phone'}
              {authMode === 'forgot' && 'Reset your password'}
            </Text>
          </View>

          {/* Auth Form */}
          <Card style={styles.authCard}>
            {renderAuthForm()}

            {/* Social Auth Buttons */}
            {(authMode === 'signin' || authMode === 'signup') && (
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => googlePromptAsync()}
                    disabled={!googleRequest || loading}
                  >
                    <Ionicons name="logo-google" size={24} color="#DB4437" />
                    <Text style={styles.socialButtonText}>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => facebookPromptAsync()}
                    disabled={!facebookRequest || loading}
                  >
                    <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.phoneButton}
                  onPress={() => setAuthMode('phone')}
                  disabled={loading}
                >
                  <Ionicons name="call" size={20} color={Colors.primary[500]} />
                  <Text style={styles.phoneButtonText}>Sign in with Phone</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Auth Mode Switchers */}
            <View style={styles.authSwitcher}>
              {authMode === 'signin' && (
                <>
                  <TouchableOpacity onPress={() => setAuthMode('signup')}>
                    <Text style={styles.switcherText}>
                      Don't have an account? <Text style={styles.switcherLink}>Sign up</Text>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setAuthMode('forgot')}>
                    <Text style={styles.switcherLink}>Forgot password?</Text>
                  </TouchableOpacity>
                </>
              )}

              {authMode === 'signup' && (
                <TouchableOpacity onPress={() => setAuthMode('signin')}>
                  <Text style={styles.switcherText}>
                    Already have an account? <Text style={styles.switcherLink}>Sign in</Text>
                  </Text>
                </TouchableOpacity>
              )}

              {(authMode === 'phone' || authMode === 'forgot') && (
                <TouchableOpacity onPress={() => setAuthMode('signin')}>
                  <Text style={styles.switcherLink}>Back to sign in</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>

          {/* Guest Access */}
          <TouchableOpacity 
            style={styles.guestButton}
            onPress={() => router.push('/onboarding')}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  authCard: {
    marginBottom: 20,
  },
  primaryButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray[300],
  },
  dividerText: {
    marginHorizontal: 15,
    color: Colors.gray[600],
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    gap: 8,
    marginBottom: 20,
  },
  phoneButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary[600],
  },
  authSwitcher: {
    alignItems: 'center',
    gap: 10,
  },
  switcherText: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  switcherLink: {
    fontSize: 14,
    color: Colors.primary[600],
    fontWeight: '600',
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  guestButtonText: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;