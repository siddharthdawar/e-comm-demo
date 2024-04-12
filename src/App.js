import {Route, Routes} from 'react-router-dom';
import {Home} from './routes/home/home.component';
import {Navigation} from './routes/navigation/navigation.component';
import {SignIn} from './routes/sign-in/sign-in.component';

export const App = () =>
    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
        </Route>
    </Routes>;
