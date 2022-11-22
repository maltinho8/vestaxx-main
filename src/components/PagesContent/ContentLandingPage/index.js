import React from "react";
import styled from "styled-components";
import "./index.css";
import { Link } from "react-router-dom";
import Card from "../ContentLandingPage/Card/Card.js";
import card1img from "./img/card1-house-entry-vestaxx.jpg";
import card2img from "./img/card2-kitchen-vestaxx.jpg";
import card3img from "./img/card3-family-vestaxx.jpg";
import MuiCard from '../ContentLandingPage/MuiCard/index.js';
import Background from "../../assets/img/test.png";


const Container = styled.div``;

const BackgroundContainer = styled.div`
  width: 100vw;
  background-color: #f2ecd4;
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

const Headline = styled.h3`
  text-align: center;
  vertical-align: middle;
  line-height: 520px;
  color: darkorange;
`;

const SubHeadline = styled.h5`
  text-align: center;
  vertical-align: middle;
  line-height: 520px;
  color: darkorange;
`;

const IntroText = styled.p`
  color: orange;
  text-align: justify;
  text-justify: inter-word;
  font-weight: bold;
  line-height: 1.6;
`;

const TopWrapper = styled.div`
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
`;

const HeadlineDiv = styled.div`
  width: 520px;
  height: 520px;
  border: 3px solid white;
  border-radius: 5px;
  background-color: white;
  display: inline-block;
  vertical-align: top;
`;

const PictureDiv = styled.div`
  width: 520px;
  height: 520px;
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
