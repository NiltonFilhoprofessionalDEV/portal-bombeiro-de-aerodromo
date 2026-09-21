const DEFAULT_KEY = "portal-bombeiro:favorites";

function readIds(storage, key) {
  try {
    const raw = storage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(storage, key, ids) {
  storage.setItem(key, JSON.stringify(ids));
}

export function getFavorites(storage = globalThis.localStorage, key = DEFAULT_KEY) {
  return readIds(storage, key);
}

export function isFavorite(id, storage = globalThis.localStorage, key = DEFAULT_KEY) {
  return getFavorites(storage, key).includes(id);
}

/** @returns {boolean} novo estado (true = favoritado) */
export function toggleFavorite(id, storage = globalThis.localStorage, key = DEFAULT_KEY) {
  const current = getFavorites(storage, key);
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  writeIds(storage, key, next);
  return !exists;
}
