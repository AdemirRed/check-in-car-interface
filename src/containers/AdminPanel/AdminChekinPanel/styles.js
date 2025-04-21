// styles.ts
import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  background-color: #3B3B3B;
  color: #e0f2f1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0369a1;
  text-align: center;
`;

export const Data = styled.p`
  font-size: 1rem;
  color: #94d2e5;
  font-weight: 500;
  text-align: center;
`;

export const Form = styled.form`
  background-color: #2f2f2f;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Info = styled.div`
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #0369a1;
  font-size: 0.95rem;
`;

export const SvgIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #0369a1;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  background-color: #f0f9ff;
  fill: none;
`;

export const DadosBasicos = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoViagem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #e0f2f1;
  margin-bottom: 0.3rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const baseFieldStyles = css`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  background-color: #444;
  color: #e0f2f1;
  border: 1px solid #666;
  transition: border 0.2s ease-in-out, box-shadow 0.2s;

  &:focus {
    border-color: #0369a1;
    box-shadow: 0 0 0 2px rgba(3, 105, 161, 0.4);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Input = styled.input`
  ${baseFieldStyles}
  ${(props) =>
    props.hasError &&
    css`
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
    `}
`;

export const Select = styled.select`
  ${baseFieldStyles}
  ${(props) =>
    props.hasError &&
    css`
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
    `}
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
