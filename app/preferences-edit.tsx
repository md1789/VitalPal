import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Colors } from '../constants/Colors';

interface PreferenceOption {
  id: string;
  label: string;
  selected: boolean;
}

const PreferencesEditScreen: React.FC = () => {
  // Wellness Goals
  const [wellnessGoals, setWellnessGoals] = useState<PreferenceOption[]>([
    { id: 'weight', label: 'Weight Management', selected: true },
    { id: 'sleep', label: 'Better Sleep', selected: true },
    { id: 'stress', label: 'Stress Reduction', selected: false },
    { id: 'fitness', label: 'Fitness Improvement', selected: true },
    { id: 'nutrition', label: 'Nutrition', selected: false },
    { id: 'mental', label: 'Mental Health', selected: true },
  ]);

  // Activity Level
  const [activityLevel, setActivityLevel] = useState('Moderately Active');

  // Exercise Preferences
  const [exercisePreferences, setExercisePreferences] = useState<PreferenceOption[]>([
    { id: 'cardio', label: 'Cardio', selected: true },
    { id: 'strength', label: 'Strength Training', selected: true },
    { id: 'yoga', label: 'Yoga', selected: false },
    { id: 'swimming', label: 'Swimming', selected: false },
    { id: 'walking', label: 'Walking', selected: true },
    { id: 'dancing', label: 'Dancing', selected: false },
    { id: 'cycling', label: 'Cycling', selected: true },
    { id: 'hiking', label: 'Hiking', selected: false },
  ]);

  // Workout Schedule
  const [workoutSchedule, setWorkoutSchedule] = useState('Morning');

  // Dietary Preferences
  const [dietaryPreferences, setDietaryPreferences] = useState<PreferenceOption[]>([
    { id: 'balanced', label: 'Balanced Diet', selected: true },
    { id: 'vegetarian', label: 'Vegetarian', selected: false },
    { id: 'vegan', label: 'Vegan', selected: false },
    { id: 'keto', label: 'Ketogenic', selected: false },
    { id: 'paleo', label: 'Paleo', selected: false },
    { id: 'mediterranean', label: 'Mediterranean', selected: false },
    { id: 'lowcarb', label: 'Low Carb', selected: false },
    { id: 'lowfat', label: 'Low Fat', selected: false },
  ]);

  // Food Restrictions
  const [foodRestrictions, setFoodRestrictions] = useState<PreferenceOption[]>([
    { id: 'gluten', label: 'Gluten-Free', selected: false },
    { id: 'dairy', label: 'Dairy-Free', selected: false },
    { id: 'nuts', label: 'Nut-Free', selected: true },
    { id: 'shellfish', label: 'Shellfish-Free', selected: true },
    { id: 'soy', label: 'Soy-Free', selected: false },
    { id: 'eggs', label: 'Egg-Free', selected: false },
  ]);

  // Notification Preferences
  const [notificationTime, setNotificationTime] = useState('Morning');
  const [reminderFrequency, setReminderFrequency] = useState('Daily');

  const togglePreference = (
    preferences: PreferenceOption[], 
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceOption[]>>, 
    id: string
  ) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, selected: !pref.selected } : pref
    ));
  };

  const selectSingleOption = (
    options: string[], 
    setValue: React.Dispatch<React.SetStateAction<string>>, 
    title: string
  ) => {
    Alert.alert(
      title,
      'Choose your preference',
      options.map(option => ({
        text: option,
        onPress: () => setValue(option)
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  const savePreferences = () => {
    // TODO: Save preferences to storage/API
    const preferences = {
      wellnessGoals: wellnessGoals.filter(g => g.selected).map(g => g.label),
      activityLevel,
      exercisePreferences: exercisePreferences.filter(e => e.selected).map(e => e.label),
      workoutSchedule,
      dietaryPreferences: dietaryPreferences.filter(d => d.selected).map(d => d.label),
      foodRestrictions: foodRestrictions.filter(f => f.selected).map(f => f.label),
      notificationTime,
      reminderFrequency,
    };
    
    console.log('Saving preferences:', preferences);
    Alert.alert('Success', 'Preferences updated successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const PreferenceSection: React.FC<{
    title: string;
    preferences: PreferenceOption[];
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceOption[]>>;
  }> = ({ title, preferences, setPreferences }) => (
    <Card style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.preferencesGrid}>
        {preferences.map((pref) => (
          <TouchableOpacity
            key={pref.id}
            style={[
              styles.preferenceItem,
              pref.selected && styles.preferenceItemSelected
            ]}
            onPress={() => togglePreference(preferences, setPreferences, pref.id)}
          >
            <Text style={[
              styles.preferenceText,
              pref.selected && styles.preferenceTextSelected
            ]}>
              {pref.label}
            </Text>
            {pref.selected && (
              <Ionicons name="checkmark" size={16} color={Colors.white} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Wellness Goals */}
        <PreferenceSection
          title="Wellness Goals"
          preferences={wellnessGoals}
          setPreferences={setWellnessGoals}
        />

        {/* Activity Level */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Current Activity Level</Text>
          <TouchableOpacity 
            style={styles.singleSelectButton}
            onPress={() => selectSingleOption(
              ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'],
              setActivityLevel,
              'Activity Level'
            )}
          >
            <Text style={styles.singleSelectText}>{activityLevel}</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>

        {/* Exercise Preferences */}
        <PreferenceSection
          title="Exercise Preferences"
          preferences={exercisePreferences}
          setPreferences={setExercisePreferences}
        />

        {/* Workout Schedule */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferred Workout Time</Text>
          <TouchableOpacity 
            style={styles.singleSelectButton}
            onPress={() => selectSingleOption(
              ['Early Morning', 'Morning', 'Afternoon', 'Evening', 'Night'],
              setWorkoutSchedule,
              'Workout Schedule'
            )}
          >
            <Text style={styles.singleSelectText}>{workoutSchedule}</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>

        {/* Dietary Preferences */}
        <PreferenceSection
          title="Dietary Preferences"
          preferences={dietaryPreferences}
          setPreferences={setDietaryPreferences}
        />

        {/* Food Restrictions */}
        <PreferenceSection
          title="Food Restrictions & Allergies"
          preferences={foodRestrictions}
          setPreferences={setFoodRestrictions}
        />

        {/* Notification Settings */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <View style={styles.notificationRow}>
            <Text style={styles.notificationLabel}>Reminder Time</Text>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => selectSingleOption(
                ['Morning', 'Afternoon', 'Evening', 'Custom'],
                setNotificationTime,
                'Notification Time'
              )}
            >
              <Text style={styles.notificationText}>{notificationTime}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.gray[400]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.notificationRow}>
            <Text style={styles.notificationLabel}>Frequency</Text>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => selectSingleOption(
                ['Daily', 'Every 2 Days', 'Weekly', 'Custom'],
                setReminderFrequency,
                'Reminder Frequency'
              )}
            >
              <Text style={styles.notificationText}>{reminderFrequency}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.gray[400]} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button variant="outline" onPress={() => router.back()} style={styles.cancelButton}>
            Cancel
          </Button>
          <Button onPress={savePreferences} style={styles.saveButton}>
            Save Preferences
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
  sectionCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    backgroundColor: Colors.white,
  },
  preferenceItemSelected: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  preferenceText: {
    fontSize: 14,
    color: Colors.gray[700],
    marginRight: 4,
  },
  preferenceTextSelected: {
    color: Colors.white,
  },
  singleSelectButton: {
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
  singleSelectText: {
    fontSize: 16,
    color: Colors.gray[800],
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationLabel: {
    fontSize: 16,
    color: Colors.gray[700],
    flex: 1,
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'space-between',
  },
  notificationText: {
    fontSize: 14,
    color: Colors.gray[800],
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

export default PreferencesEditScreen;