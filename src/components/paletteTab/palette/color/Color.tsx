import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import s from '../palette.module.scss';
import { ColorPicker } from '../../colorPicker/ColorPicker';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { IColor } from '../../../../types';

interface IColorItem extends IColor {
  collectionColorsHandler: (arg: IColor) => void;
  children: ReactNode;
  setIsOpen?: () => void;
}

export const Color: React.FC<IColorItem> = ({
  setIsOpen,
  children,
  color,
  id,
  collectionColorsHandler
}) => {
  const [newColor, setColor] = useState('');

  useEffect(() => {
    collectionColorsHandler({ id, color: newColor });
  }, [newColor]);

  return (
    <div
      className={s.colorItem}
      key={id}
      onClick={() => setIsOpen?.()}
      style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};
