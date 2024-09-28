import { dataMapear } from '../../src/mappers/data.mapper';
import { mapCharacter } from '../../src/mappers/map/map-character';
import { CharacterService } from '../../src/services/character.service';
import httpClient from '../../src/shared/adapters/http-client';
import {
  CharactersResponseType,
  PersonajeType,
} from '../../src/types/services/swapi/character.type';

// Mock dependencies
jest.mock('../../src/shared/adapters/http-client');
jest.mock('../../src/mappers/data.mapper.ts');
jest.mock('../../src/mappers/map/map-character.ts');

describe('CharacterService', () => {
  let characterService: CharacterService;

  beforeEach(() => {
    characterService = new CharacterService();
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters and map them correctly', async () => {
      // Mock data
      const mockApiResponse: CharactersResponseType = {
        count: 87,
        next: 'https://swapi.py4e.com/api/people/?page=2',
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'Tatooine',
            films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
            species: ['Human'],
            vehicles: [],
            starships: ['X-wing', 'Imperial shuttle'],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      };

      const mockMappedCharacters: PersonajeType[] = [
        {
          altura: '172',
          año_de_nacimiento: '19BBY',
          color_de_cabello: 'blond',
          color_de_ojos: 'blue',
          color_de_piel: 'fair',
          creado: '2014-12-09T13:50:51.644000Z',
          editado: '2014-12-20T21:17:56.891000Z',
          especies: ['Human'],
          género: 'male',
          masa: '77',
          naves_estelares: ['X-wing', 'Imperial shuttle'],
          nombre: 'Luke Skywalker',
          películas: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
          planeta_natal: 'Tatooine',
          url: 'https://swapi.dev/api/people/1/',
          vehículos: [],
        },
      ];

      (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue(
        mockApiResponse
      );
      (dataMapear as jest.Mock).mockReturnValue(mockMappedCharacters);

      const result = await characterService.getCharacters();

      expect(httpClient.get).toHaveBeenCalledWith('/people');
      expect(dataMapear).toHaveBeenCalledWith(mockApiResponse.results, mapCharacter);
      expect(result).toEqual(mockMappedCharacters);
    });

    it('should throw an error if the API call fails', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(characterService.getCharacters()).rejects.toThrow('API Error');
    });

    it('should handle empty results', async () => {
      const mockApiResponse: CharactersResponseType = {
        count: 87,
        next: 'https://swapi.py4e.com/api/people/?page=0',
        previous: null,
        results: [],
      };

      (httpClient.get as jest.MockedFunction<typeof httpClient.get>).mockResolvedValue(
        mockApiResponse
      );

      (dataMapear as jest.Mock).mockReturnValue([]);

      const result = await characterService.getCharacters();
      expect(httpClient.get).toHaveBeenCalledWith('/people');
      expect(dataMapear).toHaveBeenCalledWith([], mapCharacter);
      expect(result).toEqual([]);
    });
  });
});
