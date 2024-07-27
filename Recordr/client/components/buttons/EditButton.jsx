import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const EditButton = ({ onPress, title, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <Text>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

})

export default EditButton;
