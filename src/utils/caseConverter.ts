export const camelKey = (str: string): string =>
  str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const snakeKey = (str: string): string =>
  str
    .replace(/([A-Z])/g, (c, i) =>
      i === 0 ? c.toLowerCase() : `_${c.toLowerCase()}`,
    )
    .replace(/__+/g, '_');

export type DeepCamelCase<T> = T extends Builtin | Primitive
  ? T
  : T extends readonly (infer U)[]
    ? DeepCamelCase<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? SnakeToCamel<K>
            : K]: DeepCamelCase<T[K]>;
        }
      : T;

export type DeepSnakeCase<T> = T extends Builtin | Primitive
  ? T
  : T extends readonly (infer U)[]
    ? DeepSnakeCase<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? CamelToSnake<K>
            : K]: DeepSnakeCase<T[K]>;
        }
      : T;

type Builtin = ((...args: unknown[]) => unknown) | Date | RegExp;

type CamelToSnake<S extends string> = S extends `${infer H}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Lowercase<H>}${CamelToSnake<T>}`
    : `${Lowercase<H>}_${CamelToSnake<T>}`
  : S;

type Primitive = bigint | boolean | null | number | string | symbol | undefined;

type SnakeToCamel<S extends string> = S extends `${infer H}_${infer T}`
  ? `${H}${Capitalize<SnakeToCamel<T>>}`
  : S;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  Object.prototype.toString.call(v) === '[object Object]';

const convertKeys = (
  obj: unknown,
  keyConverter: (key: string) => string,
): unknown => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(v => convertKeys(v, keyConverter));
  }

  if (isPlainObject(obj)) {
    const result: Record<string, unknown> = {};
    for (const key in obj) {
      result[keyConverter(key)] = convertKeys(obj[key], keyConverter);
    }
    return result;
  }

  return obj;
};

export const toCamel = <T>(obj: T): DeepCamelCase<T> =>
  convertKeys(obj, camelKey) as DeepCamelCase<T>;

export const toSnake = <T>(obj: T): DeepSnakeCase<T> =>
  convertKeys(obj, snakeKey) as DeepSnakeCase<T>;
