import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Stack, useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { Ionicons } from "@expo/vector-icons";

import { glassesData } from "@/constants/theme";
import { useAuth } from "@/context/auth-context";

const { width } = Dimensions.get("window");

export default function Details() {
    const { id } = useLocalSearchParams();
    const sliderRef = useRef<FlatList>(null);
    const [showfull, setShowFull] = useState(false);
    const glasses = glassesData.find(
        (item) => item.id === id
    );

    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        glasses?.image,

        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',

        'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1200&auto=format&fit=crop',

        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop',

        //   'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop',
    ];

    const lensTypes = [
        "Powered eyeglass",
        "Zero Power",
        "Reading Glasses",
    ];

    const {addToCart} =useAuth()


    return (
        <>
            <Stack.Screen
                options={{
                    title: glasses?.title,

                }}
            />

            <SafeAreaView style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {/* HEADER */}
                    {/* <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#000"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              View details
            </Text>

            <TouchableOpacity
              style={styles.iconBtn}
            >
              <Ionicons
                name="options-outline"
                size={22}
                color="#000"
              />
            </TouchableOpacity>
          </View> */}

                    {/* IMAGE SLIDER */}
                    <View style={styles.sliderWrapper}>
                        <FlatList
                            data={images}
                            ref={sliderRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) =>
                                index.toString()
                            }
                            onMomentumScrollEnd={(event) => {
                                const index = Math.round(
                                    event.nativeEvent.contentOffset.x /
                                    width
                                );

                                setActiveIndex(index);
                            }}
                            renderItem={({ item }) => (
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: item }}
                                        style={styles.image}
                                        contentFit="contain"
                                    />
                                </View>
                            )}
                        />

                        {/* ZOOM
            <View style={styles.zoomBadge}>
              <Text style={styles.zoomText}>
                4X
              </Text>
            </View> */}
                    </View>

                    {/* THUMBNAILS */}
                    <View style={styles.thumbnailRow}>
                        {images.map((item, index) => (
                            <TouchableOpacity onPress={() => {
                                setActiveIndex(index);
                                sliderRef.current?.scrollToIndex({
                                    index: index,
                                    animated: true
                                })
                            }}
                                key={index}
                                style={[
                                    styles.thumbBox,
                                    activeIndex === index &&
                                    styles.activeThumb,
                                ]}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={styles.thumbImage}
                                    contentFit="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* INFO */}
                    <View style={styles.infoContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>
                                Protection meets modern style.
                            </Text>

                            <TouchableOpacity
                                style={styles.similarBtn}
                            >
                                <Text style={styles.similarText}>
                                    Similar
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.subTitle}>
                            Ocean black full Rim Square
                        </Text>

                        <Text style={styles.greenText}>
                            With Free Anti-Glare Lenses
                        </Text>

                        <Text style={styles.price}>
                            {glasses?.price}
                        </Text>
                    </View>

                    {/* PRODUCT TYPES */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Product type
                        </Text>

                        <View style={styles.pillRow}>
                            {lensTypes.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.pill}
                                >
                                    <Text style={styles.pillTitle}>
                                        {item}
                                    </Text>

                                    {/* <Text style={styles.pillSub}>
                    Screen Glass
                  </Text> */}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>Description</Text>
                        <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>
                            {showfull ? glasses?.description : glasses?.description?.substring(0, 50) + "..."}
                        </Text>
                        <TouchableOpacity onPress={() => setShowFull(!showfull)}>
                            <Text style={{ fontSize: 16, color: "#000", marginTop: 10 }}>
                                {showfull ? "Read Less" : "Read More"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>Reviews</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 16, color: "gray" }}>{glasses?.rating}</Text>
                            <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>⭐</Text>

                        </View>
                    </View>

                    {/* BUTTONS */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.primaryBtn} 
                            onPress={() => addToCart(glasses)}    
                        >
                            <Text style={styles.primaryBtnText}>
                                Add to Cart 
                            </Text>
                            <Ionicons name="cart" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryBtn}
                        >
                            <Text style={styles.secondaryBtnText}>
                                Try This
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 20,
        paddingTop: 10,
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000",
    },

    iconBtn: {
        width: 48,
        height: 48,

        borderRadius: 999,

        backgroundColor: "#FFF",

        justifyContent: "center",
        alignItems: "center",
    },

    sliderWrapper: {
        marginTop: 20,
        alignItems: "center",
    },

    imageContainer: {
        width,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: width * 100,
        height: 240,
    },

    zoomBadge: {
        marginTop: 10,
        backgroundColor: "#2F8F4E",

        width: 54,
        height: 54,

        borderRadius: 999,

        justifyContent: "center",
        alignItems: "center",
    },

    zoomText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 18,
    },

    thumbnailRow: {
        flexDirection: "row",
        justifyContent: "center",

        marginTop: 24,
    },

    thumbBox: {
        width: 82,
        height: 82,

        borderRadius: 20,

        backgroundColor: "#FFF",

        marginHorizontal: 8,

        justifyContent: "center",
        alignItems: "center",
    },

    activeThumb: {
        borderWidth: 2,
        borderColor: "#2F8F4E",
    },

    thumbImage: {
        width: 65,
        height: 65,
    },

    infoContainer: {
        paddingHorizontal: 24,
        marginTop: 30,
    },

    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",

        color: "#000",

        flex: 1,

        paddingRight: 20,
    },

    similarBtn: {
        borderWidth: 1,
        borderColor: "#DDD",

        borderRadius: 999,

        paddingHorizontal: 16,
        paddingVertical: 10,

        height: 40,
    },

    similarText: {
        color: "#000",
        fontWeight: "500",
    },

    subTitle: {
        fontSize: 16,
        color: "#888",

        // marginTop: 12,
    },

    greenText: {
        fontSize: 13,
        color: "#2F8F4E",

        marginTop: 5,

        fontWeight: "600",
    },

    price: {
        fontSize: 20,
        fontWeight: "800",

        color: "#2F8F4E",

        marginTop: 5,
    },

    section: {
        paddingHorizontal: 24,
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",

        color: "#000",

        marginBottom: 20,
    },

    pillRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    pill: {
        backgroundColor: "#FFF",

        width: "31%",

        borderRadius: 18,

        padding: 10,

        alignItems: "center",
    },

    pillTitle: {
        fontSize: 9,
        fontWeight: "600",
        color: "#000",
        textAlign: "center",
    },

    pillSub: {
        marginTop: 8,

        color: "#999",

        textAlign: "center",
    },

    buttonContainer: {
        paddingHorizontal: 24,
        marginVertical: 30
    },

    primaryBtn: {
        height: 52,

        backgroundColor: "#2F8F4E",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,

        // justifyContent: "center",
        // alignItems: "center",
        gap:20
    },

    primaryBtnText: {
        color: "#FFF",

        fontSize: 18,
        fontWeight: "700",
    },

    secondaryBtn: {
        height: 52,

        borderRadius: 999,

        borderWidth: 1,
        borderColor: "#DDD",

        justifyContent: "center",
        alignItems: "center",

        marginTop: 18,
    },

    secondaryBtnText: {
        fontSize: 18,
        fontWeight: "700",

        color: "#BDBDBD",
    },
});