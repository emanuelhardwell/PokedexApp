import {pokeApi} from '../../config/api/pokeApi';
import {PokeapiPaginated} from '../../infrastructure/interfaces';

export const getPokemonByNameOrId = async () => {
  const url = 'pokemon?limit=2000';

  try {
    const {data} = await pokeApi.get<PokeapiPaginated>(url);

    const res = data.results.map(pokemonPartial => ({
      id: Number(pokemonPartial.url.split('/')[6]),
      name: pokemonPartial.name,
    }));

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getPokemonByNameOrId- `);
  }
};
