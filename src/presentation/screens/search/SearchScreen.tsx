import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useQuery} from '@tanstack/react-query';
import {
  getPokemonByNameOrId,
  getPokemonsByIds,
} from '../../../actions/pokemons';
import {useMemo, useState} from 'react';
import {FullScreenLoader} from '../../components/ui';
import {useDebouncedValue} from '../../hooks';

export const SearchScreen = () => {
  const {isLoading, data: pokemonNameOrId = []} = useQuery({
    queryKey: ['pokemon', 'all', 'name', 'id'],
    queryFn: () => getPokemonByNameOrId(),
  });

  const [term, setTerm] = useState<string>('');
  const debouncedValue = useDebouncedValue(term);

  const pokemonList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameOrId.find(
        pokemon => pokemon.id === Number(debouncedValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length < 3) return [];

    const pokemon2 = pokemonNameOrId.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLocaleLowerCase()),
    );
    return pokemon2;
  }, [debouncedValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemon', 'by', pokemonList],
    queryFn: () => getPokemonsByIds(pokemonList.map(pokemon => pokemon.id)),
    staleTime: 1_000 * 60 * 5,
  });

  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar pokémon"
        value={term}
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={value => setTerm(value)}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      {/* <Text>{JSON.stringify(pokemonList, null, 2)}</Text> */}

      <FlatList
        style={{paddingTop: top + 20}}
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 80}} />}
      />
    </View>
  );
};
