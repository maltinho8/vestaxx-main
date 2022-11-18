import heizwaermebedarfRechner from './heizwaermebedarfRechner.js';
import twwBedarfRechner from './twwBedarfRechner.js';
import sumAllArrayValues from './support/additionArrayRechner.js';
import konstanten from '../../konstanten.js';

// Strombedarf Gesamt (Heizen+Tww+Haushalt) Monatlich
function calculateGesamtStrombedarfMonatlich(
  heizfensterTyp,
  gebaeudeStandard,
  gebaeudenutzflaeche,
  bewohnerAnzahl,
  twwBereitstellung
) {
  let strombedarfHeizenProQm = calculateStrombedarfHeizenProQmMonatlich(
    heizfensterTyp,
    gebaeudeStandard
  );
  let strombedarfTwwProQm = calculateStrombedarfTwwProQmMonatlich(
    gebaeudenutzflaeche,
    twwBereitstellung
  );
  let strombedarfHaushaltProQm = calculateStrombedarfHaushaltProQmMonatlich(
    bewohnerAnzahl,
    gebaeudenutzflaeche
  );
  let gesamtSrombedarfMonatlich = [];
  for (let i = 0; i < 12; i++) {
    gesamtSrombedarfMonatlich[i] =
      calculateGesamtStrombedarfProQm(
        strombedarfHeizenProQm[i],
        strombedarfTwwProQm[i],
        strombedarfHaushaltProQm[i]
      ) * gebaeudenutzflaeche;
  }
  return gesamtSrombedarfMonatlich;
}

// Strombedarf Gesamt (Heizen+Tww+Haushalt) Jährlich
function calculateGesamtStrombedarf(
  heizfensterTyp,
  gebaeudeStandard,
  gebaeudenutzflaeche,
  bewohnerAnzahl
) {
  return sumAllArrayValues(
    calculateGesamtStrombedarfMonatlich(
      heizfensterTyp,
      gebaeudeStandard,
      gebaeudenutzflaeche,
      bewohnerAnzahl
    )
  );
}

function calculateGesamtStrombedarfProQm(
  strombedarfHeizenProQm,
  strombedarfTwwProQm,
  strombedarfHaushaltProQm
) {
  return (
    strombedarfHeizenProQm + strombedarfTwwProQm + strombedarfHaushaltProQm
  );
}

//Strombedarf für Heizen pro QM Monatlich
function calculateStrombedarfHeizenProQmMonatlich(
  heizfensterTyp,
  gebaeudeStandard
) {
  let strombedarfHeizenMonatlich = [];
  for (let i = 1; i <= 12; i++) {
    strombedarfHeizenMonatlich[i - 1] = calculateStrombedarfHeizenProQmProMonat(
      heizwaermebedarfRechner.calculateHeizwaermebedarfProQmProMonat(
        heizwaermebedarfRechner.calculateHeizwaermebedarfProQm(
          gebaeudeStandard
        ),
        i
      ),
      heizfensterTyp,
      i
    );
  }
  return strombedarfHeizenMonatlich;
}

//Strombedarf für Heizen pro QM Jährlich
function calculateStrombedarfHeizenProQm(heizfensterTyp, gebaeudeStandard) {
  return sumAllArrayValues(
    calculateStrombedarfHeizenProQmMonatlich(heizfensterTyp, gebaeudeStandard)
  );
}

//Strombedarf für Heizen pro QM und Monat
function calculateStrombedarfHeizenProQmProMonat(
  heizwaermebedarfProQmProMonat,
  heizfensterTyp,
  monat
) {
  let aufwandszahlVerglasungProMonat;
  if (heizfensterTyp === 'Zweifach-Verglasung') {
    switch (monat) {
      case 1:
        aufwandszahlVerglasungProMonat = 1.29307218608704;
        break;
      case 2:
        aufwandszahlVerglasungProMonat = 1.29718775202295;
        break;
      case 3:
        aufwandszahlVerglasungProMonat = 1.31896226374426;
        break;
      case 4:
        aufwandszahlVerglasungProMonat = 1.63980279536148;
        break;
      case 5:
        aufwandszahlVerglasungProMonat = 2.70261463103285;
        break;
      case 6:
        aufwandszahlVerglasungProMonat = 2.43892574026087;
        break;
      case 7:
        aufwandszahlVerglasungProMonat = 2.20438237401682;
        break;
      case 8:
        aufwandszahlVerglasungProMonat = 2.24503260224157;
        break;
      case 9:
        aufwandszahlVerglasungProMonat = 2.6824815934255;
        break;
      case 10:
        aufwandszahlVerglasungProMonat = 1.38628572998795;
        break;
      case 11:
        aufwandszahlVerglasungProMonat = 1.3048646052912;
        break;
      case 12:
        aufwandszahlVerglasungProMonat = 1.2918333681151;
        break;
      default: aufwandszahlVerglasungProMonat = 1.29307218608704;
    }
  } else {
    switch (monat) {
      case 1:
        aufwandszahlVerglasungProMonat = 1.11383081876655;
        break;
      case 2:
        aufwandszahlVerglasungProMonat = 1.11522189521003;
        break;
      case 3:
        aufwandszahlVerglasungProMonat = 1.12065918958083;
        break;
      case 4:
        aufwandszahlVerglasungProMonat = 1.21874260052612;
        break;
      case 5:
        aufwandszahlVerglasungProMonat = 1.56656992619999;
        break;
      case 6:
        aufwandszahlVerglasungProMonat = 1.52034474428889;
        break;
      case 7:
        aufwandszahlVerglasungProMonat = 1.47855977963884;
        break;
      case 8:
        aufwandszahlVerglasungProMonat = 1.48585139136967;
        break;
      case 9:
        aufwandszahlVerglasungProMonat = 1.56306747456433;
        break;
      case 10:
        aufwandszahlVerglasungProMonat = 1.14729043801136;
        break;
      case 11:
        aufwandszahlVerglasungProMonat = 1.11658828493809;
        break;
      case 12:
        aufwandszahlVerglasungProMonat = 1.11345139434943;
        break;
      default: aufwandszahlVerglasungProMonat = 1.11383081876655;
    }
  }

  return heizwaermebedarfProQmProMonat * aufwandszahlVerglasungProMonat;
}

//Strombedarf für TWW pro QM Jährlich
function calculateStrombedarfTwwProQmMonatlich(
  gebaeudenutzflaeche,
  twwBereitstellung
) {
  let strombedarfTwwMonatlich = [];
  for (let i = 1; i <= 12; i++) {
    if ((twwBereitstellung = 'TWW-Wärmepumpe')) {
      strombedarfTwwMonatlich[i - 1] = calculateStrombedarfTwwProQmProMonat(
        twwBedarfRechner.calculateTwwbedarfProQmProMonat(
          twwBedarfRechner.calculateTwwbedarfProQm(gebaeudenutzflaeche),
          i
        ),
        i
      );
    } else {
      strombedarfTwwMonatlich[i - 1] =
        calculateStrombedarfDurchlaufProQmProMonat(
          twwBedarfRechner.calculateTwwbedarfProQmProMonat(
            twwBedarfRechner.calculateTwwbedarfProQm(gebaeudenutzflaeche),
            i
          ),
          i
        );
    }
  }
  return strombedarfTwwMonatlich;
}

//Strombedarf für TWW pro QM Jährlich
function calculateStrombedarfTwwProQm(gebaeudenutzflaeche) {
  return sumAllArrayValues(
    calculateStrombedarfTwwProQmMonatlich(gebaeudenutzflaeche)
  );
}

//Strombedarf für TWW pro QM und Monat
function calculateStrombedarfTwwProQmProMonat(twwbedarfProQmProMonat, Monat) {
  let aufwandszahlWaermeProMonat;
  switch (Monat) {
    case 1:
      aufwandszahlWaermeProMonat = 0.363615612873774;
      break;
    case 2:
      aufwandszahlWaermeProMonat = 0.347740667976425;
      break;
    case 3:
      aufwandszahlWaermeProMonat = 0.324770642201835;
      break;
    case 4:
      aufwandszahlWaermeProMonat = 0.304414293904071;
      break;
    case 5:
      aufwandszahlWaermeProMonat = 0.29893038093451;
      break;
    case 6:
      aufwandszahlWaermeProMonat = 0.312291707508332;
      break;
    case 7:
      aufwandszahlWaermeProMonat = 0.315008898556457;
      break;
    case 8:
      aufwandszahlWaermeProMonat = 0.316259678379989;
      break;
    case 9:
      aufwandszahlWaermeProMonat = 0.301647415262261;
      break;
    case 10:
      aufwandszahlWaermeProMonat = 0.309620991253645;
      break;
    case 11:
      aufwandszahlWaermeProMonat = 0.321363728061328;
      break;
    case 12:
      aufwandszahlWaermeProMonat = 0.350803787711958;
      break;
    default: aufwandszahlWaermeProMonat = 0.363615612873774;
  }

  return twwbedarfProQmProMonat * aufwandszahlWaermeProMonat;
}

//Strombedarf für Durchlauferhitzer pro QM und Monat
function calculateStrombedarfDurchlaufProQmProMonat(twwbedarfProQmProMonat) {
  return twwbedarfProQmProMonat * konstanten.aufwandszahldurchlauferhitzer;
}

//Strombedarf für den Haushalt pro QM Monatlich
function calculateStrombedarfHaushaltProQmMonatlich(
  bewohnerAnzahl,
  gebaeudeNutzflaeche
) {
  let stromBedarfHaushaltProQm = calculateStrombedarfHaushaltProQm(
    bewohnerAnzahl,
    gebaeudeNutzflaeche
  );
  let strombefarfHaushaltMonatlich = [];
  for (let i = 1; i <= 12; i++) {
    strombefarfHaushaltMonatlich[i - 1] =
      calculateStrombedarfHaushaltProQmProMonat(stromBedarfHaushaltProQm, i);
  }
  return strombefarfHaushaltMonatlich;
}

//Strombedarf für den Haushalt pro QM und Jahr
function calculateStrombedarfHaushaltProQmProMonat(
  strombedarfHaushaltProQm,
  Monat
) {
  let haushaltanteilProMonat;
  switch (Monat) {
    case 1:
      haushaltanteilProMonat = 9.28496844406072 / 100;
      break;
    case 2:
      haushaltanteilProMonat = 8.6099470064172 / 100;
      break;
    case 3:
      haushaltanteilProMonat = 9.06623253890719 / 100;
      break;
    case 4:
      haushaltanteilProMonat = 8.39543032759665 / 100;
      break;
    case 5:
      haushaltanteilProMonat = 7.88292408534688 / 100;
      break;
    case 6:
      haushaltanteilProMonat = 7.37924645300867 / 100;
      break;
    case 7:
      haushaltanteilProMonat = 7.3420886320995 / 100;
      break;
    case 8:
      haushaltanteilProMonat = 7.25831936809317 / 100;
      break;
    case 9:
      haushaltanteilProMonat = 7.84165770835862 / 100;
      break;
    case 10:
      haushaltanteilProMonat = 8.55239239784828 / 100;
      break;
    case 11:
      haushaltanteilProMonat = 8.93210000350953 / 100;
      break;
    case 12:
      haushaltanteilProMonat = 9.45469303475355 / 100;
      break;
    default: haushaltanteilProMonat = 9.28496844406072 / 100;
  }

  return strombedarfHaushaltProQm * haushaltanteilProMonat;
}

//Strombedarf für den Haushalt pro QM
function calculateStrombedarfHaushaltProQm(
  anzahlBewohner,
  gebaeudenutzflaeche
) {
  return calculateStrombedarfHaushalt(anzahlBewohner) / gebaeudenutzflaeche;
}

//Strombedarf für den Haushalt pro Jahr
function calculateStrombedarfHaushalt(anzahlBewohner) {
  let StrombedarfHaushalt = 0;
  switch (anzahlBewohner) {
    case 1:
      StrombedarfHaushalt = 1700;
      break;
    case 2:
      StrombedarfHaushalt = 2500;
      break;
    case 3:
      StrombedarfHaushalt = 3000;
      break;
    case 4:
      StrombedarfHaushalt = 3500;
      break;
    case 5:
      StrombedarfHaushalt = 4100;
      break;
    default: StrombedarfHaushalt = 1700;
  }
  return StrombedarfHaushalt;
}

const calculator = {
  calculateGesamtStrombedarf,
  calculateGesamtStrombedarfMonatlich,
  calculateGesamtStrombedarfProQm,
  calculateStrombedarfHeizenProQm,
  calculateStrombedarfHeizenProQmProMonat,
  calculateStrombedarfTwwProQm,
  calculateStrombedarfTwwProQmProMonat,
  calculateStrombedarfHaushaltProQm,
  calculateStrombedarfHaushalt,
  calculateStrombedarfHaushaltProQmProMonat,
  calculateStrombedarfDurchlaufProQmProMonat,
};

export default calculator;
