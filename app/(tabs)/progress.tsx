import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../components/ui/Card';
import { Colors } from '../../constants/Colors';

const ProgressScreen: React.FC = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Card style={styles.weeklyCard}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.sectionTitle}>Weekly Summary</Text>
            <View style={styles.trendingContainer}>
              <Ionicons name="trending-up" size={20} color={Colors.green[500]} />
              <Text style={styles.trendingText}>+12%</Text>
            </View>
          </View>
          
          <View style={styles.weeklyGrid}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={[
                  styles.dayCircle,
                  index < 5 ? styles.dayCircleComplete : styles.dayCircleIncomplete
                ]}>
                  {index < 5 && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
              </View>
            ))}
          </View>
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          <View style={styles.achievementItem}>
            <View style={[styles.achievementIcon, { backgroundColor: Colors.yellow[400] }]}>
              <Ionicons name="trophy" size={24} color="white" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>7-Day Streak</Text>
              <Text style={styles.achievementDescription}>Completed daily goals for a week</Text>
            </View>
          </View>
          
          <View style={styles.achievementItem}>
            <View style={[styles.achievementIcon, { backgroundColor: Colors.yellow[400] }]}>
              <Ionicons name="trophy" size={24} color="white" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Early Bird</Text>
              <Text style={styles.achievementDescription}>Completed morning routine 5 times</Text>
            </View>
          </View>
          
          <View style={[styles.achievementItem, { marginBottom: 0 }]}>
            <View style={[styles.achievementIcon, { backgroundColor: Colors.gray[300] }]}>
              <Ionicons name="trophy" size={24} color={Colors.gray[500]} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Wellness Warrior</Text>
              <Text style={styles.achievementDescription}>Complete 30 daily goals</Text>
              <Text style={styles.achievementProgress}>18/30</Text>
            </View>
          </View>
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>This Month's Progress</Text>
          
          <View style={styles.progressMetric}>
            <Text style={styles.metricLabel}>Workouts Completed</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.metricValue}>18/24</Text>
          </View>
          
          <View style={styles.progressMetric}>
            <Text style={styles.metricLabel}>Meditation Sessions</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '90%' }]} />
            </View>
            <Text style={styles.metricValue}>27/30</Text>
          </View>
          
          <View style={[styles.progressMetric, { marginBottom: 0 }]}>
            <Text style={styles.metricLabel}>Nutrition Goals</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.metricValue}>18/30</Text>
          </View>
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
  weeklyCard: {
    marginBottom: 20,
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  trendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingText: {
    color: Colors.green[500],
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 16,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleComplete: {
    backgroundColor: Colors.green[500],
  },
  dayCircleIncomplete: {
    backgroundColor: Colors.gray[200],
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontWeight: '600',
    color: Colors.gray[800],
    fontSize: 16,
    marginBottom: 2,
  },
  achievementDescription: {
    color: Colors.gray[600],
    fontSize: 14,
  },
  achievementProgress: {
    color: Colors.gray[500],
    fontSize: 12,
    marginTop: 2,
  },
  progressMetric: {
    marginBottom: 20,
  },
  metricLabel: {
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 4,
  },
  metricValue: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'right',
  },
});

export default ProgressScreen;