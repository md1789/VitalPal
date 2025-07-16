import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Question, UserAnswers } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface QuestionnaireScreenProps {
  onComplete: (answers: UserAnswers) => void;
}

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  
  const questions: Question[] = [
    {
      id: 'goals',
      title: 'What are your main wellness goals?',
      type: 'multiple',
      options: ['Weight Management', 'Better Sleep', 'Stress Reduction', 'Fitness Improvement', 'Nutrition', 'Mental Health']
    },
    {
      id: 'activity',
      title: 'How active are you currently?',
      type: 'single',
      options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active']
    },
    {
      id: 'experience',
      title: 'Experience with wellness apps?',
      type: 'single',
      options: ['Beginner', 'Some Experience', 'Experienced', 'Expert']
    },
    {
      id: 'preferences',
      title: 'What type of activities do you prefer?',
      type: 'multiple',
      options: ['Cardio', 'Strength Training', 'Yoga', 'Swimming', 'Walking', 'Dancing']
    },
    {
      id: 'schedule',
      title: 'When do you prefer to exercise?',
      type: 'single',
      options: ['Early Morning', 'Mid Morning', 'Afternoon', 'Evening', 'No Preference']
    }
  ];
  
  const currentQuestion = questions[currentStep];
  
  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentQuestion.type === 'multiple' 
        ? Array.isArray(prev[currentQuestion.id])
          ? (prev[currentQuestion.id] as string[]).includes(answer)
            ? (prev[currentQuestion.id] as string[]).filter(a => a !== answer)
            : [...(prev[currentQuestion.id] as string[]), answer]
          : [answer]
        : answer
    }));
  };
  
  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion.id] && 
    (currentQuestion.type === 'single' ? true : (answers[currentQuestion.id] as string[]).length > 0);
  
  return (
    <LinearGradient
      colors={[Colors.primary[500], Colors.secondary[500]]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Step {currentStep + 1} of {questions.length}</Text>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
      
      <Card style={styles.questionCard}>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.optionsContainer}
        >
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentQuestion.type === 'multiple'
              ? Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).includes(option)
              : answers[currentQuestion.id] === option;
              
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                style={[
                  styles.optionButton,
                  isSelected ? styles.optionButtonSelected : styles.optionButtonDefault
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
                {isSelected && <Ionicons name="checkmark" size={20} color={Colors.primary[500]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <Button 
              onPress={prevStep} 
              variant="ghost"
              style={styles.backButton}
            >
              Back
            </Button>
          )}
          
          <Button 
            onPress={nextStep} 
            style={[styles.nextButton, currentStep === 0 && styles.nextButtonFull]}
            disabled={!isAnswered}
          >
            {currentStep === questions.length - 1 ? 'Complete Setup' : 'Next'}
          </Button>
        </View>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  questionCard: {
    flex: 1,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 24,
    lineHeight: 32,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  optionButton: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtonDefault: {
    borderColor: Colors.gray[200],
    backgroundColor: Colors.white,
  },
  optionButtonSelected: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  optionText: {
    fontSize: 16,
    color: Colors.gray[700],
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primary[700],
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  nextButtonFull: {
    flex: 1,
  },
});

export default QuestionnaireScreen;