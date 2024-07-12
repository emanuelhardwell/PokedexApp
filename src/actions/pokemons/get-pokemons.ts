import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/Pokemon';
import type {
  PokeapiPaginated,
  PokeapiPokemon,
} from '../../infrastructure/interfaces';

// To fake a slow connection
export const sleep = async () => {
  return new Promise((resolve, reject) => setTimeout(resolve, 2000));
};

export const getPokemons = async (
  page: number,
  limit: number = 10,
): Promise<Pokemon[]> => {
  //   await sleep();

  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const {data} = await pokeApi.get<PokeapiPaginated>(url);

    const pokemonsPromises = data.results.map(pokemon => {
      return pokeApi.get<PokeapiPokemon>(pokemon.url);
    });

    const pokemonsResult = await Promise.all(pokemonsPromises);
    console.log(pokemonsResult[0]);

    return [];
  } catch (error) {
    console.log(error);
    throw new Error('Error getPokemons');
  }
};
