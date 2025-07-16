import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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

interface StoryData {
  id: string;
  user: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

const CommunityScreen: React.FC = () => {
  const stories: StoryData[] = [
    {
      id: '1',
      user: 'Sarah M.',
      avatar: 'S',
      time: '2 hours ago',
      content: 'Lost 15 lbs using the AI meal planning!',
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      user: 'Mike R.',
      avatar: 'M',
      time: '5 hours ago',
      content: 'Completed my first 5K thanks to the training plan',
      likes: 8,
      comments: 2,
    },
    {
      id: '3',
      user: 'Jessica L.',
      avatar: 'J',
      time: '1 day ago',
      content: 'Finally sleeping 8 hours consistently! The meditation sessions really help.',
      likes: 15,
      comments: 7,
    },
  ];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Card style={styles.challengeContainer}>
          <Text style={styles.sectionTitle}>Daily Challenge</Text>
          
          <LinearGradient
            colors={[Colors.primary[500], Colors.secondary[500]]}
            style={styles.challengeCard}
          >
            <Text style={styles.challengeTitle}>Hydration Challenge</Text>
            <Text style={styles.challengeDescription}>Drink 8 glasses of water today</Text>
            <View style={styles.challengeFooter}>
              <Text style={styles.challengeParticipants}>1,247 participants</Text>
              <Button variant="secondary" size="sm">
                Join Challenge
              </Button>
            </View>
          </LinearGradient>
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>Community Leaderboard</Text>
          
          <View style={styles.leaderboardItem}>
            <View style={styles.leaderboardRank}>
              <Text style={styles.rankNumber}>1</Text>
            </View>
            <View style={[styles.leaderboardAvatar, { backgroundColor: Colors.yellow[400] }]}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.leaderboardName}>Alex K.</Text>
              <Text style={styles.leaderboardPoints}>2,847 points</Text>
            </View>
            <Ionicons name="trophy" size={20} color={Colors.yellow[400]} />
          </View>
          
          <View style={styles.leaderboardItem}>
            <View style={styles.leaderboardRank}>
              <Text style={styles.rankNumber}>2</Text>
            </View>
            <View style={[styles.leaderboardAvatar, { backgroundColor: Colors.primary[500] }]}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.leaderboardName}>Sarah M.</Text>
              <Text style={styles.leaderboardPoints}>2,654 points</Text>
            </View>
          </View>
          
          <View style={[styles.leaderboardItem, { marginBottom: 0 }]}>
            <View style={styles.leaderboardRank}>
              <Text style={styles.rankNumber}>3</Text>
            </View>
            <View style={[styles.leaderboardAvatar, { backgroundColor: Colors.green[500] }]}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.leaderboardName}>Mike R.</Text>
              <Text style={styles.leaderboardPoints}>2,432 points</Text>
            </View>
          </View>
        </Card>
        
        <Card>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          
          {stories.map((story) => (
            <View key={story.id} style={styles.storyItem}>
              <View style={styles.storyHeader}>
                <View style={[styles.storyAvatar, { backgroundColor: Colors.primary[500] }]}>
                  <Text style={styles.storyAvatarText}>{story.avatar}</Text>
                </View>
                <View style={styles.storyUserInfo}>
                  <Text style={styles.storyUserName}>{story.user}</Text>
                  <Text style={styles.storyTime}>{story.time}</Text>
                </View>
              </View>
              <Text style={styles.storyText}>{story.content}</Text>
              <View style={styles.storyActions}>
                <TouchableOpacity style={styles.storyAction} activeOpacity={0.7}>
                  <Ionicons name="heart-outline" size={16} color={Colors.gray[500]} />
                  <Text style={styles.storyActionText}>{story.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storyAction} activeOpacity={0.7}>
                  <Ionicons name="chatbubble-outline" size={16} color={Colors.gray[500]} />
                  <Text style={styles.storyActionText}>{story.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  challengeContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  challengeCard: {
    borderRadius: 16,
    padding: 16,
  },
  challengeTitle: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: 16,
    marginBottom: 4,
  },
  challengeDescription: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 12,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeParticipants: {
    color: Colors.white,
    fontSize: 14,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  leaderboardRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[600],
  },
  leaderboardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  leaderboardPoints: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  storyItem: {
    padding: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    marginBottom: 16,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  storyAvatarText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  storyUserInfo: {
    flex: 1,
  },
  storyUserName: {
    fontWeight: '600',
    color: Colors.gray[800],
    fontSize: 14,
  },
  storyTime: {
    color: Colors.gray[500],
    fontSize: 12,
  },
  storyText: {
    color: Colors.gray[700],
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  storyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storyActionText: {
    color: Colors.gray[500],
    fontSize: 14,
  },
});

export default CommunityScreen;