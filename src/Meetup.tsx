import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './Meetup.module.scss';
import HomePage from './pages/BackgroundMap/HomePage';

const Meetup: FC = () => {
return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Meetup;
