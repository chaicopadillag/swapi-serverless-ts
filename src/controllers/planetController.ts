import { APIGatewayProxyResult } from 'aws-lambda';
import { PlanetService } from '../services/planet.service';
import { errorResponse, successResponse } from '../shared/utils/http-response';

const planetService = new PlanetService();

export const getPlanets = async (): Promise<APIGatewayProxyResult> => {
  try {
    const planets = await planetService.getPlanets();

    return successResponse(planets);
  } catch (error: any) {
    console.error('Error fetching planets:', error);

    return errorResponse('Failed to fetch planets');
  }
};
