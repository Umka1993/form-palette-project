import React from 'react';
import s from './page.module.scss';
import { Route, Routes } from 'react-router';
import { Form } from '../components/form/Form';
import { Palette } from '../components/palette/Palette';
import { NavLink } from 'react-router-dom';

export const Page: React.FC = () => {
  return (
    <div className={s.wrap}>
      <div className={s.headline}>
        <NavLink className={({ isActive }) => `${isActive ? s.active : ''}`} to={'/'} end={true}>
          Форма
        </NavLink>
        <NavLink className={({ isActive }) => `${isActive ? s.active : ''}`} to={'palette'}>
          Палитра
        </NavLink>
      </div>

      <div>
        <Routes>
          <Route path={'/'} element={<Form />} />
          <Route path={'/palette'} element={<Palette />} />
        </Routes>
      </div>
    </div>
  );
};
