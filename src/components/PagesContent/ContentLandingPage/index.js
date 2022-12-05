import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MuiCard from '../ContentLandingPage/MuiCard/index.js';
import Background from '../../assets/img/test.png';
import { Button } from '../../Button/Button.js';

const Container = styled.div``;

const BackgroundContainer = styled.div`
  width: 100vw;
  background-color: #f2ecd4;
`;

const ContentContainer = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 5rem;
  @media screen and (max-width: 768px) {
    margin-left: 3rem;
    margin-right: 3rem;
    display: block;
  }
`;

const Boxes = styled.div`
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0px 12px 18px -6px rgba (0, 0, 0, 0.3);
  border-radius: 10px 10px 10px 10px;
  object-fit: contain;
`;

const Headline = styled.h3`
  text-align: center;
  vertical-align: middle;
  line-height: 420px;
  color: darkorange;
`;

const IntroText = styled.p`
  color: darkorange;
  text-align: justify;
  text-justify: inter-word;
  font-weight: bold;
  line-height: 1.6;
`;

const TopWrapper = styled.div`
  border-radius: 5px;
  margin-top: 50px;
  text-align: center;
`;

const HeadlineDiv = styled.div`
  width: 420px;
  height: 420px;
  border: 3px solid white;
  border-radius: 5px;
  background-color: white;
  display: inline-block;
  vertical-align: top;
`;

const PictureDiv = styled.div`
  width: 420px;
  height: 420px;
  border: 3px solid darkorange;
  border-radius: 5px;
  background-image: url(${Background});
  display: inline-block;
  vertical-align: top;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-content: center;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
`;

const ContentLandingPage = () => {
  return (
    <Container>
      <TopWrapper>
        <HeadlineDiv>
          <Headline>vestaxx</Headline>
        </HeadlineDiv>
        <PictureDiv />
      </TopWrapper>
      <BackgroundContainer>
        <ContentContainer>
          <Boxes>
            <IntroText>
              Auf diesem Online-Portal können Sie einfach ausrechnen lassen,
              welches regenerative Heizsystem aus ökologischen und ökonomischen
              Gründen für Sie am sinnvollsten ist. Im ersten Schritt können Sie
              Ihr Haus gemäß Ihren Wünschen und Vorstellungen konfigurieren. Im
              zweiten Schritt erhalten Sie eine Vergleichsrechnung, in der
              verschiedene Heizsysteme gegenübergestellt werden und das System
              hervorgehoben wird, das am besten zu Ihnen passt.
            </IntroText>
          </Boxes>
        </ContentContainer>
        <ContentContainer>
          <CardContainer>
            <MuiCard />
          </CardContainer>
          <ButtonContainer>
            <Link to={'/Modellierung'}>
              <Button>Legen Sie los!</Button>
            </Link>
          </ButtonContainer>
        </ContentContainer>
      </BackgroundContainer>
    </Container>
  );
};

export default ContentLandingPage;
