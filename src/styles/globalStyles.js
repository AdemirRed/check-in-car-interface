import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 


*{
  box-sizing: border-box;
  margin: 0;   
  padding: 0;
  font-family: 'Poppins', sans-serif;
  outline: none;
  text-decoration: none;
  color: rgb(30, 148, 138);
  background-color: #3b3b3b;
  
  }
  a{
    color: #007bff;
  }

  button {
    cursor: pointer;
  }
  `;

export default GlobalStyles;
