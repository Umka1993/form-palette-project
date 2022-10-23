import React, { useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import s from '../paletteTab.module.scss';

interface IColorPicker {
  myRef: HTMLDivElement | any;
  handleClickInside: () => void;
  color: string;
  addColor: (arg: string) => void;
  isOpen: boolean;
}

export const ColorPicker: React.FC<IColorPicker> = ({
  myRef,
  handleClickInside,
  color,
  addColor,
  isOpen
}) => {
  return (
    <>
      {isOpen && (
        <div ref={myRef} onClick={handleClickInside}>
          <SketchPicker
            color={color}
            className={s.colorPalette}
            onChange={(e) => addColor(e.hex)}
          />
        </div>
      )}
    </>
  );
};
