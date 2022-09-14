import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  count: number;
  isIncrementing: boolean;
  isDecrementing: boolean;
}

export const initialCounterState: CounterState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
};
// createAsyncThunk это функция которая из коробки ReduxToolkit предоставляет возможность создания асинхронного санка
// первым параметром она принимает Action
// второй параметр это функция в которой описана логика работы, например асинхронные запросы на сервер или просто выполнение редьюсера с задержкой через SetTimeout

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(increment());
    }, 3000);
  }
);
export const decrementAsync = createAsyncThunk(
  "counter/decrementAsync",
  async (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(decrement());
    }, 3000);
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.count += 1;
      state.isIncrementing = !state.isIncrementing;
    },

    decrement(state) {
      state.count -= 1;
      state.isDecrementing = !state.isDecrementing;
    },
  },
});

const { reducer, actions } = counterSlice;
export default reducer;
export const { decrement, increment } = actions;
