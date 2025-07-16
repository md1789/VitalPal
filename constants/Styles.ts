import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  
  // Text Styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    color: Colors.gray[600],
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: Colors.gray[500],
  },
  
  // Spacing
  marginXs: { margin: 4 },
  marginSm: { margin: 8 },
  marginMd: { margin: 16 },
  marginLg: { margin: 24 },
  marginXl: { margin: 32 },
  
  paddingXs: { padding: 4 },
  paddingSm: { padding: 8 },
  paddingMd: { padding: 16 },
  paddingLg: { padding: 24 },
  paddingXl: { padding: 32 },
  
  // Shadows
  shadowSm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowLg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Border Radius
  rounded: { borderRadius: 8 },
  roundedMd: { borderRadius: 12 },
  roundedLg: { borderRadius: 16 },
  roundedXl: { borderRadius: 24 },
  roundedFull: { borderRadius: 9999 },
  
  // Common Component Styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  button: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.gray[800],
  },
  
  // Header Styles
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Tab Bar Styles
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingVertical: 8,
    height: 80,
  },
  
  // Avatar Styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Utility Styles
  flex1: { flex: 1 },
  flexGrow: { flexGrow: 1 },
  flexShrink: { flexShrink: 1 },
  
  // Positioning
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  
  // Display
  hidden: { display: 'none' },
  
  // Opacity
  opacityLow: { opacity: 0.5 },
  opacityMed: { opacity: 0.7 },
  opacityHigh: { opacity: 0.9 },
  
  // Dimensions
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  screenWidth: { width },
  screenHeight: { height },
});

// Responsive breakpoints
export const Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Common dimension values
export const Dimensions = {
  screenWidth: width,
  screenHeight: height,
  tabBarHeight: 80,
  headerHeight: 60,
  statusBarHeight: 24,
};

// Animation durations
export const AnimationDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Z-index values
export const ZIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};