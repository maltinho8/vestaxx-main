import konstanten from '../../konstanten.js';
import sumAllArrayValues from './support/additionArrayRechner.js';
import faktorNennkapazitaetRechner from './support/faktorNennkapazitaetRechner.js';

function calculateGespeicherterEigenstromJaehrlich(pvErtrag) {
  //Berechnung, wie sie in der "alten" Doku stand: Addition der monatlichen Werte
  //return sumAllArrayValues(calculateGespeicherterEigenstromMonatlich(monatlicheStrombedarfe, monatlichePvErtraege, monatlicheDirekteEigenstromNutzung, iesnMonatlicheWerte));
  if (1 >= konstanten.nennkapazitaetStromspeicher <= 50) {
    return (
      faktorNennkapazitaetRechner.calculateFaktorNennkapazitaet(
        konstanten.nennkapazitaetStromspeicher
      ) * pvErtrag
    );
  }
  return 0;
}

//Es wird ein Array mit allen monatlichen Werten des gespeicherten Eigenstroms zurückgegeben. Mit sumAllArrayValues können die Ergebnisse falls erforderlich, addiert werden
function calculateGespeicherterEigenstromMonatlich(
  monatlicheStrombedarfe,
  monatlichePvErtraege,
  monatlicheDirekteEigenstromNutzung,
  iesnMonatlicheWerte
) {
  if (1 >= konstanten.nennkapazitaetStromspeicher <= 50) {
    let gesamtPvErtrag = sumAllArrayValues(monatlichePvErtraege);
    let gespeicherterEigenstrom = [];
    for (let i = 0; i < iesnMonatlicheWerte.length; i++) {
      gespeicherterEigenstrom[i] = calculateGespeicherterEigenstromProMonat(
        gesamtPvErtrag,
        iesnMonatlicheWerte[i],
        monatlicheDirekteEigenstromNutzung[i],
        monatlichePvErtraege[i],
        monatlicheStrombedarfe[i]
      );
    }
    return gespeicherterEigenstrom;
  }
  //Was soll passieren, wenn Nennkapazität außerhalb der Grenzen liegt?
  return 0;
}

function calculateGespeicherterEigenstromProMonat(
  gesamtPvErtrag,
  iesn,
  direkteEigenstromNutzung,
  pvErtrag,
  monatlicherStrombedarf
) {
  let potenzielleSpeicherMenge =
    faktorNennkapazitaetRechner.calculateFaktorNennkapazitaet(
      konstanten.nennkapazitaetStromspeicher
    ) *
    gesamtPvErtrag *
    (iesn / 100);
  let gesamtStrommenge = potenzielleSpeicherMenge + direkteEigenstromNutzung;
  if (gesamtStrommenge >= pvErtrag) {
    //negativer Wert bei Speicherung --> Netzbezug nötig
    return pvErtrag - direkteEigenstromNutzung;
  }
  if (gesamtStrommenge >= monatlicherStrombedarf) {
    //positiver Wert bei Speicherung --> Überschuss
    return monatlicherStrombedarf - direkteEigenstromNutzung;
  }
  return potenzielleSpeicherMenge;
}

const calculator = {
  calculateGespeicherterEigenstromProMonat,
  calculateGespeicherterEigenstromMonatlich,
  calculateGespeicherterEigenstromJaehrlich,
};

export default calculator;
