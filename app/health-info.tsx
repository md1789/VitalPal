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

interface HealthCondition {
  id: string;
  name: string;
  diagnosedDate: string;
  severity: 'Low' | 'Medium' | 'High';
  notes: string;
}

interface Injury {
  id: string;
  name: string;
  dateOccurred: string;
  affectedArea: string;
  recoveryStatus: 'Recovered' | 'Recovering' | 'Chronic';
  notes: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
}

const HealthInfoScreen: React.FC = () => {
  const [conditions, setConditions] = useState<HealthCondition[]>([
    {
      id: '1',
      name: 'Mild Asthma',
      diagnosedDate: '2020-03-15',
      severity: 'Low',
      notes: 'Exercise-induced, well controlled with inhaler'
    }
  ]);

  const [injuries, setInjuries] = useState<Injury[]>([
    {
      id: '1',
      name: 'Sprained Ankle',
      dateOccurred: '2023-08-10',
      affectedArea: 'Left Ankle',
      recoveryStatus: 'Recovered',
      notes: 'Fully healed, no ongoing issues'
    }
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Albuterol Inhaler',
      dosage: '90 mcg',
      frequency: 'As needed',
      prescribedBy: 'Dr. Smith',
      startDate: '2020-03-15'
    }
  ]);

  const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Shellfish']);
  const [bloodType, setBloodType] = useState('O+');
  const [emergencyNotes, setEmergencyNotes] = useState('No known drug allergies. Contact emergency contact for medical history.');

  const addCondition = () => {
    Alert.prompt(
      'Add Health Condition',
      'Enter the name of the health condition:',
      (text) => {
        if (text) {
          const newCondition: HealthCondition = {
            id: Date.now().toString(),
            name: text,
            diagnosedDate: new Date().toISOString().split('T')[0],
            severity: 'Medium',
            notes: ''
          };
          setConditions([...conditions, newCondition]);
        }
      }
    );
  };

  const addInjury = () => {
    Alert.prompt(
      'Add Injury',
      'Enter the type of injury:',
      (text) => {
        if (text) {
          const newInjury: Injury = {
            id: Date.now().toString(),
            name: text,
            dateOccurred: new Date().toISOString().split('T')[0],
            affectedArea: '',
            recoveryStatus: 'Recovering',
            notes: ''
          };
          setInjuries([...injuries, newInjury]);
        }
      }
    );
  };

  const addMedication = () => {
    Alert.prompt(
      'Add Medication',
      'Enter the medication name:',
      (text) => {
        if (text) {
          const newMedication: Medication = {
            id: Date.now().toString(),
            name: text,
            dosage: '',
            frequency: '',
            prescribedBy: '',
            startDate: new Date().toISOString().split('T')[0]
          };
          setMedications([...medications, newMedication]);
        }
      }
    );
  };

  const addAllergy = () => {
    Alert.prompt(
      'Add Allergy',
      'Enter the allergy:',
      (text) => {
        if (text && !allergies.includes(text)) {
          setAllergies([...allergies, text]);
        }
      }
    );
  };

  const removeItem = (id: string, type: 'condition' | 'injury' | 'medication') => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            switch (type) {
              case 'condition':
                setConditions(conditions.filter(c => c.id !== id));
                break;
              case 'injury':
                setInjuries(injuries.filter(i => i.id !== id));
                break;
              case 'medication':
                setMedications(medications.filter(m => m.id !== id));
                break;
            }
          }
        }
      ]
    );
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const selectBloodType = () => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
    Alert.alert(
      'Select Blood Type',
      'Choose your blood type',
      bloodTypes.map(type => ({
        text: type,
        onPress: () => setBloodType(type)
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Information</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Emergency Info */}
        <Card>
          <Text style={styles.sectionTitle}>Emergency Information</Text>
          
          <View style={styles.emergencyRow}>
            <Text style={styles.emergencyLabel}>Blood Type:</Text>
            <TouchableOpacity onPress={selectBloodType} style={styles.bloodTypeButton}>
              <Text style={styles.bloodTypeText}>{bloodType}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.gray[400]} />
            </TouchableOpacity>
          </View>
          
          <Input
            label="Emergency Notes"
            value={emergencyNotes}
            onChangeText={setEmergencyNotes}
            placeholder="Important medical information for emergencies"
            style={{ height: 80 }}
          />
        </Card>

        {/* Allergies */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Allergies</Text>
            <TouchableOpacity onPress={addAllergy} style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.allergyContainer}>
            {allergies.map((allergy, index) => (
              <View key={index} style={styles.allergyTag}>
                <Text style={styles.allergyText}>{allergy}</Text>
                <TouchableOpacity onPress={() => removeAllergy(allergy)}>
                  <Ionicons name="close" size={16} color={Colors.gray[500]} />
                </TouchableOpacity>
              </View>
            ))}
            {allergies.length === 0 && (
              <Text style={styles.emptyText}>No allergies recorded</Text>
            )}
          </View>
        </Card>

        {/* Health Conditions */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Conditions</Text>
            <TouchableOpacity onPress={addCondition} style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {conditions.map((condition) => (
            <View key={condition.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{condition.name}</Text>
                <TouchableOpacity onPress={() => removeItem(condition.id, 'condition')}>
                  <Ionicons name="trash-outline" size={18} color={Colors.red[500]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemDetail}>Diagnosed: {condition.diagnosedDate}</Text>
              <Text style={styles.itemDetail}>Severity: {condition.severity}</Text>
              {condition.notes && <Text style={styles.itemNotes}>{condition.notes}</Text>}
            </View>
          ))}
          
          {conditions.length === 0 && (
            <Text style={styles.emptyText}>No health conditions recorded</Text>
          )}
        </Card>

        {/* Injuries */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Injuries</Text>
            <TouchableOpacity onPress={addInjury} style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {injuries.map((injury) => (
            <View key={injury.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{injury.name}</Text>
                <TouchableOpacity onPress={() => removeItem(injury.id, 'injury')}>
                  <Ionicons name="trash-outline" size={18} color={Colors.red[500]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemDetail}>Date: {injury.dateOccurred}</Text>
              <Text style={styles.itemDetail}>Area: {injury.affectedArea}</Text>
              <Text style={styles.itemDetail}>Status: {injury.recoveryStatus}</Text>
              {injury.notes && <Text style={styles.itemNotes}>{injury.notes}</Text>}
            </View>
          ))}
          
          {injuries.length === 0 && (
            <Text style={styles.emptyText}>No injuries recorded</Text>
          )}
        </Card>

        {/* Medications */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Medications</Text>
            <TouchableOpacity onPress={addMedication} style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {medications.map((medication) => (
            <View key={medication.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{medication.name}</Text>
                <TouchableOpacity onPress={() => removeItem(medication.id, 'medication')}>
                  <Ionicons name="trash-outline" size={18} color={Colors.red[500]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemDetail}>Dosage: {medication.dosage}</Text>
              <Text style={styles.itemDetail}>Frequency: {medication.frequency}</Text>
              <Text style={styles.itemDetail}>Prescribed by: {medication.prescribedBy}</Text>
              <Text style={styles.itemDetail}>Start date: {medication.startDate}</Text>
            </View>
          ))}
          
          {medications.length === 0 && (
            <Text style={styles.emptyText}>No medications recorded</Text>
          )}
        </Card>

        <Button onPress={() => router.back()} style={styles.doneButton}>
          Done
        </Button>
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  bloodTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
  },
  bloodTypeText: {
    fontSize: 16,
    color: Colors.gray[800],
    marginRight: 4,
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.red[50],
    borderColor: Colors.red[200],
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  allergyText: {
    color: Colors.red[700],
    fontSize: 14,
    marginRight: 4,
  },
  itemCard: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[800],
    flex: 1,
  },
  itemDetail: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  itemNotes: {
    fontSize: 14,
    color: Colors.gray[700],
    fontStyle: 'italic',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  doneButton: {
    marginTop: 24,
  },
});

export default HealthInfoScreen;