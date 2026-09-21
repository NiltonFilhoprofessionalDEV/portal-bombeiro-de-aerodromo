/**
 * @param {Array<{title?: string, description?: string, category?: string, tags?: string[]}>} resources
 * @param {string} query
 */
export function filterResources(resources, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return resources.slice();

  return resources.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.access,
      item.category,
      ...(item.tags || [])
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
