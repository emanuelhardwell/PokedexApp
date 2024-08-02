import {FlatList, StyleSheet, View} from 'react-native';
import {getPokemons} from '../../../actions/pokemons';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {PokeballBackground} from '../../components/ui';
import {FAB, Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {globalTheme} from '../../../config/theme/global-theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0, 10),
  //   staleTime: 1000 * 60 * 60,
  // });

  // const {isLoading, data, fetchNextPage} = useInfiniteQuery({
  //   queryKey: ['pokemons', 'infinite'],
  //   queryFn: page => getPokemons(page.pageParam),
  //   staleTime: 1000 * 60 * 60,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => allPages.length,
  // });

  const queryClient = useQueryClient();
  // ACTUALIZAR LA CACHÉ DE ANTEMANO (porque ya tenemos la data de cada pokemon)
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    queryFn: async page => {
      const pokemons = await getPokemons(page.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['Pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  console.log(data);

  const {top} = useSafeAreaInsets();
  const theme = useTheme();

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

      <FAB
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        label="Buscar"
        color={theme.dark ? 'black' : 'white'}
        mode="elevated"
        onPress={() => navigation.push('SearchScreen')}
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
