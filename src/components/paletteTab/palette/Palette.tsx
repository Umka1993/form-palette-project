import React, { useEffect, useRef, useState } from 'react';
import s from './palette.module.scss';
import { IColor } from '../../../types';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { SketchPicker } from 'react-color';
import { Color } from './color/Color';
import { paletteSlice } from '../../../store/reducers/PaletteSlice';
import { useDispatch } from 'react-redux';

interface IColors {
  colorCollection: IColor[];
  pickerOpen: boolean;
}

export const Palette: React.FC<IColors> = ({ colorCollection }) => {
  const refPal = useRef<HTMLDivElement>(null);
  const { clickedOutside, handleClickInside } = useClickOutside(refPal);
  const [idHandledPalette, setIdHandledPalette] = useState<number>();
  const [newColorPalette, setNewColorPalette] = useState('');
  const [handledCollection, setHandledCollection] = useState<IColor[]>(colorCollection);
  const { handlePalette } = paletteSlice.actions;
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (colorCollection) {
      setHandledCollection(colorCollection);
    }
  }, [colorCollection]);

  useEffect(() => {
    if (newColorPalette && idHandledPalette) {
      dispatch(handlePalette({ id: idHandledPalette, color: newColorPalette }));
    }
  }, [newColorPalette]);

  const isColorPickerOpen = isOpen && !clickedOutside;

  const open = (id: number): void => {
    setIdHandledPalette(id);
    setOpen(true);
    handleClickInside();
  };

  const handleColorPalette = (arg: string): void => {
    setNewColorPalette(arg);
  };

  const style = {
    gridTemplateRows: `repeat(${Math.ceil(handledCollection.length / 4)}, 55px)`
  };

  return (
    <div className={s.wrap} style={style}>
      {handledCollection.map(({ color, id }) => {
        return (
          <div className={s.paletteItem} key={id} ref={refPal} onClick={() => open(id)}>
            <Color key={id} color={color} id={id} />
          </div>
        );
      })}

      {isColorPickerOpen && (
        <div className={s.paletteCard} ref={refPal} onClick={() => handleClickInside}>
          <SketchPicker
            color={'red'}
            className={s.colorPalette}
            onChange={(e) => handleColorPalette(e.hex)}
          />
        </div>
      )}
    </div>
  );
};
