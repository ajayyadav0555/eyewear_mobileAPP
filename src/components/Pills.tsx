import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { GLASSES_FILTERS } from '../constants/theme';
import { Colors } from '@/theme/colors';

const GlassesPills = ({selected,setSelected}:any) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {GLASSES_FILTERS.map((item) => {
        const isSelected = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => setSelected(item)}
            style={[ 
              styles.pill,
              isSelected && styles.selectedPill,
            ]}
          >
            <Text
              style={[
                styles.text,
                isSelected && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default GlassesPills;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingVertical: 12,
  },

  pill: {
    paddingHorizontal: 34,
    paddingVertical: 12,

    borderRadius: 999,

    backgroundColor: '#F3F3F3',

    marginRight: 12,
    borderWidth:1,
    borderColor:'#E8E8E8'
  },

  selectedPill: {
    backgroundColor: Colors.primary,
     borderWidth:1,
    borderColor:'#E8E8E8'
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },

  selectedText: {
    color: '#FFF',
  },
});