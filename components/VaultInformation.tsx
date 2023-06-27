import { StyleSheet, View as RNView, Image as RNImage } from 'react-native';
import { View, Text, Card } from './Themed';

export type TypeVaultInformation = {
	address: string;
	displayName: string;
	icon: string;
	apy: string;
	boost: string;
	tvl: string;
};

type ComponentProps = {
	vault: TypeVaultInformation;
};


export default function VaultInformation({ vault }: ComponentProps) {
	return (
		<Card style={[ styles.flexVertical, { padding: 15 } ]}>
			<View style={styles.headerContainer}>
				<RNImage source={{ uri: vault.icon }} style={styles.headerIcon} />
				<Text style={styles.headerTitle}>{vault.displayName}</Text>
			</View>
			<View style={styles.separatorHorizontal} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
			<View style={styles.flexVertical}>
				<View style={styles.flexHorizontal}>
					<View style={styles.flexVertical}>
						<Text style={styles.cellTitle}>APY</Text>
						<Text>{vault.apy}%</Text>
						{vault.boost !== '0.00' && <Text>Boost {vault.boost}%</Text>}
					</View>
					<View style={styles.flexVertical}>
						<Text style={styles.cellTitle}>TVL</Text>
						<Text>$ {vault.tvl}</Text>
					</View>
				</View>
				<View style={[ styles.flexHorizontal, { marginTop: 10 } ]}>
					<View style={styles.flexVertical}>
						<Text style={styles.cellTitle}>Deposited</Text>
						<Text>$ 0.00</Text>
					</View>
					<View style={styles.flexVertical}>
						<Text style={styles.cellTitle}>Available</Text>
						<Text>$ 0.00</Text>
					</View>
				</View>
			</View>
		</Card>
	);
}


const styles = StyleSheet.create({
	flexHorizontal: {
		flex: 1,
		flexDirection: 'row'
	},
	flexVertical: {
		flex: 1,
		flexDirection: 'column'
	},
	headerContainer: {
	  flex: 1,
	  flexDirection: 'row',
	  alignItems: 'center',
	  gap: 15
	},
	headerIcon: {
	  width: 32,
	  height: 32,
	  resizeMode: 'stretch'
	},
	headerTitle: {
	  fontSize: 18,
	  fontWeight: 'bold'
	},
	separatorHorizontal: {
	  marginVertical: 15,
	  height: 1,
	},
	cellTitle: {
		fontSize: 16,
		fontWeight: 'bold'
	}
 });
 