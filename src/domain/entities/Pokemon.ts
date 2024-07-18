export interface Pokemon extends PokemonPartial {
  id: number;
  name: string;
  types: string[];
  avatar: string;
  sprites: string[];

  color: string;
}

interface PokemonPartial {
  games: string[];
  abilities: string[];
  stats: Stat[];
  moves: Move[];
}

interface Stat {
  name: string;
  value: number;
}

interface Move {
  name: string;
  level: number;
}
