export declare class InstantAppsPopovers {
  host: HTMLElement;
  instantAppsPopovers: {
    [id: string]: HTMLInstantAppsPopoverElement;
  };
  previous: HTMLCalcitePopoverElement;
  componentDidLoad(): void;
  render(): any;
  handlePrevious(e: CustomEvent): void;
}
