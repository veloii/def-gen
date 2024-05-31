# def-gen

[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]

A powerful tool to infer types from JavaScript values and generate code from these inferred types.

> [!NOTE]  
> More generators, including Zod and Valibot, will be coming soon.

## Installation

### Install Locally

To install the package locally in your project, run:

```sh
npm install def-gen
```

### Install Globally

To install the package globally so you can use the CLI, run:

```sh
npm install -g def-gen
```

## Quick Start Guide

### Step 1: Import the Required Functions and Classes

Import the `inferValue`, `inferValues`, and `TypeScriptGenerator` from the package.

```typescript
import { inferValue, inferValues, TypeScriptGenerator } from 'def-gen';
```

### Step 2: Create a Code Generator

Create an instance of the `TypeScriptGenerator` with your desired configuration.

```typescript
const generator = new TypeScriptGenerator({
  indentationSpaces: 2,
  exportType: true,
  typeName: "MyType"
});
```

### Step 3: Infer Types and Generate Code

Use `inferValue` or `inferValues` to infer types from your JavaScript data and generate the corresponding code.

#### Example with a Single Value

```typescript
const jsValue = {
  name: "Alice",
  age: 30
};

const output = inferValue(jsValue, {
  generator: generator,
  literalKeys: ["name"]
});

console.log(output);
// Output:
// export type MyType = {
//   name: "Alice";
//   age: number;
// }
```

#### Example with Multiple Values

```typescript
const jsValues = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];

const output = inferValues(jsValues, {
  generator: generator,
  literalKeys: ["name"]
});

console.log(output);
// Output:
// export type MyType = {
//   name: "Alice" | "Bob";
//   age: number;
// }
```

## CLI Usage

If you have installed `def-gen` globally, you can use the CLI to generate types from a JSON file.

```sh
def-gen [flags...] <json file path>
```

### Flags

- `-e, --export`: Export any declarations or variables outputted.
- `-g, --generator <value>`: Type of format to be output (ts) (default: "ts").
- `-h, --help`: Show help.
- `-i, --indentation <number>`: Amount of spaces used for indentation (default: 2).
- `-l, --literal-keys <string>`: Dot separated keys (object.key) to be interpreted as a literal (default: []).
- `-n, --name <string>`: Name used for the final variable or type.

### Example

```sh
def-gen -e -g ts -i 4 -l "user.name" -n "UserType" path/to/data.json
```

## API Documentation

### `inferValue`

Infers the type of a single value and generates code using the specified generator.

#### Parameters:

- `value: unknown`: The value to infer the type from.
- `config: Config`: The configuration for type inference and code generation.

#### Returns:

- `string`: The generated code.

### `inferValues`

Infers the types of multiple values and generates code using the specified generator.

#### Parameters:

- `values: unknown[]`: The values to infer the types from.
- `config: Config`: The configuration for type inference and code generation.

#### Returns:

- `string`: The generated code.

### `TypeScriptGenerator`

A class for generating TypeScript code from inferred types.

#### Constructor:

- `config?: TypeScriptGeneratorConfig`: Optional configuration for the TypeScript generator.
  - `indentationSpaces?: number`: Number of spaces to use for indentation (default: 2).
  - `typeName?: string`: The name of the generated type.
  - `exportType?: boolean`: Whether to export the generated type (default: false).

### Configuration Types

#### `Config`

Configuration for type inference and code generation.

- `literalKeys?: string[]`: An array of dot-separated keys that will be turned into literal values.
- `generator: CodeGenerator`: The code generator to use for generating code from inferred types.

#### `TypeScriptGeneratorConfig`

Configuration for the TypeScript code generator.

- `indentationSpaces?: number`: Number of spaces to use for indentation (default: 2).
- `typeName?: string`: The name of the generated type.
- `exportType?: boolean`: Whether to export the generated type (default: false).

## License

MIT

[build-img]: https://github.com/veloii/def-gen/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/veloii/def-gen/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/def-gen
[downloads-url]: https://www.npmtrends.com/def-gen
[npm-img]: https://img.shields.io/npm/v/def-gen
[npm-url]: https://www.npmjs.com/package/def-gen
[issues-img]: https://img.shields.io/github/issues/veloii/def-gen
[issues-url]: https://github.com/veloii/def-gen/issues
[codecov-img]: https://codecov.io/gh/veloii/def-gen/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/veloii/def-gen
