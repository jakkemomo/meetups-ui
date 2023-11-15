import React, { FC } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import styles from './Meetup.module.scss';
import BackgroundMap from './pages/BackgroundMap/BackgroundMap';

const Meetup: FC = () => {
return (
    // <BrowserRouter>
    //   <Routes></Routes>
    // </BrowserRouter>
    <BackgroundMap />
  );
}

export default Meetup;
