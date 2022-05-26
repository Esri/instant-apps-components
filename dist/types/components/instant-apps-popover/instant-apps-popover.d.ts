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
  placement: string;
  refId: string;
  pagination: boolean;
  dismissible: boolean;
  disableAction: boolean;
  popoverAction: Function;
  intlPopoverAction: string;
  messages: typeof Popover_T9n;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  render(): any;
  renderPagination(): any;
  getMessages(): Promise<void>;
}
