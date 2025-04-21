import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import {
  DropdownItem,
  DropdownMenu,
  HeaderContainer,
  NavButtons,
  SiteName,
  UserName
} from './styles';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const fetchUserName = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const { nome } = parseJwt(token);
        setUserName(nome || 'Usuário');
      }
    };

    fetchUserName();
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <SiteName>Check-In Car</SiteName>
      <NavButtons>
        {/* <Button onClick={() => navigate('/')}>Home</Button> */}

        <UserName onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="user-icon"
          >
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path>
          </svg>
          {`${userName} `}
          <DropdownMenu isOpen={menuOpen}>
            <DropdownItem onClick={() => navigate('/perfil')}>Editar Perfil</DropdownItem>
            <DropdownItem onClick={() => navigate('/config')}>Configurações</DropdownItem>
            <DropdownItem onClick={() => navigate('/ajuda')}>Ajuda</DropdownItem>
          </DropdownMenu>
        </UserName>

        <Button onClick={handleLogout}>Sair</Button>
       
      </NavButtons>
    </HeaderContainer>
  );
};

export default Header;

// Função para decodificar o token JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Erro ao decodificar o token:', e);
    return {};
  }
};
