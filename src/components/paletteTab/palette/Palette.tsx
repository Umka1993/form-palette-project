import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import s from './palette.module.scss';
import { IColor } from '../../../types';
import { ColorPicker } from '../colorPicker/ColorPicker';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { HSLColor } from 'react-color';
import { Color } from './color/Color';

interface IColors {
  colorCollection: IColor[];
}

export const Palette: React.FC<IColors> = ({ colorCollection }) => {
  const itemEls = useRef<any[]>();
  const ref = useRef(null);
  const myRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { clickedOutside, handleClickInside } = useClickOutside(ref);

  const collectionColorsHandler = ({ id, color }: IColor): void => {
    // console.log(id, color);
  };

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const isColorPickerOpen = isOpen && !clickedOutside;

  return (
    <div className={s.wrap}>
      {colorCollection.map(({ color, id }) => {
        return (
          <Color
            key={id}
            color={color}
            id={id}
            collectionColorsHandler={collectionColorsHandler}
            setIsOpen={handleOpen}>
            {isColorPickerOpen && (
              <ColorPicker
                // addColor={setColor}
                color={color}
                isOpen={true}
                // handleClickInside={handleClickInside}
                // myRef={setTextInputRef}
                addColor={() => console.log('addColor')}
                handleClickInside={handleClickInside}
                myRef={myRef}
              />
            )}
          </Color>
        );
      })}
    </div>
  );
};
