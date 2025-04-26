import styled from 'styled-components';

// ...existing code...

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CheckinCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const CheckinInfo = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

export const CheckinTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #555;
`;

export const NoCheckinsMessage = styled.p`
  font-size: 14px;
  color: #999;
  text-align: center;
`;

export const SvgIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: currentColor;
`;
