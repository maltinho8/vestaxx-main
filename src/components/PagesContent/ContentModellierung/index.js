import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'react-widgets/styles.css';
import DropdownList from 'react-widgets/DropdownList';
import NumberPicker from 'react-widgets/NumberPicker';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './HouseSlider/index.css';
import './HouseSlider/styles.css';
import './index.css';

import houseBerlin from '../../assets/img/einstöckig/122E_4B_Grundriss.jpg';
import houseBrandenburg from '../../assets/img/einstöckig/147E_5B_Grundriss.jpg';
import houseBaden from '../../assets/img/einstöckig/170E_6B_Grundriss.jpg';
import houseBayern from '../../assets/img/zweistöckig/90D_DG_5B_Grundriss.jpg';
import houseHessen from '../../assets/img/zweistöckig/98DEG_4B_Grundriss.jpg';
import houseMecklenburg from '../../assets/img/zweistöckig/90D_EG_5B_Grundriss.jpg';
import houseThüringen from '../../assets/img/zweistöckig/98DDG_4B_Grundriss.jpg';
import houseRheinland from '../../assets/img/zweistöckig/99DDG_5B_Grundrisse.jpg';
import houseNordrhein from '../../assets/img/zweistöckig/99DEG_5B_Grundrisse.jpg';
import houseSaarland from '../../assets/img/zweistöckig/112DDG_5B_Grundriss.jpg';
import houseNiedersachsen from '../../assets/img/zweistöckig/112DEG_5B_Grundriss.jpg';
import houseSchleswig from '../../assets/img/einstöckig/Talis_Musterhaus_86E.jpg';
import houseBremen from '../../assets/img/einstöckig/Talis_Musterhaus_113E.jpg';
import houseHamburg from '../../assets/img/einstöckig/Talis_Musterhaus_143E.jpg';
import houseSachsen from '../../assets/img/einstöckig/Talis_Musterhaus_150E.jpg';
import houseSachsenAnhalt from '../../assets/img/einstöckig/Talis_Musterhaus_159E.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

const Container = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.palette.text.light};
`;

const Headline = styled.h2`
  line-height: 1;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`;

const Text = styled.div`
  font-size: 1rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
`;

const InputDiv = styled.div`
  background-color: #191970;
  border: 2px solid black;
  padding: 1em;
  border-radius: 4px;
  margin-bottom: 2rem;
  margin-top: 1rem;
  width: 100%important!;
  height: auto;
`;

const InputDiv2 = styled.div`
  background-color: grey;
  border: 2px solid black;
  padding: 1em;
  border-radius: 4px;
  margin-bottom: 2rem;
  margin-top: 1rem;
  width: 100%;
  height: auto;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputFieldText = styled.p`
  font-size: 1rem;
  color: white;
`;

const Input = styled.input`
  padding: 0.5em;
  background: white;
  border: 0.5px solid grey;
  border-radius: 4px;
  height: 38px;
  width: 100%;
  box-sizing: border-box;
`;

const content = [
  {
    title: 'Berlin',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://images.squarespace-cdn.com/content/v1/5c180094a9e028ac5301d51c/1589371633757-XTIZIJRZKF3Y80GPR0Z4/Berlin+Limited+Fine+Art+Prints-062.jpg?format=1000w',
    flaeche: '200',
    raeume: '6',
    bewohner: '5',
    userProfile: houseBerlin,
  },
  {
    title: 'Hessen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image: 'https://wallpaperaccess.com/full/5515393.jpg',
    flaeche: '250',
    raeume: '7',
    bewohner: '4',
    userProfile: houseHessen,
  },
  {
    title: 'Bayern',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'http://de.zopix.net/image_upload/221791-muenchen-frauenkirche-bayern-daemmerung.jpg',
    flaeche: '450',
    raeume: '16',
    bewohner: '8',
    userProfile: houseBayern,
  },
  {
    title: 'Brandenburg',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.novasol.de/sites/default/files/styles/body_large/public/inline-images/Schloss%20Sanssouci%20Potsdam%20Brandenburg%20NOVASOL_1640_0.jpg?itok=AtvAC5Ss',
    flaeche: '150',
    raeume: '4',
    bewohner: '2',
    userProfile: houseBrandenburg,
  },
  {
    title: 'Baden-Württemberg',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://phototravellers.de/wp-content/uploads/2021/10/baden-wuerttemberg-burg-hohenzollern-4.jpg?ezimgfmt=ngcb2/notWebP',
    flaeche: '250',
    raeume: '6',
    bewohner: '4',
    userProfile: houseBaden,
  },
  {
    title: 'Mecklenburg-Vorpommern',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.novasol.de/sites/default/files/styles/body_large/public/inline-images/germany_mecklenburg_western_pomerania_warnemunde_shutterstock_481819162_resized_header_0.jpg?itok=KWrz__Sx',
    flaeche: '130',
    raeume: '7',
    bewohner: '3',
    userProfile: houseMecklenburg,
  },
  {
    title: 'Thüringen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://nebenan.thueringen-entdecken.de/o/adaptive-media/image/157030/full-hd/image.jpeg',
    flaeche: '250',
    raeume: '5',
    bewohner: '3',
    userProfile: houseThüringen,
  },
  {
    title: 'Rheinland-Pfalz',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image: 'https://www.reisewut.com/bilder/mosel/geierlay-haengebruecke7.jpg',
    flaeche: '350',
    raeume: '9',
    bewohner: '5',
    userProfile: houseRheinland,
  },
  {
    title: 'Nordrhein-Westfalen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.travelcircus.de/urlaubsziele/wp-content/uploads/shutterstock_155196884_K%C3%B6ln-2-696x464.jpg',
    flaeche: '150',
    raeume: '4',
    bewohner: '2',
    userProfile: houseNordrhein,
  },
  {
    title: 'Saarland',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.travelcircus.de/urlaubsziele/wp-content/uploads/Fotolia_91995263_saarschleife_%C2%A9-sergeewitsch-e1494232431276.jpg',
    flaeche: '70',
    raeume: '1',
    bewohner: '2',
    userProfile: houseSaarland,
  },
  {
    title: 'Niedersachsen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.billiger-mietwagen.de/reisewelt/wp-content/uploads/2018/03/Deutschland-Niedersachsen-Celle.jpg',
    flaeche: '170',
    raeume: '12',
    bewohner: '3',
    userProfile: houseNiedersachsen,
  },
  {
    title: 'Schleswig-Holstein',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Leuchtturm_in_Westerheversand_crop.jpg/1024px-Leuchtturm_in_Westerheversand_crop.jpg',
    flaeche: '270',
    raeume: '18',
    bewohner: '7',
    userProfile: houseSchleswig,
  },
  {
    title: 'Bremen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image: 'https://medien.bremen.de/media/w/480/IMG_3957.JPG',
    flaeche: '140',
    raeume: '9',
    bewohner: '5',
    userProfile: houseBremen,
  },
  {
    title: 'Hamburg',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://www.konpasu.de/wp-content/uploads/2021/12/Wasserschloss-Speicherstadt-Hamburg-in-Deutschland-2.jpg',
    flaeche: '120',
    raeume: '6',
    bewohner: '3',
    userProfile: houseHamburg,
  },
  {
    title: 'Sachsen',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://travellersarchive.de/wp-content/uploads/sites/2/2021/03/elbsandsteingebirge-ausflugsziele-sachsen.jpg',
    flaeche: '120',
    raeume: '5',
    bewohner: '2',
    userProfile: houseSachsen,
  },
  {
    title: 'Sachsen-Anhalt',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Mehr dazu',
    image:
      'https://phototravellers.de/wp-content/uploads/2020/06/magdeburg.jpg',
    flaeche: '180',
    raeume: '8',
    bewohner: '5',
    userProfile: houseSachsenAnhalt,
  },
];

const ContentModellierung = () => {
  const [standort, setStandort] = useState('');
  //const [etage, setEtage] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [bewohner, setBewohner] = useState(null);
  const [fläche, setFläche] = useState(null);
  const [strom, setStrom] = useState(null);
  const [pv, setPV] = useState(null);
  const [gebäudestandard, setGebäudestandard] = useState('KfW 55');
  const [heizwärmebedarf, setHeizwärmebedarf] = useState(10);
  const [gebäudeheizlast, setGebäudeheizlast] = useState(10);
  const [heizfenstertyp, setHeizfenstertyp] = useState('Dreifach-Verglasung');
  const [tww, setTWW] = useState('TWW-Wärmepumpe');
  const [pvertrag1, setPVertrag1] = useState('1');
  const [pvertrag2, setPVertrag2] = useState('2');
  const [pvertrag3, setPVertrag3] = useState('3');
  const [pvertrag4, setPVertrag4] = useState('4');
  const [pvertrag5, setPVertrag5] = useState('5');
  const [pvertrag6, setPVertrag6] = useState('6');
  const [pvertrag7, setPVertrag7] = useState('7');
  const [pvertrag8, setPVertrag8] = useState('8');
  const [pvertrag9, setPVertrag9] = useState('9');
  const [pvertrag10, setPVertrag10] = useState('10');
  const [pvertrag11, setPVertrag11] = useState('11');
  const [pvertrag12, setPVertrag12] = useState('12');
  //const [orientierung, setOrientierung] = useState("süd");
  //const [neigung, setNeigung] = useState(40);
  //const [montage, setMontage] = useState("direkt aufliegend");
  //const [technologie, setTechnologie] = useState("kristallin");
  //const [einspeisung, setEinspeisung] = useState(100);
  const [strompreis, setStrompreis] = useState(0.35);
  const [einspeisevergütung, setEinspeisevergütung] = useState(0.07);
  const [erdgaspreis, setErdgaspreis] = useState(0.12);

  const validate = () => {
    return (
      standort !== '' && fläche !== null && rooms !== null && bewohner !== null
    );
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  // Beispiel 1: Berlin
  const [standortBerlin] = useState('berlin');
  const [roomsBerlin] = useState(6);
  const [bewohnerBerlin] = useState(5);
  const [flächeBerlin] = useState(200);

  // Beispiel 2: Hessen
  const [standortHessen] = useState('hessen');
  const [roomsHessen] = useState(7);
  const [bewohnerHessen] = useState(4);
  const [flächeHessen] = useState(250);

  // Beispiel 3: Bayern
  const [standortBayern] = useState('bayern');
  const [roomsBayern] = useState(16);
  const [bewohnerBayern] = useState(8);
  const [flächeBayern] = useState(450);

  // Beispiel 4: Baden-Württemberg
  const [standortBaden] = useState('baden-württemberg');
  const [roomsBaden] = useState(6);
  const [bewohnerBaden] = useState(4);
  const [flächeBaden] = useState(250);

  // Beispiel 5: Brandenburg
  const [standortBrandenburg] = useState('brandenburg');
  const [roomsBrandenburg] = useState(4);
  const [bewohnerBrandenburg] = useState(2);
  const [flächeBrandenburg] = useState(150);

  // Beispiel 6: Mecklenburg
  const [standortMecklenburg] = useState('mecklenburg-vorpommern');
  const [roomsMecklenburg] = useState(7);
  const [bewohnerMecklenburg] = useState(3);
  const [flächeMecklenburg] = useState(130);

  // Beispiel 7: Thüringen
  const [standortThueringen] = useState('thüringen');
  const [roomsThueringen] = useState(5);
  const [bewohnerThueringen] = useState(3);
  const [flächeThueringen] = useState(250);

  // Beispiel 8: Rheinland-Pfalz
  const [standortRheinland] = useState('rheinland-pfalz');
  const [roomsRheinland] = useState(9);
  const [bewohnerRheinland] = useState(5);
  const [flächeRheinland] = useState(350);

  // Beispiel 9: Nordrhein-Westfalen
  const [standortNordrhein] = useState('nordrhein-westfalen');
  const [roomsNordrhein] = useState(4);
  const [bewohnerNordrhein] = useState(2);
  const [flächeNordrhein] = useState(150);

  // Beispiel 10: Saarland
  const [standortSaarland] = useState('saarland');
  const [roomsSaarland] = useState(1);
  const [bewohnerSaarland] = useState(2);
  const [flächeSaarland] = useState(70);

  // Beispiel 11: Niedersachsen
  const [standortNiedersachsen] = useState('niedersachsen');
  const [roomsNiedersachsen] = useState(12);
  const [bewohnerNiedersachsen] = useState(3);
  const [flächeNiedersachsen] = useState(170);

  // Beispiel 12: Schleswig-Holstein
  const [standortSchleswig] = useState('schleswig-holstein');
  const [roomsSchleswig] = useState(18);
  const [bewohnerSchleswig] = useState(7);
  const [flächeSchleswig] = useState(270);

  // Beispiel 13: Bremen
  const [standortBremen] = useState('bremen');
  const [roomsBremen] = useState(9);
  const [bewohnerBremen] = useState(5);
  const [flächeBremen] = useState(140);

  // Beispiel 14: Hamburg
  const [standortHamburg] = useState('hamburg');
  const [roomsHamburg] = useState(6);
  const [bewohnerHamburg] = useState(3);
  const [flächeHamburg] = useState(120);

  // Beispiel 15: Sachsen
  const [standortSachsen] = useState('sachsen');
  const [roomsSachsen] = useState(5);
  const [bewohnerSachsen] = useState(2);
  const [flächeSachsen] = useState(120);

  // Beispiel 16: Sachsen-Anhalt
  const [standortSachsenAn] = useState('sachsen-anhalt');
  const [roomsSachsenAn] = useState(8);
  const [bewohnerSachsenAn] = useState(5);
  const [flächeSachsenAn] = useState(180);

  const [output] = useState({});

  const handleSubmit = event => {
    event.preventDefault(); // to prevent the page from refreshing when the form is submitted.
  };

  const input = useMemo(() => {
    return {
      gebaeudeNutzflaeche: fläche,
      bundesland: standort,
      bewohnerAnzahl: bewohner,
      anzahlBeheizterRaeume: rooms,
      gebaeudeStandard: gebäudestandard,
      installiertePVLeistung: pv,
      nennkapazitaetStromspeicher: strom,
    };
  }, [fläche, standort, bewohner, rooms, gebäudestandard, pv, strom]);

  // Beispiel 1: Berlin
  const inputBerlin = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeBerlin,
      bundesland: standortBerlin,
      bewohnerAnzahl: bewohnerBerlin,
      anzahlBeheizterRaeume: roomsBerlin,
    };
  }, [flächeBerlin, standortBerlin, bewohnerBerlin, roomsBerlin]);

  // Beispiel 2: Hessen
  const inputHessen = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeHessen,
      bundesland: standortHessen,
      bewohnerAnzahl: bewohnerHessen,
      anzahlBeheizterRaeume: roomsHessen,
    };
  }, [flächeHessen, standortHessen, bewohnerHessen, roomsHessen]);

  // Beispiel 3: Bayern
  const inputBayern = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeBayern,
      bundesland: standortBayern,
      bewohnerAnzahl: bewohnerBayern,
      anzahlBeheizterRaeume: roomsBayern,
    };
  }, [flächeBayern, standortBayern, bewohnerBayern, roomsBayern]);

  // Beispiel 3: Brandenburg
  const inputBrandenburg = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeBrandenburg,
      bundesland: standortBrandenburg,
      bewohnerAnzahl: bewohnerBrandenburg,
      anzahlBeheizterRaeume: roomsBrandenburg,
    };
  }, [
    flächeBrandenburg,
    standortBrandenburg,
    bewohnerBrandenburg,
    roomsBrandenburg,
  ]);

  const inputMecklenburg = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeMecklenburg,
      bundesland: standortMecklenburg,
      bewohnerAnzahl: bewohnerMecklenburg,
      anzahlBeheizterRaeume: roomsMecklenburg,
    };
  }, [
    flächeMecklenburg,
    standortMecklenburg,
    bewohnerMecklenburg,
    roomsMecklenburg,
  ]);

  const inputThueringen = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeThueringen,
      bundesland: standortThueringen,
      bewohnerAnzahl: bewohnerThueringen,
      anzahlBeheizterRaeume: roomsThueringen,
    };
  }, [
    flächeThueringen,
    standortThueringen,
    bewohnerThueringen,
    roomsThueringen,
  ]);

  const inputRheinland = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeRheinland,
      bundesland: standortRheinland,
      bewohnerAnzahl: bewohnerRheinland,
      anzahlBeheizterRaeume: roomsRheinland,
    };
  }, [flächeRheinland, standortRheinland, bewohnerRheinland, roomsRheinland]);

  const inputNordrhein = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeNordrhein,
      bundesland: standortNordrhein,
      bewohnerAnzahl: bewohnerNordrhein,
      anzahlBeheizterRaeume: roomsNordrhein,
    };
  }, [flächeNordrhein, standortNordrhein, bewohnerNordrhein, roomsNordrhein]);

  // Beispiel 3: Baden-Württemberg
  const inputBaden = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeBaden,
      bundesland: standortBaden,
      bewohnerAnzahl: bewohnerBaden,
      anzahlBeheizterRaeume: roomsBaden,
    };
  }, [flächeBaden, standortBaden, bewohnerBaden, roomsBaden]);

  const inputSaarland = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeSaarland,
      bundesland: standortSaarland,
      bewohnerAnzahl: bewohnerSaarland,
      anzahlBeheizterRaeume: roomsSaarland,
    };
  }, [flächeSaarland, standortSaarland, bewohnerSaarland, roomsSaarland]);

  const inputNiedersachsen = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeNiedersachsen,
      bundesland: standortNiedersachsen,
      bewohnerAnzahl: bewohnerNiedersachsen,
      anzahlBeheizterRaeume: roomsNiedersachsen,
    };
  }, [
    flächeNiedersachsen,
    standortNiedersachsen,
    bewohnerNiedersachsen,
    roomsNiedersachsen,
  ]);

  const inputSchleswig = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeSchleswig,
      bundesland: standortSchleswig,
      bewohnerAnzahl: bewohnerSchleswig,
      anzahlBeheizterRaeume: roomsSchleswig,
    };
  }, [flächeSchleswig, standortSchleswig, bewohnerSchleswig, roomsSchleswig]);

  const inputBremen = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeBremen,
      bundesland: standortBremen,
      bewohnerAnzahl: bewohnerBremen,
      anzahlBeheizterRaeume: roomsBremen,
    };
  }, [flächeBremen, standortBremen, bewohnerBremen, roomsBremen]);

  const inputHamburg = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeHamburg,
      bundesland: standortHamburg,
      bewohnerAnzahl: bewohnerHamburg,
      anzahlBeheizterRaeume: roomsHamburg,
    };
  }, [flächeHamburg, standortHamburg, bewohnerHamburg, roomsHamburg]);

  const inputSachsen = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeSachsen,
      bundesland: standortSachsen,
      bewohnerAnzahl: bewohnerSachsen,
      anzahlBeheizterRaeume: roomsSachsen,
    };
  }, [flächeSachsen, standortSachsen, bewohnerSachsen, roomsSachsen]);

  const inputSachsenAnhalt = useMemo(() => {
    return {
      gebaeudeNutzflaeche: flächeSachsenAn,
      bundesland: standortSachsenAn,
      bewohnerAnzahl: bewohnerSachsenAn,
      anzahlBeheizterRaeume: roomsSachsenAn,
    };
  }, [flächeSachsenAn, standortSachsenAn, bewohnerSachsenAn, roomsSachsenAn]);

  /*
  fetch("/api/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .then((result) => {
      const output = {
        outputEinspeiseverguetungHeizfenster:
          result.einspeiseVerguetungHeizfenster.toFixed(2),
        outputPrimaerEnergieBedarfHeizfenster:
          result.gesamtPrimaerEnergieBedarfHeizfenster.toFixed(2),
        outputInvestitionHeizfensterSystem:
          result.investitionHeizfensterSystem.toFixed(2),
          
      };
      setOutput(output);
    });
*/
  return (
    <Container>
      <Headline>Machen Sie den Heizkostenvergleich!</Headline>
      <Text>
        Mit unserem Vergleichsrechner können Sie das optimale Heizsystem für Ihr
        neues Einfamilienhaus berechnen. Vergleichen Sie zum Beispiel das
        Vestaxx Heizfenstersystem mit einer Pelletheizung oder einer Wärmepumpe.
        Wählen Sie dafür einfach den Grundriss eines unserer zu Ihrem Traumhaus
        passenden Musterhäuser aus und legen Sie direkt los. Oder füllen Sie das
        unten befindliche Formular aus und machen damit Ihren ganz eigenen
        Heizvergleich, mit den auf Sie zugeschnittenen Daten.
      </Text>
      <br />
      <br />
      <Slider className="slider-wrapper">
        {content.slice(0, 16).map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{
              background: `url('${item.image}') no-repeat center center`,
            }}
          >
            <div className="inner">
              <img
                src={item.userProfile}
                alt={item.user}
                height={250}
                width={250}
              />
            </div>
            <section>
              <span>
                Bundesland: <strong>{item.title}</strong>
              </span>
              &nbsp; &nbsp; &nbsp;
              <span>
                Gebäudenutzfläche: <strong>{item.flaeche}</strong>
              </span>
              &nbsp; &nbsp; &nbsp;
              <span>
                Anzahl beheizter Räume: <strong>{item.raeume}</strong>
              </span>
              &nbsp; &nbsp; &nbsp;
              <span>
                Bewohneranzahl: <strong>{item.bewohner}</strong>
              </span>
              &nbsp; &nbsp; &nbsp;
            </section>
          </div>
        ))}
      </Slider>
      <br />
      <Image>
        <button
          className="pointer"
          type="submit"
          onClick={() => setShow1(prev => !prev)}
        >
          Wählen Sie aus
        </button>
      </Image>{' '}
      {show1 && (
        <div>
          <br />
          <Text>
            Wählen Sie den passenden Button für ihren Grundriss aus und starten
            Sie ihre Berechnung - oder fahren Sie weiter unten mit einer
            individuellen Berechnung fort!
          </Text>
          <Image>
            <div className="parent">
              <Link
                to={'/HeizvergleichBerlin'}
                state={{ state: output, inputBerlin }}
              >
                <button className="floated">Berlin</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichHessen'}
                state={{ state: output, inputHessen }}
              >
                <button className="floated">Hessen</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichBayern'}
                state={{ state: output, inputBayern }}
              >
                <button className="floated">Bayern</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichBrandenburg'}
                state={{ state: output, inputBrandenburg }}
              >
                <button className="floated">Brandenburg</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichMecklenburg'}
                state={{ state: output, inputMecklenburg }}
              >
                <button className="floated">Mecklenburg-Vorpommern</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichBaden'}
                state={{ state: output, inputBaden }}
              >
                <button className="floated">Baden-Württemberg</button>
              </Link>
            </div>
          </Image>

          <br />

          <Image>
            <div className="parent">
              <Link
                to={'/HeizvergleichThueringen'}
                state={{ state: output, inputThueringen }}
              >
                <button className="floated">Thüringen</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichRheinland'}
                state={{ state: output, inputRheinland }}
              >
                <button className="floated">Rheinland-Pfalz</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichNordrhein'}
                state={{ state: output, inputNordrhein }}
              >
                <button className="floated">Nordrhein-Westfalen</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichSaarland'}
                state={{ state: output, inputSaarland }}
              >
                <button className="floated">Saarland</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichNiedersachsen'}
                state={{ state: output, inputNiedersachsen }}
              >
                <button className="floated">Niedersachsen</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichSchleswig'}
                state={{ state: output, inputSchleswig }}
              >
                <button className="floated">Schleswig-Holstein</button>
              </Link>
            </div>
          </Image>

          <br />

          <Image>
            <div className="parent">
              <Link
                to={'/HeizvergleichBremen'}
                state={{ state: output, inputBremen }}
              >
                <button className="floated">Bremen</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichHamburg'}
                state={{ state: output, inputHamburg }}
              >
                <button className="floated">Hamburg</button>
              </Link>

              <br />

              <Link
                to={'/HeizvergleichSachsen'}
                state={{ state: output, inputSachsen }}
              >
                <button className="floated">Sachsen</button>
              </Link>
              <br />

              <Link
                to={'/HeizvergleichSachsenAnhalt'}
                state={{ state: output, inputSachsenAnhalt }}
              >
                <button className="floated">Sachsen-Anhalt</button>
              </Link>
              <br />
            </div>
          </Image>
        </div>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <InputDiv>
          <h5>
            Gebäudedaten und Standort{' '}
            <FontAwesomeIcon icon={solid('house-chimney-window')} />
          </h5>

          <InputFieldText>
            <span className="tooltip">
              Bundesland* <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                {' '}
                Tragen Sie hier das von Ihnen gewünschte Bundesland ein. Der
                Ort, an dem sich Ihr Gebäude befindet, wirkt sich auf den Ertrag
                der Photovoltaik-Anlage aus.
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
                oder Treppenräume. Vereinfacht können sie Ihre Gebäudenutzfläche
                auch bestimmen, in dem Sie die Wohnfläche mit dem Faktor 1,2
                multiplizieren.
              </span>
            </span>
          </InputFieldText>
          <NumberPicker
            value={fläche}
            onChange={nextValue => setFläche(nextValue)}
            min={1}
            max={300}
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

          {/*<InputFieldText> <span className="tooltip"> Etagenanzahl  <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext"> Die Bauweise bestimmt das Verhältnis Außenhülle zu Volumen. </span>
          </span></InputFieldText>
        <NumberPicker
              value={etage}
              onChange={(nextValue) => setEtage(nextValue)}
              max={2}
              min={1}
      />*/}
        </InputDiv>
        <InputDiv>
          <InputFieldText>
            {' '}
            <span className="tooltip">
              {' '}
              Installierte PV-Leistung in kWp{' '}
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                {' '}
                Bitte geben Sie hier die Nennleistung der Photovoltaik-Anlage
                an, die auf Ihrem Dach installiert ist oder die Sie auf Ihrem
                Dach installieren möchten. Wenn Sie keine PV-Leistung angeben,
                wird von 10 kWp als Empfehlungswert ausgegangen.{' '}
              </span>
            </span>
          </InputFieldText>
          <NumberPicker
            value={pv}
            onChange={nextValue => setPV(nextValue)}
            min={1}
            max={30}
          />
          <InputFieldText>
            <span className="tooltip">
              {' '}
              Nennkapazität Stromspeicher in kWh{' '}
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Geben Sie hier die Kapazität des Stromspeichers in kWh an, den
                Sie in Ihrem Haus installiert haben oder den Sie installieren
                möchten. Wenn Sie keine Nennkapazität angeben, wird von 5 kWh
                als Empfehlungswert ausgegangen.{' '}
              </span>
            </span>
          </InputFieldText>
          <NumberPicker
            value={strom}
            onChange={nextValue => setStrom(nextValue)}
            max={10}
            min={0}
          />
        </InputDiv>

        {/*
        <Link to={"/Heizvergleich"} state={{state: input, output, inputBerlin}}>
        <button type="submit" >Berechnung starten</button>
        </Link>
       */}

        <Image>
          <button className="pointer" onClick={() => setShow(prev => !prev)}>
            {' '}
            <div className="tooltip">
              {' '}
              Erweiterte Einstellungen{' '}
              <FontAwesomeIcon icon={solid('circle-question')} />
              <span className="tooltiptext">
                Für einen noch genaueren Vergleich können Sie hier weitere
                Angaben tätigen. Das empfehlen wir vor allem Experten.
              </span>
            </div>{' '}
          </button>{' '}
        </Image>
        {show && (
          <InputDiv2>
            <h5>
              Technische Daten <FontAwesomeIcon icon={solid('wrench')} />
            </h5>

            <InputFieldText>
              <span className="tooltip">
                {' '}
                Gebäudestandard{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Der Gebäudestandard von Ihrem Haus bestimmt Ihren
                  Heizwärmebedarf und die Heizlast. Die Auswahl der
                  Nutzereingabe aktiviert die Felder Heizwärmebedarf und
                  Gebäudeheizlast für eine manuelle Eingabe der Werte. Hinweis:
                  Heutige Neubauten entsprechen mindestens dem Gebäudestandard
                  KfW 55 oder besser. Dies ist gesetzlich vorgeschrieben.
                </span>
              </span>
            </InputFieldText>
            <DropdownList
              value={gebäudestandard}
              onChange={nextValue => setGebäudestandard(nextValue)}
              data={[
                'KfW 55',
                'Passivhaus',
                'GEG-Referenzgebäude',
                'Nutzereingabe',
                'KfW 40',
              ]}
            />
            <InputFieldText>
              {' '}
              <span className="tooltip">
                {' '}
                Heizwärmebedarf in [kWh/(m²a)]{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Der Heizwärmebedarf gibt an, wie viel Wärmeenergie ein Gebäude
                  innerhalb eines Jahres abhängig von seiner zu beheizenden
                  Fläche benötigt, damit in den Räumen die gewünschte Temperatur
                  erreicht wird.{' '}
                </span>
              </span>
            </InputFieldText>
            <Input
              min={0}
              max={100}
              onChange={event => setHeizwärmebedarf(event.target.value)}
              value={heizwärmebedarf}
            />
            <InputFieldText>
              <span className="tooltip">
                {' '}
                Gebäudeheizlast in [W/m²]{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Die Heizlast wird berechnet, um festzustellen, wie viel
                  Energie eine Heizungsanlage für ein angenehm warmes Haus
                  aufbringen muss.
                </span>
              </span>
            </InputFieldText>
            <Input
              type="text"
              name="gebäudeheizlast"
              min={0}
              max={100}
              onChange={event => setGebäudeheizlast(event.target.value)}
              value={gebäudeheizlast}
            />

            <h5>
              Daten Heizsystem <FontAwesomeIcon icon={solid('fire')} />
            </h5>
            <InputFieldText>
              <span className="tooltip">
                {' '}
                Heizfenstertyp{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Der Heizfenstertyp wirkt sich auf den Energiebedarf zum Heizen
                  aus. Eine Zweifachverglasung bedeutet größere Verluste als
                  eine Dreifachverglasung. Hinweis: Bei modernen Gebäuden ist
                  eine Dreifachverglasung Standard.{' '}
                </span>
              </span>
            </InputFieldText>
            <DropdownList
              value={heizfenstertyp}
              onChange={nextValue => setHeizfenstertyp(nextValue)}
              data={['Zweifach-Verglasung', 'Dreifachverglasung']}
            />
            <InputFieldText>
              {' '}
              <span className="tooltip">
                {' '}
                TWW-Bereitstellung{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Hier können Sie auswählen, wie Ihr Trinkwarmwasser
                  bereitgestellt werden soll: Ob über eine Trinkwasserwärmepumpe
                  oder einen Durchlauferhitzer. Hier empfehlen wir eine
                  Trinkwasserwärmepumpe.
                </span>
              </span>
            </InputFieldText>
            <DropdownList
              value={tww}
              onChange={nextValue => setTWW(nextValue)}
              data={['TWW-Wärmepumpe', 'Durchlauferhitzer']}
            />
            <h5>
              Daten PV <FontAwesomeIcon icon={solid('solar-panel')} />
            </h5>
            <InputFieldText>
              <span className="tooltip">
                {' '}
                Monatlicher PV-Ertrag Januar in [kWh/(kWp Mon)] (
                <a href="https://re.jrc.ec.europa.eu/pvg_tools/en/tools.html">
                  kostenfreies Online-Berechnungstool
                </a>
                ) <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Der monatliche Ertrag Ihrer Photovoltaik-Anlage wird auf Basis
                  des von Ihnen ausgewählten Bundeslandes nach Standardwerten
                  für die Neigung und die Ausrichtung der Photovoltaik-Anlage
                  berechnet. Wenn Sie sich genauere, genau auf Ihren Standort
                  und Ihr Haus abgestimmte Werte für den Ertrag Ihrer
                  Photovoltaik-Anlage berechnen möchten, können Sie die
                  Monatswerte mit dem Online-Berechnungstool bestimmen und dann
                  hier eintragen.{' '}
                </span>
              </span>
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag1"
              onChange={event => setPVertrag1(event.target.value)}
              value={pvertrag1}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Februar in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag2"
              onChange={event => setPVertrag2(event.target.value)}
              value={pvertrag2}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag März in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag3"
              onChange={event => setPVertrag3(event.target.value)}
              value={pvertrag3}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag April in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag4"
              onChange={event => setPVertrag4(event.target.value)}
              value={pvertrag4}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Mai in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag5"
              onChange={event => setPVertrag5(event.target.value)}
              value={pvertrag5}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Juni in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag6"
              onChange={event => setPVertrag6(event.target.value)}
              value={pvertrag6}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Juli in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag7"
              onChange={event => setPVertrag7(event.target.value)}
              value={pvertrag7}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag August in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag8"
              onChange={event => setPVertrag8(event.target.value)}
              value={pvertrag8}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag September in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag9"
              onChange={event => setPVertrag9(event.target.value)}
              value={pvertrag9}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Oktober in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag10"
              onChange={event => setPVertrag10(event.target.value)}
              value={pvertrag10}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag November in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag11"
              onChange={event => setPVertrag11(event.target.value)}
              value={pvertrag11}
            />
            <InputFieldText>
              Monatlicher PV-Ertrag Dezember in [kWh/(kWp Mon)]{' '}
            </InputFieldText>

            <Input
              type="text"
              name="pvertrag12"
              onChange={event => setPVertrag12(event.target.value)}
              value={pvertrag12}
            />
            {/*<InputFieldText> <span className="tooltip"> PV-Orientierung  <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext">Bei der PV-Orientierung handelt es sich um die Ausrichtung der Photovoltaik-Anlage. Standardmäßig wird hier von einer Südausrichtung ausgegangen. Die Orientierung der Anlage wirkt sich auf den PV-Ertrag aus. </span>
          </span></InputFieldText>
        <DropdownList
              value={orientierung}
              onChange={(nextValue) => setOrientierung(nextValue)}
             
              data={["süd", "süd-ost","süd-west","ost","west", "nord", "nord-ost", "nord-west"]}
        />
        <InputFieldText> <span className="tooltip"> PV-Neigung in [°] <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext">Bei der PV-Neigung handelt es sich um den Neigungswinkel, mit dem die Photovoltaik-Module montiert sind. Standardmäßig wird von einem Neigungswinkel der Photovoltaik-Module von 30 Grad ausgegangen. Die Neigung der Module wirkt sich auf den PV-Ertrag aus. </span>
          </span></InputFieldText>
        <NumberPicker
              value={neigung}
              onChange={(nextValue) => setNeigung(nextValue)}
              max={360}
              min={0}
        />
        <InputFieldText> <span className="tooltip"> PV-Montage  <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext">Es gibt verschiedene Möglichkeiten, wie eine Photovoltaik-Anlage auf einem Hausdach montiert werden kann. In der Regel liegen die Photovoltaik-Module direkt auf dem Dach auf, daher ist dieses Montagesystem hier auch als Standard ausgewählt. Sie können aber auch andere Montagesysteme auswählen. Die Art der Montage wirkt sich auf den Ertrag der Photovoltaik-Anlage aus. </span>
          </span></InputFieldText>
        <DropdownList
              value={montage}
              onChange={(nextValue) => setMontage(nextValue)}
              
              data={["direkt aufliegend", "mäßig belüftet","freistehend"]}
        />
        <InputFieldText><span className="tooltip"> PV-Technologie  <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext">Es gibt, je nach Herstellungsverfahren, verschiedene Arten von Solarzellen, die in den Photovoltaik-Modulen verbaut sind. Bei den Meisten Solarzellen handelt es sich um kristalline Zellen, daher ist diese Technologie hier auch als Standard ausgewählt. Sie können aber auch eine andere Technologie auswählen. Die PV-Technologie wirkt sich auf den Ertrag der Photovoltaik-Anlage aus. </span>
          </span></InputFieldText>
        <DropdownList
              
              value={technologie}
              onChange={(nextValue) => setTechnologie(nextValue)}
              data={["kristallin", "amorph", "organisch"]}
        />*/}
            {/*<InputFieldText><span className="tooltip"> Anrechnung PV-Einspeisung in [%]  <FontAwesomeIcon icon={solid('circle-question')} />
            <span className="tooltiptext">Anteil des ins Netz eingespeisten Stroms aus erneuerbaren Energien, der nach § 23 GEG bei der Ermittlung des Jahres-Primärenergiebedarfs des zu errichtenden Gebäudes abgezogen werden
kann. </span>
          </span></InputFieldText>
        <NumberPicker
              value={einspeisung}
              onChange={(nextValue) => setEinspeisung(nextValue)}
              max={100}
              min={0}
      />*/}
            <h5>
              Daten Preise{' '}
              <FontAwesomeIcon icon={solid('hand-holding-dollar')} />
            </h5>
            <InputFieldText>Strompreis in [€/kWh]</InputFieldText>
            <NumberPicker
              value={strompreis}
              onChange={nextValue => setStrompreis(nextValue)}
              max={1000}
              min={0}
            />
            <InputFieldText>
              <span className="tooltip">
                {' '}
                Einspeisevergütung (konstant) in [€/kWh]{' '}
                <FontAwesomeIcon icon={solid('circle-question')} />
                <span className="tooltiptext">
                  Wer Strom mit einer Photovoltaik-Anlage erzeugt und diesen
                  Strom in das öffentliche Netz einspeist, erhält eine
                  Einspeisevergütung. Insbesondere in den Sommermonaten erzeugt
                  die Photovoltaik-Anlage viel überschüssigen Strom, der nicht
                  selbst verbraucht werden kann und in das öffentliche Stromnetz
                  eingespeist wird. Die Vergütung dieses eingespeisten PV-Stroms
                  beträgt nach dem EEG 2023 aktuell 8,60 Cent pro eingespeiste
                  Kilowattstunde bei Photovoltaik-Anlagen bis 10 kWp. Dieser
                  Wert ist als Standard ausgewählt. Sie können aber auch einen
                  anderen Wert für die Einspeisevergütung wählen.{' '}
                </span>
              </span>
            </InputFieldText>
            <NumberPicker
              value={einspeisevergütung}
              onChange={nextValue => setEinspeisevergütung(nextValue)}
              max={1000}
              min={0}
            />
            <InputFieldText>Erdgaspreis in [€/kWh]</InputFieldText>
            <NumberPicker
              value={erdgaspreis}
              onChange={nextValue => setErdgaspreis(nextValue)}
              max={1000}
              min={0}
            />
          </InputDiv2>
        )}

        <br />
        <br />

        <Image>
          <Link to={'/Heizvergleich'} state={{ state: input, output }}>
            <button disabled={!validate()} className="pointer" type="submit">
              Starten Sie Sie Ihre persönliche Berechnung
            </button>
          </Link>
        </Image>
      </form>
    </Container>
  );
};

export default ContentModellierung;
