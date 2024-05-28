const reservedKeywords = new Set([
  "abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger",
  "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float",
  "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "long", "native",
  "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch",
  "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with"
]);

export const needsQuoting = (prop: string): boolean => {
  // Check if the prop is a reserved keyword
  if (reservedKeywords.has(prop)) {
    return true;
  }

  // Regular expression to match valid identifier names
  const identifierRegex = /^[$A-Z_][0-9A-Z_$]*$/i;

  // Check if the prop is a valid identifier
  return !identifierRegex.test(prop);
};
