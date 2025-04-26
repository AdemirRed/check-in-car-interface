import { createBrowserRouter } from 'react-router-dom';
import Checkins from '../containers/Checkins';
import { ForgotPassword } from '../containers/ForgotPassword';
import Home from '../containers/Home';
import { Login } from '../containers/Login';
import { Register } from '../containers/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/esqueci-senha',
    element: <ForgotPassword />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/check',
    element: <Checkins />,
  }
]);
