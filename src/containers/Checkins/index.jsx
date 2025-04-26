import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, CheckinCard, CheckinInfo, CheckinTitle, NoCheckinsMessage } from './styles';

// ...existing code...

const Checkins = () => {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        const response = await axios.get('/checkins', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCheckins(Array.isArray(response.data) ? response.data : []); // Garante que seja um array
      } catch (error) {
        console.error('Erro ao buscar os check-ins:', error);
        setCheckins([]); // Define como array vazio em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchCheckins();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {checkins.length > 0 ? (
        checkins.map((checkin) => (
          <CheckinCard key={checkin.usuario_id}>
            <CheckinTitle>Veículo: {checkin.veiculo.modelo}</CheckinTitle>
            <CheckinInfo>Destino: {checkin.destino || 'Não informado'}</CheckinInfo>
            <CheckinInfo>Finalidade: {checkin.finalidade || 'Não informado'}</CheckinInfo>
            <CheckinInfo>Observações: {checkin.observacoes || 'Nenhuma'}</CheckinInfo>
            <CheckinInfo>Saída: {new Date(checkin.data_hora_saida).toLocaleString()}</CheckinInfo>
            <CheckinInfo>
              Retorno: {checkin.data_hora_retorno ? new Date(checkin.data_hora_retorno).toLocaleString() : 'Não retornado'}
            </CheckinInfo>
          </CheckinCard>
        ))
      ) : (
        <NoCheckinsMessage>Nenhum check-in encontrado.</NoCheckinsMessage>
      )}
    </Container>
  );
};

export default Checkins;
