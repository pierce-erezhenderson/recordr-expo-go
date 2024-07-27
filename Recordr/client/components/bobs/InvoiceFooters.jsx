

const RenderTotalFooter = () => {
    <View style={styles.RenderTotalFooter}>
        <MoneyBagIcon style={styles.moneyBagIcon}/>
        <Text styles={styles.TotalText}>Total</Text>
        <Text styles={styles.currency}>{invoiceCurrency}</Text>
        {/* line break */}
        <Text styles={styles.hoursTotal}>{hoursTotal}</Text>
    </View>
};