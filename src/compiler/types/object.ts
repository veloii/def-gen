import type { Stack, StackValue } from "../stack";

export function processObject({
  stack,
  currentStack: { compiledType, realValue, objectKey }
}: { stack: Stack, currentStack: StackValue<object> }) {
  const isFirstCompiledTypeRun = !compiledType.object;

  if (!compiledType.object) {
    compiledType.object = {};
  }

  const keys = Object.keys(compiledType.object);

  for (const key of keys) {
    if (!(key in (realValue as Object))) {
      compiledType.object[key].optional = {};
    }
  }

  for (const [objKey, objValue] of Object.entries(realValue)) {
    if (!compiledType.object[objKey]) {
      compiledType.object[objKey] = isFirstCompiledTypeRun ? {} : { optional: {} };
    }

    const newObjectKey = objectKey ? `${objectKey}.${objKey}` : objKey
    stack.push({ realValue: objValue, compiledType: compiledType.object[objKey], objectKey: newObjectKey });
  }
}
