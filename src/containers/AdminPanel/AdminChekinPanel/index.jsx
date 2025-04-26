/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../../components/Header';

import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import {
  Container,
  DadosBasicos,
  Data,
  Form,
  Info,
  InfoViagem,
  Input,
  InputContainer,
  Label,
  Select,
  SvgIcon,

  Title,
} from './styles';

// Define o schema de validação com yup
const formSchema = yup.object().shape({
  usuario_id: yup.string().required('Selecione um usuário'),
  veiculo_id: yup.string().required('Selecione um veículo'),
  destino: yup.string().trim(),
  finalidade: yup.string().trim(),
  observacoes: yup.string().trim(),
});

export function AdminPanel() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedVeiculo, setSelectedVeiculo] = useState(null); // Estado para armazenar o veículo selecionado

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error('Usuário não autenticado');

        // Decodifica o token JWT e extrai o usuario_id
        const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
        const usuarioId = decodedToken?.usuario_id; // Corrigido para usuario_id
        if (!usuarioId) throw new Error('ID do usuário não encontrado no token');

        // Verifica se o usuário ainda existe no banco
        const userResponse = await api.get(`/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!userResponse.data) {
          throw new Error('Usuário não encontrado');
        }

        // Configuração dos cabeçalhos para as requisições
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        // Busca os usuários cadastrados
        const usuariosResponse = await api.get('/usuarios', config);
        setUsuarios(usuariosResponse.data);

        // Busca os veículos cadastrados
        const veiculosResponse = await api.get('/carros', config);
        setVeiculos(veiculosResponse.data);
      } catch (err) {
        if (
          err.message === 'Usuário não autenticado' ||
          err.message === 'Usuário não encontrado' ||
          err.response?.status === 401
        ) {
          localStorage.clear();
          navigate('/login');
        } else {
          setError('Falha ao carregar dados. Por favor, recarregue a página.');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleVeiculoChange = (event) => {
    const veiculoId = event.target.value;
    const veiculo = veiculos.find((v) => v.id === veiculoId);

    if (veiculo?.status === 'inativo' || veiculo?.status === 'em manutenção') {
      toast.error('Este veículo não está disponível para uso.');
      setSelectedVeiculo(null);
    } else {
      setSelectedVeiculo(veiculo || null);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const authToken = localStorage.getItem('authToken');

      // Ajusta o horário para o fuso horário local corretamente
      const localDateTime = new Date();
      const adjustedDateTime = new Date(
        localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
      );

      // Atualiza o status do veículo para "inativo"
      const updateResponse = await api.patch(
        `/carros/${data.veiculo_id}`,
        { status: 'inativo' },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (updateResponse.status !== 200) {
        console.error('Erro ao atualizar status do veículo:', updateResponse);
        throw new Error('Falha ao atualizar status do veículo');
      }

      // Registra o check-in somente após a atualização do veículo
      const response = await api.post(
        '/checkins',
        {
          ...data,
          data_hora_saida: adjustedDateTime.toISOString(),
          user_id: data.usuario_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 201) throw new Error('Falha ao registrar check-in');

      setSuccess(true);
      toast.success('Check-in registrado com sucesso!');

      // Atualiza a página e redireciona para a página de registros
      setTimeout(() => {
        window.location.reload(); // Atualiza a página
        navigate('/check'); // Redireciona para a página de registros
      }, 2000);
    } catch (err) {
      console.error('Erro no processo de check-in:', err);
      const errorMessage =
        err.response?.data?.message || 'Ocorreu um erro ao registrar o check-in';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(date);
  };

  return (
    <Container>
      <Header />
      <ToastContainer />
      <Title>Registro de Saída de Veículo</Title>
      <Data>{formatDateTime(currentDateTime)}</Data>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Info>
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </SvgIcon>
          Preencha todos os campos para registrar a saída do veículo. Campos
          marcados com * são obrigatórios.
        </Info>
        <DadosBasicos>
          <Label htmlFor="usuario_id">Usuário Responsável *</Label>
          <InputContainer>
            
            <Select
              id="usuario_id"
              name="usuario_id"
              {...register('usuario_id')}
            >
              <option value="">Selecione o usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </Select>
          </InputContainer>
          {errors.usuario_id && <p>{errors.usuario_id.message}</p>}
          <Label htmlFor="veiculo_id">Veículo *</Label>
          <InputContainer>
            <Select
              id="veiculo_id"
              name="veiculo_id"
              {...register('veiculo_id')}
              hasError={!!errors.veiculo_id}
              onChange={(e) => {
                register('veiculo_id').onChange(e);
                handleVeiculoChange(e);
              }}
            >
              <option value="">Selecione o veículo</option>
              {Array.isArray(veiculos) &&
                veiculos.map((veiculo) => (
                  <option
                    key={veiculo.id}
                    value={veiculo.id}
                    disabled={veiculo.status === 'inativo' || veiculo.status === 'em manutenção'}
                  >
                    {veiculo.placa} - {veiculo.modelo} ({veiculo.cor}) - {veiculo.status}
                  </option>
                ))}
            </Select>
          </InputContainer>
          {errors.veiculo_id && <p>{errors.veiculo_id.message}</p>}
          {selectedVeiculo && (
            <Info>
              <p><strong>Placa:</strong> {selectedVeiculo.placa}</p>
              <p><strong>Modelo:</strong> {selectedVeiculo.modelo}</p>
              <p><strong>Cor:</strong> {selectedVeiculo.cor}</p>
            </Info>
          )}
        </DadosBasicos>
        <InfoViagem>
          <Label htmlFor="destino">Destino</Label>
          <InputContainer>
           
            <Input
              id="destino"
              name="destino"
              type="text"
              placeholder="Digite o destino da viagem"
              {...register('destino')}
              hasError={!!errors.destino}
            />
          </InputContainer>
          <Label htmlFor="finalidade">Finalidade da Saída</Label>
          <InputContainer>
           
            <Input
              id="finalidade"
              name="finalidade"
              placeholder="Motivo da utilização do veículo"
              {...register('finalidade')}
            />
          </InputContainer>
          <Label htmlFor="observacoes">Observações</Label>
          <InputContainer>
           
            <Input
              id="observacoes"
              name="observacoes"
              placeholder="Informações adicionais sobre a saída do veículo"
              {...register('observacoes')}
            />
          </InputContainer>
        </InfoViagem>
        <Info>
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </SvgIcon>
          A data e hora de saída serão registradas automaticamente:{' '}
          {formatDateTime(currentDateTime)}
        </Info>
        <Button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Registrar Check-in'}
        </Button>
      </Form>
    </Container>
  );
}
