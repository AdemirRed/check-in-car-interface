import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Eye, EyeOff, Mail } from 'lucide-react'; // Adicionado Eye, EyeOff e Mail
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
  email: yup.string().email('📧 Email inválido').required('⚠️ Email é obrigatório'),
});

const resetSchema = yup.object({
  email: yup.string().email('📧 Email inválido').required('⚠️ Email é obrigatório'),
  code: yup.string().required('⚠️ Código é obrigatório'),
  newPassword: yup
    .string()
    .required('⚠️ Nova senha é obrigatória')
    .min(6, '🔒 Senha deve ter pelo menos 6 caracteres'),
});

export function ForgotPassword() {
  const [step, setStep] = useState('request'); // 'request' ou 'reset'
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer para reenviar código
  const [emailForResend, setEmailForResend] = useState(''); // Armazena o e-mail para reenviar o código
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step === 'request' ? requestSchema : resetSchema),
  });

  const startResendTimer = (additionalTime = 0) => {
    setResendTimer((prev) => prev + 30 + additionalTime); // Incrementa o tempo base de 30 segundos com o adicional
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRequest = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/verificar-email', { email: data.email });
      if (response.status === 200) {
        const promise = api.post('/esqueci-senha', { email: data.email });
        toast.promise(promise, {
          pending: '📤 Enviando solicitação...',
          success: '✅ Código foi enviado! ☑️',
          error: '❌ Erro ao enviar solicitação!',
        });
        await promise;
        setEmailForResend(data.email); // Salva o e-mail para uso no botão "Reenviar código"
        setStep('reset');
        startResendTimer();
      }
    } catch (error) {
      const { status, data } = error.response || {};
      if (status === 404) {
        toast.error(data?.mensagem || '❌ E-mail não encontrado no sistema.');
      } else {
        toast.error(data?.erro || '❌ Erro ao verificar e-mail. Tente novamente mais tarde.');
      }
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
      pending: '🔄 Processando redefinição...',
      success: {
        render({ data }) {
          const token = data?.data?.token; // Supondo que o token venha na resposta
          if (token) {
            localStorage.setItem('authToken', token); // Salva o token no localStorage
          }
          setTimeout(() => {
            window.location.href = '/Login';
          }, 2000);
          return '✅ Senha redefinida com sucesso! ☑️';
        },
      },
      error: {
        render({ data }) {
          const { status } = data.response || {};
          if (status === 401) return '❌ Código inválido ou expirado.';
          if (status === 429)
            return '⚠️ Muitas tentativas. Tente novamente mais tarde.';
          if (status === 500)
            return '❌ Erro interno do servidor. Tente novamente mais tarde.';
          return '❌ Erro ao redefinir senha!';
        },
      },
    });
    try {
      await promise;
    } finally {
      setLoading(false);
    }
  };
  const handleResendCode = async () => {
    setLoading(true);
    try {
      const promise = api.post('/esqueci-senha', { email: emailForResend });
      toast.promise(promise, {
        pending: '📤 Reenviando código...',
        success: '✅ Código reenviado com sucesso! ☑️',
        error: '❌ Erro ao reenviar código!',
      });
      await promise;
      startResendTimer(15); // Adiciona 15 segundos extras ao timer
    } catch {
      toast.error('❌ Erro ao reenviar código. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>
        {step === 'request' ? 'Esqueci minha senha' : 'Redefinir senha'}
      </Title>
      <Form
        onSubmit={handleSubmit(
          step === 'request' ? handleRequest : handleReset
        )}
      >
        <InputContainer>
          <label htmlFor="email">Email:</label>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', left: '10px', color: '#666' }} />
            <input
              id="email"
              type="email"
              {...register('email')}
              disabled={loading}
              placeholder="Digite seu e-mail"
              style={{ paddingLeft: '35px' }} // Adicionado padding para acomodar o ícone
            />
          </div>
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
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword')}
                  disabled={loading}
                  placeholder="Digite sua nova senha"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Validacao
                red={errors?.newPassword?.message ? 'true' : undefined}
              >
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
          <p>
            Não recebeu o código? Verifique sua caixa de spam ou tente novamente.
          </p>
          <Button
            type="button"
            onClick={handleResendCode}
            disabled={loading || resendTimer > 0}
          >
            {resendTimer > 0
              ? `Reenviar código em ${resendTimer}s`
              : 'Reenviar código'}
          </Button>
        </FeedbackMessage>
      )}
    </Container>
  );
}
