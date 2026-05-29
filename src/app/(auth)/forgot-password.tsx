import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Colors as BrandColors } from '@/theme/colors';
import { Spacing } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Reset Password
            </ThemedText>
            <ThemedText style={styles.subtitle} themeColor="textSecondary">
              Enter your email to receive a password reset link
            </ThemedText>
          </View>

          <View style={styles.form}>
            {error ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : null}

            {success ? (
              <View style={styles.successContainer}>
                <ThemedText style={styles.successText}>
                  A password reset link has been sent to your email.
                </ThemedText>
                <Pressable
                  style={[styles.submitButton, { backgroundColor: BrandColors.primary }]}
                  onPress={() => router.push('/(auth)/login')}>
                  <ThemedText style={styles.submitButtonText}>Back to Sign In</ThemedText>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <ThemedText type="smallBold" style={styles.label}>
                    Email Address
                  </ThemedText>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.backgroundElement,
                        color: theme.text,
                        borderColor: theme.backgroundSelected,
                      },
                    ]}
                    placeholder="Enter your email"
                    placeholderTextColor={theme.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.submitButton,
                    {
                      backgroundColor: pressed ? BrandColors.primaryDark : BrandColors.primary,
                    },
                  ]}
                  onPress={handleReset}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <ThemedText style={styles.submitButtonText}>Send Reset Link</ThemedText>
                  )}
                </Pressable>

                <View style={styles.footer}>
                  <Pressable onPress={() => router.push('/(auth)/login')}>
                    <ThemedText type="smallBold" style={styles.linkText}>
                      Back to Sign In
                    </ThemedText>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    maxWidth: 450,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: Spacing.five,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.three,
  },
  errorText: {
    color: BrandColors.error,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  successContainer: {
    gap: Spacing.three,
    alignItems: 'center',
  },
  successText: {
    color: BrandColors.success,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  inputContainer: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  submitButton: {
    height: 52,
    borderRadius: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.two,
    width: '100%',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  linkText: {
    color: BrandColors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.three,
  },
});
