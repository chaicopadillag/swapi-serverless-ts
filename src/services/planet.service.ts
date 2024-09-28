import { dataMapear } from '../mappers/data.mapper';
import { mapPlanet } from '../mappers/map/map-planet';
import httpClient from '../shared/adapters/http-client';
import { PlanetaType, PlanetType, PlantsResponseType } from '../types/services/swapi/planet.type';

export class PlanetService {
  async getPlanets(): Promise<PlanetaType[]> {
    const { results } = await httpClient.get<PlantsResponseType>('/planets');

    const planets = dataMapear<PlanetType, PlanetaType>(results, mapPlanet);

    return planets;
  }
}
