import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


function InputComponent({searchText,setSearchText}:{
    searchText:string|null,
    setSearchText?:React.Dispatch<React.SetStateAction<string|null>>
}) {
   
    

    return (
        <View style={styles.container}>

            {/* Search Icon */}
            <Ionicons
                name="search"
                size={20}
                color="#8A8A8A"
                style={styles.searchIcon}
            />

            {/* Input */}
            <TextInput
                placeholder="Search glasses..."
                placeholderTextColor="#9A9A9A"
                style={styles.input}
                value={searchText||""}
                onChangeText={setSearchText}
            />

            {/* Image Search Button */}
            <TouchableOpacity style={styles.imageButton}>
                <Ionicons
                    name="scan-outline"
                    size={22}
                    color="#171717"
                />
            </TouchableOpacity>

        </View>
    );
}

export default InputComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 999,

        borderWidth: 1,
        borderColor: "#E8E8E8",

        paddingHorizontal: 14,
        paddingVertical: 10,

        marginHorizontal: 20,
    },

    searchIcon: {
        marginRight: 10,
    },

    input: {
        flex: 1,

        fontSize: 16,
        color: "#171717",
    },

    imageButton: {
        width: 40,
        height: 40,

        borderRadius: 999,

        backgroundColor: "#F5F5F5",

        alignItems: "center",
        justifyContent: "center",

        marginLeft: 10,
    },
});