import React, { useState } from 'react';
import s from './color.module.scss';
import { IColor } from '../../../../types';
import { paletteSlice } from '../../../../store/reducers/PaletteSlice';
import { useDispatch } from 'react-redux';

export const Color: React.FC<IColor> = ({ color, id }) => {
  const [isHover, setIsHover] = useState(false);
  const { deletePalette } = paletteSlice.actions;
  const dispatch = useDispatch();

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      className={s.colorItem}
      key={id}
      style={{ backgroundColor: color }}>
      {isHover && (
        <button onClick={() => dispatch(deletePalette(id))} className={s.close}>
          X
        </button>
      )}
    </div>
  );
};
