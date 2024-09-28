/**
 * Transforma las claves de un objeto según un mapeo de claves proporcionado.
 * @param data El objeto cuyas claves se van a transformar.
 * @param mapeo Un objeto que define el mapeo de claves, donde las claves representan las claves originales y los valores representan las nuevas claves.
 * @returns Un nuevo objeto con las claves transformadas según el mapeo proporcionado.
 */
const transformsKeys = <T, O>(data: T, mapeo: Record<string, string>): O => {
  return Object.entries(data!).reduce((acc, [clave, valor]) => {
    const claveTraducida = mapeo[clave] || clave;
    return { ...acc, [claveTraducida]: valor };
  }, {} as O);
};

/**
 * Mapea un array de objetos según un mapeo de claves proporcionado.
 * @param data El array de objetos que se va a mapear.
 * @param map Un objeto que define el mapeo de claves, donde las claves representan las claves originales y los valores representan las nuevas claves.
 * @returns Un nuevo array de objetos con las claves transformadas según el mapeo proporcionado.
 */
export const dataMapear = <T, O>(data: T[], map: Record<string, string>): O[] => {
  return data.map((item) => transformsKeys(item, map));
};

export const mapObject = <T, O>(data: T, map: Record<string, string>): O =>
  transformsKeys(data, map);
