let timer: NodeJS.Timeout;

export function debounceCalciteInput(delayedFunction: Function, immediateFunction?: Function, delay: number = 2000): (e: CustomEvent) => void {
  return (e: CustomEvent) => {
    if (immediateFunction) immediateFunction(e);
    clearTimeout(timer);
    timer = setTimeout(delayedFunction.bind(null, e), delay);
  };
}
