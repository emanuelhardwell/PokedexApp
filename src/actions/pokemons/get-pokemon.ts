import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/Pokemon';
import {PokeapiPokemon} from '../../infrastructure/interfaces';
import {PokemonMapper} from '../../infrastructure/mappers';

export const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  try {
    const {data} = await pokeApi.get<PokeapiPokemon>(`/pokemon/${pokemonId}`);
    const pokemon = await PokemonMapper.mapper(data);

    return pokemon;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getPokemon- ${pokemonId}`);
  }
};
