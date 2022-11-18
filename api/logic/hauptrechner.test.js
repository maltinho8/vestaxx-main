import hauptrechner from './hauptrechner';

test('setUp der Inputwerte', () => {
  let input = {
    einspeiseverguetung: 0.3,
    gebaeudeNutzflaeche: 100,
    bundesland: 'berlin',
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };
  let aktualisierteDefaultWerte = hauptrechner.setUpInputWerte(input);
  //Übergebene InputWerte werden eingesetzt
  expect(aktualisierteDefaultWerte.einspeiseverguetung).toEqual(0.3);
  //Nicht überschriebene Defaultwerte bleiben fix
  expect(aktualisierteDefaultWerte.heizwaermebedarfProQM).toEqual(10);
  //installierte PV-Leistung wird korrekt berechnet
  expect(aktualisierteDefaultWerte.installiertePVLeistung).toBe(10);
  //Übergebene Required-Werte werden korrekt hinzugefügt
  expect(aktualisierteDefaultWerte.gebaeudeNutzflaeche).toBe(100);
  expect(aktualisierteDefaultWerte.bundesland).toBe('berlin');
  expect(aktualisierteDefaultWerte.bewohnerAnzahl).toBe(4);
  expect(aktualisierteDefaultWerte.anzahlBeheizterRaeume).toBe(8);

  //Required-Felder fehlen
  input = {
    bundesland: 'berlin',
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };
  expect(() => {
    hauptrechner.setUpInputWerte(input);
  }).toThrowError('Gebäudenutzfläche nicht gesetzt');

  input = {
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };
  expect(() => {
    hauptrechner.setUpInputWerte(input);
  }).toThrowError('Bundesland nicht gesetzt');

  input = {
    gebaeudeNutzflaeche: 150,
    bundesland: 'berlin',
    anzahlBeheizterRaeume: 8,
  };
  expect(() => {
    hauptrechner.setUpInputWerte(input);
  }).toThrowError('Bewohneranzahl nicht gesetzt');

  input = {
    gebaeudeNutzflaeche: 150,
    bundesland: 'berlin',
    bewohnerAnzahl: 4,
  };
  expect(() => {
    hauptrechner.setUpInputWerte(input);
  }).toThrowError('Anzahl beheizter Räume nicht gesetzt');

  input = {
    gebaeudeNutzflaeche: 150,
    bUnDeSlAnD: 'berlin',
    bewohnerAnzahl: 4,
  };
  expect(() => {
    hauptrechner.setUpInputWerte(input);
  }).toThrowError('bUnDeSlAnD ist kein erwarteter Parameter');
});

test('Berechnung des GesamtPrimärEnergieBedarfs', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateGesamtPrimaerEnergieBedarfHeizfenster(input);
  expect(Math.round(result)).toEqual(8455);
});

test('Berechnung des GesamtPrimärEnergieBedarfsProQm', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };

  let result =
    hauptrechner.calculateGesamtPrimaerEnergieBedarfHeizfensterProQm(input);
  expect(Math.round(result * 10) / 10).toEqual(56.4);
});

test('Berechnung Einspeisevergütung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    anzahlBeheizterRaeume: 8,
    bewohnerAnzahl: 4,
    installiertePVLeistung: 10,
  };
  let result = hauptrechner.calculateEinspeiseVerguetungHeizfenster(input);
  expect(Math.round(result * 100) / 100).toEqual(414.61);
});

test('rechne gesamt Energie für Erdgas-BW-System aus', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeStandard: 'KfW 55',
    gebaeudeNutzflaeche: 150,
    anzahlBeheizterRaeume: 8,
    erdgaspreis: 0.12,
    bewohnerAnzahl: 4,
    strompreisProKWh: 0.35,
  };

  const result = hauptrechner.calculateGesamtEnergiekostenErdgasBwSystem(input);

  expect(result).toEqual(2355.8072208029134);
});

test('rechne Investitionskosten für Erdgas-BW-System aus', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };

  const result = hauptrechner.calculateInvestitionErdgasBwSystem(input);

  expect(result).toEqual(15500);
});

test('rechne Investitionskosten für Heizfenster-System aus', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeStandard: 'KfW 55',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    nennkapazitaetStromspeicher: 5,
    groesseHeizfenster: 1.8204,
  };

  const result = hauptrechner.calculateInvestitionHeizfensterSystem(input);

  expect(result).toEqual(31700);
});

test('berechne Gesamtstromkosten für Heizfenster-System', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeStandard: 'KfW 55',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    strompreisProKWh: 0.35,
    installiertePVLeistung: 10,
    heizfensterTyp: 'Dreifach-Verglasung',
  };

  const result = hauptrechner.calculateGesamtStromkostenHeizfenster(input);

  expect(result).toEqual(1643.9989762088098);
});

test('berechne Gesamtannuität für Heizfenster-System ohne Anrechnung', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeStandard: 'KfW 55',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    nennkapazitaetStromspeicher: 5,
    strompreisProKWh: 0.35,
    groesseHeizfenster: 1.8204,
    heizfensterTyp: 'Dreifach-Verglasung',
  };

  const result =
    hauptrechner.calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input);

  expect(result).toEqual(4503.312624788283);
});

test('berechne Gesamtannuität für Heizfenster-System mit Anrechnung', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeStandard: 'KfW 55',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    nennkapazitaetStromspeicher: 5,
    strompreisProKWh: 0.35,
    einspeiseverguetung: 0.082,
    groesseHeizfenster: 1.8204,
    heizfensterTyp: 'Dreifach-Verglasung',
  };

  const result =
    hauptrechner.calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input);

  expect(result).toEqual(3956.990756233701);
});

test('berechne Gesamtannuität für Erdgas-BW-System', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    erdgaspreis: 0.12,
    strompreisProKWh: 0.35,
  };

  const result = hauptrechner.calculateGesamtannuitaetErdgasBwSystem(input);

  expect(result).toEqual(4470.111713761245);
});

test('berechne Investitionskosten für Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };

  const result = hauptrechner.calculateInvestitionWaermepumpenSystem(input);

  expect(result).toEqual(24750);
});

test('berechne Gesamtenergiekosten für Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result =
    hauptrechner.calculateGesamtEnergieKostenWaermepumpenSystem(input);

  expect(result).toEqual(2010.7142755);
});

test('berechne Gesamtannuität für Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result = hauptrechner.calculateGesamtAnnuitaetWaermepumpenSystem(input);

  expect(result).toEqual(4954.828391945677);
});

test('berechne Gesamtprimärenergiebedarf für Wärmepumpensystem pro QM', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result =
    hauptrechner.calculateGesamtPrimaerenergiebedarfWaermepumpenSystemProQm(
      input
    );

  expect(result).toEqual(68.92800000000001);
});

test('berechne Investitionskosten für Sole-Wasser-Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };

  const result = hauptrechner.calculateInvestitionSwWaermepumpenSystem(input);

  expect(result).toEqual(31055);
});

test('berechne Gesamtenergiekosten für Sole-Wasser-Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result =
    hauptrechner.calculateGesamtEnergieKostenSwWaermepumpenSystem(input);

  expect(result).toEqual(1802.5);
});

test('berechne Gesamtannuität für Sole-Wasser-Wärmepumpensystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result =
    hauptrechner.calculateGesamtAnnuitaetSwWaermepumpenSystem(input);

  expect(result).toEqual(4895.403808327919);
});

test('berechne Investitionskosten für Holzpelletsystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
  };

  const result = hauptrechner.calculateInvestitionHolzpelletSystem(input);

  expect(result).toEqual(26750);
});

test('berechne Gesamtenergiekosten für Holzpelletsystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result =
    hauptrechner.calculateGesamtEnergieKostenHolzpelletSystem(input);

  expect(result).toEqual(1854.9699999999998);
});

test('berechne Gesamtannuität für Holzpelletsystem', () => {
  const input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    gebaeudeStandard: 'KfW 55',
    strompreisProKWh: 0.35,
  };

  const result = hauptrechner.calculateGesamtAnnuitaetHolzpelletSystem(input);

  expect(result).toEqual(4736.5129254284775);
});

test('Berechnung Primärenergie Vergleich GEG-Referenzgebäude ohen Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieOhneAnrechnungGegReferenzgebaeude(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(32.3);
});

test('Berechnung Primärenergie Vergleich GEG-Referenzgebäude mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieMitAnrechnungGegReferenzgebaeude(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(90.7);
});

test('Berechnung Primärenergie Vergleich Erdgas-BW ohne Anrechnung', () => {
  var input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieOhneAnrechnungErdgasBw(input);
  expect(Math.round(result * 10) / 10).toEqual(32.3);
});

test('Berechnung Primärenergie Vergleich Erdgas-BW mit Anrechnung', () => {
  var input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieMitAnrechnungErdgasBw(input);
  expect(Math.round(result * 10) / 10).toEqual(90.7);
});

test('Berechnung Primärenergie Vergleich Wärmepumpensystem ohen Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieOhneAnrechnungWaermepumpe(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(12.6);
});

test('Berechnung Primärenergie Vergleich Wärmepumpensystem mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieMitAnrechnungWaermepumpe(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(73.2);
});

test('Berechnung Primärenergie Vergleich Erdwärmepumpensystem ohen Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieOhneAnrechnungErdwaermepumpe(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(5.4);
});

test('Berechnung Primärenergie Vergleich Erdwärmepumpensystem mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieMitAnrechnungErdwaermepumpe(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(66.1);
});

test('Berechnung Primärenergie Vergleich Holzpellets ohen Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieOhneAnrechnungHolzpellet(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(-4.2);
});

test('Berechnung Primärenergie Vergleich Holzpelelts mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  let result =
    hauptrechner.calculateEinsparungPrimaerEnergieMitAnrechnungHolzpellet(
      input
    );
  expect(Math.round(result * 10) / 10).toEqual(56.4);
});

//Co2Emissionen
test('Vergleich Co2 Emissionen Heizfenstersystem und GEG-Referenzgebäude ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenOhneAnrechnungGegReferenzgebaeude(
        input
      )
    )
  ).toBe(1443);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und GEG-Referenzgebäude mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenMitAnrechnungGegReferenzgebaeude(
        input
      )
    )
  ).toBe(4274);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Erdgas-BW-System ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdgasBw(
        input
      )
    )
  ).toBe(1591);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Erdgas-Bw-System mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenMitAnrechnungErdgasBw(
        input
      )
    )
  ).toBe(4423);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Wärmepumpen-System ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenOhneAnrechnungWaermepumpe(
        input
      )
    )
  ).toBe(586);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Wärmepumpen-System mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenMitAnrechnungWaermepumpe(
        input
      )
    )
  ).toBe(3418);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Erdwärmenpumpen-System ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdwaermepumpe(
        input
      )
    )
  ).toBe(254);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Erdwärmepumpen-System mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe(
        input
      )
    )
  ).toBe(3085);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Holzpelletsystem ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenOhneAnrechnungHolzpellet(
        input
      )
    )
  ).toBe(-268);
});

test('Vergleich Co2 Emissionen Heizfenstersystem und Holzpelletsystem mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    Math.round(
      hauptrechner.calculateEinsparungCo2AeqEmissionenMitAnrechnungHolzpellet(
        input
      )
    )
  ).toBe(2563);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Erdgas-BW-System ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdgasBw(
      input
    )
  ).toBe(-33.20091102703827);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Erdgas-BW-System mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetMitAnrechnungErdgasBw(input)
  ).toBe(513.1209575275434);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Wärmepumpe ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetOhneAnrechnungWaermepumpe(
      input
    )
  ).toBe(451.5157671573943);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Wärmepumpe mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe(
      input
    )
  ).toBe(997.837635711976);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Erdwärmepumpensystem ohne Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdwaermepumpe(
      input
    )
  ).toBe(392.0911835396364);
});

test('Vergleich Gesamtannuität Heizfenstersystem und Erdwärmepumpensystem mit Anrechnung', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe(
      input
    )
  ).toBe(938.4130520942181);
});

test('Vergleich Gesamtannuität Heizfenstersystem ohne Anrechnung und Holzpelletsystem', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetOhneAnrechnungHolzpellet(
      input
    )
  ).toBe(233.20030064019465);
});

test('Vergleich Gesamtannuität Heizfenstersystem mit Anrechnung und Holzpelletsystem', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateReduzierungGesamtAnnuitaetMitAnrechnungHolzpellet(
      input
    )
  ).toBe(779.5221691947763);
});

test('Gesamtprimärenergiebedarf pro QM Erdgas-BW-System', () => {
  let input = {
    bundesland: 'brandenburg',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateGesamtPrimaerenergiebedarfErdgasBwSystemProQm(input)
  ).toBe(111.10488571573359);
});

test('Substituierte Primärenergie pro QM Heizfenster', () => {
  let input = {
    bundesland: 'brandenburg',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateSubstituiertePrimaerEnergieHeizfensterProQM(input)
  ).toBe(63.38426938447124);
});

test('Gesamtprimärenergiebedarf pro QM Sole-Wasser-Wärmepumpensystem', () => {
  let input = {
    bundesland: 'brandenburg',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateGesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm(
      input
    )
  ).toBe(61.8);
});

test('Gesamtprimärenergiebedarf pro QM Holzpelletsystem', () => {
  let input = {
    bundesland: 'brandenburg',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateGesamtPrimaerenergiebedarfHolzpelletSystemProQm(input)
  ).toBe(52.12);
});

test('Gesamtprimärenergiebedarf pro QM GEG-Referenzgebäude', () => {
  let input = {
    bundesland: 'brandenburg',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateGesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm(
      input
    )
  ).toBe(106.56577500433382);
});

test('berechne CO2 für Heizfenster', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2Heizfenster(input)).toBe(2630.398361934096);
});

test('berechne CO2 für Erdgas-BW-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2ErdgasBwNormal(input)).toBe(
    4221.614441605827
  );
});

test('berechne CO2 für Wärmepumpen-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2Waermepumpe(input)).toBe(3216.6400000000003);
});

test('berechne CO2 für SW-Wärmepumpen-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2Erdwaermepumpe(input)).toBe(
    2884.0000000000005
  );
});

test('berechne CO2 für Holzpellet-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2Holzpellet(input)).toBe(2362.2700000000004);
});

test('berechne CO2 für GEG-Referenz-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(hauptrechner.calculateCo2ErdgasBwGEG(input)).toBe(4073.0617274145616);
});

test('berechne substituierte CO2-Emissionen für Heizfenster-System', () => {
  let input = {
    bundesland: 'berlin',
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
  };
  expect(
    hauptrechner.calculateSubstituierteCo2EmissionenHeizfenster(input)
  ).toBe(2831.455528502071);
});

test('Prognose GEG-Anforderungen normative Vergleichsrechnung Potsdam', () => {
  var input = {
    bundesland: 'berlin',
    anzahlBeheizterRaeume: 8,
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  expect(
    hauptrechner.calculatePrognoseGegAnforderungenGegReferenzgebaeudePotsdam(
      input
    )
  ).toBe(true);
});

test('Prognose KfW Standard normative Vergleichsrechnung Potsdam', () => {
  var input = {
    bundesland: 'berlin',
    anzahlBeheizterRaeume: 8,
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
  };
  expect(
    hauptrechner.calculatePrognoseKfwStandardGegReferenzgebaeudePotsdam(input)
  ).toBe(false);
});

test('PrimaerEnergiebedarfNormativeVergleichsrechnung mit GEG-Referenzgebäude', () => {
  var input = {
    bundesland: 'berlin',
    anzahlBeheizterRaeume: 8,
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'GEG-Referenzgebäude',
    nennkapazitaetStromspeicher: 5,
  };
  expect(
    hauptrechner.berechnePrimaerEnergiebedarfNormativeVergleichsrechnung(input)
  ).toBe(14524.755682909152);
});

test('PrimaerEnergiebedarfNormativeVergleichsrechnung mit KfW-40', () => {
  var input = {
    bundesland: 'berlin',
    anzahlBeheizterRaeume: 8,
    gebaeudeNutzflaeche: 150,
    bewohnerAnzahl: 4,
    anzahlBeheizterRaeume: 8,
    installiertePVLeistung: 10,
    gebaeudeStandard: 'KfW 40',
    nennkapazitaetStromspeicher: 5,
  };
  expect(
    hauptrechner.berechnePrimaerEnergiebedarfNormativeVergleichsrechnung(input)
  ).toBe(8926.297508958665);
});
