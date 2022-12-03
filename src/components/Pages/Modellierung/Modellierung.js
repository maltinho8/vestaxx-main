import React from 'react';
import styled from 'styled-components';
import ContentModellierung from '../../PagesContent/ContentModellierung/index.js';

const ContentContainer = styled.div`
  width: 100%;
  margin: 1rem 0 0 1rem;
  @media screen and (max-width: 768px) {
    width: 85%;
  }
`;
const Modellierung = () => {
  return (
    <ContentContainer>
      <ContentModellierung />
    </ContentContainer>
  );
};

export default Modellierung;
