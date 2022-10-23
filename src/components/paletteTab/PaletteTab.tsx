import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import s from './paletteTab.module.scss';
import { Button } from '../ui/Button';
import { IColor } from '../../types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ColorPicker } from './colorPicker/ColorPicker';
import { Palette } from './palette/Palette';

const defaultCollection = [
  { id: 1, color: '' },
  { id: 2, color: '' },
  { id: 3, color: 'red' },
  { id: 4, color: 'red' },
  { id: 5, color: 'red' },
  { id: 6, color: 'red' },
  { id: 7, color: 'red' },
  { id: 8, color: 'red' }
];

export const PaletteTab: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [color, setColor] = useState('');
  const [colorCollection, setColorCollection] = useState<IColor[]>([]);
  const myRef = useRef<HTMLDivElement | any>();
  const { clickedOutside, handleClickInside } = useClickOutside(myRef);

  useEffect(() => {
    const colors: Array<{ id: number; color: string }> = [];
    defaultCollection.forEach((item) => {
      colors.push({ id: item.id, color });
    });
    setColorCollection(colors);
  }, [color]);

  const addColor = (arg: string): void => {
    setOpen(true);
    setColor(arg);
    handleClickInside();
  };
  const isColorPickerOpen = isOpen && !clickedOutside;

  return (
    <div className={s.wrap}>
      <ColorPicker
        addColor={addColor}
        color={color}
        handleClickInside={handleClickInside}
        isOpen={isColorPickerOpen}
        myRef={myRef}
      />

      <Palette colorCollection={colorCollection} />
      <Button>
        <button onClick={() => addColor('red')}>Добавить цвет</button>
      </Button>
    </div>
  );
};
