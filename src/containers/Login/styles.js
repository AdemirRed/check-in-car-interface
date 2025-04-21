import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(59, 59, 59);
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: rgb(30, 148, 138);
  margin-bottom: 10px;
`;
export const P = styled.p`
  font-size: 16px;
  color: rgb(30, 148, 138);
  margin-bottom: 20px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;
export const ImputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-size: 17px;
    color: rgb(30, 148, 138);
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;
export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  label {
    font-size: 14px;
    color: rgb(30, 148, 138);
  }
  input {
    margin-right: 5px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: rgb(59, 59, 59);
  color: rgb(30, 148, 138);
  margin-top: 20px;
  width: 100%;

  p {
    margin: 10px 0;
    font-size: 14px;
    color: rgb(30, 148, 138);
  }
`;

export const Link = styled(ReactLink)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
