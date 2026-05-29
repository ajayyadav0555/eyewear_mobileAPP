import { Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PagesLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="details/product/[id]"

                options={{
                    headerShown: true,
                    headerTransparent: true,

                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 20, paddingHorizontal: 10 }}>
                            <Ionicons
                                name="share-outline"
                                size={24}
                                color="gray"
                            />
                            <Ionicons
                                name="heart"
                                size={24}
                                color="gray"
                            />
                        </View>
                    )
                }}
            />

            <Stack.Screen
                name='details/category/[category]'
                options={{
                    headerShown: true,
                    headerTransparent: true,

                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 20, paddingHorizontal: 10 }}>
                            <Ionicons
                                name="share-outline"
                                size={24}
                                color="gray"
                            />
                            <Ionicons
                                name="heart"
                                size={24}
                                color="gray"
                            />
                        </View>
                    )
                }}
            />

            <Stack.Screen
                name="cart/cart"
                options={{
                    headerShown: false,
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="address/adress"
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="payment/payment"
                options={{
                    headerShown: false,
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

        </Stack>
    );
}