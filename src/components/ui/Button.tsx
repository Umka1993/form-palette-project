import React, { ReactNode } from 'react';
import('./button.module.scss');

interface IButton {
  children: ReactNode;
}

export const Button: React.FC<IButton> = ({ children }) => {
  return <>{children}</>;
};
