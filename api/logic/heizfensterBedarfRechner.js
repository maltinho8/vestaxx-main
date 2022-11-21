import konstanten from '../../konstanten.js';

function calculateGebaeudeheizlast(
  heizlastGebaeudetyp,
  gebaeudeStandard,
  gebaeudeNutzflaeche
) {
  let heizlast;
  if (gebaeudeStandard === 'nutzereingabe') {
    heizlast = heizlastGebaeudetyp;
  } else {
    heizlast = konstanten.heizlast[gebaeudeStandard];
  }
  return heizlast * gebaeudeNutzflaeche;
}

function calculateMinimaleGesamtflaecheHeizfenster(
  heizlastGebaeudetyp,
  gebaeudeStandard,
  gebaeudeNutzflaeche
) {
  return (
    calculateGebaeudeheizlast(
      heizlastGebaeudetyp,
      gebaeudeStandard,
      gebaeudeNutzflaeche
    ) / konstanten.maximalLeistungHeizfenster
  );
}

function calculateMinimaleAnzahlHeizfenster(
  heizlastGebaeudetyp,
  gebaeudeStandard,
  gebaeudeNutzflaeche,
  anzahlBeheizterRaeume,
  groesseHeizfenster
) {
  let minimaleFlaecheHeizfenster = calculateMinimaleGesamtflaecheHeizfenster(
    heizlastGebaeudetyp,
    gebaeudeStandard,
    gebaeudeNutzflaeche
  );
  let anzahlNachGroesse = Math.ceil(
    minimaleFlaecheHeizfenster / groesseHeizfenster
  );
  return Math.max(anzahlBeheizterRaeume, anzahlNachGroesse, 0);
}

const calculator = {
  calculateGebaeudeheizlast,
  calculateMinimaleGesamtflaecheHeizfenster,
  calculateMinimaleAnzahlHeizfenster,
};

export default calculator;
