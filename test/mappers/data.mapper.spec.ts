import { dataMapear, mapObject } from '../../src/mappers/data.mapper';
import { mapCharacter } from '../../src/mappers/map/map-character';
import { mapPlanet } from '../../src/mappers/map/map-planet';
import { CharacterType } from '../../src/types/services/swapi/character.type';
import { PlanetType } from '../../src/types/services/swapi/planet.type';

describe('transformarClaves', () => {
  it('debería transformar las claves de un objeto correctamente', () => {
    const charater: CharacterType[] = [
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
    ];

    const transformado = dataMapear(charater, mapCharacter);

    expect(transformado).toEqual([
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
    ]);
  });
});

describe('mapearData', () => {
  it('debería mapear un array de objetos utilizando un mapeo de claves correctamente', () => {
    const plants: PlanetType[] = [
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
        films: ['A New Hope', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'],
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/',
      },
    ];

    const arrayTransformado = dataMapear(plants, mapPlanet);

    expect(arrayTransformado).toEqual([
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
    ]);
  });
});

describe('mapObject', () => {
  it('debería mapear un object  utilizando un mapeo de claves correctamente', () => {
    const plant: PlanetType = {
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
      films: ['A New Hope', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/',
    };

    const arrayTransformado = mapObject(plant, mapPlanet);

    expect(arrayTransformado).toEqual({
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
    });
  });
});
