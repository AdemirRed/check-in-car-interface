import { jwtDecode } from 'jwt-decode'; // Certifique-se de que jwt-decode está instalado
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api'; // Certifique-se de que o serviço API está configurado
import { Container, LogoutButton } from './styled';

const Home = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redireciona para login se não estiver logado
      return;
    }

    const fetchUserRole = async () => {
      try {
        const decodedToken = jwtDecode(token); // Decodifica o token JWT
        const { id } = decodedToken; // Extrai o ID do token

        const response = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Verifica se o papel do usuário retornado é "admin"
        if (response.data.papel === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Erro ao verificar o papel do usuário:', error);
        localStorage.clear();
        navigate('/login');
      }
    };

    fetchUserRole();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Limpa os dados do usuário
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Container>
      <h1>Bem-vindo à Home</h1>
      {isAdmin && (
        <div>
          <h2>Opções de Administração</h2>
          <ul>
            <li>Gerenciar Usuários</li>
            <li>Configurações do Sistema</li>
          </ul>
        </div>
      )}
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
    </Container>
  );
};

export default Home;
