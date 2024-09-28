import { getCharacters } from '../../src/controllers/characterController';
import { CharacterService } from '../../src/services/character.service';
import { errorResponse, successResponse } from '../../src/shared/utils/http-response';

jest.mock('../../src/services/character.service');
const mockCharacterService = CharacterService as jest.MockedClass<typeof CharacterService>;

// Mock de las funciones de respuesta
jest.mock('../../src/shared/utils/http-response');
const mockSuccessResponse = successResponse as jest.Mock;
const mockErrorResponse = errorResponse as jest.Mock;

describe('getCharacters Lambda function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response with characters', async () => {
    const mockCharacters = [
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
    mockCharacterService.prototype.getCharacters.mockResolvedValue(mockCharacters);

    mockSuccessResponse.mockReturnValue({
      statusCode: 200,
      body: JSON.stringify(mockCharacters),
    });

    const result = await getCharacters();

    expect(mockCharacterService.prototype.getCharacters).toHaveBeenCalledTimes(1);
    expect(mockSuccessResponse).toHaveBeenCalledWith(mockCharacters);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockCharacters));
  });

  it('should return an error response if service throws an error', async () => {
    const mockError = new Error('TEST');
    mockCharacterService.prototype.getCharacters.mockRejectedValue(mockError);

    mockErrorResponse.mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch characters' }),
    });

    const result = await getCharacters();

    expect(mockCharacterService.prototype.getCharacters).toHaveBeenCalledTimes(1);
    expect(mockErrorResponse).toHaveBeenCalledWith('Failed to fetch characters');
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Failed to fetch characters' }));
  });
});
