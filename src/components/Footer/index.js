import React from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: black;
  position: sticky;
  
  top: 0;
  width: 100%;
  border-top: 1px solid white;
`;

const Container = styled.div`
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
  /* background: red; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Row2 = styled.div`
  display: flex;
    grid-gap: 20px;
    justify-content: center;
    width: 100%;
    margin-left: 0rem;
    margin-top: 0rem;
  
`;

const HeadingTwo = styled.p`
  font-size: 18px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
  }
`;



const Footer = () => {
  return (
    <Box>
      <Container>
        <RowContainer>
          
          <Row2>
           
          <Column>
              <HeadingTwo><a href="https://www.vestaxx.de/"><font color="#ffffff">vestaxx GmbH</font></a></HeadingTwo>
            </Column>
            <Column>
              <HeadingTwo> <a href="https://www.vestaxx.de/impressum.php"><font color="#ffffff">Impressum</font></a> | <a href="https://www.vestaxx.de/datenschutz.php"><font color="#ffffff">Datenschutz</font></a> </HeadingTwo>
            </Column>
            <Column>
              <HeadingTwo>Copyright 2022 © Vestaxx GmbH</HeadingTwo>
            </Column>
          </Row2>

        </RowContainer>
      </Container>
    </Box>
  );
};

export default Footer;
