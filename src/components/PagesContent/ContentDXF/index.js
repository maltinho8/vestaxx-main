import styled from 'styled-components';
import React, { useState } from 'react';
import { Helper } from 'dxf';

const Container = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  color: ${({ theme }) => theme.palette.text.light};
`;

const Headline = styled.h3`
  line-height: 1;
  margin-bottom: 2rem;
  color: darkorange;
`;

const Text = styled.div`
  font-size: 1rem;
  color: darkorange;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
`;

const DXFContainer = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
`;

const ContentModellierung = () => {
  const [dxfSVG, setdxfSVG] = useState();
  const onInputChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const dxfContents = e.target.result;
      const helper = new Helper(dxfContents);
      console.log(helper);

      const svg = helper.toSVG();

      setdxfSVG(svg);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <Container>
      <Headline>Lesen Sie hier Ihre DXF-Dateien ein</Headline>
      <Text>
        Mit unserem Vergleichsrechner können Sie das optimale Heizsystem für Ihr
        neues Einfamilienhaus berechnen. Vergleichen Sie zum Beispiel das
        Vestaxx Heizfenstersystem mit einer Pelletheizung oder einer Wärmepumpe.
        Wählen Sie dafür einfach den Grundriss eines unserer zu Ihrem Traumhaus
        passenden Musterhäuser aus und legen Sie direkt los. Oder füllen Sie das
        unten befindliche Formular aus und machen damit Ihren ganz eigenen
        Heizvergleich, mit den auf Sie zugeschnittenen Daten.
      </Text>
      <InputContainer>
        <input type="file" id="file" onChange={onInputChange} />
      </InputContainer>
      <DXFContainer>
        <div dangerouslySetInnerHTML={{ __html: dxfSVG }} />
      </DXFContainer>
    </Container>
  );
};

export default ContentModellierung;
