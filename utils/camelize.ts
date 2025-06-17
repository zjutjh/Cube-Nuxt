type StringToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? U extends ""
    ? `${T}_`
    : `${T}${StringToCamelCase<Capitalize<U>>}`
  : S;

export type ToCamelCase<T> = {
  [Key in keyof T as StringToCamelCase<Key & string>]: T[Key] extends Array<infer G>
    ? Array<ToCamelCase<G>>
    : T[Key] extends object
      ? ToCamelCase<T[Key]>
      : T[Key];
};

function stringToCamelCase(str: string): string {
  return str
    .replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase())
    .replace(/_([0-9])/g, (_match, number) => number);
}

export function toCamelCase<T>(obj: T): ToCamelCase<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as ToCamelCase<T>;
  } else if (obj !== null && typeof obj === "object") {
    const result: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const camelKey = stringToCamelCase(key);
      result[camelKey] = toCamelCase((obj as any)[key]);
    }
    return result as ToCamelCase<T>;
  }
  return obj as ToCamelCase<T>;
}
