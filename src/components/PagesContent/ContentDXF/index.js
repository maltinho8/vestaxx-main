import styled from 'styled-components';
import React, { useState } from 'react';
import { Helper } from 'dxf';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import DropdownList from 'react-widgets/DropdownList';
import NumberPicker from 'react-widgets/NumberPicker';
import { DxfParser } from 'dxf-parser';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  align-items: center;
  padding: 5rem;
`;

const FloatContainer = styled.div`
  margin-top: 3rem;
  overflow: hidden;
  align-items: center;
`;

const FloatChild1 = styled.div`
  float: left;
  width: 50%;
  height: 500px;
  display: inline-block;
  @media screen and (max-width: 768px) {
    float: none;
    width: auto;
  }
`;

const FloatChild2 = styled.div`
  width: 50%;
  height: 500px;
  overflow: hidden;
  display: inline-block;
`;

const InputDiv = styled.div`
  background-color: darkorange;
  border: 2px solid darkorange;
  padding: 1em;
  border-radius: 5px;
  margin-bottom: 2rem;
  width: 65% !important;
  height: auto;
  margin: 0 auto;
`;

const InputFieldText = styled.p`
  font-size: 1rem;
  color: white;
`;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const ContentModellierung = () => {
  const [dxfSVG, setdxfSVG] = useState();
  const [show, setShow] = useState();

  const [showInput, setShowInput] = useState();
  const [standort, setStandort] = useState('');
  const [rooms, setRooms] = useState(null);
  const [bewohner, setBewohner] = useState(null);
  const [fläche, setFläche] = useState('');

  const onInputChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const dxfContents = e.target.result;

      const parser = new DxfParser();

      const testo = parser.parseSync(dxfContents);

      const helper = new Helper(dxfContents);
      console.log(testo);
      console.log(helper);
      console.log(helper.parsed.blocks[0].name);

      const rows = [
        createData(
          'Komponente 1',
          `${helper.parsed.blocks[0].name}`,
          `${helper.parsed.blocks[1].name}`,
          `${helper.parsed.blocks[2].name}`
        ),
        createData('Komponente 2', 237, 9.0, 37, 4.3),
        createData('Komponente 3', 262, 16.0, 24, 6.0),
      ];

      const grid = (
        <FloatChild2>
          <DXFContainer>
            <TableContainer component={Paper}>
              <Table
                sx={{ width: 500 }}
                aria-label="simple table"
                style={{ backgroundColor: '#f2ecd4' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: 'darkorange' }}>
                      <FontAwesomeIcon icon={solid('file-upload')} />
                    </TableCell>
                    <TableCell
                      style={{ color: 'darkorange', fontWeight: 'bold' }}
                      align="right"
                    >
                      Layer 1
                    </TableCell>
                    <TableCell
                      style={{ color: 'darkorange', fontWeight: 'bold' }}
                      align="right"
                    >
                      Layer 2
                    </TableCell>
                    <TableCell
                      style={{ color: 'darkorange', fontWeight: 'bold' }}
                      align="right"
                    >
                      Layer 3
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      style={{ color: 'darkorange' }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ color: 'darkorange', fontWeight: 'bold' }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell style={{ color: 'darkorange' }} align="right">
                        {row.calories}
                      </TableCell>
                      <TableCell style={{ color: 'darkorange' }} align="right">
                        {row.fat}
                      </TableCell>
                      <TableCell style={{ color: 'darkorange' }} align="right">
                        {row.carbs}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DXFContainer>
        </FloatChild2>
      );

      const inputdiv = (
        <div>
          <InputDiv>
            <h5>
              <FontAwesomeIcon icon={solid('house-chimney-window')} /> &nbsp;
              Gebäudedaten und Standort
            </h5>

            <InputFieldText>
              <span className="tooltip">
                Bundesland* <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier das von Ihnen gewünschte Bundesland ein. Der
                  Ort, an dem sich Ihr Gebäude befindet, wirkt sich auf den
                  Ertrag der Photovoltaik-Anlage aus.
                </span>
              </span>
            </InputFieldText>

            <DropdownList
              value={standort}
              onChange={nextValue => setStandort(nextValue)}
              data={[
                'Baden-Württemberg',
                'Bayern',
                'Berlin',
                'Brandenburg',
                'Bremen',
                'Hamburg',
                'Hessen',
                'Mecklenburg-Vorpommern',
                'Niedersachsen',
                'Nordrhein-Westfalen',
                'Rheinland-Pfalz',
                'Saarland',
                'Sachsen',
                'Sachsen-Anhalt',
                'Schleswig-Holstein',
                'Thüringen',
              ]}
            />

            <InputFieldText>
              <span className="tooltip">
                {' '}
                Gebäudenutzfläche in m² *{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier die Gebäudenutzfläche Ihres Gebäudes ein. Die
                  Gebäudenutzfläche ist die gesamte Fläche Ihres Gebäudes und
                  umfasst auch Räume, die nicht direkt bewohnt sind, wie Flure
                  oder Treppenräume. Vereinfacht können sie Ihre
                  Gebäudenutzfläche auch bestimmen, in dem Sie die Wohnfläche
                  mit dem Faktor 1,2 multiplizieren.
                </span>
              </span>
            </InputFieldText>
            <NumberPicker
              value={fläche}
              onChange={nextValue => setFläche(nextValue)}
            />

            <InputFieldText>
              <span className="tooltip">
                {' '}
                Anzahl beheizter Räume*{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier die Anzahl der Räume ein, die in Ihrem Haus
                  beheizt werden (sollen), also die Wohnräume. Dazu zählen unter
                  anderem das Wohnzimmer oder das Badezimmer, aber in der Regel
                  nicht der Flur oder Treppenräume.
                </span>
              </span>
            </InputFieldText>
            <NumberPicker
              value={rooms}
              onChange={nextValue => setRooms(nextValue)}
              max={30}
              min={1}
            />

            <InputFieldText>
              {' '}
              <span className="tooltip">
                {' '}
                Bewohneranzahl*{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier die Anzahl der Bewohner in Ihrem Haus ein. Die
                  Bewohneranzahl bestimmt den Haushaltsstrombedarf.
                </span>
              </span>
            </InputFieldText>
            <NumberPicker
              value={bewohner}
              onChange={nextValue => setBewohner(nextValue)}
              max={10}
              min={1}
            />
          </InputDiv>
          <InputDiv>
            <h5>
              <FontAwesomeIcon icon={solid('house-chimney-window')} /> &nbsp;
              Weitere Eingaben
            </h5>

            <InputFieldText>
              <span className="tooltip">
                Placeholder* <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier das von Ihnen gewünschte Bundesland ein. Der
                  Ort, an dem sich Ihr Gebäude befindet, wirkt sich auf den
                  Ertrag der Photovoltaik-Anlage aus.
                </span>
              </span>
            </InputFieldText>

            <DropdownList
              value={helper.parsed.blocks[0].name}
              onChange={nextValue => setStandort(nextValue)}
            />
            <InputFieldText>
              <span className="tooltip">
                Placeholder 2*{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  {' '}
                  Tragen Sie hier das von Ihnen gewünschte Bundesland ein. Der
                  Ort, an dem sich Ihr Gebäude befindet, wirkt sich auf den
                  Ertrag der Photovoltaik-Anlage aus.
                </span>
              </span>
            </InputFieldText>

            <DropdownList
              value={helper.parsed.blocks[1].name}
              onChange={nextValue => setStandort(nextValue)}
            />
          </InputDiv>
        </div>
      );

      const svg = helper.toSVG();

      setdxfSVG(svg);
      setShow(grid);
      setShowInput(inputdiv);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container>
      <Headline>Lesen Sie hier Ihre DXF-Datei ein</Headline>
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
        <label className="custom-file-upload">
          <input type="file" multiple onChange={onInputChange} />
          <FontAwesomeIcon icon={solid('file-upload')} /> &nbsp; Attach
        </label>
      </InputContainer>

      <FloatContainer>
        <FloatChild1>
          <div dangerouslySetInnerHTML={{ __html: dxfSVG }} />
        </FloatChild1>
        {show}
      </FloatContainer>
      {showInput}
    </Container>
  );
};

export default ContentModellierung;
