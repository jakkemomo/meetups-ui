import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './home/HomePage';
import NotFoundPage from './errors/NotFoundPage';
import RegistrationPage from './registration/RegistrationPage';

export const Routing: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default Routing;