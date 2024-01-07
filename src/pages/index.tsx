import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import NonFound from './NonFound';
import AuthPage from './AuthPage';

export const Routing: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='*' element={<NonFound/>}/>
                <Route path='/registration' element={<AuthPage type="registration"/>}/>
                <Route path='/login' element={<AuthPage type="login"/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default Routing;