import { APIGatewayProxyResult } from 'aws-lambda';
import { CharacterService } from '../services/character.service';
import { errorResponse, successResponse } from '../shared/utils/http-response';

const characterService = new CharacterService();

export const getCharacters = async (): Promise<APIGatewayProxyResult> => {
  try {
    const characters = await characterService.getCharacters();

    return successResponse(characters);
  } catch (error: any) {
    console.error('Error fetching characters:', error);

    return errorResponse('Failed to fetch characters');
  }
};
