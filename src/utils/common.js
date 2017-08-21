export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceSpaceWithDash(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

export function replaceDashWithSpace(str) {
  return str.replace(/-/g, ' ').toLowerCase();
}
