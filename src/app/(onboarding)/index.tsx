import { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Colors as BrandColors } from '@/theme/colors';
import { Spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradientColors: [string, string];
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Virtual Try-On',
    description: 'See how any frame looks on your face in real-time using advanced AR camera technology.',
    icon: 'camera.viewfinder',
    gradientColors: ['#E3F2FD', '#BBDEFB'],
  },
  {
    id: '2',
    title: 'Custom Lenses',
    description: 'Tailor your lenses with blue light blockers, photochromic treatments, or exact prescriptions.',
    icon: 'sparkles',
    gradientColors: ['#E8F5E9', '#C8E6C9'],
  },
  {
    id: '3',
    title: 'Free Home Try-On',
    description: 'Select up to 4 frames to test at home for 5 days. Free shipping and returns included.',
    icon: 'shippingbox',
    gradientColors: ['#FFF3E0', '#FFE0B2'],
  },
];

export default function OnboardingScreen() {
  const theme = useTheme();
  const { completeOnboarding } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
  

    const index = Math.round(contentOffsetX / SCREEN_WIDTH);

    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) { 
      scrollViewRef.current?.scrollTo({
        x: (activeIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header containing Skip button */}
        <View style={styles.header}>
          {activeIndex < ONBOARDING_SLIDES.length - 1 ? (
            <Pressable onPress={handleSkip} style={styles.skipButton}>
              <ThemedText type="smallBold" style={styles.skipText} themeColor="textSecondary">
                Skip
              </ThemedText>
            </Pressable>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}
        </View>

        {/* Scrollable onboarding content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          {ONBOARDING_SLIDES.map((slide) => (
            <View key={slide.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
              {/* Graphic Container with abstract background */}
              <View
                style={[
                  styles.graphicContainer,
                  { backgroundColor: slide.gradientColors[0] },
                ]}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: slide.gradientColors[1] },
                  ]}>
                  <SymbolView
                    name={{ ios: slide.icon as any, android: 'star', web: 'star' }}
                    size={64}
                    tintColor={BrandColors.primaryDark}
                  />
                </View>
              </View>

              {/* Text details */}
              <View style={styles.textContainer}>
                <ThemedText type="subtitle" style={styles.title}>
                  {slide.title}
                </ThemedText>
                <ThemedText style={styles.description} themeColor="textSecondary">
                  {slide.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer containing indicators and primary button */}
        <View style={styles.footer}>
          {/* Dot Indicators */}
          <View style={styles.indicatorContainer}>
            {ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      activeIndex === index
                        ? BrandColors.primary
                        : theme.backgroundSelected,
                    width: activeIndex === index ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>

          {/* Primary Action Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: pressed ? BrandColors.primaryDark : BrandColors.primary,
              },
            ]}
            onPress={handleNext}>
            <ThemedText style={styles.actionButtonText}>
              {activeIndex === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  skipButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  skipText: {
    fontSize: 15,
  },
  skipPlaceholder: {
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },
  graphicContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  footer: {
    paddingHorizontal: Spacing.five,
    paddingBottom: Spacing.five,
    alignItems: 'center',
    gap: Spacing.four,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  actionButton: {
    height: 52,
    borderRadius: 26,
    width: '100%',
    maxWidth: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
