import { describe, expect, test } from 'vitest';
import { TypeScriptGenerator, inferValue, inferValues } from '../src';

describe('index', () => {
  const generator = new TypeScriptGenerator({
    indentationSpaces: 2,
    exportType: true,
    typeName: "MyType"
  });

  test('infer values', () => {
    const jsValues = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 }
    ];

    const output = inferValues(jsValues, {
      generator: generator,
      literalKeys: ["name"]
    });

    const expected = `export type MyType = {
  name: "Alice" | "Bob";
  age: number;
}`

    expect(output).toBe(expected)
  })

  test('infer value', () => {
    const jsValue = {
      name: "Alice",
      age: 30
    };

    const output = inferValue(jsValue, {
      generator: generator,
      literalKeys: ["name"]
    });

    const expected = `export type MyType = {
  name: "Alice";
  age: number;
}`

    expect(output).toBe(expected)
  })
})


