import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/Pokemon';

// To fake a slow connection
export const sleep = async () => {
  return new Promise((resolve, reject) => setTimeout(resolve, 2000));
};

export const getPokemons = async (): Promise<Pokemon[]> => {
  //   await sleep();

  try {
    const url = '/pokemon';
    const {data} = await pokeApi.get(url);
    console.log(data);

    return [];
  } catch (error) {
    console.log(error);
    throw new Error('Error getPokemons');
  }
};
