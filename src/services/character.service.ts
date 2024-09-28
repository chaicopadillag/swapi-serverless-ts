import { dataMapear } from '../mappers/data.mapper';
import { mapCharacter } from '../mappers/map/map-character';
import httpClient from '../shared/adapters/http-client';
import {
  CharactersResponseType,
  CharacterType,
  PersonajeType,
} from '../types/services/swapi/character.type';

export class CharacterService {
  async getCharacters(): Promise<PersonajeType[]> {
    const { results } = await httpClient.get<CharactersResponseType>('/people');

    const characters = dataMapear<CharacterType, PersonajeType>(results, mapCharacter);

    return characters;
  }
}
