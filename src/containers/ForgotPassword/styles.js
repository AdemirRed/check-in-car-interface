import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: rgb(30, 148, 138);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input:disabled {
    background-color: #f5f5f5;
  }
`;

export const Validacao = styled.span`
  font-size: 12px;
  color: ${(props) => (props.red ? 'red' : 'green')};
  margin-top: 5px;
  display: block;
`;

export const FeedbackMessage = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  p {
    margin: 0;
  }
`;
