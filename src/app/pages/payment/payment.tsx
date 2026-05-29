import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Stack, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/auth-context';

const Payment = () => {
    const router = useRouter();
    const { clearCart } = useAuth()
    const [paymentMethod, setPaymentMethod] =
        useState('upi');
    const [loading, setLoading] = useState(false);
    const {
        cart,
        selectedAddress,
    } = useAuth();

    const subtotal = cart.reduce(
        (sum: number, item: any) =>
            sum +
            Number(
                item.price.replace('$', '')
            ) *
            item.qty,
        0
    );


    const ConfirmPayment = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            clearCart();
            router.push({
                pathname: "/pages/payment/orderSuccess",
            });
        }, 1000);

    }

    const deliveryFee = 10;

    const tax = 5;

    const total =
        subtotal + deliveryFee + tax;

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Stack.Screen
                options={{
                    title: 'Payment',
                    headerShown: true,
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >
                {/* ADDRESS */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            Delivery Address
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                router.back()
                            }
                        >
                            <Text
                                style={styles.change}
                            >
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addressRow}>
                        <Ionicons
                            name="location"
                            size={20}
                            color="#000"
                        />

                        <Text
                            style={
                                styles.addressText
                            }
                        >
                            {
                                selectedAddress?.address
                            }
                        </Text>
                    </View>
                </View>

                {/* PRODUCTS */}
                <View style={styles.card}>
                    <Text style={styles.title}>
                        Order Items
                    </Text>

                    <FlatList
                        data={cart}
                        scrollEnabled={false}
                        keyExtractor={(item) =>
                            item.id
                        }
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={
                                        styles.productCard
                                    }
                                >
                                    <Image
                                        source={{
                                            uri: item.image,
                                        }}
                                        style={
                                            styles.image
                                        }
                                    />

                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={
                                                styles.productTitle
                                            }
                                        >
                                            {
                                                item.title
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                styles.qty
                                            }
                                        >
                                            Qty: {item.qty}
                                        </Text>

                                        <Text
                                            style={
                                                styles.price
                                            }
                                        >
                                            {item.price}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>

                {/* PAYMENT METHOD */}
                <View style={styles.card}>
                    <Text style={styles.title}>
                        Payment Method
                    </Text>

                    {/* CARD */}
                    <TouchableOpacity
                        style={styles.paymentOption}
                    >
                        <Ionicons
                            name="card-outline"
                            size={22}
                            color="#000"
                        />

                        <Text
                            style={styles.paymentText}
                        >
                            Credit / Debit Card
                        </Text>

                        <Ionicons
                            name="radio-button-off"
                            size={22}
                            color="#999"
                        />
                    </TouchableOpacity>

                    {/* UPI */}
                    <TouchableOpacity
                        style={styles.paymentOption}
                    >
                        <Ionicons
                            name="phone-portrait-outline"
                            size={22}
                            color="#000"
                        />

                        <View style={{ flex: 1 }}>
                            <Text
                                style={styles.paymentText}
                            >
                                UPI Payment
                            </Text>

                            <Text
                                style={styles.upiSubText}
                            >
                                Google Pay, PhonePe, Paytm
                            </Text>
                        </View>

                        <Ionicons
                            name="radio-button-on"
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>

                    {/* COD */}
                    <TouchableOpacity
                        style={styles.paymentOption}
                    >
                        <Ionicons
                            name="cash-outline"
                            size={22}
                            color="#000"
                        />

                        <Text
                            style={styles.paymentText}
                        >
                            Cash on Delivery
                        </Text>

                        <Ionicons
                            name="radio-button-off"
                            size={22}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>

                {/* PRICE DETAILS */}
                <View style={styles.card}>
                    <Text style={styles.title}>
                        Price Details
                    </Text>

                    <View style={styles.billRow}>
                        <Text
                            style={
                                styles.billLabel
                            }
                        >
                            Subtotal
                        </Text>

                        <Text
                            style={
                                styles.billValue
                            }
                        >
                            ${subtotal.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text
                            style={
                                styles.billLabel
                            }
                        >
                            Delivery Fee
                        </Text>

                        <Text
                            style={
                                styles.billValue
                            }
                        >
                            ${deliveryFee}
                        </Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text
                            style={
                                styles.billLabel
                            }
                        >
                            Tax
                        </Text>

                        <Text
                            style={
                                styles.billValue
                            }
                        >
                            ${tax}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.billRow}>
                        <Text
                            style={
                                styles.totalLabel
                            }
                        >
                            Total
                        </Text>

                        <Text
                            style={
                                styles.totalValue
                            }
                        >
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* PLACE ORDER BUTTON */}
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => {
                    ConfirmPayment();
                }}
                disabled={loading}
                    style={styles.orderBtn}
                >
                    <Text
                        style={styles.orderText}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 30
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 18,
        padding: 16,
    },

    row: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    change: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },

    addressRow: {
        flexDirection: 'row',
        marginTop: 14,
        gap: 10,
        alignItems: 'flex-start',
    },

    addressText: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },

    productCard: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 14,
    },

    image: {
        width: 85,
        height: 85,
        borderRadius: 14,
    },

    productTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111',
    },

    qty: {
        marginTop: 8,
        color: '#666',
    },

    price: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        gap: 12,
    },

    paymentText: {
        flex: 1,
        fontSize: 15,
        color: '#111',
    },

    billRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        marginTop: 16,
    },

    billLabel: {
        fontSize: 15,
        color: '#666',
    },

    billValue: {
        fontSize: 15,
        color: '#111',
        fontWeight: '600',
    },

    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 18,
    },

    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },

    bottom: {
        padding: 16,
        backgroundColor: '#fff',
    },

    orderBtn: {
        height: 56,
        backgroundColor: '#111',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    orderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    upiSubText: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
});