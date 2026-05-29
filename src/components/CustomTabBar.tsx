import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const icons: any = {
  index: 'home-outline',
  favourite: 'heart-outline',
home2: 'glasses-outline',  explore: 'settings-outline',
};



export default function CustomTabBar({
  state,
  descriptors,
  navigation,
} :any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route:any, index:any) => {
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                isFocused && styles.activeTab,
              ]}
            >
              <Ionicons
                name={icons[route.name]}
                size={24}
                color={isFocused ? '#0D0D0D' : '#FFFFFF'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 2,
    left: 20,
    right: 20,

    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',

    backgroundColor: '#2E8B57',

    borderRadius: 999,

    paddingVertical: 5,
    paddingHorizontal: 5,

    alignItems: 'center',
    // justifyContent: 'space-between',
    // width: '92%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    elevation: 10,
  },

  tabButton: {
    width: 62,
    height: 62,

    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 1,
    backgroundColor:'#FFFFFF20'
  },

  activeTab: {
    backgroundColor: 'white',
  },
});