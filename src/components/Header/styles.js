import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed; /* Fixa o cabeçalho no topo */
  top: 0;
  left: 0;
  width: 100%; /* Ocupa toda a largura */
  z-index: 1000; /* Garante que o cabeçalho fique acima de outros elementos */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;

  @media (max-width: 768px) { /* Responsividade para telas menores */
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    
  }
`;

export const SiteName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  background-color: #333;
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centraliza os botões */
  gap: 15px;
  background-color: #333;

  Button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    flex-direction: row; /* Empilha os botões na vertical */
    gap: 8px;
    width: 100%;
    font-size: 25px;
    
    Button {
      
      right: -25vw;
      width: 20%; /* Reduz o tamanho dos botões */
      max-width: 200px;
    }
  }
`;


export const Button = styled.button`
  padding: 6px 10px; /* Botões menores */
  font-size: 0.9rem; /* Texto menor */
  color: #fff;
  background-color: #555;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`;

export const UserName = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px; /* Espaçamento entre o nome e o ícone */
  background-color: #333;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #444;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const DropdownItem = styled.div`
  padding: 10px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
