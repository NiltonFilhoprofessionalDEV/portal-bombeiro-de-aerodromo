import assert from "node:assert/strict";
import { createMemoryStorage } from "./mock-localstorage.mjs";
import { getFavorites, isFavorite, toggleFavorite } from "../js/favorites.js";

const storage = createMemoryStorage();
const key = "portal-bombeiro:favorites";

assert.deepEqual(getFavorites(storage, key), []);
assert.equal(isFavorite("form-cred", storage, key), false);

assert.equal(toggleFavorite("form-cred", storage, key), true);
assert.equal(isFavorite("form-cred", storage, key), true);
assert.deepEqual(getFavorites(storage, key), ["form-cred"]);

assert.equal(toggleFavorite("form-cred", storage, key), false);
assert.equal(isFavorite("form-cred", storage, key), false);
assert.deepEqual(getFavorites(storage, key), []);

console.log("favorites.test.mjs OK");
