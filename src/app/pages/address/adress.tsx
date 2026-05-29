import React, { useState } from 'react';

import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   FlatList,
   Alert,
} from 'react-native';


import { Stack, useRouter } from 'expo-router';

import { useAuth } from '@/context/auth-context';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/theme/colors';

const Address = () => {
   const router = useRouter();

   const [address, setAddress] = useState('');

   const {
      addresses,
      addAddress,
      selectedAddress,
      selectAddress,
      removeAddress,
   } = useAuth();

   const saveAddress = async () => {
      if (!address.trim()) {
         Alert.alert(
            'Address Required',
            'Please enter delivery address'
         );
         return;
      }

      await addAddress({
         address,
      });

      setAddress('');
   };

   return (
      <SafeAreaView style={styles.container}>
         <Stack.Screen options={{ title: 'Delivery Address' }} />
         {/* HEADER */}
         <Text style={styles.heading}>
            Delivery Address
         </Text>

         <Text style={styles.subHeading}>
            Select saved address or add new one
         </Text>

         {/* SAVED ADDRESSES */}
         {addresses.length > 0 && (
            <View style={styles.savedContainer}>
               <Text style={styles.savedTitle}>
                  Saved Addresses
               </Text>

               <FlatList
                  data={addresses}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                     const isSelected =
                        selectedAddress?.id ===
                        item.id;

                     return (
                        <TouchableOpacity
                           activeOpacity={0.8}
                           onPress={() =>
                              selectAddress(item)
                           }
                           style={[
                              styles.addressCard,

                              isSelected && {
                                 borderColor:
                                    '#000',
                                 backgroundColor:
                                    '#F8F8F8',
                              },
                           ]}
                        >
                           {/* LEFT */}
                           <View
                              style={{
                                 flex: 1,
                              }}
                           >
                              <View
                                 style={
                                    styles.row
                                 }
                              >
                                 <Ionicons
                                    name={
                                       isSelected
                                          ? 'radio-button-on'
                                          : 'radio-button-off'
                                    }
                                    size={20}
                                    color="#000"
                                 />

                                 <Text
                                    style={
                                       styles.homeText
                                    }
                                 >
                                    Home
                                 </Text>
                              </View>

                              <Text
                                 style={
                                    styles.addressText
                                 }
                              >
                                 {
                                    item.address
                                 }
                              </Text>
                           </View>

                           {/* DELETE */}
                           <TouchableOpacity
                              onPress={() =>
                                 removeAddress(
                                    item.id
                                 )
                              }
                           >
                              <Ionicons
                                 name="trash-outline"
                                 size={22}
                                 color="red"
                              />
                           </TouchableOpacity>
                        </TouchableOpacity>
                     );
                  }}
               />
            </View>
         )}

         {/* ADD NEW ADDRESS */}
         {addresses.length < 3 && (
            <>
               <Text style={styles.addTitle}>
                  Add New Address
               </Text>

               <TextInput
                  placeholder="Enter complete address"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  style={styles.input}
               />

               <TouchableOpacity
                  style={styles.button}
                  onPress={saveAddress}
               >
                  <Text
                     style={styles.buttonText}
                  >
                     Save & Continue
                  </Text>
               </TouchableOpacity>
            </>
         )}

         {/* LIMIT MESSAGE */}
         {addresses.length >= 3 && (
            <View style={styles.limitBox}>
               <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#666"
               />

               <Text style={styles.limitText}>
                  Maximum 3 addresses allowed
               </Text>
            </View>
         )}

         {/* CONTINUE BUTTON */}
         {selectedAddress && (
            <TouchableOpacity
               style={styles.checkoutBtn}
               onPress={() => {
                  router.push(
                     '/pages/payment/payment'
                  );
               }}
            >
               <Text
                  style={
                     styles.checkoutText
                  }
               >
                  Continue with Selected
                  Address
               </Text>
            </TouchableOpacity>
         )}
      </SafeAreaView>
   );
};

export default Address;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop:60
   },

   heading: {
      fontSize: 28,
      fontWeight: '700',
      color: '#111',
   },

   subHeading: {
      fontSize: 14,
      color: '#666',
      marginTop: 6,
      marginBottom: 24,
   },

   savedContainer: {
      marginBottom: 24,
   },

   savedTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 14,
      color: '#111',
   },

   addressCard: {
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
   },

   row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
   },

   homeText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#111',
   },

   addressText: {
      fontSize: 14,
      lineHeight: 22,
      color: '#555',
   },

   addTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 14,
      color: '#111',
   },

   input: {
      height: 120,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 18,
      padding: 16,
      textAlignVertical: 'top',
      fontSize: 15,
      color: '#111',
   },

   button: {
      height: 56,
      backgroundColor: '#000',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 18,
   },

   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
   },

   limitBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
   },

   limitText: {
      color: '#666',
      fontSize: 14,
   },

   checkoutBtn: {
      marginTop: 'auto',
      height: 58,
      backgroundColor: Colors.primary,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
   },

   checkoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
   },
});