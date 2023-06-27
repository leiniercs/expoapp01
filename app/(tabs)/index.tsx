import type { TypeVaultInformation } from '../../components/VaultInformation';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, VirtualizedList, View as RNView, Image as RNImage } from 'react-native';
import VaultInformation from '../../components/VaultInformation';


type VirtualizedListItemProps = {
	vault: TypeVaultInformation;
};


export default function VaultScreen() {
  const [ vaults, setVaults ] = useState<TypeVaultInformation[]>([]);

	function downloadVaultsInformations() {
		fetch(
			'https://ydaemon.ycorpo.com/1/vaults/all?hideAlways=true&orderBy=apy.net_apy&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue',
			{
				headers: {
					accept: 'application/json'
				},
				referrer: 'https://yearn.finance/',
				referrerPolicy: 'strict-origin-when-cross-origin',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'omit'
			}
		)
			.then((response) => {
				response.json()
					.then((results) => {
            const vaults: TypeVaultInformation[] = [];

            results.forEach((element: any) => {
              vaults.push({
                address: element['address'],
                displayName: element['display_name'],
                icon: element['icon'],
                apy: Number(element['apy']['net_apy'] * 100).toFixed(2),
                boost: Number(element['apy']['composite']['boost']).toFixed(2),
                tvl: Number(Number(element['tvl']['tvl']).toFixed(2)).toLocaleString()
              });
            });
						setVaults(vaults);
					})
					.catch(console.error)
				;
			})
			.catch(console.error)
		;
	}

	useEffect(() => {
		downloadVaultsInformations();
	}, []);

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        initialNumToRender={10}
        renderItem={({ item }) => <VaultInformation vault={item} />}
        keyExtractor={(item: TypeVaultInformation) => item.address}
        getItemCount={() => vaults.length}
        getItem={(_data: unknown, index: number): TypeVaultInformation => vaults[index]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  cardHeaderIcon: {
    width: 32,
    height: 32,
    resizeMode: 'stretch'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
