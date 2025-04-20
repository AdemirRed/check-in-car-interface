import * as yup from 'yup';

import { toast } from 'react-toastify';
import { Validacao } from '../../components/Validation';
import { api } from '../../services/api';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import {
  ButtonContainer,
  Container,
  Footer,
  Form,
  ImputContainer,
  Link,
  P,
  Title
} from './styles';

export function Register() {
  const schema = yup
    .object({
      nome: yup.string().required('O nome é obrigatório'),
      email: yup
        .string()
        .email('E-mail inválido')
        .required('O e-mail é obrigatório'),
      senha_hash: yup
        .string()
        .required('A senha é obrigatória')
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
      confirmar_senha: yup
        .string()
        .oneOf([yup.ref('senha_hash'), null], 'As senhas devem corresponder')
        .required('A confirmação da senha é obrigatória'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await toast.promise(
      api.post(
        '/usuarios',
        {
          nome: data.nome,
          email: data.email,
          senha_hash: data.senha_hash,
        },
        {
          validateStatus: () => true,
        }
      ),
      {
        pending: 'Aguarde... ⏳',
        success:{
          render(){
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
            return 'Cadastro realizado com sucesso! ☑️';
          },
        },
        error: {
          render({ data }) {
            if (data.response?.status === 409) {
              return 'Email já cadastrado! Faça login para continuar! ❌';
            }
            return '🥲 Erro inesperado ao registrar usuário! ❌';
          },
        },
      }
    );
  };

  return (
    <Container>
      <Title>Crie sua conta</Title>
      <P>Preencha os campos abaixo para se registrar</P>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImputContainer>
          <label htmlFor="nome">Nome:</label>
          <input type="text" {...register('nome')} />
          <Validacao
            red={errors?.nome?.message !== undefined ? 'true' : undefined}
          >
            {errors?.nome?.message}
          </Validacao>
        </ImputContainer>

        <ImputContainer>
          <label htmlFor="email">Email:</label>
          <input type="email" {...register('email')} />
          <Validacao
            red={errors?.email?.message !== undefined ? 'true' : undefined}
          >
            {errors?.email?.message}
          </Validacao>
        </ImputContainer>

        <ImputContainer>
          <label htmlFor="senha_hash">Senha:</label>
          <input type="password" {...register('senha_hash')} />
          <Validacao
            red={errors?.senha_hash?.message !== undefined ? 'true' : undefined}
          >
            {errors?.senha_hash?.message}
          </Validacao>
        </ImputContainer>

        <ImputContainer>
          <label htmlFor="confirmar_senha">Confirmar Senha:</label>
          <input type="password" {...register('confirmar_senha')} />
          <Validacao
            red={
              errors?.confirmar_senha?.message !== undefined ? 'true' : undefined
            }
          >
            {errors?.confirmar_senha?.message}
          </Validacao>
        </ImputContainer>

        <ButtonContainer>
          <Button type="submit">Registrar</Button>
        </ButtonContainer>
      </Form>
      <div>
        <p>
          Já tem uma conta? <Link to="/login">Login</Link>
        </p>
      </div>
      <Footer>
        <p>&copy; 2025 RedBlack. Todos os direitos reservados.</p>
        <p>
          <a href="#">Termos de Uso</a> |{' '}
          <a href="#">Política de Privacidade</a>
        </p>
        <p>
          Desenvolvido por{' '}
          <a
            href="https://wa.me/5551997756708"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ademir
          </a>
        </p>
      </Footer>
    </Container>
  );
}
