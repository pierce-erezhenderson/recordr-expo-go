import React from "react";
import { View, StyleSheet } from "react-native";

const InvoiceScreen = () => {
    return (
        <View style={styles.container}>
            <Invoices />
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default InvoiceScreen;