import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/auth-context';

import { useRouter } from 'expo-router';

import { glassesData } from '@/constants/theme';

import { Colors } from '@/theme/colors';

export default function GlassesCardList({
    data,
    grid = false,
    selected,
    showSeeAll = false,
}: any) {

    const {
        addToFav,
        removeFav,
        fav,
        addToCart,
    } = useAuth();

    const router = useRouter();

    const toggleFav = (item: any) => {

        if (
            fav.some(
                (i: any) => i.id === item.id
            )
        ) {
            removeFav(item);
        } else {
            addToFav(item);
        }
    };

    const renderItem = ({ item }: any) => {

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={[
                    styles.card,

                    grid
                        ? styles.gridCard
                        : styles.listCard,
                ]}
                onPress={() => {
                    router.push({
                        pathname:
                            '/pages/details/product/[id]',

                        params: {
                            id: item.id,
                        },
                    });
                }}
            >

                {/* Image */}
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={styles.image}
                />

                {/* Dark Overlay */}
                <View style={styles.overlay} />

                {/* Heart */}
                <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() =>
                        toggleFav(item)
                    }
                >
                    <Ionicons
                        name="heart"
                        size={20}
                        color={
                            fav.some(
                                (i: any) =>
                                    i.id === item.id
                            )
                                ? 'red'
                                : '#fff'
                        }
                    />
                </TouchableOpacity>

                {/* TOP LEFT TITLE */}
                <View style={styles.topLeft}>

                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {item.title}
                    </Text>

                </View>

                {/* BOTTOM SECTION */}
                <View
                    style={styles.bottomContainer}
                >

                    {/* Price */}
                    <View>

                        <Text
                            style={styles.priceLabel}
                        >
                            Price
                        </Text>

                        <Text
                            style={styles.price}
                        >
                            {item.price}
                        </Text>

                    </View>

                    {/* Add To Cart */}
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => {
                            addToCart(item)
                        }}
                    >

                        <Ionicons
                            name="cart"
                            size={18}
                            color="#fff"
                        />

                        <Text
                            style={styles.cartText}
                        >
                            Add
                        </Text>

                    </TouchableOpacity>

                </View>

            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={data || glassesData}
            key={grid ? 'GRID' : 'LIST'}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={grid ? 2 : 1}
            columnWrapperStyle={
                grid
                    ? {
                        justifyContent:
                            'space-between',
                    }
                    : undefined
            }
            showsVerticalScrollIndicator={
                false
            }
            contentContainerStyle={{
                paddingBottom: 140,
            }}
            ListFooterComponent={() => {

                if (
                    showSeeAll &&
                    selected != 'All'
                ) {
                    return (
                        <View>

                            <TouchableOpacity
                                style={
                                    styles.seeMoreButton
                                }
                                onPress={() => {
                                    router.push({
                                        pathname:
                                            '/pages/details/category/[category]',

                                        params: {
                                            category:
                                                selected,
                                        },
                                    });
                                }}
                            >

                                <Text
                                    style={
                                        styles.seeMoreText
                                    }
                                >
                                    See More
                                </Text>

                            </TouchableOpacity>

                        </View>
                    );
                }
            }}
            ListEmptyComponent={() => {

                return (
                    <View
                        style={
                            styles.emptyContainer
                        }
                    >

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            No Data Found
                        </Text>

                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({

    card: {
        borderRadius: 26,

        overflow: 'hidden',

        backgroundColor: '#EEE',

        position: 'relative',

        borderWidth: 0.5,

        borderColor: '#ccc',
    },

    listCard: {
        height: 380,

        marginBottom: 22,

        marginHorizontal: 10,
    },

    gridCard: {
        width: '48%',

        height: 220,

        marginBottom: 18,
    },

    image: {
        width: '100%',

        height: '100%',
    },

    overlay: {
        position: 'absolute',

        width: '100%',

        height: '100%',

        backgroundColor:
            'rgba(0,0,0,0.25)',
    },

    heartButton: {
        position: 'absolute',

        top: 14,

        right: 14,

        width: 42,

        height: 42,

        borderRadius: 999,

        backgroundColor:
            'rgba(255,255,255,0.2)',

        alignItems: 'center',

        justifyContent: 'center',
    },

    topLeft: {
        position: 'absolute',

        top: 18,

        left: 16,

        right: 60,
    },

    title: {
        color: '#fff',

        fontSize: 15,

        fontWeight: '700',
    },

    bottomContainer: {
        position: 'absolute',

        left: 16,

        right: 16,

        bottom: 16,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent:
            'space-between',
    },

    priceLabel: {
        color: '#E5E5E5',

        fontSize: 12,
    },

    price: {
        color: '#fff',

        fontSize: 22,

        fontWeight: '700',

        marginTop: 2,
    },

    cartButton: {
        flexDirection: 'row',

        alignItems: 'center',

        backgroundColor:
            Colors.primary,

        paddingHorizontal: 16,

        paddingVertical: 10,

        borderRadius: 14,
    },

    cartText: {
        color: '#fff',

        fontWeight: '700',

        marginLeft: 6,
    },

    seeMoreButton: {
        width: '100%',

        height: 50,

        backgroundColor:
            Colors.primary,

        borderRadius: 10,

        justifyContent: 'center',

        alignItems: 'center',

        marginVertical: 10,
    },

    seeMoreText: {
        color: '#fff',

        fontWeight: '700',

        fontSize: 16,
    },

    emptyContainer: {
        flex: 1,

        justifyContent: 'center',

        alignItems: 'center',

        height: 100,
    },

    emptyText: {
        color: 'black',

        fontSize: 16,
    },
});