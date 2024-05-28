import type { CompiledType } from "./types";
import type { Primitive } from "./types/primitive";

export type StackValue<RealValue = unknown> = { realValue: RealValue; compiledType: CompiledType, objectKey: string }
export type Stack = StackValue[]

export function isStackValueObject(value: StackValue<unknown>): value is StackValue<object> {
  return typeof value.realValue === "object" && value.realValue !== null && !Array.isArray(value.realValue);
}

export function isStackValuePrimitive(value: StackValue<unknown>): value is StackValue<Primitive> {
  return (typeof value.realValue !== "object" || value.realValue === null) && typeof value.realValue !== "function"
}

export function isStackValueFunction(value: StackValue<unknown>): value is StackValue<Function> {
  return typeof value.realValue === "function"
}

export function isStackValueArray(value: StackValue<unknown>): value is StackValue<any[]> {
  return Array.isArray(value.realValue);
}

