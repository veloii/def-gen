import { getType, isString } from ".";
import { escapeQuotes } from "../../utils/escape-quotes";
import type { StackValue } from "../stack";

export type Primitive = string | number | boolean | null | undefined | symbol

export function processPrimitive({
  currentStack: { compiledType, realValue, objectKey },
  literalKeys
}: { currentStack: StackValue<Primitive>, literalKeys: string[] | undefined }) {
  let key: string

  if (literalKeys?.includes(objectKey)) {
    if (isString(realValue)) {
      key = `"${escapeQuotes(realValue)}"`
    }

    key = isString(realValue) ? `"${realValue}"` : String(realValue)
  } else { key = getType(realValue) }

  compiledType[key] = {};
}
