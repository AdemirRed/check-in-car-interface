import styled from 'styled-components';

export const ContainerButton = styled.button`
  padding: 10px;
  background-color: rgb(30, 148, 138);
  width: 100%;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  height: 50px;
  margin: 15px;
  cursor: pointer;
  position: relative;
  z-index: 1;

  background-repeat: no-repeat;
  background-size: cover;
  backface-visibility: hidden;
  background-blend-mode: normal;
  will-change: background-image;

  &:hover {
    animation: dashLoop 1.5s steps(20) infinite;
    border-radius: 20px;
  }

  @keyframes dashLoop {
    0% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='100' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    10% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='90' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    20% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='80' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    30% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='70' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    40% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='60' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    50% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='50' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    60% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='40' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    70% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='30' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    80% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='20' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    90% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='10' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
    100% {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379FFFFFF' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
    }
  }
`;
