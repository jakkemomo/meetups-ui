import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NonFound from './pages/NonFound';
import RegistrationPage from './pages/HomePage/RegistrationPage';

const Meetup: FC = () => {
return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='*' element={<NonFound />}/>
        <Route path='/registration' element={<RegistrationPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Meetup;
