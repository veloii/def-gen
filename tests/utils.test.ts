import { describe, it, expect } from 'vitest';
import { needsQuoting } from '../src/utils/property-checker';
import { escapeQuotes } from '../src/utils/escape-quotes';

const propertyNameTestProperties = [
  { prop: "validIdentifier", needsQuote: false },
  { prop: "1stPlace", needsQuote: true },
  { prop: "first name", needsQuote: true },
  { prop: "last-name", needsQuote: true },
  { prop: "naïve", needsQuote: true },
  { prop: "email@", needsQuote: true },
  { prop: "class", needsQuote: true },
  { prop: "_privateVar", needsQuote: false },
  { prop: "$dollarSign", needsQuote: false },
];

describe('propertyNameQuoting', () => {
  propertyNameTestProperties.forEach(({ prop, needsQuote }) => {
    it(`"${prop}" should ${needsQuote ? '' : 'not '}need to be quoted`, () => {
      const result = needsQuoting(prop);
      expect(result).toBe(needsQuote);
    });
  });
});

describe('escapeQuotes', () => {
  it('should escape double quotes in a string', () => {
    const input = 'He said, "Hello, World!"';
    const expected = 'He said, \\"Hello, World!\\"';
    expect(escapeQuotes(input)).toBe(expected);
  });

  it('should handle strings without double quotes', () => {
    const input = 'Hello, World!';
    const expected = 'Hello, World!';
    expect(escapeQuotes(input)).toBe(expected);
  });

  it('should handle strings with multiple double quotes', () => {
    const input = '"Hello", "World", "!"';
    const expected = '\\"Hello\\", \\"World\\", \\"!\\"';
    expect(escapeQuotes(input)).toBe(expected);
  });

  it('should handle empty strings', () => {
    const input = '';
    const expected = '';
    expect(escapeQuotes(input)).toBe(expected);
  });

  it('should handle strings with escaped quotes already', () => {
    const input = 'He said, \\"Hello, World!\\"';
    const expected = 'He said, \\\\"Hello, World!\\\\"';
    expect(escapeQuotes(input)).toBe(expected);
  });
});
