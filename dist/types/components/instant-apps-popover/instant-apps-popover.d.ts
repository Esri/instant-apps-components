import { InstantAppsPopovers } from '../instant-apps-popovers/instant-apps-popovers';
import Popover_T9n from '../../assets/t9n/instant-apps-popover/resources.json';
export declare class InstantAppsPopover {
  popoverEl: HTMLCalcitePopoverElement;
  el: HTMLInstantAppsPopoverElement;
  popoverTitle: string;
  subtitle: string;
  content: string;
  mediaSrc: string;
  index: number;
  referenceElement: string | HTMLElement;
  parent: InstantAppsPopovers;
  pagination: boolean;
  beforeOpen: () => Promise<void>;
  messages: typeof Popover_T9n;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  render(): any;
  renderPagination(): any;
  getMessages(): Promise<void>;
}