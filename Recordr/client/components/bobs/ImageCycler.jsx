import React, { useState, useEffect, useMemo } from 'react';
import { Image, View, StyleSheet } from 'react-native';


const ImageCycler = ({ recognize }) => {
    
    const starterImages = [
        require('../../assets/StarterImages1.png'),
        require('../../assets/StarterImages2.png'),
        require('../../assets/StarterImages3.png'),
    ];

    const recordImages = [
        require('../../assets/RecognizeImages1.png'),
        require('../../assets/RecognizeImages2.png'),
        require('../../assets/RecognizeImages3.png'),
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = useMemo(() => recognize ? recordImages : starterImages, [recognize]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 500);

        return () => clearInterval(interval);
    }, [recognize, images]);
    
    useEffect(() => {
        // Reset index when switching between starter and record images
        setCurrentIndex(0);
    }, [recognize]);

    return(
        <View style={styles.container}>
            <Image source={images[currentIndex]} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },
});

export default ImageCycler;