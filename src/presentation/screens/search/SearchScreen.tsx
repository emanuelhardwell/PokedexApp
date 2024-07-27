import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {Pokemon} from '../../../domain/entities/Pokemon';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useQuery} from '@tanstack/react-query';
import {getPokemonByNameOrId} from '../../../actions/pokemons';
import {useMemo, useState} from 'react';

export const SearchScreen = () => {
  const {isLoading, data: pokemonNameOrId = []} = useQuery({
    queryKey: ['pokemon', 'all', 'name', 'id'],
    queryFn: () => getPokemonByNameOrId(),
  });

  const [term, setTerm] = useState<string>('');

  const pokemonList = useMemo(() => {
    if (!isNaN(Number(term))) {
      const pokemon = pokemonNameOrId.find(
        pokemon => pokemon.id === Number(term),
      );
      return pokemon ? [pokemon] : [];
    }

    if (term.length < 3) return [];

    const pokemon2 = pokemonNameOrId.filter(pokemon =>
      pokemon.name.includes(term.toLocaleLowerCase()),
    );
    return pokemon2;
  }, [term]);

  const {top} = useSafeAreaInsets();

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

      <ActivityIndicator style={{paddingTop: 20}} />

      <Text>{JSON.stringify(pokemonList, null, 2)}</Text>

      <FlatList
        style={{paddingTop: top + 20}}
        data={[] as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
