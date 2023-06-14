export function setLocalStorageItem(key: string): void {
  window?.localStorage.setItem(key, 'false');
}
export function getLocalStorageItem(key: string): boolean {
  const item = window?.localStorage?.getItem(key);
  return item ? true : false;
}
export function removeItemFromLocalStorage(key: string): void {
  window?.localStorage?.removeItem(key);
}
