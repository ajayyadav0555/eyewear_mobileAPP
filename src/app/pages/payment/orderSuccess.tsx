import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Stack, useRouter } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';

const OrderSuccess = () => {




  const router = useRouter();


  const Submit = () => {
    router.replace('/(app)');
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* LOTTIE */}
      <LottieView
        source={require('@/assets/animation/order-Successs.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />

      {/* TEXT */}
      <Text style={styles.title}>
        Order Placed Successfully
      </Text>

      <Text style={styles.subTitle}>
        Your order has been
        confirmed and will be
        delivered soon.
      </Text>

      <TouchableOpacity onPress={Submit}>
        <Text style={styles.button}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  animation: {
    width: 260,
    height: 260,
  },

  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },

  subTitle: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },

  button: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2E8B57',
    borderRadius: 20,
  },
});