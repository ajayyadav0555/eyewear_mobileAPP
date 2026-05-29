import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  Pressable,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Colors } from '@/theme/colors';
import { useAuth } from '@/context/auth-context';

const SETTINGS = [
  {
    title: 'Account',
    items: [
      {
        icon: 'person-outline',
        label: 'Profile',
        right: 'chevron-forward',
      },
      {
        icon: 'location-outline',
        label: 'Saved Addresses',
        right: 'chevron-forward',
      },
      {
        icon: 'card-outline',
        label: 'Payment Methods',
        right: 'chevron-forward',
      },
    ],
  },
  {
    title: 'Shopping',
    items: [
      {
        icon: 'bag-handle-outline',
        label: 'My Orders',
        right: 'chevron-forward',
      },
      {
        icon: 'heart-outline',
        label: 'Wishlist',
        right: 'chevron-forward',
      },
      {
        icon: 'pricetag-outline',
        label: 'Coupons & Offers',
        right: 'chevron-forward',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        icon: 'notifications-outline',
        label: 'Push Notifications',
        switch: true,
      },
      {
        icon: 'moon-outline',
        label: 'Dark Mode',
        switch: true,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: 'help-circle-outline',
        label: 'Help Center',
        right: 'chevron-forward',
      },
      {
        icon: 'chatbubble-ellipses-outline',
        label: 'Live Chat',
        right: 'chevron-forward',
      },
      {
        icon: 'document-text-outline',
        label: 'Terms & Conditions',
        right: 'chevron-forward',
      },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);


  const { darkMode, setDarkMode, cart, fav } = useAuth();
  console.log(darkMode, 'dark')
  // toggle theme

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Settings
        </Text>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#171717"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {user?.name}
            </Text>

            <Text style={styles.email}>
              {user?.email}
            </Text>

            <View style={styles.memberBadge}>
              <Ionicons
                name="diamond-outline"
                size={14}
                color="#FFF"
              />

              <Text style={styles.memberText}>
                Premium Member
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Pressable style={styles.statCard} onPress={() => router.push('/pages/cart/cart')}>
            <Ionicons
              name="bag-outline"
              size={22}
              color={Colors.primary}
            />

            <Text style={styles.statNumber}>{cart?.length}</Text>

            <Text style={styles.statLabel}>
              Orders
            </Text>
          </Pressable>

          <Pressable style={styles.statCard} onPress={()=>router.push('/(app)/favourite')}>
            <Ionicons
              name="heart-outline"
              size={22}
              color={Colors.primary}
            />

            <Text style={styles.statNumber}>{fav?.length}</Text>

            <Text style={styles.statLabel}>
              Wishlist
            </Text>
          </Pressable>

          <View style={styles.statCard}>
            <Ionicons
              name="star-outline"
              size={22}
              color={Colors.primary}
            />

            <Text style={styles.statNumber}>4.9</Text>

            <Text style={styles.statLabel}>
              Rating
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        {SETTINGS.map((section, index) => (
          <View
            key={index}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>
              {section.title}
            </Text>

            <View style={styles.card}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.row,
                    itemIndex !== section.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: '#F2F2F2',
                    },
                  ]}
                >
                  <View style={styles.leftRow}>
                    <View style={styles.iconWrapper}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color="#171717"
                      />
                    </View>

                    <Text style={styles.rowLabel}>
                      {item.label}
                    </Text>
                  </View>

                  {item?.switch ? (
                    <Switch
                      value={
                        item.label === 'Push Notifications'
                          ? notificationsEnabled
                          : darkMode
                      }
                      onValueChange={(value) => {
                        if (item.label === 'Push Notifications') {
                          setNotificationsEnabled(value);
                        } else {
                          setDarkMode(value);
                        }
                      }}
                      trackColor={{
                        false: '#D9D9D9',
                        true: Colors.primary,
                      }}
                      thumbColor="#FFF"
                    />
                  ) : (
                    <Ionicons
                      name={item?.right as any}
                      size={18}
                      color="#999"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => { signOut() }}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#FF4D4F"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>
          Eyewear App v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#171717',
  },

  iconButton: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: '#FFF',

    borderRadius: 28,

    padding: 18,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 16,
  },

  avatar: {
    width: 72,
    height: 72,

    borderRadius: 999,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },

  email: {
    fontSize: 13,
    color: '#777',

    marginTop: 4,
  },

  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'flex-start',

    backgroundColor: Colors.primary,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 999,

    marginTop: 10,

    gap: 6,
  },

  memberText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 22,
  },

  statCard: {
    width: '31%',

    backgroundColor: '#FFF',

    borderRadius: 24,

    paddingVertical: 20,

    alignItems: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',

    marginTop: 10,

    color: '#171717',
  },

  statLabel: {
    fontSize: 13,
    color: '#777',

    marginTop: 4,
  },

  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',

    color: '#777',

    marginBottom: 14,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 26,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 14,
  },

  iconWrapper: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#F7F7F7',

    justifyContent: 'center',
    alignItems: 'center',
  },

  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },

  logoutButton: {
    marginHorizontal: 20,
    marginTop: 32,

    backgroundColor: '#FFF0F0',

    borderRadius: 20,

    paddingVertical: 18,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,
  },

  logoutText: {
    color: '#FF4D4F',
    fontSize: 16,
    fontWeight: '600',
  },

  version: {
    textAlign: 'center',
    marginTop: 24,

    color: '#999',
    fontSize: 13,
  },
});