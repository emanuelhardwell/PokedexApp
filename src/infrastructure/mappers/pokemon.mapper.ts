import {getColorFromImage} from '../../config/helpers';
import {Pokemon} from '../../domain/entities/Pokemon';
import {PokeapiPokemon} from '../interfaces';

export class PokemonMapper {
  static async mapper(pokemon: PokeapiPokemon): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(pokemon);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const color = await getColorFromImage(avatar);

    return {
      id: pokemon.id,
      name: pokemon.name,
      avatar: avatar,
      sprites: sprites,
      types: pokemon.types.map(type => type.type.name),
      color: color,

      games: pokemon.game_indices.map(game => game.version.name),
      abilities: pokemon.abilities.map(ability => ability.ability.name),
      stats: pokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      moves: pokemon.moves
        .map(move => ({
          name: move.move.name,
          level: move.version_group_details[0]?.level_learned_at || 0,
        }))
        .sort((a, b) => a.level - b.level),
    };
  }

  static getSprites(data: PokeapiPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}
