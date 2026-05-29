import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Colors } from '@/theme/colors';

export default function TryOnTab() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Virtual Try-On
          </Text>

          <Text style={styles.subtitle}>
            Upload your photo and preview
            glasses in real time
          </Text>
        </View>

        {/* Preview Card */}
        <View style={styles.previewCard}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.previewImage}
            />
          ) : (
            <View style={styles.emptyPreview}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="camera-outline"
                  size={42}
                  color="#171717"
                />
              </View>

              <Text style={styles.previewTitle}>
                Upload Your Face Photo
              </Text>

              <Text style={styles.previewText}>
                Front-facing image works best
                for accurate try-on results
              </Text>
            </View>
          )}
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickImage}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={22}
            color="#FFF"
          />

          <Text style={styles.uploadButtonText}>
            {image ? 'Change Photo' : 'Upload Photo'}
          </Text>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.featureContainer}>
          <View style={styles.featureCard}>
            <Ionicons
              name="glasses-outline"
              size={28}
              color="#171717"
            />

            <Text style={styles.featureTitle}>
              Smart Fit
            </Text>

            <Text style={styles.featureText}>
              AI adjusts glasses to
              your face shape
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons
              name="sparkles-outline"
              size={28}
              color="#171717"
            />

            <Text style={styles.featureTitle}>
              Realistic Preview
            </Text>

            <Text style={styles.featureText}>
              See accurate lighting
              and frame sizing
            </Text>
          </View>
        </View>

        {/* Recommended */}
        <View style={styles.recommendContainer}>
          <Text style={styles.sectionTitle}>
            Recommended For You
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.glassCard}
                activeOpacity={0.9}
              >
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
                  }}
                  style={styles.glassImage}
                />

                <Text style={styles.glassTitle}>
                  Premium Frame
                </Text>

                <Text style={styles.glassPrice}>
                  $120
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#171717',
  },

  subtitle: {
    marginTop: 10,

    fontSize: 15,
    lineHeight: 24,

    color: '#7A7A7A',
  },

  previewCard: {
    marginTop: 30,
    marginHorizontal: 24,

    height: 420,

    borderRadius: 32,

    backgroundColor: '#FFFFFF',

    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  emptyPreview: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  iconCircle: {
    width: 90,
    height: 90,

    borderRadius: 999,

    backgroundColor: '#F4F4F4',

    justifyContent: 'center',
    alignItems: 'center',
  },

  previewTitle: {
    marginTop: 24,

    fontSize: 22,
    fontWeight: '700',

    color: '#171717',
  },

  previewText: {
    marginTop: 10,

    fontSize: 14,
    lineHeight: 22,

    textAlign: 'center',

    color: '#7A7A7A',
  },

  uploadButton: {
    marginTop: 24,
    marginHorizontal: 24,

    backgroundColor: Colors.primary,

    borderRadius: 999,

    paddingVertical: 18,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,
  },

  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 30,
    paddingHorizontal: 24,
  },

  featureCard: {
    width: '48%',

    backgroundColor: '#FFF',

    borderRadius: 24,

    padding: 20,

    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  featureTitle: {
    marginTop: 16,

    fontSize: 18,
    fontWeight: '700',

    color: '#171717',
  },

  featureText: {
    marginTop: 8,

    fontSize: 13,
    lineHeight: 20,

    color: '#7A7A7A',
  },

  recommendContainer: {
    marginTop: 36,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',

    color: '#171717',

    paddingHorizontal: 24,
    marginBottom: 20,
  },

  glassCard: {
    width: 180,

    backgroundColor: '#FFF',

    borderRadius: 24,

    marginLeft: 24,

    overflow: 'hidden',

    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  glassImage: {
    width: '100%',
    height: 180,

    resizeMode: 'cover',
  },

  glassTitle: {
    fontSize: 18,
    fontWeight: '600',

    color: '#171717',

    paddingHorizontal: 16,
    paddingTop: 16,
  },

  glassPrice: {
    fontSize: 16,
    fontWeight: '700',

    color: Colors.primary,

    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 8,
  },
});