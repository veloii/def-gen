import { cli } from 'cleye'
import { TypeScriptGenerator, inferValues } from "."
import type { CodeGenerator } from './generators'
import path from 'node:path'
import fs from "node:fs"

const possibleGenerators = ["ts"] as const
type Generators = typeof possibleGenerators[number]

function Generator(generator: Generators) {
  if (!possibleGenerators.includes(generator)) {
    throw new Error(`Invalid generator: "${generator}. Avaliable: ${possibleGenerators.join(", ")}"`)
  }

  return generator
}

const argv = cli({
  name: 'def-gen',

  parameters: [
    '<json file path>',
  ],

  flags: {
    generator: {
      type: Generator,
      description: `Type of format to be output (${possibleGenerators.join(", ")})`,
      alias: "g",
      default: "ts"
    },
    export: {
      type: Boolean,
      description: "Export any declarations or variables outputted.",
      alias: "e",
      default: false
    },
    name: {
      type: String,
      description: "Name used for the final variable or type",
      alias: "n"
    },
    indentation: {
      type: Number,
      alias: "i",
      description: "Amount of spaces used for indentation",
      default: 2
    },
    literalKeys: {
      type: [String],
      alias: "l",
      description: "Dot seperated keys (object.key) to be interpreted as a literal",
      default: []
    }
  }
})

const generatorArg = argv.flags.generator
let generator: CodeGenerator | undefined = undefined

if (generatorArg === "ts")
  generator = new TypeScriptGenerator({
    indentationSpaces: argv.flags.indentation,
    exportType: argv.flags.export,
    typeName: argv.flags.name
  })

const filePath = path.resolve(argv._.jsonFilePath);
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

const values = Array.isArray(data) ? data : [data]

const output = inferValues(values, {
  generator: generator!,
  literalKeys: argv.flags.literalKeys
})

console.log(output)
