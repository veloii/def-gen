import type { CompiledType, CompilerType } from "./types";
import { isStackValueArray, isStackValueFunction, isStackValueObject, isStackValuePrimitive, type Stack } from "./stack";
import { processObject } from "./types/object";
import { processPrimitive } from "./types/primitive";
import { processArray } from "./types/array";

export type CompileConfig = {
  literalKeys?: string[]
}

export function compileTypes(
  values: unknown[],
  { literalKeys }: CompileConfig = {}
): CompiledType {
  const types: CompiledType = {};
  const processedObjects = new WeakMap<object, CompiledType>();

  function processValue(realValue: unknown, compiledType: CompiledType) {
    const stack: Stack = [{ realValue, compiledType, objectKey: "" }];

    while (stack.length > 0) {
      const currentStack = stack.pop()!;

      if (isStackValueArray(currentStack)) {
        processArray({ stack, currentStack })
      }

      if (isStackValuePrimitive(currentStack)) {
        processPrimitive({ currentStack, literalKeys })
      }

      if (isStackValueFunction(currentStack)) {
        throw new Error("Functions are unimplemented")
      }

      if (isStackValueObject(currentStack)) {
        if (processedObjects.has(currentStack.realValue)) {
          const cachedType = processedObjects.get(currentStack.realValue);
          if (cachedType) {
            Object.assign(currentStack.compiledType, cachedType);
          }
          continue;
        }

        processObject({ stack, currentStack })

        processedObjects.set(currentStack.realValue, currentStack.compiledType);
      }
    }
  }

  for (const value of values) {
    processValue(value, types);
  }

  return types;
}

export type { CompiledType, CompilerType }
