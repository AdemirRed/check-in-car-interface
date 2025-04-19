import { useState } from 'react';
import './CadastroUsuario.css'; // Importar o arquivo CSS separado

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6)
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'As senhas não conferem';
    if (!termsAccepted) newErrors.terms = 'Você deve aceitar os termos de uso';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log('Dados de cadastro:', formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Crie sua conta</h2>
        <p className="subtitle">Preencha os dados abaixo para começar</p>
        <form className="form" onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="formGroup">
            <label htmlFor="name" className="label">
              Nome completo
            </label>
            <div className="inputWrapper">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'inputError' : ''}`}
                placeholder="Digite seu nome completo"
              />
            </div>
            {errors.name && <p className="errorText">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="formGroup">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="inputWrapper">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'inputError' : ''}`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && <p className="errorText">{errors.email}</p>}
          </div>

          {/* Senha */}
          <div className="formGroup">
            <label htmlFor="password" className="label">
              Senha
            </label>
            <div className="inputWrapper">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`input ${errors.password ? 'inputError' : ''}`}
                placeholder="Senha (mínimo 6 caracteres)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="passwordToggle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.password && <p className="errorText">{errors.password}</p>}
          </div>

          {/* Confirmar Senha */}
          <div className="formGroup">
            <label htmlFor="confirmPassword" className="label">
              Confirmar senha
            </label>
            <div className="inputWrapper">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input ${errors.confirmPassword ? 'inputError' : ''}`}
                placeholder="Digite a senha novamente"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="passwordToggle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showConfirmPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="errorText">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Termos e condições */}
          <div className="termsWrapper">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="checkbox"
            />
            <label htmlFor="terms" className="termsLabel">
              Eu concordo com os{' '}
              <a href="#" className="termsLink">
                Termos de Serviço
              </a>{' '}
              e a{' '}
              <a href="#" className="termsLink">
                Política de Privacidade
              </a>
            </label>
          </div>
          {errors.terms && (
            <p
              className="errorText"
              style={{ marginTop: '-16px', marginBottom: '16px' }}
            >
              {errors.terms}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`button ${isLoading ? 'buttonDisabled' : ''}`}
          >
            {isLoading ? (
              <span className="loading">
                <svg
                  className="spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                  <circle
                    className="spinnerCircle"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="spinnerPath"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processando...
              </span>
            ) : (
              <span className="buttonText">
                <svg
                  className="buttonIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Criar conta
              </span>
            )}
          </button>
        </form>

        <div className="divider">
          <div className="dividerLine"></div>
          <span className="dividerText">Ou cadastre-se com</span>
          <div className="dividerLine"></div>
        </div>

        <div className="socialButtons">
          <button className="socialButton">
            <svg className="socialIcon" viewBox="0 0 24 24">
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#4285F4"
              />
              <path
                d="M12.545,10.239l9.426,0.013c0.823,3.898-1.03,11.748-9.426,11.748c-3.251,0-6.126-1.809-7.593-4.488 l3.244-2.514C8.97,16.861,10.69,18.032,12.545,18.032c2.798,0,4.733-1.657,5.445-3.972h-5.445V10.239z"
                fill="#34A853"
              />
              <path
                d="M4.952,14.998l-3.244,2.514C3.174,21.104,7.519,24,12.545,24c3.103,0,5.368-1.021,7.167-2.764 l-3.022-2.341c-0.844,0.614-1.925,0.977-3.263,0.977C10.69,19.872,8.97,18.701,8.196,16.938 C7.861,16.285,7.669,15.561,7.667,14.832L4.952,14.998z"
                fill="#FBBC05"
              />
              <path
                d="M12.545,5.968c1.321,0,2.508,0.454,3.439,1.345l2.582-2.58C16.725,2.99,14.806,2,12.545,2 C7.519,2,3.174,4.896,1.709,8.488l3.244,2.514C5.708,8.058,8.879,5.968,12.545,5.968z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button className="socialButton">
            <svg className="socialIcon" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="footer">
          Já tem uma conta?{' '}
          <a
            href="#"
            className="loginLink"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
          >
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
}
