import { camelCase, isArray, isObject, mapKeys, mapValues } from "lodash-es";

export function toCamelCase(raw: any): any {
  if (isArray(raw)) {
    return raw.map((item) => toCamelCase(item));
  } else if (isObject(raw)) {
    return mapKeys(
      mapValues(raw, (value: any) => toCamelCase(value)),
      (_, key: string) => camelCase(key)
    );
  }
  return raw;
}
