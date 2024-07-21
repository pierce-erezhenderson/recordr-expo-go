import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRecognize } from "../utils/RecognizeContext";
import NotetakingControlPanel from "../components/NoteTakingControlPanel";

const RecognizeScreen = ({ navigation }) => {
  const { recognize } = useRecognize();

  const containerStyle = [
    styles.container,
    { backgroundcolor: !recognize ? '#d2cdcb' : '#f2d8c6' }
  ];
  
  return (
        <View style={containerStyle}>
            <NotetakingControlPanel />
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid black',
    },
  });

export default RecognizeScreen;