import React, { useEffect, useRef, useState } from 'react';
import s from './paletteTab.module.scss';
import { Button } from '../ui/Button';
import { IColor } from '../../types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Palette } from './palette/Palette';
import { SketchPicker } from 'react-color';
import { useAppSelector } from '../../hooks/redux';
import { paletteSlice } from '../../store/reducers/PaletteSlice';
import { useDispatch } from 'react-redux';

export const PaletteTab: React.FC = () => {
  const { colorsCollection, defaultColor } = useAppSelector((state) => state.paletteReducer);
  const { addNewPalette, handlePalette } = paletteSlice.actions;
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [colorCollection, setColorCollection] = useState<IColor[]>(colorsCollection);
  const newPalette = { id: new Date().getTime(), color: defaultColor };
  const myRef = useRef(null);
  const { clickedOutside, handleClickInside } = useClickOutside(myRef);
  const [newColorPalette, setNewColorPalette] = useState(defaultColor);
  const [idHandledPalette, setIdHandledPalette] = useState<number>();

  useEffect(() => {
    if (colorCollection) {
      setIdHandledPalette(colorCollection.slice(-1)[0]?.id);
    }
  }, [colorCollection]);

  useEffect(() => {
    if (newColorPalette && idHandledPalette) {
      dispatch(handlePalette({ id: idHandledPalette, color: newColorPalette }));
    }
  }, [newColorPalette]);

  useEffect(() => {
    if (colorsCollection) {
      setColorCollection(colorsCollection);
    }
  }, [colorsCollection]);

  const addPalette = (): void => {
    setOpen(true);
    dispatch(addNewPalette(newPalette));
    handleClickInside();
  };
  const isColorPickerOpen = isOpen && !clickedOutside;

  const handleColorPalette = (arg: string): void => {
    setNewColorPalette(arg);
  };

  return (
    <div className={s.wrap}>
      {isColorPickerOpen && (
        <div className={s.paletteCard} ref={myRef} onClick={() => handleClickInside}>
          <SketchPicker
            color={'red'}
            className={s.colorPalette}
            onChange={(e) => handleColorPalette(e.hex)}
          />
        </div>
      )}
      <Palette colorCollection={colorsCollection} pickerOpen={isColorPickerOpen} />

      <Button>
        <button ref={myRef} onClick={() => addPalette()}>
          Добавить цвет
        </button>
      </Button>
    </div>
  );
};
