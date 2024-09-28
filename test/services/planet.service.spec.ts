import { dataMapear } from '../../src/mappers/data.mapper';
import { mapPlanet } from '../../src/mappers/map/map-planet';
import { PlanetService } from '../../src/services/planet.service';
import httpClient from '../../src/shared/adapters/http-client';
import { PlanetaType, PlantsResponseType } from '../../src/types/services/swapi/planet.type';

// Mock  dependencies
jest.mock('../../src/shared/adapters/http-client');
jest.mock('../../src/mappers/data.mapper');
jest.mock('../../src/mappers/map/map-planet');

describe('PlanetService', () => {
  let planetService: PlanetService;

  beforeEach(() => {
    planetService = new PlanetService();
    jest.clearAllMocks();
  });

  describe('getPlanets', () => {
    it('should fetch planets and map them correctly', async () => {
      // Mock data
      const mockApiResponse: PlantsResponseType = {
        count: 0,
        next: '',
        previous: null,
        results: [
          {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
            residents: ['Luke Skywalker', 'Anakin Skywalker', 'Shmi Skywalker'],
            films: [
              'A New Hope',
              'The Phantom Menace',
              'Attack of the Clones',
              'Revenge of the Sith',
            ],
            created: '2014-12-09T13:50:49.641000Z',
            edited: '2014-12-20T20:58:18.411000Z',
            url: 'https://swapi.dev/api/planets/1/',
          },
        ],
      };

      const mockMappedPlanets: PlanetaType[] = [
        {
          nombre: 'Tatooine',
          periodo_de_rotación: '23',
          periodo_orbital: '304',
          diámetro: '10465',
          clima: 'arid',
          gravedad: '1 standard',
          terreno: 'desert',
          agua_superficial: '1',
          población: '200000',
          residentes: ['Luke Skywalker', 'Anakin Skywalker', 'Shmi Skywalker'],
          películas: [
            'A New Hope',
            'The Phantom Menace',
            'Attack of the Clones',
            'Revenge of the Sith',
          ],
          creado: '2014-12-09T13:50:49.641000Z',
          editado: '2014-12-20T20:58:18.411000Z',
          url: 'https://swapi.dev/api/planets/1/',
        },
      ];

      (httpClient.get as jest.Mock).mockResolvedValue(mockApiResponse);

      (dataMapear as jest.Mock).mockReturnValue(mockMappedPlanets);

      const result = await planetService.getPlanets();

      expect(httpClient.get).toHaveBeenCalledWith('/planets');
      expect(dataMapear).toHaveBeenCalledWith(mockApiResponse.results, mapPlanet);
      expect(result).toEqual(mockMappedPlanets);
    });

    it('should throw an error if the API call fails', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));
      await expect(planetService.getPlanets()).rejects.toThrow('API Error');
    });

    it('should handle empty results', async () => {
      const mockApiResponse: PlantsResponseType = {
        count: 1,
        next: '',
        previous: null,
        results: [],
      };

      (httpClient.get as jest.Mock).mockResolvedValue(mockApiResponse);
      (dataMapear as jest.Mock).mockReturnValue([]);
      const result = await planetService.getPlanets();

      expect(httpClient.get).toHaveBeenCalledWith('/planets');
      expect(dataMapear).toHaveBeenCalledWith([], mapPlanet);
      expect(result).toEqual([]);
    });
  });
});
