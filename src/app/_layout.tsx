import { useEffect } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { DarkTheme, DefaultTheme, Slot, ThemeProvider, useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from '@/context/auth-context';
import '../global.css'
import { Colors } from '@/theme/colors';
function RootLayoutNav() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';

    if (!hasCompletedOnboarding) {
      // If onboarding is not completed, redirect to onboarding screens
      if (!inOnboardingGroup) {
        router.replace('/(onboarding)');
      }
    } else if (!isAuthenticated) {
      // If completed onboarding but not authenticated, redirect to login screens
      if (!inAuthGroup) {
        router.replace('/(auth)/login');
      }
    } else {
      // If authenticated and completed onboarding, redirect to main app screens
      if (inAuthGroup || inOnboardingGroup) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, hasCompletedOnboarding, segments, isLoading, router]);

  if (isLoading) {
    // Keep splash or empty screen active while checking auth/onboarding status
    return <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}
    >
      <ActivityIndicator color={Colors.primary} size={'large'} />
    </View>
  }``

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootLayoutNav />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}
