export type CompilerType = "string" | "number" | "bigint" | "boolean" | "symbol" | "null" | "undefined" | "object" | "function" | "array" | "optional" | string & {}
export type CompiledType = {
  [K in CompilerType]?: K extends "object" ? CompiledObject : K extends "array" ? CompiledType : {}
}
type CompiledObject = { [key: string]: CompiledType }

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function getType(value: unknown): CompilerType {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value as CompilerType;
}
