import React from "react";
import { View, StyleSheet } from "react-native";
import Recordr from "../components/Recordr";

const RecognizeScreen = () => {
  
  return (
        <View style={styles.container}>
            <Recordr />
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default RecognizeScreen;