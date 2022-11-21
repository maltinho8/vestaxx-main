import React from 'react';
import styled from 'styled-components';
import ContentLandingPage from '../../PagesContent/ContentLandingPage/index';

const ContentContainer = styled.div`
  width: 100 vwimportant !;
  margin: 0 auto;
`;

const Homepage = () => {
  return (
    <div>
      <ContentContainer>
        <ContentLandingPage />
      </ContentContainer>
    </div>
  );
};

export default Homepage;
