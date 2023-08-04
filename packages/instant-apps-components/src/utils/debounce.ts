let timer: NodeJS.Timeout;

export function debounceCalciteInput(func: Function, delay: number = 2000): (e: CustomEvent) => void {
  return function (e: CustomEvent) {
    clearTimeout(timer);
    const node = e.target as HTMLCalciteInputElement;
    const value = (e.target as HTMLCalciteInputElement).value;
    timer = setTimeout(
      func.bind(null, {
        fieldName: node.getAttribute('data-field-name'),
        value,
      }),
      delay,
    );
  };
}
