import { describe, expect, test } from 'vitest';
import { type CompiledType, compileTypes } from '../src/compiler';

describe('compiler', () => {
  test('compiles a simple string property', () => {
    const input = [{ property: "example" }];
    const expected: CompiledType = {
      object: {
        property: { string: {} },
      },
    };
    expect(compileTypes(input)).toEqual(expected);
  });

  test('compiles a nested object', () => {
    const input = [
      {
        person: { name: "John" },
        otherPerson: { name: "John" },
      }
    ];
    const expected: CompiledType = {
      object: {
        otherPerson: {
          object: {
            name: { string: {} },
          },
        },
        person: {
          object: {
            name: { string: {} },
          },
        },
      },
    };
    expect(compileTypes(input)).toEqual(expected);
  });

  test('compiles and merges multiple types for a property', () => {
    const input = [
      { person: { age: "30" } },
      { person: { age: 30 } }
    ];
    const expected: CompiledType = {
      object: {
        person: {
          object: {
            age: {
              string: {},
              number: {},
            },
          },
        },
      },
    };
    expect(compileTypes(input)).toEqual(expected);
  });

  test('compiles with literal keys correctly', () => {
    const input = [
      {
        user: { name: "Alice", age: 30, active: true },
        settings: { theme: "dark", notifications: true }
      },
      {
        user: { name: "Bob", age: 25, active: false },
        settings: { theme: "light", notifications: false }
      }
    ];
    const config = { literalKeys: ["user.name", "settings.theme"] };
    const expected: CompiledType = {
      object: {
        user: {
          object: {
            name: { '"Bob"': {}, '"Alice"': {} },
            age: { number: {} },
            active: { boolean: {} },
          },
        },
        settings: {
          object: {
            theme: { '"dark"': {}, '"light"': {} },
            notifications: { boolean: {} },
          },
        },
      },
    };
    expect(compileTypes(input, config)).toEqual(expected);
  });

  test('compiles various types', () => {
    const input = [
      {
        stringProp: "hello",
        numberProp: 42,
        booleanProp: true,
        bigintProp: BigInt(100),
        symbolProp: Symbol("symbol"),
        undefinedProp: undefined,
        nullProp: null,
        objectProp: { key: "value" },
        arrayProp: [1, 2, 3],
      },
      {
        stringProp: 100,
        numberProp: "forty-two",
        booleanProp: false,
        objectProp: { key: 10 },
        symbolProp: Symbol("anotherSymbol"),
      },
      {
        arrayProp: ["a", "b", "c"],
        nullProp: null,
        undefinedProp: undefined,
      }
    ];

    const expected: CompiledType = {
      object: {
        stringProp: {
          string: {},
          number: {},
          optional: {},
        },
        numberProp: {
          string: {},
          number: {},
          optional: {},
        },
        booleanProp: {
          boolean: {},
          optional: {},
        },
        bigintProp: {
          bigint: {},
          optional: {},
        },
        symbolProp: {
          symbol: {},
          optional: {},
        },
        undefinedProp: {
          undefined: {},
          optional: {},
        },
        nullProp: {
          null: {},
          optional: {},
        },
        objectProp: {
          object: {
            key: {
              string: {},
              number: {},
            },
          },
          optional: {},
        },
        arrayProp: {
          array: {
            string: {},
            number: {},
          },
          optional: {},
        },
      },
    };
    expect(compileTypes(input)).toEqual(expected);
  });
});

