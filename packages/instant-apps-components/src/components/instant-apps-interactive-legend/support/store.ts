import { createStore } from '@stencil/store';
import { IInteractiveLegendData } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';

interface InteractiveLegendState {
  data: IInteractiveLegendData;
  relationshipRampExpandStates: { [layerId: string]: boolean };
}

const InteractiveLegendStore = createStore<InteractiveLegendState>({ data: {} as IInteractiveLegendData, relationshipRampExpandStates: {} });

export const interactiveLegendState = InteractiveLegendStore.state;
export const onInteractiveLegendChange = InteractiveLegendStore.onChange;
export const store = InteractiveLegendStore;
