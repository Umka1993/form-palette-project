import { combineReducers, configureStore } from '@reduxjs/toolkit';
import paletteReducer from './reducers/PaletteSlice';

const rootReducer = combineReducers({
  paletteReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
