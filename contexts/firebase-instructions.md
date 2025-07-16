# Firebase Authentication Setup for VitalPal

## 1. Install Required Dependencies

```bash
# Core Firebase packages
npm install firebase

# Auth session providers for social login
npm install expo-auth-session expo-crypto expo-web-browser

# Install required dependencies
npm install expo-crypto expo-web-browser expo-linking

# Facebook SDK (if using Facebook login)
npm install expo-facebook

# AsyncStorage for persistence
npm install @react-native-async-storage/async-storage
```

## 2. Firebase Project Setup

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Follow the setup wizard

2. **Enable Authentication:**
   - In Firebase Console, go to "Authentication" → "Sign-in method"
   - Enable the following providers:
     - ✅ Email/Password
     - ✅ Phone
     - ✅ Google
     - ✅ Facebook

3. **Get Configuration:**
   - Go to Project Settings → General → Your apps
   - Add your app and download the config

## 3. Update Configuration Files

### Update `config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};
```

### Update `app/auth.tsx` with your OAuth credentials:
```typescript
// Google Auth configuration
const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
  expoClientId: 'YOUR_EXPO_CLIENT_ID',
  iosClientId: 'YOUR_IOS_CLIENT_ID', 
  androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

// Facebook Auth configuration  
const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
  clientId: 'YOUR_FACEBOOK_APP_ID',
});
```

## 4. Google Sign-In Setup

1. **Get OAuth 2.0 Client IDs:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" → "Credentials"
   - Create OAuth 2.0 Client IDs for:
     - Web application (for Expo/web)
     - Android application
     - iOS application

2. **Add to Firebase:**
   - Copy the Web client ID to Firebase Authentication → Sign-in method → Google

## 5. Facebook Login Setup

1. **Create Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add Facebook Login product

2. **Configure OAuth redirect URIs:**
   - Add your app's redirect URIs
   - For Expo: `https://auth.expo.io/@your-username/your-app-slug`

3. **Add Facebook App ID to Firebase:**
   - Go to Firebase Authentication → Sign-in method → Facebook
   - Enter your Facebook App ID and App Secret

## 6. Phone Authentication Setup

⚠️ **Important:** Phone authentication requires additional setup:

1. **For Production Apps:**
   - Set up reCAPTCHA verification
   - Configure proper App Check
   - Add your app to Firebase App Check

2. **Current Implementation:**
   - The provided code includes a placeholder for phone auth
   - You'll need to implement proper reCAPTCHA for web
   - Mobile platforms require additional native configuration

## 7. Update app.json/app.config.js

Add the following to your Expo configuration:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-auth-session",
        {
          "authSessionRedirectUri": "yourapp://redirect"
        }
      ],
      [
        "expo-facebook",
        {
          "userTrackingPermission": false
        }
      ]
    ],
    "scheme": "yourapp"
  }
}
```

## 8. File Structure

Your project should now have these files:

```
├── app/
│   ├── auth.tsx                    # Main authentication screen
│   └── _layout.tsx                 # Updated root layout with auth
├── config/
│   └── firebase.ts                 # Firebase configuration
├── contexts/
│   └── AuthContext.tsx             # Authentication context
└── types/
    └── index.ts                    # Your existing types
```

## 9. Usage Flow

1. **App starts** → Shows auth screen if not authenticated
2. **User signs in** → Goes to onboarding (if not completed) or main app
3. **User completes onboarding** → Goes to main app
4. **Subsequent launches** → Goes directly to main app

## 10. Testing

1. **Start your app:**
   ```bash
   npx expo start
   ```

2. **Test authentication methods:**
   - Email/Password sign up and sign in
   - Google Sign-In (requires proper OAuth setup)
   - Facebook Sign-In (requires Facebook app setup)
   - Phone authentication (requires reCAPTCHA setup)

## 11. Security Considerations

- ✅ Never commit API keys to version control
- ✅ Use environment variables for sensitive data
- ✅ Enable App Check for production
- ✅ Set up proper security rules for Firestore
- ✅ Implement proper error handling
- ✅ Add rate limiting for authentication attempts

## 12. Production Checklist

Before deploying to production:

- [ ] Replace all placeholder credentials with real ones
- [ ] Set up proper OAuth apps (Google, Facebook)
- [ ] Configure Firebase security rules
- [ ] Enable App Check
- [ ] Set up proper reCAPTCHA for phone auth
- [ ] Test all authentication methods thoroughly
- [ ] Set up proper error tracking (Sentry, etc.)
- [ ] Configure proper app store authentication settings

## 13. Common Issues & Solutions

### Google Sign-In Issues:
- Ensure all OAuth client IDs are correctly configured
- Check that package name/bundle ID matches

### Facebook Sign-In Issues:
- Verify Facebook app is in live mode for production
- Check redirect URIs are properly configured

### Phone Auth Issues:
- Implement proper reCAPTCHA verification
- Ensure Firebase project has proper quotas set

### General Auth Issues:
- Check Firebase console for authentication logs
- Verify all required permissions are granted
- Ensure proper error handling is implemented