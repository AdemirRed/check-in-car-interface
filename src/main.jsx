import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Login } from './containers/Login'; // Corrigido para usar o export default
import GlobalStyles from './styles/globalStyles'; // Corrigido para usar o export default

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <GlobalStyles />
  </StrictMode>
);
