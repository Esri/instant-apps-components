export function handleSingleQuote(value: string): string {
  return value.replaceAll("'", "''");
}

export function convertToDate(date: string | number | undefined, includeTime: boolean = false): string | undefined {
  if (date) {
    const tmpDate = new Date(date);
    const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
    if (includeTime) {
      const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
      return `${formattedDate} ${time}`;
    } else {
      return formattedDate;
    }
  }

  return;
}

export function resetDatePicker(datePicker: HTMLCalciteInputDatePickerElement): void {
  if (datePicker != null) {
    datePicker.value = ['', ''];
    const inputs = datePicker.shadowRoot?.querySelectorAll('calcite-input');
    if (inputs != null) {
      for (const input of inputs) {
        input.value = '';
      }
    }
  }
}
