import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
    Container,
    FeedbackMessage,
    Form,
    InputContainer,
    Title,
    Validacao,
} from './styles';

// Esquemas de validação com Yup
const requestSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
});

const resetSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  code: yup.string().required('Código é obrigatório'),
  newPassword: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export function ForgotPassword() {
  const [step, setStep] = useState('request'); // 'request' ou 'reset'
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step === 'request' ? requestSchema : resetSchema),
  });

  const handleRequest = async (data) => {
    setLoading(true);
    const promise = api.post('/esqueci-senha', { email: data.email });
    toast.promise(promise, {
      pending: 'Enviando solicitação...',
      success: 'Se o e-mail existir, um código foi enviado! ☑️',
      error: {
        render({ data }) {
          const { status } = data.response || {};
          if (status === 401) return 'Usuário não encontrado. ❌';
          if (status === 429) return 'Muitas tentativas. Tente novamente mais tarde. ❌';
          if (status === 500) return 'Erro interno do servidor. Tente novamente mais tarde. ❌';
          return 'Erro ao enviar solicitação! ❌';
        },
      },
    });
    try {
      await promise;
      setStep('reset');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (data) => {
    setLoading(true);
    const promise = api.post('/redefinir-senha', {
      email: data.email,
      codigo: data.code,
      novaSenha: data.newPassword,
    });
    toast.promise(promise, {
      pending: 'Processando redefinição...',
      success: {
        render() {
          setTimeout(() => {
            window.location.href = '/Login';
          }, 2000);
          return 'Senha redefinida com sucesso! ☑️';
        },
    },
    //   success: 'Senha redefinida com sucesso! ☑️',
      error: {
        render({ data }) {
          const { status } = data.response || {};
          if (status === 401) return 'Código inválido ou expirado. ❌';
          if (status === 429) return 'Muitas tentativas. Tente novamente mais tarde. ❌';
          if (status === 500) return 'Erro interno do servidor. Tente novamente mais tarde. ❌';
          return 'Erro ao redefinir senha! ❌';
        },
      },
    });
    try {
      await promise;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{step === 'request' ? 'Esqueci minha senha' : 'Redefinir senha'}</Title>
      <Form onSubmit={handleSubmit(step === 'request' ? handleRequest : handleReset)}>
        <InputContainer>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={loading}
            placeholder="Digite seu e-mail"
          />
          <Validacao red={errors?.email?.message ? 'true' : undefined}>
            {errors?.email?.message}
          </Validacao>
        </InputContainer>

        {step === 'reset' && (
          <>
            <InputContainer>
              <label htmlFor="code">Código de recuperação:</label>
              <input
                id="code"
                type="text"
                {...register('code')}
                disabled={loading}
                placeholder="Digite o código recebido"
              />
              <Validacao red={errors?.code?.message ? 'true' : undefined}>
                {errors?.code?.message}
              </Validacao>
            </InputContainer>

            <InputContainer>
              <label htmlFor="newPassword">Nova senha:</label>
              <input
                id="newPassword"
                type="password"
                {...register('newPassword')}
                disabled={loading}
                placeholder="Digite sua nova senha"
              />
              <Validacao red={errors?.newPassword?.message ? 'true' : undefined}>
                {errors?.newPassword?.message}
              </Validacao>
            </InputContainer>
          </>
        )}

        <Button type="submit" disabled={loading}>
          {loading
            ? 'Processando...'
            : step === 'request'
            ? 'Enviar código'
            : 'Redefinir senha'}
        </Button>
      </Form>

      {step === 'reset' && (
        <FeedbackMessage>
          <p>Não recebeu o código? Verifique sua caixa de spam ou tente novamente.</p>
        </FeedbackMessage>
      )}
    </Container>
  );
}
