type CalciteClass = 'calcite-mode-light' | 'calcite-mode-dark';
const lightMode = 'calcite-mode-light';
const darkMode = 'calcite-mode-dark';

export function getCalciteClass(el: HTMLElement): CalciteClass {
  const closestEl = el?.closest(`.${darkMode}, .${lightMode}`);
  if (closestEl == null) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? darkMode : lightMode;
  }
  return closestEl?.classList.contains(darkMode) ? darkMode : lightMode;
}

export function getMode(el: HTMLElement): 'light' | 'dark' {
  const closestEl = el?.closest(`.${darkMode}, .${lightMode}`);
  if (closestEl == null) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return closestEl?.classList.contains(darkMode) ? 'dark' : 'light';
}
