export function escapeQuotes(value: string) {
  return value.replace(/"/g, '\\\"')
}
