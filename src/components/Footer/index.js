import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: #f2ecd4;
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
  grid-gap: 50px;
  justify-content: center;
  width: 100%;
  margin-left: 0rem;
  margin-top: 0rem;
`;

const HeadingTwo = styled.p`
  font-size: 18px;
  color: darkorange;
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
              <HeadingTwo>
                <a
                  href="https://www.vestaxx.de/impressum.php"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <font color="darkorange">Impressum</font>
                </a>
              </HeadingTwo>
            </Column>
            <Column>
              <HeadingTwo>
                <a
                  href="https://www.vestaxx.de/datenschutz.php"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <font color="darkorange">Datenschutz</font>
                </a>
              </HeadingTwo>
            </Column>
            <Column>
              <HeadingTwo>©vestaxx</HeadingTwo>
            </Column>
          </Row2>
        </RowContainer>
      </Container>
    </Box>
  );
};

export default Footer;
