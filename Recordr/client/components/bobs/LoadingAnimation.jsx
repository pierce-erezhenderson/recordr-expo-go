import React, { useEffect } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingAnimation = () => {

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
      </View>
   );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default LoadingAnimation;