import React from 'react';
import styled  from 'styled-components';
import ContentHeatingComp from '../../../PagesContent/ContentHeatingComp/bundesland/saarland.js';

const ContentContainer = styled.div`
width: 80%;
margin: 2rem 0 0 2rem;
@media screen and (max-width: 768px) {
  width: 85%;
 
}
`;
const HeatingCompSaarland = () => {
  return (
    <ContentContainer>
          <ContentHeatingComp/>   
    </ContentContainer>
  );
}

export default HeatingCompSaarland;
