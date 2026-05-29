import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/theme/colors';
import InputComponent from '@/components/InputComponent';
import { useRouter } from 'expo-router';
import GlassesPills from '@/components/Pills';
import GlassesCardList from '@/components/BigCard';
import { glassesData } from '@/constants/theme';

const Header = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState<string | null>("");
  const [selected, setSelected] = useState('All');

  const filterProduct = () => {
    return glassesData.filter((item: any) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes((searchText || '').toLowerCase());

      const matchesCategory =
        selected === 'All'
          ? true
          : item.category
            .toLowerCase()
            .includes(selected.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        {/* Logo/Text */}
        <View style={styles.subContainer}>
          <Text style={styles.title}>
            Style in Every{"\n"}
            Glance
          </Text>

          {/* Right Icons */}
          <View style={styles.iconContainer}>

            <TouchableOpacity style={styles.iconButton}>

              <View style={styles.innerCircle}>
                <Ionicons
                  name="sparkles-outline"
                  size={20}
                  color="#171717"
                />
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton2} onPress={() => {
              router.push('/pages/cart/cart')

            }}>
              <Ionicons
                name="cart"
                size={22}
                color="#171717"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.secondContainer}>
        <InputComponent searchText={searchText} setSearchText={setSearchText} />
        <View style={styles.pillsContainer}>
          <GlassesPills selected={selected} setSelected={setSelected} />
        </View>
        <View style={styles.filterContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text style={{ color: "black", fontSize: 20 }}>Eyeglasses</Text>
              <Text style={styles.powerpill}>Peak power</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.filterText}><Text>Men</Text>  <Ionicons name="chevron-down" size={12} color="black" /></Text>
            </TouchableOpacity>
          </View>
          <GlassesCardList data={filterProduct()} grid={true} selected={selected} showSeeAll={true} />
        </View>

      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {


    backgroundColor: Colors.primary,
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  innerCircle: {
    width: 36,
    height: 36,

    borderRadius: 999,

    borderWidth: 1,
    borderColor: '#E8E8E8',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F9F9F9',
  },
  iconButton2: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E8E8E8',

    marginLeft: 12,
  },
  secondContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20
  },
  pillsContainer: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
  filterContainer: {
    flex: 1,
    marginTop: 3,
    // padding: 15

  },
  powerpill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#F5F5F5',

    fontSize: 9,
    color: "#171717",

    borderWidth: 1,
    borderColor: "#E8E8E8",

  }, filterText: {
    color: "black", fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#F5F5F5',

    // fontSize: 9,
    // color: "#171717",

    borderWidth: 1,
    borderColor: "#E8E8E8",


  }
});