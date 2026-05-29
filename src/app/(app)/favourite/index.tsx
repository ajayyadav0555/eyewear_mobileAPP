import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/auth-context';
import GlassesCardList from '@/components/BigCard';
import { Colors } from '@/theme/colors';

export default function Favourite() {
  const { fav } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#171717"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Wishlist
        </Text>

        <View style={{ width: 44 }} />
      </View>

      {/* Favourite Count */}
      {fav.length > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {fav.length} saved items
          </Text>
        </View>
      )}

      {/* Content */}
      {fav.length > 0 ? (
        <GlassesCardList data={fav} />
      ) : (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require('../../../../assets/animation/empty-box.json')}
            autoPlay
            loop
            style={styles.animation}
          />

          <Text style={styles.emptyTitle}>
            No favourites yet
          </Text>

          <Text style={styles.emptySubtitle}>
            Save your favourite eyewear styles
            and access them anytime.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/(app)')}
          >
            <Text style={styles.shopButtonText}>
              Explore Collection
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal:20
    
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // paddingHorizontal: 20,
    // paddingVertical: 16,
  },

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: '#F5F5F5',

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171717',
  },

  countContainer: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  countText: {
    fontSize: 14,
    color: '#777',
  },

  emptyContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 30,
  },

  animation: {
    width: 260,
    height: 260,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',

    color: '#171717',

    marginTop: 10,
  },

  emptySubtitle: {
    fontSize: 15,
    lineHeight: 24,

    color: '#7A7A7A',

    textAlign: 'center',

    marginTop: 10,
    marginBottom: 28,
  },

  shopButton: {
    backgroundColor: Colors.primary,

    paddingHorizontal: 26,
    paddingVertical: 16,

    borderRadius: 999,
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});