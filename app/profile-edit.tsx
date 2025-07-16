import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfileEditScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Alex',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1999-01-15',
    gender: 'Prefer not to say',
    height: '68', // inches
    weight: '165', // lbs
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSave = () => {
    // Validation
    const newErrors: {[key: string]: string} = {};

    if (!userInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!userInfo.email.trim() || !userInfo.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // TODO: Save to storage/API
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleGenderSelect = () => {
    Alert.alert(
      'Select Gender',
      'Choose your gender',
      [
        { text: 'Male', onPress: () => setUserInfo({...userInfo, gender: 'Male'}) },
        { text: 'Female', onPress: () => setUserInfo({...userInfo, gender: 'Female'}) },
        { text: 'Non-binary', onPress: () => setUserInfo({...userInfo, gender: 'Non-binary'}) },
        { text: 'Prefer not to say', onPress: () => setUserInfo({...userInfo, gender: 'Prefer not to say'}) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Input
            label="Full Name"
            value={userInfo.name}
            onChangeText={(text) => setUserInfo({...userInfo, name: text})}
            error={errors.name}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            value={userInfo.email}
            onChangeText={(text) => setUserInfo({...userInfo, email: text})}
            error={errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Phone Number"
            value={userInfo.phone}
            onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
            placeholder="Enter your phone number"
          />

          <Input
            label="Date of Birth"
            value={userInfo.dateOfBirth}
            onChangeText={(text) => setUserInfo({...userInfo, dateOfBirth: text})}
            placeholder="YYYY-MM-DD"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TouchableOpacity style={styles.selectButton} onPress={handleGenderSelect}>
              <Text style={styles.selectText}>{userInfo.gender}</Text>
              <Ionicons name="chevron-down" size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Physical Information</Text>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Height (inches)"
                value={userInfo.height}
                onChangeText={(text) => setUserInfo({...userInfo, height: text})}
                placeholder="68"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Weight (lbs)"
                value={userInfo.weight}
                onChangeText={(text) => setUserInfo({...userInfo, weight: text})}
                placeholder="165"
              />
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>

          <Input
            label="Contact Name"
            value={userInfo.emergencyContact}
            onChangeText={(text) => setUserInfo({...userInfo, emergencyContact: text})}
            placeholder="Enter emergency contact name"
          />

          <Input
            label="Contact Phone"
            value={userInfo.emergencyPhone}
            onChangeText={(text) => setUserInfo({...userInfo, emergencyPhone: text})}
            placeholder="Enter emergency contact phone"
          />
        </Card>

        <View style={styles.buttonContainer}>
          <Button variant="outline" onPress={() => router.back()} style={styles.cancelButton}>
            Cancel
          </Button>
          <Button onPress={handleSave} style={styles.saveButton}>
            Save Changes
          </Button>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  selectText: {
    fontSize: 16,
    color: Colors.gray[800],
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});

export default ProfileEditScreen;