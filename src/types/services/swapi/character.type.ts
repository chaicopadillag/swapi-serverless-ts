export type CharactersResponseType = {
  count: number;
  next: string;
  previous: null;
  results: CharacterType[];
};

export type CharacterType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: GenderEnum | string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export enum GenderEnum {
  Female = 'female',
  Male = 'male',
  NA = 'n/a',
}

export type PersonajeType = {
  nombre: string;
  altura: string;
  masa: string;
  color_de_cabello: string;
  color_de_piel: string;
  color_de_ojos: string;
  año_de_nacimiento: string;
  género: string;
  planeta_natal: string;
  películas: string[];
  especies: string[];
  vehículos: string[];
  naves_estelares: string[];
  creado: string;
  editado: string;
  url: string;
};
