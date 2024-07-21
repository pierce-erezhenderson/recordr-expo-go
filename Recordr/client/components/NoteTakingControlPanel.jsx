import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRecognize } from "../utils/RecognizeContext";
import Recordr from "../components/Recordr";

const NotetakingControlPanel = () => {
    const { recognize } = useRecognize();

    return (
        <View style={styles.container}>
            <Recordr />
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default NotetakingControlPanel;