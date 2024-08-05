import { createStore } from '@stencil/store';
import { State } from '../interfaces/interfaces';

const { state, onChange } = createStore<State>({
  timeInfoConfigItems: [],
  filterMode: { type: 'filter' },
  view: null,
  timeSlider: null,
  timeInfoItems: [],
  selectedTimeInfoItem: null,
  loading: true,
});

export { state, onChange };
