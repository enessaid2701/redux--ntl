import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: 'en',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

const store = configureStore({
  reducer: {
    locale: localeSlice.reducer,
  },
});

export default store;
