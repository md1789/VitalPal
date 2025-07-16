import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Colors } from '../../constants/Colors';

const HomeScreen: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, Alex!</Text>
            <Text style={styles.greetingSubtitle}>Ready to make today amazing?</Text>
          </View>
          <LinearGradient
            colors={[Colors.primary[500], Colors.secondary[500]]}
            style={styles.userAvatar}
          >
            <Ionicons name="person" size={24} color="white" />
          </LinearGradient>
        </View>
        
        <LinearGradient
          colors={[Colors.primary[500], Colors.secondary[500]]}
          style={styles.aiRecommendationCard}
        >
          <View style={styles.aiRecommendationContent}>
            <View style={styles.aiRecommendationText}>
              <Text style={styles.aiRecommendationTitle}>Today's AI Recommendation</Text>
              <Text style={styles.aiRecommendationDescription}>15-minute mindfulness session</Text>
              <Text style={styles.aiRecommendationSubtext}>Based on your stress levels and sleep quality</Text>
            </View>
            <Button variant="secondary" size="sm" style={styles.aiRecommendationButton}>
              Start Now
            </Button>
          </View>
        </LinearGradient>
        
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: Colors.green[100] }]}>
              <Ionicons name="target" size={24} color={Colors.green[600]} />
            </View>
            <Text style={styles.statTitle}>Daily Goals</Text>
            <Text style={[styles.statValue, { color: Colors.green[600] }]}>3/5</Text>
            <Text style={styles.statSubtext}>completed</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: Colors.blue[100] }]}>
              <Ionicons name="fitness" size={24} color={Colors.blue[600]} />
            </View>
            <Text style={styles.statTitle}>Active Minutes</Text>
            <Text style={[styles.statValue, { color: Colors.blue[600] }]}>47</Text>
            <Text style={styles.statSubtext}>of 60 min</Text>
          </Card>
        </View>
        
        <Card>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.blue[100] }]}>
              <Ionicons name="add" size={20} color={Colors.blue[600]} />
            </View>
            <Text style={styles.actionText}>Log Water Intake</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.purple[100] }]}>
              <Ionicons name="moon" size={20} color={Colors.primary[600]} />
            </View>
            <Text style={styles.actionText}>Evening Reflection</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { marginBottom: 0 }]} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.green[100] }]}>
              <Ionicons name="calendar" size={20} color={Colors.green[600]} />
            </View>
            <Text style={styles.actionText}>Schedule Workout</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 4,
  },
  greetingSubtitle: {
    color: Colors.gray[600],
    fontSize: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiRecommendationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  aiRecommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiRecommendationText: {
    flex: 1,
  },
  aiRecommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 4,
  },
  aiRecommendationDescription: {
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 8,
    fontSize: 16,
  },
  aiRecommendationSubtext: {
    color: Colors.white,
    opacity: 0.8,
    fontSize: 14,
  },
  aiRecommendationButton: {
    marginLeft: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontWeight: '600',
    color: Colors.gray[800],
    fontSize: 16,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: Colors.gray[50],
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    color: Colors.gray[700],
    fontSize: 16,
  },
});

export default HomeScreen;