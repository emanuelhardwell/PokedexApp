import {ActivityIndicator, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {useQuery} from '@tanstack/react-query';

export const HomeScreen = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 60,
  });
  console.log(data);

  return (
    <View>
      <Text>HomeScreen</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
};
