import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../components/ui/Card';
import { Colors } from '../../constants/Colors';

interface MetricRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

interface InsightCardProps {
  type: 'blue' | 'green' | 'yellow';
  title: string;
  content: string;
  isLast?: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value, isLast = false }) => (
  <View style={[styles.metricRow, isLast && { marginBottom: 0 }]}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const InsightCard: React.FC<InsightCardProps> = ({ type, title, content, isLast = false }) => {
  const getInsightStyle = () => {
    switch (type) {
      case 'blue':
        return [styles.insightCard, styles.insightBlue];
      case 'green':
        return [styles.insightCard, styles.insightGreen];
      case 'yellow':
        return [styles.insightCard, styles.insightYellow];
      default:
        return [styles.insightCard, styles.insightBlue];
    }
  };

  return (
    <View style={[getInsightStyle(), isLast && { marginBottom: 0 }]}>
      <Text style={styles.insightText}>
        <Text style={styles.insightTitle}>{title}:</Text> {content}
      </Text>
    </View>
  );
};

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.dashboardGrid}>
          <Card style={styles.dashboardCard}>
            <Text style={styles.sectionTitle}>Health Metrics</Text>
            <MetricRow label="Weight" value="165 lbs" />
            <MetricRow label="BMI" value="23.2" />
            <MetricRow label="Body Fat" value="18%" isLast />
          </Card>
          
          <Card style={styles.dashboardCard}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <MetricRow label="Workouts" value="4/5" />
            <MetricRow label="Meditation" value="6/7 days" />
            <MetricRow label="Sleep Average" value="7.2 hrs" isLast />
          </Card>
        </View>
        
        <Card style={styles.vitalsCard}>
          <Text style={styles.sectionTitle}>Vital Signs Trend</Text>
          
          <View style={styles.vitalsRow}>
            <View style={styles.vitalItem}>
              <Text style={styles.vitalLabel}>Heart Rate</Text>
              <Text style={[styles.vitalValue, { color: Colors.red[500] }]}>72 bpm</Text>
              <Text style={styles.vitalTrend}>↓ 2 bpm</Text>
            </View>
            
            <View style={styles.vitalItem}>
              <Text style={styles.vitalLabel}>Blood Pressure</Text>
              <Text style={[styles.vitalValue, { color: Colors.green[500] }]}>120/80</Text>
              <Text style={styles.vitalTrend}>Normal</Text>
            </View>
          </View>
          
          <View style={styles.vitalsRow}>
            <View style={styles.vitalItem}>
              <Text style={styles.vitalLabel}>Steps Today</Text>
              <Text style={[styles.vitalValue, { color: Colors.blue[500] }]}>8,247</Text>
              <Text style={styles.vitalTrend}>↑ 12%</Text>
            </View>
            
            <View style={styles.vitalItem}>
              <Text style={styles.vitalLabel}>Calories Burned</Text>
              <Text style={[styles.vitalValue, { color: Colors.purple[500] }]}>2,134</Text>
              <Text style={styles.vitalTrend}>↑ 8%</Text>
            </View>
          </View>
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          
          <InsightCard
            type="blue"
            title="Sleep Pattern"
            content="You're getting quality sleep but going to bed 30 minutes later than optimal."
          />
          
          <InsightCard
            type="green"
            title="Nutrition"
            content="Great job maintaining protein intake! Consider adding more fiber-rich foods."
          />
          
          <InsightCard
            type="yellow"
            title="Activity"
            content="Your weekend activity drops significantly. Try scheduling lighter activities."
            isLast
          />
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>Weekly Goals Progress</Text>
          
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Workout Sessions</Text>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '80%' }]} />
              </View>
              <Text style={styles.goalProgressText}>4/5</Text>
            </View>
          </View>
          
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Meditation Minutes</Text>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '90%' }]} />
              </View>
              <Text style={styles.goalProgressText}>135/150</Text>
            </View>
          </View>
          
          <View style={[styles.goalItem, { marginBottom: 0 }]}>
            <Text style={styles.goalLabel}>Water Intake</Text>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.goalProgressText}>48/80 oz</Text>
            </View>
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
  dashboardGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  dashboardCard: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    color: Colors.gray[600],
    fontSize: 16,
  },
  metricValue: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.gray[800],
  },
  vitalsCard: {
    marginBottom: 20,
  },
  vitalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vitalItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  vitalLabel: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  vitalTrend: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  insightCard: {
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  insightBlue: {
    backgroundColor: Colors.blue[50],
    borderLeftColor: Colors.blue[500],
  },
  insightGreen: {
    backgroundColor: Colors.green[50],
    borderLeftColor: Colors.green[500],
  },
  insightYellow: {
    backgroundColor: Colors.yellow[50],
    borderLeftColor: Colors.yellow[500],
  },
  insightText: {
    fontSize: 14,
    color: Colors.gray[700],
    lineHeight: 20,
  },
  insightTitle: {
    fontWeight: '600',
  },
  goalItem: {
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 8,
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    marginRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 4,
  },
  goalProgressText: {
    fontSize: 14,
    color: Colors.gray[600],
    fontWeight: '500',
  },
});

export default DashboardScreen;