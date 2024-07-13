import {FlatList, StyleSheet, View} from 'react-native';
import {getPokemons} from '../../../actions/pokemons';
import {useInfiniteQuery} from '@tanstack/react-query';
import {PokeballBackground} from '../../components/ui';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {globalTheme} from '../../../config/theme/global-theme';

export const HomeScreen = () => {
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0, 10),
  //   staleTime: 1000 * 60 * 60,
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    queryFn: page => getPokemons(page.pageParam),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  console.log(data);

  const {top} = useSafeAreaInsets();

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBackground style={styles.imgPosition} />

      <FlatList
        style={{paddingTop: top + 20}}
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
