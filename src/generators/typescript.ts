import type { CodeGenerator } from ".";
import type { CompiledType, CompilerType } from "../compiler"
import { needsQuoting } from "../utils/property-checker";
import { tabs } from "../utils/tabs";

export type TypeScriptGeneratorConfig = {
  indentationSpaces?: number;
  typeName?: string;
  exportType?: boolean;
}

export class TypeScriptGenerator implements CodeGenerator {
  indentationSpaces: number
  typeName: string | undefined;
  exportType: boolean;

  constructor(config?: TypeScriptGeneratorConfig) {
    this.indentationSpaces = config?.indentationSpaces ?? 2
    this.typeName = config?.typeName
    this.exportType = config?.exportType ?? false
  }

  private generateType(compiled: CompiledType, currentIndentationSpaces: number = 0): string {
    return Object.entries(compiled).map(([key_, value_]) => {
      const key = key_ as CompilerType
      const value = value_ as CompiledType

      if (key === "array") {
        const entries = this.generateType(value, currentIndentationSpaces) || "unknown"
        return `Array<${entries}>`
      }

      if (key === "object") {
        currentIndentationSpaces += this.indentationSpaces
        const entries = Object.entries(value).map(([key, value]) => {
          const tsValue = this.generateType(value!, currentIndentationSpaces) || "unknown"
          const optional = "optional" in value! ? "?" : ""
          const quotedKey = needsQuoting(key) ? `"${key}"` : key
          return `${tabs(currentIndentationSpaces)}${quotedKey}${optional}: ${tsValue};`
        }).join("\n")

        return `{\n${entries}\n${tabs(currentIndentationSpaces - this.indentationSpaces)}}`
      }

      if (key === "optional") return false
      return key
    }).filter(Boolean).join(" | ")
  }

  generate(compiled: CompiledType): string {
    const type = this.generateType(compiled)

    if (this.typeName) {
      const withExport = this.exportType ? "export " : ""
      return `${withExport}type ${this.typeName} = ${type}`
    }

    return type
  }
}
