import { React, useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import {
  ChoiceDiv,
  Plan,
  PlanTitle,
  PlanFeatures,
  ListItem,
  Snip1214Tabelle,
  PlanTabelle,
  PlanTitleTabelle,
  PlanFeaturesTabelle,
  ListItemTabelle,
  ListImgTabelle,
  ListPriceTabelle,
  ListTextTabelle,
} from './PricingTable/pricingtable.js';
import { MuiAccordion } from './Accordion/accordion.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../ContentModellierung/index.css';
import { Button } from '../../Button/Button.js';
// images
import gas from './img/gas.jpg';
import woodpellets from './img/woodpellets.jpg';
import brinewater from './img/brinewater.jpg';
import vestaxx from './img/vestaxx.jpg';
import heatpump from './img/heatpump.jpg';
// bar chart
import {
  colors5Bars,
  colors4Bars,
  labels4Bars,
  labels5Bars,
  labels6Bars,
  optionsPrimaryEnergy,
  optionsInvestmentCost,
  optionsCO2,
  optionsReductionCO2,
  optionsAnnuity,
  optionsReductionAnnuity,
  optionsReductionPrimary,
} from './BarChart/barchart';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
`;

const Headline = styled.h2`
  line-height: 1;
  margin-bottom: 2rem;
  color: darkorange;
`;

const Text = styled.div`
  font-size: 1rem;
  color: darkorange;
  margin-bottom: 1rem;
  text-align: justify;

  &.centered {
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
  }
`;

const ChartLabel = styled.div`
  font-size: 0.8rem;
  color: darkorange;
  margin-left: 0.5em;
  margin-right: 0.5em;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const TopWrapper = styled.div`
  border-radius: 5px;
  margin-top: 70px;
  margin-bottom: 70px;
`;

const ResultDiv = styled.div`
  width: 350px;
  height: 270px;
  border: 3px solid darkorange;
  border-radius: 5px;
  background-color: darkorange;
  display: inline-block;
  color: white;
`;

const PictureDiv = styled.div`
  width: 350px;
  height: 270px;
  border: 3px solid darkorange;
  border-radius: 5px;
  background-image: url(${gas});
  display: inline-block;
  vertical-align: top;
`;

const ChartDiv = styled.div`
  margin: 0 auto;
  width: 850px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;

const GreyBoxTable = styled.table`
  font-size: 1em;
  font-weight: bold;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border-bottom: 20px solid transparent;
`;

const TdRight = styled.td`
  text-align: left;
  padding-left: 10px;
`;

const TdLeft = styled.td`
  text-align: left;
  font-size: 0.8rem;
`;

const BoldTitle = styled(Text)`
  font-size: 1em;
  font-weight: bold;
  margin-left: 0.5em;
  margin-right: 0.5em;
  &.multiline {
    text-align: center;
  }
`;

const ContentHeatingComp = props => {
  const location = useLocation();
  let inputData = location.state.state;
  //let outputGeneralData = location.state.input;

  // show/hide table columns
  const [showWoodPellet, setShowWoodPellet] = useState(true);
  const [showHeatPump, setShowHeatPump] = useState(true);
  const [showBrineWater, setShowBrineWater] = useState(true);
  const [showGas, setShowGas] = useState(true);

  // show/hide bar charts
  const [showGEG, setShowGEG] = useState(false);
  const [showAnnuity, setShowAnnuity] = useState(false);
  const [showReduction, setShowReduction] = useState(false);

  const [output, setOutput] = useState({});

  fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData),
  })
    .then(res => res.json())
    .then(result => {
      const output = result;
      setOutput(output);
    });

  const dataInvestmentCost = {
    labels: labels5Bars,
    datasets: [
      {
        label: 'Investitionskosten',
        data: [
          output.investitionHolzpelletSystem?.toFixed(2),
          output.investitionWaermepumpenSystem?.toFixed(2),
          output.investitionSwWaermepumpenSystem?.toFixed(2),
          output.investitionHeizfensterSystem?.toFixed(2),
          output.investitionErgasBwSystem?.toFixed(2),
        ],
        backgroundColor: colors5Bars,
      },
    ],
  };

  const dataEcoPrimaryEnergy = {
    labels: labels6Bars,
    datasets: [
      {
        label: 'Prim??renergiebedarf',
        data: [
          output.gesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm?.toFixed(2),
          output.gesamtPrimaerenergiebedarfHolzpelletSystemProQm?.toFixed(2),
          output.gesamtPrimaerenergiebedarfWaermepumpenSystemProQm?.toFixed(2),
          output.gesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm?.toFixed(
            2
          ),
          output.gesamtPrimaerenergiebedarfHeizfensterProQm?.toFixed(2),
          output.gesamtPrimaerenergiebedarfErdgasBwSystemProQm?.toFixed(2),
        ],
        backgroundColor: '#46418f',
        borderSkipped: false,
      },
      {
        label: 'inkl. Photovoltaik',
        data: [
          0.0,
          0.0,
          0.0,
          0.0,
          -output.substituiertePrimaerEnergieHeizfensterProQM?.toFixed(2),
          0.0,
        ],
        backgroundColor: '#ee81ba',
        borderSkipped: false,
      },
    ],
  };

  const dataEcoCO2 = {
    labels: labels6Bars,
    datasets: [
      {
        label: 'CO2-??quivalent-Emissionen',
        data: [
          output.co2GegReferenzsystem?.toFixed(2),
          output.co2HolzpelletSystem?.toFixed(2),
          output.co2Waermepumpensystem?.toFixed(2),
          output.co2SwWaermepumpenSystem?.toFixed(2),
          output.co2Heizfenster?.toFixed(2),
          output.co2ErdgasBwSystem?.toFixed(2),
        ],
        backgroundColor: '#b9b9b9',
        borderSkipped: false,
      },
      {
        label: 'substituierte CO2-Emissionen durch PV-Anlage',
        data: [
          0.0,
          0.0,
          0.0,
          0.0,
          -output.co2SubstituiertHeizfenster?.toFixed(2),
          0.0,
        ],
        backgroundColor: '#4bb24f',
        borderSkipped: false,
      },
    ],
  };

  const dataAnnuity = {
    labels: labels5Bars,
    datasets: [
      {
        label: 'Annuit??t',
        data: [
          output.gesamtAnnuitaetHolzpelletSystem?.toFixed(2),
          output.gesamtAnnuitaetWaermepumpenSystem?.toFixed(2),
          output.gesamtAnnuitaetSwWaermepumpenSystem?.toFixed(2),
          output.gesamtAnnuitaetHeizfensterMitAnrechnung?.toFixed(2),
          output.gesamtAnnuitaetErgasBwSystem?.toFixed(2),
        ],
        backgroundColor: colors5Bars,
      },
    ],
  };

  const dataReductionPrimary = {
    labels: labels4Bars,
    datasets: [
      {
        label: 'Einsparung Prim??renergie',
        data: [
          output.einsparungPrimaerEnergieMitAnrechnungHolzpellet?.toFixed(2), //2700,
          output.einsparungPrimaerEnergieMitAnrechnungWaermepumpe?.toFixed(2), //3600,
          output.einsparungPrimaerEnergieMitAnrechnungErdwaermepumpe?.toFixed(
            2
          ), //3200,
          output.einsparungPrimaerEnergieMitAnrechnungErdgasBw?.toFixed(2), //4600
        ],
        backgroundColor: '#46418f',
      },
    ],
  };

  const dataReductionCO2 = {
    labels: labels4Bars,
    datasets: [
      {
        label: 'Einsparung CO2-??quivalent-Emissionen',
        data: [
          output.einsparungCo2AeqEmissionenMitAnrechnungHolzpellet?.toFixed(2), //2700,
          output.einsparungCo2AeqEmissionenMitAnrechnungWaermepumpe?.toFixed(2), //3600,
          output.einsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe?.toFixed(
            2
          ), //3200,
          output.einsparungCo2AeqEmissionenMitAnrechnungErdgasBw?.toFixed(2), //4600
        ],
        backgroundColor: '#b9b9b9',
      },
    ],
  };

  const dataReductionAnnuity = {
    labels: labels4Bars,
    datasets: [
      {
        label: 'Reduzierung Annuit??t',
        data: [
          output.reduzierungGesamtAnnuitaetMitAnrechnungHolzpellet?.toFixed(2), //800,
          output.reduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe?.toFixed(2), //1000,
          output.reduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe?.toFixed(
            2
          ), //900,
          output.reduzierungGesamtAnnuitaetMitAnrechnungErdgasBw?.toFixed(2), //700
        ],
        backgroundColor: colors4Bars,
      },
    ],
  };

  function capitalize(s) {
    if (s) {
      let indexHyphen = s.indexOf('-') + 1;
      if (indexHyphen) {
        s =
          s.charAt(0).toUpperCase() +
          s.slice(1, indexHyphen) +
          s.charAt(indexHyphen).toUpperCase() +
          s.slice(indexHyphen + 1);
      } else {
        s = s.charAt(0).toUpperCase() + s.slice(1);
      }
    }
    return s;
  }

  return (
    <Container>
      <Link to={'/Modellierung'}>
        <Button>Zur??ck zur Auswahl</Button>
      </Link>
      <Link to={'/Modellierung'}>
        <Button>Downloadbereich</Button>
      </Link>
      <Headline>Vergleichsrechnung</Headline>
      <Text>
        Hier erfahren Sie, welches Heizsystem f??r dieses Haus optimal ist!
      </Text>
      <TopWrapper>
        <ResultDiv>
          <GreyBoxTable>
            <tbody>
              <TR>
                <TdLeft>
                  Heizfl??che in m<sup>2</sup>
                </TdLeft>
                <TdRight>{inputData.gebaeudeNutzflaeche}</TdRight>
              </TR>
              <TR>
                <TdLeft>Anzahl Bewohner</TdLeft>
                <TdRight>{inputData.bewohnerAnzahl}</TdRight>
              </TR>
              <TR>
                <TdLeft>Standort</TdLeft>
                <TdRight>{capitalize(inputData?.bundesland)}</TdRight>
              </TR>
              <TR>
                <TdLeft>Beheizte R??ume</TdLeft>
                <TdRight>{inputData.anzahlBeheizterRaeume}</TdRight>
              </TR>
            </tbody>
          </GreyBoxTable>
        </ResultDiv>
        <PictureDiv />
      </TopWrapper>

      <ChoiceDiv>
        <Text className="centered">
          Welche Heizsysteme m??chten Sie mit den Vestaxx Heizfenstern
          vergleichen?
        </Text>
        <Plan className="checkbox">
          <PlanTitle>Holzpellet-System</PlanTitle>
          <PlanFeatures>
            <FontAwesomeIcon
              icon={solid('tree')}
              size="5x"
              color="darkorange"
            />
            <ListItem className="noborder">
              <input
                type="checkbox"
                checked={showWoodPellet}
                onChange={() => setShowWoodPellet(prev => !prev)}
              ></input>
            </ListItem>
          </PlanFeatures>
        </Plan>
        <Plan className="checkbox">
          <PlanTitle>W??rmepumpen-System</PlanTitle>
          <PlanFeatures>
            <FontAwesomeIcon
              icon={solid('fire')}
              size="5x"
              color="darkorange"
            />
            <ListItem className="noborder">
              <input
                type="checkbox"
                checked={showHeatPump}
                onChange={() => setShowHeatPump(prev => !prev)}
              ></input>
            </ListItem>
          </PlanFeatures>
        </Plan>
        <Plan className="checkbox">
          <PlanTitle>Sole-Wasser-W??rmepumpen-System</PlanTitle>
          <PlanFeatures>
            <FontAwesomeIcon
              icon={solid('water')}
              size="5x"
              color="darkorange"
            />
            <ListItem className="noborder">
              <input
                type="checkbox"
                checked={showBrineWater}
                onChange={() => setShowBrineWater(prev => !prev)}
              ></input>
            </ListItem>
          </PlanFeatures>
        </Plan>
        <Plan className="checkbox">
          <PlanTitle>Vestaxx Heizfenster</PlanTitle>
          <PlanFeatures>
            <FontAwesomeIcon
              icon={solid('water')}
              size="5x"
              color="darkorange"
            />
            <ListItem className="noborder">
              <input type="checkbox" checked={true} disabled={true}></input>
            </ListItem>
          </PlanFeatures>
        </Plan>
        <Plan className="checkbox">
          <PlanTitle>Erdgas-Brennwert-System</PlanTitle>
          <PlanFeatures>
            <FontAwesomeIcon
              icon={solid('water')}
              size="5x"
              color="darkorange"
            />
            <ListItem className="noborder">
              <input
                type="checkbox"
                checked={showGas}
                onChange={() => setShowGas(prev => !prev)}
              ></input>
            </ListItem>
          </PlanFeatures>
        </Plan>
      </ChoiceDiv>
      <br />

      <Snip1214Tabelle>
        <Text className="centered">
          Zu errichtendes Geb??ude mit verschiedenen Heizsystemen
        </Text>
        {showWoodPellet && (
          <PlanTabelle>
            <PlanTitleTabelle>Holzpellet-System</PlanTitleTabelle>
            <PlanFeaturesTabelle>
              <ListImgTabelle src={woodpellets}></ListImgTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.investitionHolzpelletSystem?.toFixed(2)} ???
                </ListPriceTabelle>
                <ListTextTabelle>Investitionskosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtEnergiekostenHolzpelletSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamt-Energiekosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtAnnuitaetHolzpelletSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamtannuit??t</ListTextTabelle>
              </ListItemTabelle>
            </PlanFeaturesTabelle>
          </PlanTabelle>
        )}
        {showHeatPump && (
          <PlanTabelle>
            <PlanTitleTabelle>W??rmepumpen-System</PlanTitleTabelle>
            <PlanFeaturesTabelle>
              <ListImgTabelle src={heatpump}></ListImgTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.investitionWaermepumpenSystem?.toFixed(2)} ???
                </ListPriceTabelle>
                <ListTextTabelle>Investitionskosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtEnergiekostenWaermepumpenSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamt-Energiekosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtAnnuitaetWaermepumpenSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamtannuit??t</ListTextTabelle>
              </ListItemTabelle>
            </PlanFeaturesTabelle>
          </PlanTabelle>
        )}
        {showBrineWater && (
          <PlanTabelle>
            <PlanTitleTabelle>Sole-Wasser-W??rmepumpen-System</PlanTitleTabelle>
            <PlanFeaturesTabelle>
              <ListImgTabelle src={brinewater}></ListImgTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.investitionSwWaermepumpenSystem?.toFixed(2)} ???
                </ListPriceTabelle>
                <ListTextTabelle>Investitionskosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtEnergiekostenSwWaermepumpenSystem?.toFixed(2)}{' '}
                  ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamt-Energiekosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtAnnuitaetSwWaermepumpenSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamtannuit??t</ListTextTabelle>
              </ListItemTabelle>
            </PlanFeaturesTabelle>
          </PlanTabelle>
        )}
        <PlanTabelle className="featured">
          <PlanTitleTabelle className="featured">
            Vestaxx Heizfenster
          </PlanTitleTabelle>
          <PlanFeaturesTabelle className="featured">
            <ListImgTabelle src={vestaxx}></ListImgTabelle>
            <ListItemTabelle>
              <ListPriceTabelle>
                {output.investitionHeizfensterSystem?.toFixed(2)} ???
              </ListPriceTabelle>
              <ListTextTabelle>Investitionskosten</ListTextTabelle>
            </ListItemTabelle>
            <ListItemTabelle>
              <ListPriceTabelle>
                {output.gesamtStromkostenHeizfenster?.toFixed(2)} ???/a
              </ListPriceTabelle>
              <ListTextTabelle>Gesamt-Energiekosten</ListTextTabelle>
            </ListItemTabelle>
            <ListItemTabelle>
              <ListPriceTabelle>
                {output.gesamtAnnuitaetHeizfensterMitAnrechnung?.toFixed(2)} ???/a
              </ListPriceTabelle>
              <ListTextTabelle>Gesamtannuit??t</ListTextTabelle>
            </ListItemTabelle>
          </PlanFeaturesTabelle>
        </PlanTabelle>
        {showGas && (
          <PlanTabelle>
            <PlanTitleTabelle>Erdgas-Brennwert-System</PlanTitleTabelle>
            <PlanFeaturesTabelle>
              <ListImgTabelle src={gas}></ListImgTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.investitionErgasBwSystem?.toFixed(2)} ???
                </ListPriceTabelle>
                <ListTextTabelle>Investitionskosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtEnergiekostenErgasBwSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamt-Energiekosten</ListTextTabelle>
              </ListItemTabelle>
              <ListItemTabelle>
                <ListPriceTabelle>
                  {output.gesamtAnnuitaetErgasBwSystem?.toFixed(2)} ???/a
                </ListPriceTabelle>
                <ListTextTabelle>Gesamtannuit??t</ListTextTabelle>
              </ListItemTabelle>
            </PlanFeaturesTabelle>
          </PlanTabelle>
        )}
      </Snip1214Tabelle>
      <br />
      <br />
      <br />
      <FlexCenter>
        <BoldTitle>Investitionskosten der verschiedenen Heizsysteme</BoldTitle>
        <span className="tooltip" style={{ color: 'darkorange' }}>
          <FontAwesomeIcon icon={solid('circle-question')} />
          <span className="tooltiptext">
            Die Investitionskosten eines Heizsystems sind die Kosten, die beim
            Kauf des jeweiligen Heizsystems inklusive aller f??r den Betrieb
            notwendigen Bestandteile sowie der Montage anfallen.
          </span>
        </span>
      </FlexCenter>
      <ChartDiv>
        <Bar options={optionsInvestmentCost} data={dataInvestmentCost} />
      </ChartDiv>
      <br />
      <br />
      <br />
      <FlexCenter>
        <BoldTitle>Details zu den Heizsystemen</BoldTitle>
      </FlexCenter>
      <MuiAccordion
        title1="Holzpellet-System"
        details1="Beim Holzpellet-System erfolgt das Heizen sowie die Bereitstellung von Trinkwarmwasser durch das Verbrennen von Holzpellets in einem Pelletkessel. Mit der bei der Verbrennung freiwerdenden W??rmeenergie wird Wasser erw??rmt. Durch eine Fu??bodenheizung wird die W??rme dann an den Raum abgegeben."
        title2="W??rmepumpen-System"
        details2="Beim W??rmepumpen-System erfolgt das Heizen sowie die Bereitstellung von Trinkwarmwasser durch eine z.B. Luft-Wasser-W??rmepumpe. Die Luft-Wasser-W??rmepumpe funktioniert prinzipiell wie ein K??hlschrank, nur umgekehrt. Sie nutzt mit Hilfe von Strom die Umgebungsw??rme aus der Luft und erw??rmt mit einer Jahreszahl von durchschnittlich 2,5 Wasser, welches anschlie??end durch Heizschlangen im Fu??boden geleitet wird und dadurch den Raum erw??rmt."
        title3="Sole-Wasser-W??rmepumpen-System"
        details3="Beim Sole-Wasser-W??rmepumpen-System erfolgt das Heizen sowie die Bereitstellung von Trinkwarmwasser mit Hilfe einer Sole-Wasser-W??rmepumpe. Das Prinzip entspricht dem der Luft-Wasser-W??rmepumpe, mit dem Unterschied, dass nicht die Umgebungsw??rme aus der Luft, sondern die Umgebungsw??rme aus dem Erdreich zum Heizen genutzt wird. Die Sole-Wasser-W??rmepumpe hat eine durchschnittliche Jahresarbeitszahl von 3,5."
        title4="Vestaxx Heizfenster-System"
        details4="Bei dem Vestaxx Heizfenstersystem handelt es sich um ein auf Nanotechnik basierendes Infrarotheizsystem (Stromdirektheizung) in Verbindung mit einer Trinkwarmwasserbereitung.  Zentrales Element des Vestaxx Heizsystems sind die Vestaxx Heizisoliergl??ser. Dabei handelt es sich um 3-fach Isoliergl??ser mit einem exzellenten u-Wert von 0,5 (W??rmedurchgangskoeffizient) f??r Fenster und Fenstert??ren (Balkont??ren). Durch die Nanobeschichtung wird elektrischer Strom geleitet und dieser wird in W??rme mit einem Wirkungsgrad von 95% an das Rauminnere abgegeben. Die Bereitstellung von Trinkwarmwasser erfolgt entweder ??ber eine Trinkwasserw??rmepumpe mit einer hohen Jahresarbeitszahl, kann aber auch ??ber einen elektrischen Durchlauferhitzer erfolgen. Das Vestaxx Heizfenstersystem wird durch eine gro??e Photovoltaik-Anlage auf dem Dach des Hauses - vorzugsweise inklusive Stromspeicher ??? ma??geblich versorgt."
        title5="Erdgas-Brennwert-System"
        details5="Beim Erdgas-Brennwertkessel-System erfolgt das Heizen sowie die Bereitstellung von Trinkwarmwasser durch das Verbrennen von fossilem Erdgas in einem Brennwertkessel. Durch die Verbrennung von Erdgas wird dabei Wasser erhitzt, dass anschlie??end durch die Heizk??rper in den R??umen flie??t und das Haus erw??rmt."
      ></MuiAccordion>
      <br />
      <Headline>Diagrammauswahl</Headline>
      <Text>
        W??hlen Sie aus verschiedenen Diagrammen f??r einen ma??geschneiderten
        Heizsystemvergleich.
      </Text>
      <br />
      <br />
      <FlexCenter>
        <BoldTitle>
          GEG-Referenzgeb??ude im Vergleich mit den Heizsystemen
        </BoldTitle>
        <span className="tooltip" style={{ color: 'darkorange' }}>
          <FontAwesomeIcon icon={solid('circle-question')} />
          <span className="tooltiptext">
            Das GEG-Referenzgeb??ude ist ein virtuelles Hilfsgeb??ude, mit dessen
            Hilfe der maximal zul??ssige Prim??renergiebedarf f??r Heizung,
            Warmwasserbereitung, L??ftung und K??hlung eines realen Geb??udes
            ermittelt wird. Das GEG-Referenzgeb??ude verf??gt ??ber einen
            Erdgas-Brennwertkessel zum Heizen und eine Solarthermie-Anlage f??r
            die Warmwasserbereitung.
          </span>
        </span>
      </FlexCenter>
      <ButtonDiv>
        <Button onClick={() => setShowGEG(prev => !prev)}>Diagramm</Button>
      </ButtonDiv>
      {showGEG && (
        <div>
          <br />
          <FlexCenter>
            <ChartLabel>??kologischer Vergleich: Prim??renergiebedarf</ChartLabel>
            <span className="tooltip" style={{ color: 'darkorange' }}>
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Der Prim??renergiebedarf ergibt sich aus der Multiplikation des
                Endenergiebedarfs mit dem Prim??renergiefaktor des eingesetzten
                Energietr??gers. Der Prim??renergiefaktor ber??cksichtigt dabei die
                Energie, die zur Gewinnung, Umwandlung und zum Transport des
                Energietr??gers bis in das Geb??ude ben??tigt wird. Bei dem
                Energietr??ger handelt es sich um Strom, Erdgas oder Holzpellets.
              </span>
            </span>
          </FlexCenter>
          <ChartDiv>
            <Bar options={optionsPrimaryEnergy} data={dataEcoPrimaryEnergy} />
          </ChartDiv>
          <br />
          <br />

          <FlexCenter>
            <ChartLabel>??kologischer Vergleich: CO2-Emissionen</ChartLabel>
            <span className="tooltip" style={{ color: 'darkorange' }}>
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                CO2-??quivalente sind eine Ma??einheit zur Vereinheitlichung der
                Klimawirkung von verschiedenen Treibhausgasen. Neben dem
                wichtigsten Treibhausgas Kohlenstoffdioxid gibt es auch weitere
                Treibhausgase wie Methan oder Lachgas, die nicht im gleichen
                Ma??e zum Treibhauseffekt beitragen wie Kohlenstoffdioxid. Um die
                Auswirkungen der verschiedenen Gase auf den Treibhauseffekt
                vergleichen zu k??nnen, gibt es die CO2-??quivalente. Bei den
                CO2-??quivalent-Emissionen werden somit nicht nur die
                Kohlenstoffdioxidemissionen, sondern alle durch das Heizsystem
                verursachten Emissionen ber??cksichtigt.
              </span>
            </span>
          </FlexCenter>
          <ChartDiv>
            <Bar options={optionsCO2} data={dataEcoCO2} />
          </ChartDiv>
          <br />
          <br />
        </div>
      )}

      {!showGEG && <br />}

      <FlexCenter>
        <BoldTitle>Annuit??t der verschiedenen Heizsysteme</BoldTitle>
        <span className="tooltip" style={{ color: 'darkorange' }}>
          <FontAwesomeIcon icon={solid('circle-question')} />
          <span className="tooltiptext">
            Bei der Gesamtannuit??t handelt es sich um die j??hrlich notwendige
            Zahlung, um die Gesamtkosten des jeweiligen Heizsystems zu tilgen.
            Die Gesamtkosten setzen sich dabei aus den Investitionskosten und
            den Betriebskosten des Heizsystems zusammen. Die Laufzeit, bzw. die
            technische Lebensdauer der Heizsysteme betr??gt dabei in der Regel 20
            Jahre. Die Annuit??t bleibt ??ber diesen gesamten Zeitraum konstant.
          </span>
        </span>
      </FlexCenter>
      <ButtonDiv>
        <Button onClick={() => setShowAnnuity(prev => !prev)}>Diagramm</Button>
      </ButtonDiv>

      {showAnnuity && (
        <div>
          <ChartDiv>
            <Bar options={optionsAnnuity} data={dataAnnuity} />
          </ChartDiv>
          <br />
        </div>
      )}
      <br />
      <FlexCenter>
        <BoldTitle className="multiline">
          J??hrliche Einsparungen durch Einsatz des Heizfenstersystems
          <br />
          im Vergleich zu den anderen Systemen
        </BoldTitle>
      </FlexCenter>
      <ButtonDiv>
        <Button onClick={() => setShowReduction(prev => !prev)}>
          Diagramm
        </Button>
      </ButtonDiv>
      {showReduction && (
        <div>
          <br />

          <FlexCenter>
            <ChartLabel>J??hrliche Einsparung bei der Prim??renergie</ChartLabel>
            <span className="tooltip" style={{ color: 'darkorange' }}>
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Hier wird Ihnen angezeigt, wie viel Prim??renergie Ihr
                ausgew??hltes Geb??ude mit Heizfenstersystem im Vergleich zu den
                angezeigten Heizsystemen pro Quadratmeter und Jahr einspart.
              </span>
            </span>
          </FlexCenter>
          <ChartDiv>
            <Bar
              data={dataReductionPrimary}
              options={optionsReductionPrimary}
            />
          </ChartDiv>
          <br />
          <br />

          <FlexCenter>
            <ChartLabel>
              J??hrliche Einsparung an CO2-??quivalent-Emissionen
            </ChartLabel>
            <span className="tooltip" style={{ color: 'darkorange' }}>
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Hier wird Ihnen angezeigt, wie viele CO2-??quivalent-Emissionen
                Ihr ausgew??hltes Geb??ude mit Heizfenstersystem im Vergleich zu
                den angezeigten Heizsystemen pro Jahr einspart.
              </span>
            </span>
          </FlexCenter>
          <ChartDiv>
            <Bar options={optionsReductionCO2} data={dataReductionCO2} />
          </ChartDiv>
          <br />
          <br />

          <FlexCenter>
            <ChartLabel>Reduzierung der Annuit??t</ChartLabel>
            <span className="tooltip" style={{ color: 'darkorange' }}>
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Hier wird Ihnen angezeigt, um wie viel Euro die Gesamtannuit??t
                Ihres ausgew??hlten Geb??udes durch den Einsatz des
                Heizfenstersystems im Vergleich zu den angezeigten Heizsystemen
                reduziert werden kann.
              </span>
            </span>
          </FlexCenter>
          <ChartDiv>
            <Bar
              data={dataReductionAnnuity}
              options={optionsReductionAnnuity}
            />
          </ChartDiv>

          <br />
          <br />
        </div>
      )}
      <br />
      <Headline>Downloadbereich</Headline>
      <Text>
        W??hlen Sie aus verschiedenen Diagrammen f??r einen ma??geschneiderten
        Heizsystemvergleich.
      </Text>
      <br />
      <br />
    </Container>
  );
};

export default ContentHeatingComp;
