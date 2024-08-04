import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PencilIcon } from '../icons/PencilIcon';

const EditButton = ({ onPress, title, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <PencilIcon />
        <Text>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({


})

export default EditButton;
