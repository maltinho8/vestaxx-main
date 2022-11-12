import konstanten from "../../konstanten.js";

function calculateDirekteEigenstromNutzungJaehrlich(gesamtStrombedarf, gesamtPvErtrag) {
    if (calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(gesamtStrombedarf, gesamtPvErtrag)) {
        return calculateMengeDirekteEigenstromNutzungAusAnteil(gesamtPvErtrag, gesamtStrombedarf, calculateAnteilAnStromverbrauch(gesamtStrombedarf, gesamtPvErtrag));
    }
    return 0;
}

function calculateDirekteEigenstromNutzungMonatlich(direkteEigenstromNutzung, desn) {
    let direkteEigentstromNutzungMonatlich = [];
    for (let i = 0; i < 12; i++) {
        direkteEigentstromNutzungMonatlich[i] = direkteEigenstromNutzung * (desn[i] / 100)
    }
    return direkteEigentstromNutzungMonatlich;
}

function calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(gesamtStrombedarf, gesamtPvErtrag) {
    if (gesamtStrombedarf < 1000) {
        //Meldung "Gesamtstrombedarf zu gering!"
        return false;
    }
    if (gesamtStrombedarf > 15000) {
        //Meldung "Gesamtstrombedarf zu groß!"
        return false;
    }
    if (gesamtPvErtrag < 1086) {
        //Meldung "PvErtrag zu gering!"
        return false;
    }
    //Diese Bedingung kann nach Rücksprache mit Niklas gestrichen werden
    /* if (gesamtPvErtrag > 10049) {
         //Meldung "PvErtrag zu groß!"
         return false;
     }*/
    return true;
}

function calculateMengeDirekteEigenstromNutzungAusAnteil(pvStromErtrag, gesamtStrombedarf, anteilDirektNutzung) {
    if (gesamtStrombedarf != null && pvStromErtrag != null) {
        return anteilDirektNutzung / 100 * pvStromErtrag;
    }
    return 0;
}

function calculateAnteilAnStromverbrauch(gesamtStromVerbrauch, pvErtrag) {
    let anteileTabelle = konstanten.anteileTabelle;
    let pvErtragGrenzen = konstanten.pvErtragGrenzen;
    let stromVerbrauchGrenzen = konstanten.stromVerbrauchGrenzen;
    let spaltennummer = findNextSmallerValue(pvErtrag, pvErtragGrenzen);
    let zeilennummer = findNextSmallerValue(gesamtStromVerbrauch, stromVerbrauchGrenzen);
    let indexSpaltennummer = ermittleNeuenIndex(spaltennummer, 9);
    let indexZeilennummer = ermittleNeuenIndex(zeilennummer, 12);
    let kleinererErtragKleinererVerbrauch = anteileTabelle[indexZeilennummer][indexSpaltennummer];
    let kleinererErtragGroessererVerbrauch = anteileTabelle[indexZeilennummer + 1][indexSpaltennummer];
    let groessererErtragKleinererVerbrauch = anteileTabelle[indexZeilennummer][indexSpaltennummer + 1];
    let groessererErtragGroessererVerbrauch = anteileTabelle[indexZeilennummer + 1][indexSpaltennummer + 1];
    let naechstKleinererErtrag = pvErtragGrenzen[indexSpaltennummer];
    let naechstGroessererErtrag = pvErtragGrenzen[indexSpaltennummer + 1];
    let naechstKleinererVerbrauch = stromVerbrauchGrenzen[indexZeilennummer]
    let naechstGroessererVerbrauch = stromVerbrauchGrenzen[indexZeilennummer + 1];
    let abschaetzungErtragKleinerVerbauch = kleinererErtragKleinererVerbrauch + ((groessererErtragKleinererVerbrauch - kleinererErtragKleinererVerbrauch) / (naechstGroessererErtrag - naechstKleinererErtrag)) * (pvErtrag - naechstKleinererErtrag);
    let abschaetzungErtragGrosserVerbrauch = kleinererErtragGroessererVerbrauch + ((groessererErtragGroessererVerbrauch - kleinererErtragGroessererVerbrauch) / (naechstGroessererErtrag - naechstKleinererErtrag)) * (pvErtrag - naechstKleinererErtrag);
    return abschaetzungErtragKleinerVerbauch + ((abschaetzungErtragGrosserVerbrauch - abschaetzungErtragKleinerVerbauch) / (naechstGroessererVerbrauch - naechstKleinererVerbrauch)) * (gesamtStromVerbrauch - naechstKleinererVerbrauch);
}

function ermittleNeuenIndex(alterIndex, obergrenze) {
    if (alterIndex === obergrenze) {
        return obergrenze - 1;
    }
    return alterIndex;
}

function findNextSmallerValue(wert, array) {
    if (wert < array[0]) {
        return 0;
    }
    for (let i = 0; i < array.length; i++) {
        if (wert >= array[i] && wert < array[i + 1]) {
            return i;
        }
    }
    return array.length - 1;
}

const calculator = {
    calculateMengeDirekteEigenstromNutzungAusAnteil,
    calculateVorbedingungenDirekteEigenstromNutzungJaehrlich,
    calculateAnteilAnStromverbrauch,
    calculateDirekteEigenstromNutzungJaehrlich,
    calculateDirekteEigenstromNutzungMonatlich
};

export default calculator;
