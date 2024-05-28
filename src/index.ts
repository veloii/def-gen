import { type CompileConfig, compileTypes } from "./compiler";
import type { CodeGenerator } from "./generators";

export { TypeScriptGenerator } from "./generators/typescript";

export type Config = CompileConfig & {
  generator: CodeGenerator
}

export function inferValue(
  value: unknown,
  config: Config
) {
  return inferValues([value], config)
}

export function inferValues(
  values: unknown[],
  { generator, ...config }: Config
) {
  const compiledTypes = compileTypes(values, config)
  const generatedCode = generator.generate(compiledTypes)
  return generatedCode
}
