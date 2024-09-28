import { getPlanets } from '../../src/controllers/planetController';
import { PlanetService } from '../../src/services/planet.service';
import { errorResponse, successResponse } from '../../src/shared/utils/http-response';

jest.mock('../../src/services/planet.service');
const mockPlanetService = PlanetService as jest.MockedClass<typeof PlanetService>;

jest.mock('../../src/shared/utils/http-response');
const mockSuccessResponse = successResponse as jest.Mock;
const mockErrorResponse = errorResponse as jest.Mock;

describe('getPlanets Lambda function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response with planets', async () => {
    const mockPlanets = [
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
    mockPlanetService.prototype.getPlanets.mockResolvedValue(mockPlanets);

    mockSuccessResponse.mockReturnValue({
      statusCode: 200,
      body: JSON.stringify(mockPlanets),
    });

    const result = await getPlanets();
    expect(mockPlanetService.prototype.getPlanets).toHaveBeenCalledTimes(1);

    expect(mockSuccessResponse).toHaveBeenCalledWith(mockPlanets);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockPlanets));
  });

  it('should return an error response when the service fails', async () => {
    const mockError = new Error('TEST');
    mockPlanetService.prototype.getPlanets.mockRejectedValue(mockError);

    mockErrorResponse.mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch planets' }),
    });

    const result = await getPlanets();

    expect(mockPlanetService.prototype.getPlanets).toHaveBeenCalledTimes(1);
    expect(mockErrorResponse).toHaveBeenCalledWith('Failed to fetch planets');
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Failed to fetch planets' }));
  });
});
