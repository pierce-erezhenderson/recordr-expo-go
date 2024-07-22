import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';

const ImageCycler = ({ recognize }) => {
    
    const starterImages = [
        require('../assets/StarterImages1.png'),
        require('../assets/StarterImages2.png'),
        require('../assets/StarterImages3.png'),
    ];

    const recordImages = [
        require('../assets/RecognizeImages1.png'),
        require('../assets/RecognizeImages2.png'),
        require('../assets/RecognizeImages3.png'),
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (recognize ? recordImages : starterImages.length));
        }, 500);

        return () => clearInterval(interval);
    }, []);
    
    const images = recognize ? recordImages : starterImages;

    return(
        <View style={styles.container}>
            <Image source={images[currentIndex]} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },
});

export default ImageCycler;