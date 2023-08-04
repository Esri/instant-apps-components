let timer: NodeJS.Timeout;

export function debounceCalciteInput(func: Function, func2, delay: number = 2000): (e: CustomEvent) => void {
  return (e: CustomEvent) => {
    func2(e);
    clearTimeout(timer);
    timer = setTimeout(func.bind(null, e), delay);
  };
}
