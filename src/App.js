import {Route, Routes} from 'react-router-dom';
import {Authentication} from './routes/authentication/authentication.component';
import {Home} from './routes/home/home.component';
import {Navigation} from './routes/navigation/navigation.component';
import {Shop} from './routes/shop/shop.component';

export const App = () =>
    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='auth' element={<Authentication/>}/>
        </Route>
    </Routes>;
