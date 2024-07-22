import React from "react";
import { View, StyleSheet } from "react-native";
import { useRecognize } from "../utils/RecognizeContext";
import Recordr from "../components/Recordr";

const RecognizeScreen = ({ navigation }) => {
  const { recognize } = useRecognize();

  const containerStyle = [
    styles.container,
    { backgroundColor: !recognize ? '#d2cdcb' : '#b6c299' }
  ];
  
  return (
        <View style={containerStyle}>
            <Recordr />
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default RecognizeScreen;