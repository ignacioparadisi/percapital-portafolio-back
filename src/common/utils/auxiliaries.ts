import { Entity } from '../entities/Entity';

export type queryBuilder<T extends Entity> = {
  readonly [P in keyof T]?: string;
} & { _id: string };

export const snakeToCamelCase = (snakeCase: string, slice: boolean = false) => {
  var snakeCaseAux = snakeCase;
  if (slice) {
    snakeCaseAux = snakeCase.slice(4, snakeCaseAux.length);
  }
  const aux: string[] = snakeCaseAux.split('_');
  let variableName: string = '';
  aux.map((value: string, index: number) => {
    if (index !== 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    variableName += value;
  });
  return variableName;
};

export const camelToSnakeCase = (camelCase: string) => {
  const columnMatches = camelCase.match(/[A-Z]/g);
  let snakeCase = camelCase;
  let firstUpper = false;
  if (columnMatches) {
    for (const match of columnMatches) {
      if (snakeCase.indexOf(match) === 0) {
        firstUpper = true;
      }
      snakeCase = snakeCase.replace(match, '_' + match.toLowerCase());
    }
    if (firstUpper) {
      snakeCase = snakeCase.slice(1, snakeCase.length);
    }
  }
  return snakeCase;
};

export const removeDoctive = (value: string) => {
  const returnValue = value.replace('doctive_', '');
  return returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
};

export const addDoctive = (value: string) => 'doctive_' + value;

export const minimizeFirstLetter = (value: string) =>
  value.charAt(0).toLowerCase() + value.slice(1);

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const getQueryFromEntity = <T extends Entity>(
  entity: T,
  queryModel: queryBuilder<T>
) => {
  const queryToBuild = {};
  Object.keys(entity).map((key) => {
    // @ts-ignore
    if (entity[key]) {
      // @ts-ignore
      queryToBuild[queryModel[key]] = entity[key];
    }
  });
  return queryToBuild;
};

export const getEntityFromDB = <T extends Entity>(
  entityFromDB: T,
  queryModel: queryBuilder<T>
): T => {
  const entity: Partial<T> = {};
  Object.keys(entityFromDB).map((key) => {
    Object.keys(queryModel).map((modelKey) => {
      // @ts-ignore
      if (queryModel[modelKey] === key) {
        // @ts-ignore
        entity[modelKey] = entityFromDB[key];
      }
    });
  });
  return entity as T;
};

export const getRelationEntityFromDB = <T extends Entity>(
  entityFromDB: T,
  queryModel: queryBuilder<T>
) => {
  const entity: Partial<T> = {};
  // @ts-ignore
  const modelKeys = Object.keys(queryModel).map((key) => queryModel[key]);
  console.info('MOdel keys', modelKeys);
  Object.keys(entityFromDB).map((key) => {
    if (!modelKeys.includes(key)) {
      console.info('Storing key', key);
      // @ts-ignore
      entity[snakeToCamelCase(key)] = entityFromDB[key];
    }
  });
  return entity as T;
};

export const stripUndefined = (object: Record<string, any>): any => {
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key]) {
        newObject[key] = object[key];
      }
    }
  }
  return newObject;
};

export const removeId = <T>(object: any): T => {
  if (object.PREDICATE_NAME) {
    delete object.PREDICATE_NAME;
  }
  console.info('object', object);
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      let newKey = key;
      if (!['nationalId', 'professionalId', 'personalId'].includes(key)) {
        newKey = key.replace('Id', '');
      }
      newObject[newKey] = object[key];
    }
  }
  return newObject as T;
};

export const getWhereStatementFromObject = (object: Record<string, any>) => {
  let whereString = '';
  Object.keys(object).forEach((key, i) => {
    if (key !== '_id') {
      const assignationString = `${key} = ${getValueForFlureeQuery(
        object[key]
      )}`;
      if (i === 0) {
        whereString = assignationString;
      } else {
        whereString += ` AND ${assignationString}`;
      }
    }
  });
  return whereString;
};

export const getOrderByFromObject = (object: Record<string, any>) => {
  if (object) {
    const key = Object.keys(object)[0];
    return [object[key], key];
  }
};

export const getInQueryFromBatch = (parentIdName: string, values: number[]) => {
  console.debug(`[getInQueryFromBatch] Values param: `, values);
  let query = '';
  const name = parentIdName.replace('Id', '');
  values.forEach((value, i) => {
    const comparison = `${name} = ${getValueForFlureeQuery(value)}`;
    if (i === 0) {
      query = comparison;
    } else {
      query += ` OR ${comparison}`;
    }
  });
  return query;
};

/** Function that converts an optional GraphQL ID (string) to a Fluree ID (number) */
export const toFlureeId = (strId?: string | number): number | undefined => {
  return strId ? +strId : undefined;
};

export const getValueForFlureeQuery = (value: any) => {
  return typeof value === 'string'
    ? `"${value}"`
    : Array.isArray(value)
      ? typeof value[0] === 'string'
        ? `"${value[0]}"`
        : value[0]
      : value;
};
export const getCaseInsensitiveName = (value: string) => {
  const accents = ['aá', 'eé', 'ií', 'oó', 'uú'];
  let returnValue = value.toLowerCase();
  let accumulator = 0;
  [...value.toLowerCase()].forEach((char, index) => {
    for (const accent of accents) {
      if (accent.includes(char)) {
        const element = accents.find((val) => val.includes(char));
        const splitted = returnValue.split('');
        splitted[index + accumulator] = `[${element}]`;
        returnValue = splitted.join('');
        accumulator += 3;
      }
    }
  });
  return returnValue;
};