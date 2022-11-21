import React from 'react';
import styled from 'styled-components';
import './index.css';
import { Link } from 'react-router-dom';
import Card from '../ContentLandingPage/Card/Card.js';
import MuiCard from '../ContentLandingPage/MuiCard/index.js';
import card1img from './img/card1-house-entry-vestaxx.jpg';
import card2img from './img/card2-kitchen-vestaxx.jpg';
import card3img from './img/card3-family-vestaxx.jpg';
import img from '../../assets/img/vestaxx.jpg';

const Container = styled.div``;

const Headline = styled.h2`
  line-height: 1;
  margin-bottom: 1rem;
  color: white;
  margin-top: 2rem;
  text-transform: uppercase;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 3rem;
    margin-top: 2rem;
    font-size: 2.5rem;
  }
`;

const SubHeadline = styled.h2`
  line-height: 1;
  margin-bottom: 8rem;
  color: white;
  margin-top: 1rem;
  text-transform: uppercase;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 3rem;
    margin-top: 2rem;
    font-size: 2.5rem;
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 8%;
`;

const BackgroundContainer = styled.div`
  width: 100vw;
  background-color: white;
`;

const ContentContainer = styled.div`
  margin-top: 5rem;
  margin-left: 15rem;
  margin-right: 15rem;
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

const IntroText = styled.p`
  color: orange;
  text-align: justify;
  text-justify: inter-word;
  font-weight: bold;
  line-height: 1.6;
`;

const Background = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 80vh;
  position: relative;
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

const ContentLandingPage = () => {
  return (
    <Container>
      <Background>
        <HeaderContainer>
          <Headline>vestaxx</Headline>
          <SubHeadline>das smarte Fensterheizungssystem</SubHeadline>
        </HeaderContainer>
      </Background>
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
          <h3>Was wir Ihnen bieten</h3>
          <br />
          <CardContainer>
            <Card
              img={card1img}
              text="Eine neue und innovative Art zu heizen sind die mit Strom betriebenen Heizscheiben von Vestaxx. Der Strom erzeugt Infrarotstrahlen, mit denen gleichmäßig Wände, Möbel und Körper erwärmt werden."
            />
            <Card
              img={card2img}
              text="Mit nur wenigen Angaben zu Ihrem Traumhaus schlagen wir passende Grundrisse vor und stellen eine erste Vergleichsrechnung für Heizsysteme bereit."
            />
            <Card
              img={card3img}
              text="Wussten Sie, dass Heizwärme gar nicht mehr den größten Teil der Energieflüsse in Einfamilienhäusern ausmacht? Viel höher sind zum Beispiel die Bedarfe an Warmwasser und Strom."
            />
          </CardContainer>
          <MuiCard />

          <Link to={'/Modellierung'}>
            <button className="pointer" type="submit">
              Legen Sie los!
            </button>
          </Link>
        </ContentContainer>
      </BackgroundContainer>
    </Container>
  );
};

export default ContentLandingPage;
