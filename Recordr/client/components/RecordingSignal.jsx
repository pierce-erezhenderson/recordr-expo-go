import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const RecordingSignal = () => {
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      pulse.start();
  
      return () => pulse.stop();
    }, []);
  
    const createGlowLayer = (size, opacity) => {
      const layerSize = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [size, size * 1.5],
      });
  
      const layerOpacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [opacity * 0.5, opacity],
      });
  
      return (
        <Animated.View
          style={[
            styles.glowLayer,
            {
              width: layerSize,
              height: layerSize,
              borderRadius: size,
              opacity: layerOpacity,
            },
          ]}
        />
      );
    };
  
    return (
      <View style={styles.container}>
        {createGlowLayer(40, 0.1)}
        {createGlowLayer(35, 0.2)}
        {createGlowLayer(30, 0.3)}
        {createGlowLayer(25, 0.4)}
        <View style={styles.innerCircle} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 120,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowLayer: {
      position: 'absolute',
      backgroundColor: '#c75935',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerCircle: {
      width: 20,
      height: 20,
      borderRadius: 20,
      backgroundColor: '#c75935',
    },
  });

export default RecordingSignal;