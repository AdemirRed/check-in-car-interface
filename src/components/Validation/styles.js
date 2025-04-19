import styled from 'styled-components';

export const Validation = styled.p`
  color: ${(props) => (props.red === 'true' ? 'red' : props.red === 'false' ? 'blue' : 'inherit')};
  font-size: 14px;
  margin-top: 5px;
`;