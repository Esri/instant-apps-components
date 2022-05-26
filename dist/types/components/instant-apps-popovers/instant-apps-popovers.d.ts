export declare class InstantAppsPopovers {
  inTour: boolean;
  currentId: string;
  host: HTMLElement;
  instantAppsPopovers: Map<string, HTMLInstantAppsPopoverElement>;
  beforeOpen: () => Promise<void>;
  componentWillLoad(): void;
  render(): any;
  next(): void;
  previous(): void;
  done(): void;
  handlePopoverProps(config: {
    pagination: boolean;
    disableAction: boolean;
  }): void;
  open(key: string): Promise<void>;
  close(key: string): Promise<void>;
  beginTour(): Promise<void>;
  endTour(): Promise<void>;
}
