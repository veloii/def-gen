import type { CompiledType } from "../compiler";

export interface CodeGenerator {
  generate(compiled: CompiledType): string
}
