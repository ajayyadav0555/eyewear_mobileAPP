import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    Stack,
    useRouter,
} from 'expo-router';

import {
    Ionicons,
} from '@expo/vector-icons';

import { useAuth } from '@/context/auth-context';
import LottieView from 'lottie-react-native';

const Cart = () => {

    const router = useRouter();

    const {
        cart,
        removeCart,
        increaseQty,
        decreaseQty
    } = useAuth();


    // example cart data

    const total = cart.reduce(
        (sum: number, item: any) =>
            sum +
            Number(item.price.replace('$', '')) * item.qty,
        0
    );
    return (
        <SafeAreaView
            edges={['top']}
            style={styles.safe}
        >

            <Stack.Screen
                options={{
                    headerShown: true,

                    headerTitle: 'Cart',

                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                router.back()
                            }
                        >
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            {
                cart.length == 0 ? (<View style={styles.emptyContainer}>

                    <LottieView
                        source={require('@/assets/animation/empty-cart.json')}
                        autoPlay
                        loop
                        style={{
                            width: 260,
                            height: 260,
                        }}
                    />

                    <Text style={styles.emptyTitle}>
                        Your Cart is Empty
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Add your favorite glasses to continue shopping
                    </Text>

                </View>)
                    : (<View style={styles.container}>

                        <FlatList
                            data={cart}
                            keyExtractor={(item) =>
                                item.id
                            }
                            showsVerticalScrollIndicator={
                                false
                            }
                            renderItem={({ item }) => {

                                return (
                                    <View
                                        style={styles.card}
                                    >

                                        {/* IMAGE */}
                                        <Image
                                            source={{
                                                uri:
                                                    item.image,
                                            }}
                                            style={
                                                styles.image
                                            }
                                        />

                                        {/* CONTENT */}
                                        <View
                                            style={
                                                styles.content
                                            }
                                        >

                                            <Text
                                                numberOfLines={
                                                    1
                                                }
                                                style={
                                                    styles.title
                                                }
                                            >
                                                {
                                                    item.title
                                                }
                                            </Text>

                                            <Text
                                                style={
                                                    styles.price
                                                }
                                            >
                                                ₹
                                                {
                                                    item.price
                                                }
                                            </Text>

                                            {/* QUANTITY */}
                                            <View
                                                style={
                                                    styles.qtyContainer
                                                }
                                            >

                                                <TouchableOpacity
                                                    style={
                                                        styles.qtyBtn
                                                    }
                                                    onPress={() => {
                                                        decreaseQty(item)
                                                    }}
                                                    disabled={item.qty === 1}
                                                >

                                                    <Text>
                                                        -
                                                    </Text>

                                                </TouchableOpacity>

                                                <Text
                                                    style={
                                                        styles.qtyText
                                                    }
                                                >
                                                    {
                                                        item.qty
                                                    }
                                                </Text>

                                                <TouchableOpacity
                                                    style={
                                                        styles.qtyBtn
                                                    }
                                                    onPress={() => {
                                                        increaseQty(item)
                                                    }}
                                                >

                                                    <Text>
                                                        +
                                                    </Text>

                                                </TouchableOpacity>

                                            </View>

                                        </View>

                                        {/* DELETE */}
                                        <TouchableOpacity onPress={() => {
                                            removeCart(item)
                                        }}>

                                            <Ionicons
                                                name="trash-outline"
                                                size={22}
                                                color="red"
                                            />

                                        </TouchableOpacity>

                                    </View>
                                );
                            }}
                        />

                        {/* BOTTOM */}
                        {cart.length > 0 && <View
                            style={styles.bottom}
                        >

                            <View>

                                <Text
                                    style={
                                        styles.totalLabel
                                    }
                                >
                                    Total
                                </Text>

                                <Text
                                    style={
                                        styles.total
                                    }
                                >
                                    ₹{total}
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={
                                    styles.checkoutBtn
                                } onPress={()=>router.navigate('/pages/address/adress')}
                            >

                                <Text
                                    style={
                                        styles.checkoutText
                                    }
                                >
                                    Checkout
                                </Text>

                            </TouchableOpacity>

                        </View>}

                    </View>)
            }

        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({

    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40
    },

    card: {
        flexDirection: 'row',

        backgroundColor: '#fff',

        borderRadius: 18,

        padding: 12,

        marginBottom: 14,

        alignItems: 'center',

        elevation: 2,
    },

    image: {
        width: 90,

        height: 90,

        borderRadius: 14,
    },

    content: {
        flex: 1,

        marginLeft: 14,
    },

    title: {
        fontSize: 16,

        fontWeight: '700',

        color: '#111',
    },

    price: {
        fontSize: 18,

        fontWeight: '700',

        marginTop: 8,

        color: '#000',
    },

    qtyContainer: {
        flexDirection: 'row',

        alignItems: 'center',

        marginTop: 12,
    },

    qtyBtn: {
        width: 30,

        height: 30,

        borderRadius: 8,

        backgroundColor: '#F3F4F6',

        justifyContent: 'center',

        alignItems: 'center',
    },

    qtyText: {
        marginHorizontal: 14,

        fontSize: 16,

        fontWeight: '700',
    },

    bottom: {
        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

        paddingVertical: 18,

        borderTopWidth: 1,

        borderColor: '#EEE',
    },

    totalLabel: {
        fontSize: 14,

        color: '#666',
    },

    total: {
        fontSize: 24,

        fontWeight: '700',

        marginTop: 4,
    },

    checkoutBtn: {
        backgroundColor: '#000',

        paddingHorizontal: 26,

        paddingVertical: 14,

        borderRadius: 14,
    },

    checkoutText: {
        color: '#fff',

        fontWeight: '700',

        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    emptyTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
        marginTop: 10,
    },

    emptySubtitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 22,
    },
});