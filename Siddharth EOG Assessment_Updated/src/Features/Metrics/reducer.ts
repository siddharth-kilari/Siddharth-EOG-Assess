import { createSlice, PayloadAction } from 'redux-starter-kit';

export type GetMetrics = {
  getMetrics: string[];
};

export type SelectedMetrics = {
  selectedMetrics: string[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  available: [] as string[],
  chosen: [] as string[],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsRecevied: (state, action: PayloadAction<GetMetrics>) => {
      const { getMetrics } = action.payload;
      state.available = getMetrics.sort();
    },
    metricsSelected: (state, action: PayloadAction<SelectedMetrics>) => {
      const { selectedMetrics } = action.payload;
      state.chosen = selectedMetrics.sort();
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
