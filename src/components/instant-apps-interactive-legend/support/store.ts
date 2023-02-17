import { createStore } from '@stencil/store';
import { IInteractiveLegendData } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';

interface InteractiveLegendState {
  data: IInteractiveLegendData;
}

const InteractiveLegendStore = createStore<InteractiveLegendState>({ data: {} as IInteractiveLegendData });

export const interactiveLegendState = InteractiveLegendStore.state;
export const onInteractiveLegendChange = InteractiveLegendStore.onChange;
export const store = InteractiveLegendStore;
