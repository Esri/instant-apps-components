import { statSync } from 'node:fs';
import resolvePkg from 'resolve-pkg';

function isFile(id: string): boolean {
  // Resolve the id
  const p = resolvePkg(id);
  if (!p) {
    // Cannot resolve
    return false;
  }

  // Add the .js and check if this is a file
  const s = statSync(`${p}.js`, { throwIfNoEntry: false });
  if (!s) {
    // File doesn't exist must be a directory
    return false;
  }

  // Make sure it is actually a real file
  return s.isFile();
}

/**
 * If the id is a file then add the .js extension if not already there.
 * @param id The id to normalize
 * @returns The normalized id
 */
export function normalizeId(id: string): string {
  // If the id is not a file then keep it
  if (!isFile(id)) {
    return id;
  }

  // Add the .js for files
  return id.endsWith('.js') ? id : `${id}.js`;
}
