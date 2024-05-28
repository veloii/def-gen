import type { Stack, StackValue } from "../stack";

export function processArray({
  stack,
  currentStack: { compiledType, realValue, objectKey }
}: { stack: Stack, currentStack: StackValue<unknown[]> }) {
  if (!compiledType.array) compiledType.array = {};
  for (const arrayObj of realValue) {
    stack.push({ realValue: arrayObj, compiledType: compiledType.array, objectKey: objectKey });
  }
}


