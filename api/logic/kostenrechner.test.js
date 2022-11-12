import kostenrechner from "./kostenrechner.js";

test("berechne Kosten für Strombedarf", () => {
    const strompreis = 0.35;
    const strombedarf = 4697;
    expect(kostenrechner.calculateStromkosten(strombedarf, strompreis)).toEqual(1643.9499999999998);
});

test("berechne Kosten für Erdgasbedarf", () => {
    const erdgaspreis = 0.12;
    const erdgasbedarf = 1200;
    expect(kostenrechner.calculateErdgasKosten(erdgasbedarf, erdgaspreis)).toEqual(144);
});

test("berechne Investionskosten Erdgas BW System", () => {
    const anzahlBeheizterRaeume = 8;

    const result = kostenrechner.calculateInvestitionskostenErdgasBWSystem(anzahlBeheizterRaeume);

    expect(result).toEqual(15500);
});

test("berechne Gesamtannuität Erdgas-BW-System", () => {
    const anzahlBeheizterRaeume = 8;
    const erdgaskosten = 1130.81;
    const stromkosten = 1225.00;

    const result = kostenrechner.calculateGesamtannuitaetErdgasBW(anzahlBeheizterRaeume, erdgaskosten, stromkosten);

    expect(result).toEqual(4470.11520629864);
});

test("berechne Investitionskosten Heizfenstersystem", () => {
    const gesamtflaecheHeizfenster = 20;
    const anzahlHeizfenster = 11;
    const installiertePVLeistung = 10;
    const nennkapazitaetStromspeicher = 5;

    const result = kostenrechner.calculateInvestitionskostenHeizfenstersystem(gesamtflaecheHeizfenster, anzahlHeizfenster, installiertePVLeistung, nennkapazitaetStromspeicher);

    expect(result).toEqual(31700);
});

test("berechne Gesamtannuität Heizfenstersystem ohne Anrechnung", () => {
    const investitionHeizfenstersystem = 31700;
    const gesamtStromkosten = 1644;

    const result = kostenrechner.calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(investitionHeizfenstersystem, gesamtStromkosten);

    expect(result).toEqual(4503.313973826966);
});

test("berechne Gesamtannuität Heizfenstersystem mit Anrechnung", () => {
    const investitionHeizfenstersystem = 31700;
    const gesamtStromkosten = 1644;
    const einspeiseverguetungKonstant = 0.082;
    const pvStromueberschussProJahr = 5056;

    const result = kostenrechner.calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(investitionHeizfenstersystem, gesamtStromkosten, einspeiseverguetungKonstant, pvStromueberschussProJahr);

    expect(result).toEqual(3957.010537244642);
});

test("berechne Gesamtenergiekosten für Erdgas-BW-System", () => {
    const erdgaskosten = 1130.81;
    const stromkosten = 1050;

    const result = kostenrechner.calculateGesamtEnergiekosten(erdgaskosten, stromkosten);

    expect(result).toEqual(2180.81);
});

test("berechne Kostenunterschiede Gesamtannuität", () => {
    const gesamtannuitaetErdgasBW = 3770.47;
    const gesamtannuitaetHeizfenster = 3704.37;

    const result = kostenrechner.calculateReduzierungGesamtannuitaet(gesamtannuitaetErdgasBW, gesamtannuitaetHeizfenster);

    expect(result).toEqual(66.09999999999991);
});

test("berechne Investitionskosten Luft-Wasser-Wärmepumpensystem", () => {
    const gebaeudenutzflaeche = 150;

    const result = kostenrechner.calculateInvestitionskostenWaermepumpenSystem(gebaeudenutzflaeche);

    expect(result).toEqual(24750);
});

test("berechne Gesamtenergiekosten Luft-Wasser-Wärmepumpensystem", () => {
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtEnergiekostenWaermepumpenSystem(twwBedarf, heizwaermebedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(2010.7142755);
});

test("berechne Gesamtannuität Luft-Wasser-Wärmepumpensystem", () => {
    const gebaeudenutzflaeche = 150;
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtAnnuitaetWaermepumpenSystem(gebaeudenutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(4954.828391945677);
});

test("berechne Investitionskosten Sole-Wasser-Wärmepumpensystem", () => {
    const gebaeudenutzflaeche = 150;

    const result = kostenrechner.calculateInvestitionskostenSwWaermepumpenSystem(gebaeudenutzflaeche);

    expect(result).toEqual(31055);
});

test("berechne Gesamtenergiekosten Sole-Wasser-Wärmepumpensystem", () => {
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtEnergieKostenSwWaermepumpenSystem(heizwaermebedarf, twwBedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(1802.5);
});

test("berechne Gesamtannuität Sole-Wasser-Wärmepumpensystem", () => {
    const gebaeudenutzflaeche = 150;
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtAnnuitaetSwWaermepumpenSystem(gebaeudenutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(4895.403808327919);
});

test("berechne Investitionskosten Holzpelletsystem", () => {
    const gebaeudenutzflaeche = 150;

    const result = kostenrechner.calculateInvestitionskostenHolzpelletSystem(gebaeudenutzflaeche);

    expect(result).toEqual(26750);
});

test("berechne Gesamtenergiekosten Holzpelletsystem", () => {
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtEnergiekostenHolzpelletSystem(heizwaermebedarf, twwBedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(1854.9699999999998);
});

test("berechne Gesamtannuität Holzpelletsystem", () => {
    const gebaeudenutzflaeche = 150;
    const twwBedarf = 1350;
    const heizwaermebedarf = 5250;
    const haushaltsstrombedarf = 3500;
    const strompreis = 0.35;

    const result = kostenrechner.calculateGesamtannuitaetHolzpelletSystem(gebaeudenutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, strompreis);

    expect(result).toEqual(4736.5129254284775);
});
