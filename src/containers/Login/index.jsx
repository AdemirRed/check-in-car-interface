import { Lock, Mail, Eye, EyeOff } from 'lucide-react'; // Adicionado Eye e EyeOff
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Validacao } from '../../components/Validation';
import { api } from '../../services/api';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import {
  Container,
  Footer,
  Form,
  ImputContainer,
  Link,
  P,
  RememberMe,
  Title,
} from './styles';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
      password: yup
        .string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedPassword && savedRememberMe) {
      document.getElementById('email').value = savedEmail;
      document.getElementById('password').value = savedPassword;
      document.getElementById('remember').checked = true;
    }
  }, []);

  const onSubmit = async (data) => {
    const rememberMe = document.getElementById('remember').checked;

    if (rememberMe) {
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }

    await toast.promise(
      api.post('/sessao', {
        email: data.email,
        senha_hash: data.password,
      }),
      {
        pending: 'Aguarde... ⏳',
        info: 'Realizando login... ⏳',
        warning: 'Verificando credenciais... ⏳',
        success: {
          render({ data }) {
            const token = data?.data?.token; // Supondo que o token venha na resposta
            if (token) {
              localStorage.setItem('authToken', token); // Salva o token no localStorage
            }
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
            return 'Login realizado com sucesso! ☑️';
          },
        },
        error: 'Email ou senha inválidos! ❌',
      }
    );

  };

  return (
    <Container>
      <Title>Acesse sua conta</Title>
      <P>Entre com sua credenciais para continuar</P>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImputContainer>
          <label htmlFor="email">Email:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Mail style={{ marginRight: '8px' }} />
            <input id="email" type="email" {...register('email')} />
          </div>
          <Validacao
            red={errors?.email?.message !== undefined ? 'true' : undefined}
          >
            {errors?.email?.message}
          </Validacao>
        </ImputContainer>

        <ImputContainer>
          <label htmlFor="password">Senha:</label>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Lock style={{ marginRight: '8px' }} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Validacao
            red={errors?.password?.message !== undefined ? 'true' : undefined}
          >
            {errors?.password?.message}
          </Validacao>
        </ImputContainer>

        <RememberMe>
          <div>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Lembrar-me</label>
          </div>
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </RememberMe>

        <Button type="submit">Entrar</Button>
      </Form>
      <div>
        <p>
          Não tem uma conta? <Link to="/cadastro">Registre-se</Link>
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
