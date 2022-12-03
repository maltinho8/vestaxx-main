import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 10px;
  padding: 10px 22px;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background-color: darkorange;
  &:hover {
    transition: all 0.2s ease-in-out;
    border: 1px solid darkorange;
    opacity: 1;
    background-color: #f2ecd4;
  }
`;
