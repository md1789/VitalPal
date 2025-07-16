export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    onPress?: () => void;
    disabled?: boolean;
    style?: any;
  }
  
  export interface InputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label?: string;
    error?: string;
    secureTextEntry?: boolean;
    style?: any;
  }
  
  export interface CardProps {
    children: React.ReactNode;
    style?: any;
  }
  
  export interface Question {
    id: string;
    title: string;
    type: 'multiple' | 'single';
    options: string[];
  }
  
  export interface UserAnswers {
    [key: string]: string | string[];
  }
  
  export interface Tab {
    id: string;
    label: string;
    icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
    component: React.ComponentType;
  }