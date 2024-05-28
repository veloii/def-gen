import { describe, it, expect } from 'vitest';
import { TypeScriptGenerator } from '../../src';
import type { CompiledType } from '../../src/compiler';
import "../startsWith"

const primitives = ["number", "string", "bigint", "boolean", "null", "undefined", "symbol"] as const;

function cleanOutput(output: string) {
  return output.replaceAll("\n", "").replaceAll(" ", "").replaceAll(";", "")
}

describe('typescript generation test', () => {
  const baseGen = new TypeScriptGenerator()

  it("should handle union types", () => {
    const compiled: CompiledType = primitives.reduce((acc, curr) => Object.assign({ [curr]: {} }, acc), {})
    const generation = baseGen.generate(compiled)
    expect(generation, primitives.join(" | "))
  })

  it("should handle arrays", () => {
    const compiled: CompiledType = {
      array: {
        object: {
          myValue: {
            string: {}
          }
        }
      }
    }

    const generation = cleanOutput(baseGen.generate(compiled))
    expect(generation).toBe("Array<{myValue:string}>")
  })

  it("should handle literal types", () => {
    expect(baseGen.generate({ myLiteral: {} }) === '"myLiteral"')
  })

  it("should handle optional keys", () => {
    const compiled: CompiledType = {
      object: {
        myValue: {
          optional: {},
          string: {}
        }
      }
    }

    const generation = cleanOutput(baseGen.generate(compiled))
    expect(generation).toBe("{myValue?:string}")
  })

  it("should handle primitive types", () => {
    primitives.forEach(p => {
      expect(baseGen.generate({ [p]: {} })).toBe(p)
    })
  })

  it("should handle nested objects", () => {
    const compiled: CompiledType = {
      object: {
        someObject: {
          object: {
            anotherObject: {
              object: {
                myValue: {
                  string: {}
                }
              }
            }
          }
        }
      }
    }

    const generation = cleanOutput(baseGen.generate(compiled))
    expect(generation).toBe("{someObject:{anotherObject:{myValue:string}}}")
  })

  it("should handle spaces", () => {
    const g = new TypeScriptGenerator({ indentationSpaces: 1 })
    const compiled: CompiledType = {
      object: {
        test: { string: {} },
      }
    }

    const generation = g.generate(compiled)
    const object = generation.split("\n")[1]
    expect(object, "object does not start with indent").toStartWith(" ")
  })

  it("should handle type name declaration", () => {
    const g = new TypeScriptGenerator({ typeName: "TestType" })
    const compiled: CompiledType = { string: {} }

    const generation = g.generate(compiled)
    expect(generation, "type output does not start declaration").toStartWith("type TestType = ")

    g.exportType = true
    const exportGeneration = g.generate(compiled)
    expect(exportGeneration, "type output does not start exported declaration").toStartWith("export type TestType = ")
  })
});
