import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {Pokemon} from '../../../domain/entities/Pokemon';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar pokémon"
        value=""
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChange={value => console.log(value)}
      />

      <ActivityIndicator style={{paddingTop: 20}} />

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
