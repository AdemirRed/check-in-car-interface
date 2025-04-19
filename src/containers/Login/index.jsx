import * as yup from 'yup';

import { Validacao } from '../../components/Validation';

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Title>Acesse sua conta</Title>
      <P>Entre com sua credenciais para continuar</P>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImputContainer>
          <label htmlFor="email">Email:</label>
          <input type="email" {...register('email')} />
          <Validacao red={errors?.email?.message !== undefined ? 'true' : undefined}>
            {errors?.email?.message}
          </Validacao>
        </ImputContainer>

        <ImputContainer>
          <label htmlFor="password">Senha:</label>
          <input type="password" {...register('password')} />
          <Validacao red={errors?.password?.message !== undefined ? 'true' : undefined}>
            {errors?.password?.message}
          </Validacao>
        </ImputContainer>

        <RememberMe>
          <div>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Lembrar-me</label>
          </div>
          <Link href="#">Esqueci minha senha</Link>
        </RememberMe>

        <Button type="submit">Entrar</Button>
      </Form>
      <div>
        <p>
          Não tem uma conta? <a href="#">Cadastre-se</a>
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
