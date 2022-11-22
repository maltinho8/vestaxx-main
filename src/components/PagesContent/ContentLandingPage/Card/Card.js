import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  min-width: 225px;
  min-height: 300px;
  max-width: 225px;
  max-height: 400px;
  display: flex;
  flex-direction: column;

  background-color: transparent;
  color: #fff;
  position: relative;
  margin-right: 40px;
  margin-bottom: 30px;
  @media (max-width: 300px) {
    margin-left: 20px;
  }
`;

const CardImg = styled.img`
  max-width: 225px;
  height: 149px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 0.8;
`;

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  line-height: 1.4;
`;

const SmallText = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: black;
  font-weight: 400;
  text-align: justify;
  text-justify: inter-word;
`;

const SpaceHorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -8px;
`;

const Card = props => {
  return (
    <CardContainer>
      <CardImg src={props.img}></CardImg>

      <BottomContainer>
        <DetailsContainer>
          <SpaceHorizontalContainer>
            <SmallText>{props.text}</SmallText>
          </SpaceHorizontalContainer>

          <br />
        </DetailsContainer>
      </BottomContainer>
    </CardContainer>
  );
};

export default Card;
