import React from 'react';
import styled from 'styled-components';
import ContentHeatingComp from '../../../PagesContent/ContentHeatingComp/bundesland/hamburg.js';

const ContentContainer = styled.div`
  width: 80%;
  margin: 2rem 0 0 2rem;
  @media screen and (max-width: 768px) {
    width: 85%;
  }
`;
const HeatingCompHamburg = () => {
  return (
    <ContentContainer>
      <ContentHeatingComp />
    </ContentContainer>
  );
};

export default HeatingCompHamburg;
