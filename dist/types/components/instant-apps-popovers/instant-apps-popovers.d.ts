export declare class InstantAppsPopovers {
  currentId: string;
  host: HTMLElement;
  instantAppsPopovers: Map<string, HTMLInstantAppsPopoverElement>;
  pagination: boolean;
  componentWillLoad(): void;
  render(): any;
  next(): void;
  previous(): void;
  done(): void;
  open(key: string): Promise<void>;
  close(key: string): Promise<void>;
}
