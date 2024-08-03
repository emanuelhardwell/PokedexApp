import {getPokemon} from './get-pokemon';

export const getPokemonsByIds = async (ids: number[]) => {
  try {
    const pokemonPromises = ids.map(pokemonId => getPokemon(pokemonId));
    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getPokemonsByIds- ${ids}`);
  }
};
