import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/ui/Card';
import { Colors } from '../constants/Colors';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

interface SwitchItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingsIcon}>
      <Ionicons name={icon} size={22} color={Colors.primary[500]} />
    </View>
    <View style={styles.settingsContent}>
      <Text style={styles.settingsTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement || (showChevron && (
      <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
    ))}
  </TouchableOpacity>
);

const SwitchItem: React.FC<SwitchItemProps> = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.settingsItem}>
    <View style={styles.settingsIcon}>
      <Ionicons name={icon} size={22} color={Colors.primary[500]} />
    </View>
    <View style={styles.settingsContent}>
      <Text style={styles.settingsTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
      thumbColor={value ? Colors.primary[500] : Colors.gray[500]}
    />
  </View>
);

const SettingsScreen: React.FC = () => {
  // Settings State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // User Info State (could be loaded from storage)
  const [userInfo, setUserInfo] = useState({
    name: 'Alex',
    email: 'alex@example.com',
    gender: 'Prefer not to say',
    age: '25',
    height: '5\'8"',
    weight: '165 lbs',
  });

  const handleThemeChange = (value: boolean) => {
    setIsDarkMode(value);
    // TODO: Implement theme change logic
    Alert.alert('Theme Changed', `Switched to ${value ? 'dark' : 'light'} mode`);
  };

  const handleFontSizeChange = () => {
    Alert.alert(
      'Font Size',
      'Choose your preferred font size',
      [
        { text: 'Small', onPress: () => setFontSize('small') },
        { text: 'Medium', onPress: () => setFontSize('medium') },
        { text: 'Large', onPress: () => setFontSize('large') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/profile-edit');
  };

  const handleEditPreferences = () => {
    router.push('/preferences-edit');
  };

  const handleHealthInfo = () => {
    router.push('/health-info');
  };

  const handleSmartDevices = () => {
    router.push('/smart-devices');
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'Your health data will be exported to a file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Deleting account...')
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* User Profile Section */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={Colors.white} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userInfo.name}</Text>
              <Text style={styles.profileEmail}>{userInfo.email}</Text>
            </View>
            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="pencil" size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Appearance Section */}
        <Card>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <SwitchItem
            icon="moon"
            title="Dark Mode"
            subtitle="Switch between light and dark themes"
            value={isDarkMode}
            onValueChange={handleThemeChange}
          />

          <SettingsItem
            icon="text"
            title="Font Size"
            subtitle={`Current: ${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`}
            onPress={handleFontSizeChange}
          />
        </Card>

        {/* Privacy & Data Section */}
        <Card>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>

          <SwitchItem
            icon="analytics"
            title="User Analytics"
            subtitle="Help improve the app by sharing usage data"
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
          />

          <SwitchItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Receive wellness reminders and updates"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />

          <SwitchItem
            icon="finger-print"
            title="Biometric Lock"
            subtitle="Use fingerprint or face ID to secure app"
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
          />
        </Card>

        {/* Health & Preferences Section */}
        <Card>
          <Text style={styles.sectionTitle}>Health & Preferences</Text>

          <SettingsItem
            icon="heart"
            title="Health Information"
            subtitle="Manage injuries, conditions, and medical history"
            onPress={handleHealthInfo}
          />

          <SettingsItem
            icon="restaurant"
            title="Food & Exercise Preferences"
            subtitle="Update your dietary preferences and exercise goals"
            onPress={handleEditPreferences}
          />

          <SettingsItem
            icon="fitness"
            title="Smart Devices"
            subtitle="Connect fitness trackers and health devices"
            onPress={handleSmartDevices}
          />
        </Card>

        {/* Account Section */}
        <Card>
          <Text style={styles.sectionTitle}>Account</Text>

          <SettingsItem
            icon="download"
            title="Export Data"
            subtitle="Download your health data"
            onPress={handleDataExport}
          />

          <SettingsItem
            icon="help-circle"
            title="Help & Support"
            subtitle="Get help or contact support"
            onPress={() => router.push('/support')}
          />

          <SettingsItem
            icon="document-text"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => router.push('/privacy-policy')}
          />

          <SettingsItem
            icon="shield-checkmark"
            title="Terms of Service"
            subtitle="Read our terms of service"
            onPress={() => router.push('/terms')}
          />
        </Card>

        {/* Danger Zone */}
        <Card style={styles.dangerCard}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <SettingsItem
            icon="trash"
            title="Delete Account"
            subtitle="Permanently delete your account and all data"
            onPress={handleDeleteAccount}
            showChevron={false}
            rightElement={
              <Ionicons name="warning" size={20} color={Colors.red[500]} />
            }
          />
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>VitalPal v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 VitalPal. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray[800],
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray[800],
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  dangerCard: {
    borderColor: Colors.red[200],
    borderWidth: 1,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 16,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.gray[500],
  },
});

export default SettingsScreen;