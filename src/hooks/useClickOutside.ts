import { ChangeEvent, useEffect, useState } from 'react';

interface IUseClickOutside {
  clickedOutside: boolean;
  handleClickInside: () => void;
}

export const useClickOutside = (ref?: HTMLDivElement | any): IUseClickOutside => {
  const [clickedOutside, setClickedOutside] = useState(false);

  const handleClickOutside = (e?: ChangeEvent<HTMLElement>): void => {
    if (ref && !ref?.current?.contains(e?.target)) {
      setClickedOutside(true);
    }
  };

  const handleClickInside = (): void => setClickedOutside(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as (e: Event) => void);
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside as unknown as (e: Event) => void
      );
  });

  return {
    clickedOutside,
    handleClickInside
  };
};
