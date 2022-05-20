export declare class InstantAppsPopovers {
  currentId: string;
  host: HTMLElement;
  instantAppsPopovers: Map<string, HTMLInstantAppsPopoverElement>;
  previous: HTMLCalcitePopoverElement;
  componentWillLoad(): void;
  render(): any;
  handlePrevious(node: HTMLCalcitePopoverElement): void;
  page(type: 'back' | 'next'): void;
  getKey(type: 'back' | 'next'): string | undefined;
  getIndex(): number | null;
  open(key: string): Promise<void>;
}
