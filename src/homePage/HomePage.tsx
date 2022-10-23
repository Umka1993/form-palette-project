import React from 'react';
import s from './homePage.module.scss';
import { Route, Routes } from 'react-router';
import { FormTab } from '../components/formTab/FormTab';
import { PaletteTab } from '../components/paletteTab/PaletteTab';
import { NavLink } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className={s.wrap}>
      <div className={s.headline}>
        <NavLink className={({ isActive }) => `${isActive ? s.active : ''}`} to={'/'} end={true}>
          Форма
        </NavLink>
        <NavLink className={({ isActive }) => `${isActive ? s.active : ''}`} to={'paletteTab'}>
          Палитра
        </NavLink>
      </div>

      <div>
        <Routes>
          <Route path={'/'} element={<FormTab />} />
          <Route path={'/paletteTab'} element={<PaletteTab />} />
        </Routes>
      </div>
    </div>
  );
};
