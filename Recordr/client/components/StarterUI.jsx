import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import ImageCycler from './ImageCycler';

const StarterUI = ({ handleSetLoading }) => (
    <View style={styles.starterContainer}>
        <Text style={styles.header}>Click below{'\n'}to record a note!</Text>
        <ImageCycler style={styles.imageCycler} />
        <TouchableOpacity style={styles.recordButton} onPress={handleSetLoading}>
            <Text style={styles.recordButtonText}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goToInvoicesButton} onPress={{/* Navigate to invoices page*/}}>
            <View style={styles.goToInvoicesButtonContainer}>
                <Svg width={20} height={20}  viewBox="0 0 16.38 20.47">
                    <G fill="#616263" stroke-width="0">
                        <Polygon points="16.38 16.18 4.5 16.18 4.5 0 12.85 0 12.85 1 5.5 1 5.5 15.18 15.38 15.18 15.38 3.53 16.38 3.53 16.38 16.18" />
                        <Polygon points="11.88 20.47 0 20.47 0 4.29 3 4.29 3 5.29 1 5.29 1 19.47 10.88 19.47 10.88 17.68 11.88 17.68 11.88 20.47" />
                        <Polygon points="14.43 5.29 11.29 5.29 11.29 2.15 12.29 2.15 12.29 4.29 14.43 4.29 14.43 5.29" />
                        <Path d="M16.38,16.18H4.5V0h8.97l2.91,3.34v12.84ZM5.5,15.18h9.88V3.72l-2.37-2.72h-7.51v14.18Z" />
                    </G>
                </Svg>
                <Text style={styles.goToInvoicesButtonText}>Go to invoices</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    starterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontFamily: 'SuisseWorks-Bold',
        fontSize: 35,
        lineHeight: 35,
        textAlign: 'center',
        color: '#38332f',
        padding: 10,
        marginTop: 50, // drops the header down a bit
        marginBottom: 40,
    },
    imageCycler: {
        // nothing for now
    },
    recordButton: {
        backgroundColor: '#38332f',
        borderRadius: 15,
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    recordButtonText: { 
        color: '#FFFFFF',
        fontFamily: 'SuisseScreen-Bold',
        fontSize: 22,
        fontWeight: 'bold',
    },
    goToInvoicesButton: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goToInvoicesButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goToInvoicesButtonText: {
        color: '#38332f',
        fontFamily: 'SuisseScreen-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});


export default StarterUI;