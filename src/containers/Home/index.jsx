import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { AdminPanel } from '../AdminPanel/AdminChekinPanel';
import { UserCheckinPanel } from '../PainelUser/UserCheckinPanel';
import { Container } from './styles';

const Home = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const verifyUserRole = async () => {
      try {
        const { id } = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
        if (!id) throw new Error('ID do usuário não encontrado no token');

        const { data } = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAdmin(data?.papel === 'admin'); // Define o estado com base no papel do usuário
      } catch (error) {
        console.error('Erro ao verificar o papel do usuário:', error);
        localStorage.clear();
        navigate('/login');
      }
    };

    verifyUserRole();
  }, [navigate]);

  return (
    <Container>
      {isAdmin ? <AdminPanel /> : <UserCheckinPanel />}
    </Container>
  );
};

export default Home;
