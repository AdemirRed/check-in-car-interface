import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import Header from '../../../components/Header';
import { api } from '../../../services/api';
import {
  Container,
  Form,
  Info,
  Input,
  InputContainer,
  Label,
  Select,
  Title,
} from './styles';

const formSchema = yup.object().shape({
  veiculo_id: yup.string().required('Selecione um veículo'),
  destino: yup.string().trim(),
  finalidade: yup.string().trim(),
  observacoes: yup.string().trim(),
});

export function UserCheckinPanel() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário é admin

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
    const fetchVeiculos = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error('Usuário não autenticado');

        // Decodifica o token JWT e verifica o conteúdo
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

        setIsAdmin(userResponse.data.papel === 'admin'); // Define se o usuário é admin

        // Configuração dos cabeçalhos para a requisição
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        // Busca os veículos cadastrados
        const veiculosResponse = await api.get('/carros', config);
        setVeiculos(veiculosResponse.data);
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
        if (err.message === 'Usuário não encontrado') {
          localStorage.clear();
          window.location.href = '/login';
        } else {
          toast.error('Falha ao carregar veículos. Por favor, recarregue a página.');
        }
      }
    };

    fetchVeiculos();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const authToken = localStorage.getItem('authToken');
      const userId = JSON.parse(atob(authToken.split('.')[1])).user_id;

      // Ajusta o horário para o fuso horário local corretamente
      const localDateTime = new Date();
      const adjustedDateTime = new Date(
        localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
      );

      const response = await api.post(
        '/checkins',
        {
          ...data,
          data_hora_saida: adjustedDateTime.toISOString(), // Usa o horário ajustado
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 201) throw new Error('Falha ao registrar check-in');

      toast.success('Check-in registrado com sucesso!');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Ocorreu um erro ao registrar o check-in';
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

  const veiculosArray = Array.isArray(veiculos) ? veiculos : []; // Garante que veiculos seja um array

  return (
    <Container>
      <Header />
      <ToastContainer />
      <Title>Registro de Saída de Veículo</Title>
      <Info>Data e Hora Atual: {formatDateTime(currentDateTime)}</Info>
      {veiculos.length === 0 ? (
        <Info>
          Nenhum veículo cadastrado. {isAdmin ? 'Por favor, cadastre um veículo.' : 'Entre em contato com um administrador para cadastrar veículos.'}
        </Info>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label htmlFor="veiculo_id">Veículo *</Label>
            <Select id="veiculo_id" {...register('veiculo_id')}>
              <option value="">Selecione o veículo</option>
              {veiculosArray.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.placa} - {veiculo.modelo} ({veiculo.cor})
                </option>
              ))}
            </Select>
            {errors.veiculo_id && <p>{errors.veiculo_id.message}</p>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="destino">Destino</Label>
            <Input
              id="destino"
              type="text"
              placeholder="Digite o destino da viagem"
              {...register('destino')}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="finalidade">Finalidade da Saída</Label>
            <Input
              id="finalidade"
              type="text"
              placeholder="Motivo da utilização do veículo"
              {...register('finalidade')}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="observacoes">Observações</Label>
            <Input
              id="observacoes"
              type="text"
              placeholder="Informações adicionais sobre a saída do veículo"
              {...register('observacoes')}
            />
          </InputContainer>

          <Button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Registrar Check-in'}
          </Button>
        </Form>
      )}
    </Container>
  );
}
