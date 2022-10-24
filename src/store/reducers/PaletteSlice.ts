import { IColor } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialstate {
  colorsCollection: IColor[];
  defaultColor: string;
}

const initialState: IInitialstate = {
  colorsCollection: [],
  defaultColor: 'red'
};

export const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    addNewPalette(state, action: PayloadAction<IColor>) {
      state.colorsCollection.push(action.payload);
    },
    deletePalette(state, action: PayloadAction<number>) {
      const collection: IColor[] = [];
      state.colorsCollection.forEach((item) => {
        if (item.id !== action.payload) {
          collection.push(item);
        }
      });
      state.colorsCollection = collection;
    },
    handlePalette(state, action: PayloadAction<IColor>) {
      const collection: IColor[] = [];
      state.colorsCollection.forEach((item) => {
        if (item.id === action.payload.id) {
          collection.push({ id: action.payload.id, color: action.payload.color });
        } else {
          collection.push(item);
        }
      });
      state.colorsCollection = collection;
    }
  }
});

export default paletteSlice.reducer;
