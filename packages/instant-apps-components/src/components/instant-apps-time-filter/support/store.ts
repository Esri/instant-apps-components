import { createStore } from '@stencil/store';
import { State } from '../interfaces';

const { state, onChange } = createStore<State>({
  timeInfoConfigItems: [],
  filterMode: null,
  view: null,
  timeSlider: null,
  timeInfoItems: [],
  selectedTimeInfoItem: null,
  loading: true,
});

export { state, onChange };
