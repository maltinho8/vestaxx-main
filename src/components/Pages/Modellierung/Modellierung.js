import React from 'react';
import styled from 'styled-components';
import ContentModellierung from '../../PagesContent/ContentModellierung/index.js';

const ContentContainer = styled.div`
width: 100%important!;
margin: 0 auto;
padding: 2rem; 
 
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
