import konstanten from '../../konstanten.js';
import sumAllArrayValues from './support/additionArrayRechner.js';

//PvErtrag pro Jahr und Bundesland bei 40 Grad Südausrichtung
function calculatePvErtrag(bundesland, installiertePVLeistung) {
  return sumAllArrayValues(
    calculatePvErtragMonatlich(bundesland, installiertePVLeistung)
  );
}

function calculatePvErtragMonatlich(bundesland, installiertePVLeistung) {
  let pvErtragBundesland = [];
  for (let i = 0; i < 12; i++) {
    pvErtragBundesland[i] =
      konstanten.pvErtraege[bundesland.toLowerCase()][i] *
      installiertePVLeistung;
  }
  return pvErtragBundesland;
}

const calculator = {
  calculatePvErtrag,
  calculatePvErtragMonatlich,
  calculatePvErtragNutzereingabe,
};

export default calculator;

//PvErtrag pro Jahr bei Nutzereingabe des PvErtrags pro Monat
function calculatePvErtragNutzereingabe(pvErtragNutzereingabeArray) {
  let pvErtragGesamt = 0;
  for (var i = 0; i < pvErtragNutzereingabeArray.length; i++) {
    pvErtragGesamt += pvErtragNutzereingabeArray[i];
  }
  return pvErtragGesamt;
}
