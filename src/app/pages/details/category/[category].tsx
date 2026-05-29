import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/theme/colors'
import { Stack, useLocalSearchParams } from 'expo-router'
import { glassesData } from '@/constants/theme'
import GlassesCardList from '@/components/BigCard'

const Category = () => {
    const category = useLocalSearchParams().category;
    const data = glassesData.filter((item: any) => item.category.toLowerCase().includes(category?.toString().toLowerCase()))
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, padding: 20, paddingTop: 60 }}>
            <Stack.Screen options={{ title: `Category ${category as string}`,headerRight:()=>{
                return null
            } }} />
            <GlassesCardList data={data} grid={true} selected={category} />
        </SafeAreaView>
    )
}

export default Category

const styles = StyleSheet.create({})