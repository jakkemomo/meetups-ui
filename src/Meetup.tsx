import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NonFound from './pages/NonFound';

const Meetup: FC = () => {
return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='*' element={<NonFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Meetup;
