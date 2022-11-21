import konstanten from '../../konstanten.js';

function calculateErdgasKosten(erdgasbedarf, erdgaspreis) {
  return erdgasbedarf * erdgaspreis;
}

function calculateStromkosten(netzbezug, strompreis) {
  return netzbezug * strompreis;
}

function calculateInvestitionskostenErdgasBWSystem(anzahlBeheizterRaeume) {
  return (
    konstanten.kostenWaermeerzeugerErdgasBW +
    konstanten.kostenHeizkoerperStueck * anzahlBeheizterRaeume +
    konstanten.kostenSonstigePeripherieErdgasBW
  );
}

function calculateGesamtannuitaetErdgasBW(
  anzahlBeheizterRaeume,
  kostenErdgasJahr,
  kostenStromJahr
) {
  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const investitionErdgasBW = calculateInvestitionskostenErdgasBWSystem(
    anzahlBeheizterRaeume
  );
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorErdgas = calculateBarwertfaktorErdgas();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();

  return (
    investitionErdgasBW * annuitaetsfaktor +
    investitionErdgasBW *
      konstanten.wartungsaufwandErdgasBW *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    kostenErdgasJahr * annuitaetsfaktor * barwertfaktorErdgas +
    kostenStromJahr * annuitaetsfaktor * barwertfaktorStrom
  );
}

function calculateAnnuitaetsfaktor() {
  return (
    (1 + konstanten.zinssatz - 1) /
    (1 -
      Math.pow(
        1 + konstanten.zinssatz,
        -konstanten.technischeLebensdauerHeizsysteme
      ))
  );
}

function calculateBarwertfaktorAllgemein() {
  if (konstanten.zinssatz !== konstanten.preisaenderungAllgemein) {
    return (
      (1 -
        Math.pow(
          (1 + konstanten.preisaenderungAllgemein) / (1 + konstanten.zinssatz),
          konstanten.technischeLebensdauerHeizsysteme
        )) /
      (1 + konstanten.zinssatz - (1 + konstanten.preisaenderungAllgemein))
    );
  }
  return (
    konstanten.technischeLebensdauerHeizsysteme / (1 + konstanten.zinssatz)
  );
}

function calculateBarwertfaktorErdgas() {
  if (konstanten.zinssatz !== konstanten.preisaenderungErdgas) {
    return (
      (1 -
        Math.pow(
          (1 + konstanten.preisaenderungErdgas) / (1 + konstanten.zinssatz),
          konstanten.technischeLebensdauerHeizsysteme
        )) /
      (1 + konstanten.zinssatz - (1 + konstanten.preisaenderungErdgas))
    );
  }
  return (
    konstanten.technischeLebensdauerHeizsysteme / (1 + konstanten.zinssatz)
  );
}

function calculateBarwertfaktorStrom() {
  if (konstanten.zinssatz !== konstanten.preisaenderungStrom) {
    return (
      (1 -
        Math.pow(
          (1 + konstanten.preisaenderungStrom) / (1 + konstanten.zinssatz),
          konstanten.technischeLebensdauerHeizsysteme
        )) /
      (1 + konstanten.zinssatz - (1 + konstanten.preisaenderungStrom))
    );
  }
  return (
    konstanten.technischeLebensdauerHeizsysteme / (1 + konstanten.zinssatz)
  );
}

function calculateBarwertfaktorHolzpellets() {
  if (konstanten.zinssatz !== konstanten.preisaenderungHolzpellets) {
    return (
      (1 -
        Math.pow(
          (1 + konstanten.preisaenderungHolzpellets) /
            (1 + konstanten.zinssatz),
          konstanten.technischeLebensdauerHeizsysteme
        )) /
      (1 + konstanten.zinssatz - (1 + konstanten.preisaenderungHolzpellets))
    );
  }
  return (
    konstanten.technischeLebensdauerHeizsysteme / (1 + konstanten.zinssatz)
  );
}

function calculateInvestitionskostenHeizfenstersystem(
  gesamtflaecheHeizfenster,
  anzahlHeizfenster,
  installiertePVLeistung,
  nennkapazitaetStromspeicher
) {
  return (
    konstanten.kostenHeizfensterProQm * gesamtflaecheHeizfenster +
    konstanten.kostenHeizfensterPeripherieProStueck * anzahlHeizfenster +
    konstanten.kostenTWWWaermepumpe +
    konstanten.kostenPVAnlageProKWp * installiertePVLeistung +
    konstanten.kostenStromspeicherProKWh * nennkapazitaetStromspeicher
  );
}

/**
 * ohne Anrechnung der Einspeisung von überschüssigem PV-Strom, inkl. Haushaltsstrom
 */
function calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(
  investitionHeizfenstersystem,
  gesamtStromkosten
) {
  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();
  return (
    investitionHeizfenstersystem * annuitaetsfaktor +
    investitionHeizfenstersystem *
      konstanten.wartungsaufwandHeizfenstersystem *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    gesamtStromkosten * annuitaetsfaktor * barwertfaktorStrom
  );
}

/**
 * mit Anrechnung der Einspeisung von überschüssigem PV-Strom, inkl. Haushaltsstrom
 */
function calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(
  investitionHeizfenstersystem,
  gesamtStromkosten,
  einspeiseverguetungKonstant,
  pvStromueberschussProJahr
) {
  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();
  const einspeiseverguetung = calculateEinspeiseverguetung(
    einspeiseverguetungKonstant,
    pvStromueberschussProJahr
  );

  return (
    investitionHeizfenstersystem * annuitaetsfaktor +
    investitionHeizfenstersystem *
      konstanten.wartungsaufwandHeizfenstersystem *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    (gesamtStromkosten - einspeiseverguetung) *
      annuitaetsfaktor *
      barwertfaktorStrom
  );
}

function calculateEinspeiseverguetung(
  einspeiseverguetungKonstant,
  pvStromueberschussProJahr
) {
  return einspeiseverguetungKonstant * pvStromueberschussProJahr;
}

function calculateGesamtEnergiekosten(erdgaskosten, stromkosten) {
  return erdgaskosten + stromkosten;
}

/**
 * Wirtschaftlichkeit: Heizfenstersystem vs. Erdgas-BW-System
 * (Kostenunterschiede aufgrund variierender Qualität der Gebäudehülle nicht enthalten)
 */
function calculateReduzierungGesamtannuitaet(
  gesamtannuitaetErdgasBW,
  gesamtannuitaetHeizfenstersystem
) {
  return gesamtannuitaetErdgasBW - gesamtannuitaetHeizfenstersystem;
}

// Luft-Wasser-Wärmepumpe

function calculateInvestitionskostenWaermepumpenSystem(gebaeudenutzflaeche) {
  return (
    konstanten.kostenWaermeerzeugerLWWaermepumpe +
    konstanten.kostenFussbodenheizung * gebaeudenutzflaeche +
    konstanten.kostenSonstigePeripherieWarmepumpe -
    konstanten.foerderungLuftWasserWaermepumpe
  );
}

function calculateGesamtstrombedarfWaermepumpe(heizwaermebedarf, twwBedarf) {
  const strombedarfHeizen =
    heizwaermebedarf * konstanten.aufwandszahlTWWWaermepumpe;
  const strombedarfTWW = twwBedarf * konstanten.aufwandszahlTWWWaermepumpe;
  return strombedarfHeizen + strombedarfTWW;
}

function calculateGesamtEnergiekostenWaermepumpenSystem(
  twwBedarf,
  heizwaermebedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const gesamtstrombedarfWaermepumpe = calculateGesamtstrombedarfWaermepumpe(
    heizwaermebedarf,
    twwBedarf
  );

  const gesamtstrombedarf = gesamtstrombedarfWaermepumpe + haushaltsstrombedarf;

  return calculateStromkosten(gesamtstrombedarf, strompreis);
}

function calculateGesamtAnnuitaetWaermepumpenSystem(
  gebaeudenutzflaeche,
  heizwaermebedarf,
  twwBedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const investitionskostenWaermepumpenSystem =
    calculateInvestitionskostenWaermepumpenSystem(gebaeudenutzflaeche);

  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();

  const gesamtstrombedarfWaermepumpe = calculateGesamtstrombedarfWaermepumpe(
    heizwaermebedarf,
    twwBedarf
  );
  const gesamtstromkostenWaermepumpe = calculateStromkosten(
    gesamtstrombedarfWaermepumpe,
    strompreis
  );

  const gesamtstromkostenHaushalt = calculateStromkosten(
    haushaltsstrombedarf,
    strompreis
  );

  return (
    investitionskostenWaermepumpenSystem * annuitaetsfaktor +
    (konstanten.kostenWaermeerzeugerLWWaermepumpe +
      konstanten.kostenSonstigePeripherieWarmepumpe -
      konstanten.foerderungLuftWasserWaermepumpe) *
      konstanten.wartungsaufwandWaermepumpe *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    konstanten.kostenFussbodenheizung *
      gebaeudenutzflaeche *
      konstanten.wartungsaufwandFussbodenheizung *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    gesamtstromkostenWaermepumpe * annuitaetsfaktor * barwertfaktorStrom +
    gesamtstromkostenHaushalt * annuitaetsfaktor * barwertfaktorStrom
  );
}

//zu errichtendes Gebäude mit Sole-Wasser-Wärmepumpen-System

function calculateInvestitionskostenSwWaermepumpenSystem(gebaeudenutzflaeche) {
  return (
    konstanten.kostenSoleWasserWaermepumpe +
    konstanten.kostenFussbodenheizung * gebaeudenutzflaeche +
    konstanten.kostenSonstigePeripherieWarmepumpe -
    konstanten.foerderungSoleWasserWaermepumpe
  );
}

function calculateGesamtEnergieKostenSwWaermepumpenSystem(
  heizwaermebedarf,
  twwBedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const strombedarfHeizen =
    heizwaermebedarf * konstanten.aufwandszahlSoleWasserWaermepumpe;
  const strombedarfTWW =
    twwBedarf * konstanten.aufwandszahlSoleWasserWaermepumpe;

  const strombedarfWaermepumpe = strombedarfHeizen + strombedarfTWW;

  const stromkostenWaermepumpe = calculateStromkosten(
    strombedarfWaermepumpe,
    strompreis
  );
  const gesamtstromkostenHaushalt = calculateStromkosten(
    haushaltsstrombedarf,
    strompreis
  );

  return stromkostenWaermepumpe + gesamtstromkostenHaushalt;
}

function calculateGesamtAnnuitaetSwWaermepumpenSystem(
  gebaeudenutzflaeche,
  heizwaermebedarf,
  twwBedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const investitionskosten =
    calculateInvestitionskostenSwWaermepumpenSystem(gebaeudenutzflaeche);

  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();

  const strombedarfHeizen =
    heizwaermebedarf * konstanten.aufwandszahlSoleWasserWaermepumpe;
  const strombedarfTWW =
    twwBedarf * konstanten.aufwandszahlSoleWasserWaermepumpe;

  const strombedarfWaermepumpe = strombedarfHeizen + strombedarfTWW;

  const stromkostenWaermepumpe = calculateStromkosten(
    strombedarfWaermepumpe,
    strompreis
  );
  const gesamtstromkostenHaushalt = calculateStromkosten(
    haushaltsstrombedarf,
    strompreis
  );

  return (
    investitionskosten * annuitaetsfaktor +
    (konstanten.kostenWaermeerzeugerLWWaermepumpe +
      konstanten.kostenSonstigePeripherieWarmepumpe -
      konstanten.foerderungSoleWasserWaermepumpe) *
      konstanten.wartungsaufwandWaermepumpe *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    konstanten.kostenFussbodenheizung *
      gebaeudenutzflaeche *
      konstanten.wartungsaufwandFussbodenheizung *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    stromkostenWaermepumpe * annuitaetsfaktor * barwertfaktorStrom +
    gesamtstromkostenHaushalt * annuitaetsfaktor * barwertfaktorStrom
  );
}

function calculateInvestitionskostenHolzpelletSystem(gebaeudenutzflaeche) {
  return (
    konstanten.kostenHolzpelletheizung +
    konstanten.kostenHolzpelletLager +
    konstanten.kostenHolzpelletPufferspeicher +
    konstanten.kostenFussbodenheizung * gebaeudenutzflaeche +
    konstanten.kostenHolzpelletSonstigePeripherie -
    konstanten.foerderungHolzpelletsystem
  );
}

function calculateGesamtEnergiekostenHolzpelletSystem(
  heizwaermebedarf,
  twwBedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const pelletbedarfHeizen =
    heizwaermebedarf * konstanten.aufwandszahlHolzpellets;
  const pelletbedarfTWW = twwBedarf * konstanten.aufwandszahlHolzpellets;

  const pelletbedarf = pelletbedarfHeizen + pelletbedarfTWW;

  const pelletkosten = pelletbedarf * konstanten.holzpelletpreis;
  const gesamtstromkostenHaushalt = calculateStromkosten(
    haushaltsstrombedarf,
    strompreis
  );

  return pelletkosten + gesamtstromkostenHaushalt;
}

function calculateGesamtannuitaetHolzpelletSystem(
  gebaeudenutzflaeche,
  heizwaermebedarf,
  twwBedarf,
  haushaltsstrombedarf,
  strompreis
) {
  const investitionskosten =
    calculateInvestitionskostenHolzpelletSystem(gebaeudenutzflaeche);

  const annuitaetsfaktor = calculateAnnuitaetsfaktor();
  const barwertfaktorAllgemein = calculateBarwertfaktorAllgemein();
  const barwertfaktorStrom = calculateBarwertfaktorStrom();
  const barwertfaktorHolzpellets = calculateBarwertfaktorHolzpellets();

  const pelletbedarfHeizen =
    heizwaermebedarf * konstanten.aufwandszahlHolzpellets;
  const pelletbedarfTWW = twwBedarf * konstanten.aufwandszahlHolzpellets;
  const pelletbedarf = pelletbedarfHeizen + pelletbedarfTWW;

  const pelletkosten = pelletbedarf * konstanten.holzpelletpreis;

  const gesamtstromkostenHaushalt = calculateStromkosten(
    haushaltsstrombedarf,
    strompreis
  );
  return (
    investitionskosten * annuitaetsfaktor +
    (konstanten.kostenHolzpelletheizung +
      konstanten.kostenHolzpelletSonstigePeripherie -
      konstanten.foerderungHolzpelletsystem) *
      konstanten.wartungsaufwandHolzpelletheizung *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    konstanten.kostenFussbodenheizung *
      gebaeudenutzflaeche *
      konstanten.wartungsaufwandFussbodenheizung *
      annuitaetsfaktor *
      barwertfaktorAllgemein +
    konstanten.kostenHolzpelletPufferspeicher *
      konstanten.wartungsaufwandHolzpelletPufferspeicher *
      annuitaetsfaktor *
      barwertfaktorHolzpellets +
    pelletkosten * annuitaetsfaktor * barwertfaktorStrom +
    gesamtstromkostenHaushalt * annuitaetsfaktor * barwertfaktorStrom
  );
}

const calculator = {
  calculateErdgasKosten,
  calculateStromkosten,
  calculateInvestitionskostenErdgasBWSystem,
  calculateGesamtannuitaetErdgasBW,
  calculateInvestitionskostenHeizfenstersystem,
  calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung,
  calculateGesamtannuitaetHeizfenstersystemMitAnrechnung,
  calculateGesamtEnergiekosten,
  calculateReduzierungGesamtannuitaet,
  calculateInvestitionskostenWaermepumpenSystem,
  calculateGesamtEnergiekostenWaermepumpenSystem,
  calculateGesamtAnnuitaetWaermepumpenSystem,
  calculateGesamtEnergieKostenSwWaermepumpenSystem,
  calculateGesamtAnnuitaetSwWaermepumpenSystem,
  calculateInvestitionskostenSwWaermepumpenSystem,
  calculateGesamtEnergiekostenHolzpelletSystem,
  calculateGesamtannuitaetHolzpelletSystem,
  calculateInvestitionskostenHolzpelletSystem,
};

export default calculator;
