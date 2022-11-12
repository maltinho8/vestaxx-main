import defaultValues from "../../defaultValues.js";
import konstanten from "../../konstanten.js";
import netzbezugRechner from "./netzbezugRechner.js";
import eigenstromNutzungsRechner from "./eigenstromNutzungsRechner.js";
import direkteEigenstromNutzungsRechner from "./direkteEigenstromNutzungsRechner.js";
import pvErtragsRechner from "./pvErtragsRechner.js";
import strombedarfsRechner from "./strombedarfsRechner.js";
import gespeicherterEigenstromRechner from "./gespeicherterEigenstromRechner.js";
import einspeiseVerguetungRechner from "./einspeiseVerguetungRechner.js";
import heizwaermebedarfRechner from "./heizwaermebedarfRechner.js";
import twwBedarfRechner from "./twwBedarfRechner.js";
import erdgasRechner from "./erdgasRechner.js";
import kostenRechner from "./kostenrechner.js";
import installiertePvLeistungRechner from "./installiertePvLeistungRechner.js";
import co2Emissionenrechner from "./co2Emissionenrechner.js";
import heizfensterBedarfRechner from "./heizfensterBedarfRechner.js";

const inputNames = ["bundesland",
    "gebaeudeNutzflaeche",
    "anzahlBeheizterRaeume",
    "bewohnerAnzahl",
    "etagenAnzahl",
    "gebaeudeStandard",
    "heizwaermebedarfProQM",
    "gebaeudeheizlast",
    "heizfensterTyp",
    "twwBereitstellung",
    "installiertePVLeistung",
    //"pvErtragMonatlich",
    "pvOrientierung",
    "pvNeigung",
    "pvMontage",
    "pvTechnologie",
    "nennkapazitaetStromspeicher",
    "anrechnungPvEinspeisung",
    "strompreisProKWh",
    "einspeiseverguetung",
    "erdgaspreis",
    "groesseHeizfenster",
    "pvErtragNutzereingabeArray",
    "pvErtragGesamt"  ]

//zu errichtendes Gebäude mit Heizfenstern

function calculateAllResults(input) {
    return {
        gesamtPrimaerEnergieBedarfHeizfensterProQm: calculateGesamtPrimaerEnergieBedarfHeizfensterProQm(input),
        gesamtPrimaerEnergieBedarfHeizfenster: calculateGesamtPrimaerEnergieBedarfHeizfenster(input),
        investitionHeizfensterSystem: calculateInvestitionHeizfensterSystem(input),
        gesamtStromkostenHeizfenster: calculateGesamtStromkostenHeizfenster(input),
        einspeiseVerguetungHeizfenster: calculateEinspeiseVerguetungHeizfenster(input),
        gesamtAnnuitaetHeizfensterOhneAnrechnung: calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input),
        gesamtAnnuitaetHeizfensterMitAnrechnung: calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input),
        substituiertePrimaerEnergieHeizfensterProQM : calculateSubstituiertePrimaerEnergieHeizfensterProQM(input),
        co2Heizfenster: calculateCo2Heizfenster(input),
        co2SubstituiertHeizfenster: calculateSubstituierteCo2EmissionenHeizfenster(input),
        investitionErgasBwSystem: calculateInvestitionErdgasBwSystem(input),
        gesamtEnergiekostenErgasBwSystem: calculateGesamtEnergiekostenErdgasBwSystem(input),
        gesamtAnnuitaetErgasBwSystem: calculateGesamtannuitaetErdgasBwSystem(input),
        gesamtPrimaerenergiebedarfErdgasBwSystemProQm: calculateGesamtPrimaerenergiebedarfErdgasBwSystemProQm(input),
        co2ErdgasBwSystem: calculateCo2ErdgasBwNormal(input),
        investitionWaermepumpenSystem: calculateInvestitionWaermepumpenSystem(input),
        gesamtEnergiekostenWaermepumpenSystem: calculateGesamtEnergieKostenWaermepumpenSystem(input),
        gesamtAnnuitaetWaermepumpenSystem: calculateGesamtAnnuitaetWaermepumpenSystem(input),
        gesamtPrimaerenergiebedarfWaermepumpenSystemProQm: calculateGesamtPrimaerenergiebedarfWaermepumpenSystemProQm(input),
        co2Waermepumpensystem: calculateCo2Waermepumpe(input),
        investitionSwWaermepumpenSystem: calculateInvestitionSwWaermepumpenSystem(input),
        gesamtEnergiekostenSwWaermepumpenSystem: calculateGesamtEnergieKostenSwWaermepumpenSystem(input),
        gesamtAnnuitaetSwWaermepumpenSystem: calculateGesamtAnnuitaetSwWaermepumpenSystem(input),
        gesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm: calculateGesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm(input),
        co2SwWaermepumpenSystem: calculateCo2Erdwaermepumpe(input),
        investitionHolzpelletSystem: calculateInvestitionHolzpelletSystem(input),
        gesamtEnergiekostenHolzpelletSystem: calculateGesamtEnergieKostenHolzpelletSystem(input),
        gesamtAnnuitaetHolzpelletSystem: calculateGesamtAnnuitaetHolzpelletSystem(input),
        gesamtPrimaerenergiebedarfHolzpelletSystemProQm: calculateGesamtPrimaerenergiebedarfHolzpelletSystemProQm(input),
        co2HolzpelletSystem: calculateCo2Holzpellet(input),
        einsparungPrimaerEnergieOhneAnrechnungGegReferenzgebaeude: calculateEinsparungPrimaerEnergieOhneAnrechnungGegReferenzgebaeude(input),
        co2GegReferenzsystem: calculateCo2ErdgasBwGEG(input),
        einsparungCo2AeqEmissionenOhneAnrechnungGegReferenzgebaeude: calculateEinsparungCo2AeqEmissionenOhneAnrechnungGegReferenzgebaeude(input),
        einsparungPrimaerEnergieMitAnrechnungGegReferenzgebaeude: calculateEinsparungPrimaerEnergieMitAnrechnungGegReferenzgebaeude(input),
        einsparungCo2AeqEmissionenMitAnrechnungGegReferenzgebaeude: calculateEinsparungCo2AeqEmissionenMitAnrechnungGegReferenzgebaeude(input),
        prognoseGegAnforderungenGegReferenzgebaeudePotsdam: calculatePrognoseGegAnforderungenGegReferenzgebaeudePotsdam(input),
        prognoseKfwStandardGegReferenzgebaeudePotsdam: calculatePrognoseKfwStandardGegReferenzgebaeudePotsdam(input),

        //Absolute Werte für CO2 Emissionen
        Co2Heizfenster: calculateCo2Heizfenster(input),
        Co2HeizfensterAnrechnung: calculateCo2HeizfensterAnrechnung(input),
        Co2ErdgasBwGEG: calculateCo2ErdgasBwGEG(input),
        Co2ErdgasBwNormal: calculateCo2ErdgasBwNormal(input),
        Co2Erdwärmepumpe: calculateCo2Erdwaermepumpe(input),
        gesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm: calculateGesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm(input),
        Co2Holzpellet: calculateCo2Holzpellet(input),
        Co2Wärmepumpe: calculateCo2Waermepumpe(input),

        //nachträglich hinzugefügt Erdgasbw
        einsparungPrimaerEnergieOhneAnrechnungErdgasBw: calculateEinsparungPrimaerEnergieOhneAnrechnungErdgasBw(input),
        einsparungCo2AeqEmissionenOhneAnrechnungErdgasBw: calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdgasBw(input),
        einsparungPrimaerEnergieMitAnrechnungErdgasBw: calculateEinsparungPrimaerEnergieMitAnrechnungErdgasBw(input),
        einsparungCo2AeqEmissionenMitAnrechnungErdgasBw: calculateEinsparungCo2AeqEmissionenMitAnrechnungErdgasBw(input),

        reduzierungGesamtAnnuitaetOhneAnrechnungErdgasBw: calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdgasBw(input),
        reduzierungGesamtAnnuitaetMitAnrechnungErdgasBw: calculateReduzierungGesamtAnnuitaetMitAnrechnungErdgasBw(input),
        einsparungPrimaerEnergieOhneAnrechnungWaermepumpe: calculateEinsparungPrimaerEnergieOhneAnrechnungWaermepumpe(input),
        einsparungCo2AeqEmissionenOhneAnrechnungWaermepumpe: calculateEinsparungCo2AeqEmissionenOhneAnrechnungWaermepumpe(input),
        einsparungPrimaerEnergieMitAnrechnungWaermepumpe: calculateEinsparungPrimaerEnergieMitAnrechnungWaermepumpe(input),
        einsparungCo2AeqEmissionenMitAnrechnungWaermepumpe: calculateEinsparungCo2AeqEmissionenMitAnrechnungWaermepumpe(input),
        reduzierungGesamtAnnuitaetOhneAnrechnungWaermepumpe: calculateReduzierungGesamtAnnuitaetOhneAnrechnungWaermepumpe(input),
        reduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe: calculateReduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe(input),
        einsparungPrimaerEnergieOhneAnrechnungErdwaermepumpe: calculateEinsparungPrimaerEnergieOhneAnrechnungErdwaermepumpe(input),
        einsparungCo2AeqEmissionenOhneAnrechnungErdwaermepumpe: calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdwaermepumpe(input),
        einsparungPrimaerEnergieMitAnrechnungErdwaermepumpe: calculateEinsparungPrimaerEnergieMitAnrechnungErdwaermepumpe(input),
        einsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe: calculateEinsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe(input),
        reduzierungGesamtAnnuitaetOhneAnrechnungErdwaermepumpe: calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdwaermepumpe(input),
        reduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe: calculateReduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe(input),
        einsparungPrimaerEnergieOhneAnrechnungHolzpellet: calculateEinsparungPrimaerEnergieOhneAnrechnungHolzpellet(input),
        einsparungCo2AeqEmissionenOhneAnrechnungHolzpellet: calculateEinsparungCo2AeqEmissionenOhneAnrechnungHolzpellet(input),
        einsparungPrimaerEnergieMitAnrechnungHolzpellet: calculateEinsparungPrimaerEnergieMitAnrechnungHolzpellet(input),
        einsparungCo2AeqEmissionenMitAnrechnungHolzpellet: calculateEinsparungCo2AeqEmissionenMitAnrechnungHolzpellet(input),
        reduzierungGesamtAnnuitaetOhneAnrechnungHolzpellet: calculateReduzierungGesamtAnnuitaetOhneAnrechnungHolzpellet(input),
        reduzierungGesamtAnnuitaetMitAnrechnungHolzpellet: calculateReduzierungGesamtAnnuitaetMitAnrechnungHolzpellet(input)
    }
}

//Heizfenster

function calculateGesamtPrimaerEnergieBedarfHeizfensterProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);

    return calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateGesamtPrimaerEnergieBedarfHeizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const netzbezug = berechneJaehrlichenNetzbezugHeizfenster(aktualisierterInput)

    return konstanten.primaerEnergieFaktorStrom * netzbezug;

    //Berechnung des gesamt gespeicherten Eigenstroms nach "alter" Berechnung (basierend auf monatlichen Werten)
    /*let monatlicheStrombedarfe = strombedarfsRechner.calculateGesamtStrombedarfMonatlich(aktualisierterInput.heizfensterTyp, aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche, aktualisierterInput.bewohnerAnzahl);
    let monatlichePvErtraege = pvErtragsRechner.calculatePvErtragMonatlich(aktualisierterInput.bundesland, aktualisierterInput.installiertePVLeistung);
    let monatlicheDirekteEigenstromNutzung = direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungMonatlich(direktGenutzterEigenstrom, konstanten.monatlicherDesn);
    let iesnMonatlicheWerte = konstanten.monatlicherIesn;
    let gespeicherterEigenstrom = gespeicherterEigenstromRechner.calculateGespeicherterEigenstromJaehrlich(monatlicheStrombedarfe, monatlichePvErtraege, monatlicheDirekteEigenstromNutzung,iesnMonatlicheWerte);*/
}

function calculateInvestitionHeizfensterSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtflaecheHeizfenster = heizfensterBedarfRechner.calculateMinimaleGesamtflaecheHeizfenster(aktualisierterInput.gebaeudeheizlast, aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const anzahlHeizfenster = heizfensterBedarfRechner.calculateMinimaleAnzahlHeizfenster(aktualisierterInput.gebaeudeheizlast, aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche, aktualisierterInput.anzahlBeheizterRaeume, aktualisierterInput.groesseHeizfenster);

    return kostenRechner.calculateInvestitionskostenHeizfenstersystem(gesamtflaecheHeizfenster, anzahlHeizfenster, aktualisierterInput.installiertePVLeistung, aktualisierterInput.nennkapazitaetStromspeicher);
}

function calculateGesamtStromkostenHeizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const netzbezug = berechneJaehrlichenNetzbezugHeizfenster(aktualisierterInput);

    return kostenRechner.calculateStromkosten(netzbezug, aktualisierterInput.strompreisProKWh);
}

function calculateEinspeiseVerguetungHeizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPvErtrag = aktualisierterInput.pvErtragGesamt;

    const gesamtEigenstromnutzung = berechneGesamtEigenstromNutzung(aktualisierterInput)

    return einspeiseVerguetungRechner.calculateEinspeiseVerguetung(gesamtPvErtrag, gesamtEigenstromnutzung, aktualisierterInput.einspeiseverguetung);
}

function calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input) {
    const investitionskosten = calculateInvestitionHeizfensterSystem(input);

    const stromkosten = calculateGesamtStromkostenHeizfenster(input);

    return kostenRechner.calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(investitionskosten, stromkosten);
}

function calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const investitionskosten = calculateInvestitionHeizfensterSystem(aktualisierterInput);

    const stromkosten = calculateGesamtStromkostenHeizfenster(aktualisierterInput);

    const pvStromueberschussProJahr = berechnePvStromUeberschuss(aktualisierterInput);

    return kostenRechner.calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(investitionskosten, stromkosten, aktualisierterInput.einspeiseverguetung, pvStromueberschussProJahr);
}

function calculateCo2Heizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return co2Emissionenrechner.calculateCO2Strom(berechneJaehrlichenNetzbezugHeizfenster(aktualisierterInput));
}

function calculateSubstituierteCo2EmissionenHeizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);
    const pvStromueberschussProJahr = berechnePvStromUeberschuss(aktualisierterInput);
    return pvStromueberschussProJahr * konstanten.co2ProKWhStrom * (aktualisierterInput.anrechnungPvEinspeisung / 100);
}

//GEG-Referenzgebäude
//TODO: zur Api hinzufügen
function calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput) {
    const gesamtErdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, "GEG-Referenzgebäude");

    return gesamtErdgasbedarf * konstanten.primaerenergiefaktorGas + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom;
}

//TODO: zur Api hinzufügen
function calculateCo2ErdgasBwGEG(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtErdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, "GEG-Referenzgebäude");

    const gesamtStrombedarfHaushalt = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return co2Emissionenrechner.calculateCO2Strom(gesamtStrombedarfHaushalt) + co2Emissionenrechner.calculateCO2Erdgas(gesamtErdgasbedarf);
}

//zu errichtendes Gebäude mit Erdgas-BW-System

function calculateInvestitionErdgasBwSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    return kostenRechner.calculateInvestitionskostenErdgasBWSystem(aktualisierterInput.anzahlBeheizterRaeume);
}

function calculateGesamtEnergiekostenErdgasBwSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const erdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard)

    const erdgaskosten = kostenRechner.calculateErdgasKosten(erdgasbedarf, aktualisierterInput.erdgaspreis)

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    const stromkosten = kostenRechner.calculateStromkosten(haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);

    return erdgaskosten + stromkosten;
}

function calculateGesamtannuitaetErdgasBwSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const erdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard);

    const erdgaskosten = kostenRechner.calculateErdgasKosten(erdgasbedarf, aktualisierterInput.erdgaspreis);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    const stromkosten = kostenRechner.calculateStromkosten(haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);

    return kostenRechner.calculateGesamtannuitaetErdgasBW(aktualisierterInput.anzahlBeheizterRaeume, erdgaskosten, stromkosten);
}

function calculateGesamtPrimaerenergiebedarfErdgasBwSystemProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) / aktualisierterInput.gebaeudeNutzflaeche;
    const erdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard) / aktualisierterInput.gebaeudeNutzflaeche;

    return haushaltsstrombedarf * konstanten.primaerEnergieFaktorStrom + erdgasbedarf * konstanten.primaerenergiefaktorGas;
}

//TODO: zur Api hinzufügen
function calculateCo2ErdgasBwNormal(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtErdgasbedarf = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard);

    const gesamtStrombedarfHaushalt = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return co2Emissionenrechner.calculateCO2Strom(gesamtStrombedarfHaushalt) + co2Emissionenrechner.calculateCO2Erdgas(gesamtErdgasbedarf);
}

//zu errichtendes Gebäude mit Wärmepumpen-System

//TODO: zur Api hinzufügen
function calculateGesamtPrimaerEnergiebedarfWaermepumpe(aktualisierterInput) {
    const energieBedarfHeizenTww = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.twwwpfaktor);

    return energieBedarfHeizenTww * konstanten.primaerEnergieFaktorStrom + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom
}

function calculateInvestitionWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    return kostenRechner.calculateInvestitionskostenWaermepumpenSystem(aktualisierterInput.gebaeudeNutzflaeche);
}

function calculateGesamtEnergieKostenWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtEnergiekostenWaermepumpenSystem(twwBedarf, heizwaermebedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtAnnuitaetWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtAnnuitaetWaermepumpenSystem(aktualisierterInput.gebaeudeNutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtPrimaerenergiebedarfWaermepumpenSystemProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return calculateGesamtPrimaerEnergiebedarfWaermepumpe(input) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateCo2Waermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const strombedarfHaushalt = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    const gesamtStrombedarf = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.twwwpfaktor) + strombedarfHaushalt;

    return co2Emissionenrechner.calculateCO2Strom(gesamtStrombedarf);
}

//zu errichtendes Gebäude mit Sole-Wasser-Wärmepumpen-System

//TODO: zur Api hinzufügen
function calculateGesamtPrimaerEnergiebedarfErdwaermePumpe(aktualisierterInput) {
    const energieBedarfHeizenTww = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.twwewfaktor);

    return energieBedarfHeizenTww * konstanten.primaerEnergieFaktorStrom + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom;
}

function calculateInvestitionSwWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    return kostenRechner.calculateInvestitionskostenSwWaermepumpenSystem(aktualisierterInput.gebaeudeNutzflaeche);
}

function calculateGesamtEnergieKostenSwWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtEnergieKostenSwWaermepumpenSystem(heizwaermebedarf, twwBedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtAnnuitaetSwWaermepumpenSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtAnnuitaetSwWaermepumpenSystem(aktualisierterInput.gebaeudeNutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return calculateGesamtPrimaerEnergiebedarfErdwaermePumpe(aktualisierterInput) / aktualisierterInput.gebaeudeNutzflaeche;
}

//TODO: zur Api hinzufügen
function calculateCo2Erdwaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const strombedarfHaushalt = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    const gesamtStrombedarf = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.twwewfaktor) + strombedarfHaushalt;

    return co2Emissionenrechner.calculateCO2Strom(gesamtStrombedarf);
}

//zu errichtendes Gebäude mit Holzpellet-System

//TODO: zur Api hinzufügen
function calculateGesamtPrimaerEnergiebedarfHolzpellets(aktualisierterInput) {
    const energieBedarfHeizenTww = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.aufwandzahlholzpellets)

    return energieBedarfHeizenTww * konstanten.primaerEnergieFaktorHolzpellets + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom;
}

function calculateInvestitionHolzpelletSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    return kostenRechner.calculateInvestitionskostenHolzpelletSystem(aktualisierterInput.gebaeudeNutzflaeche);
}

function calculateGesamtEnergieKostenHolzpelletSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtEnergiekostenHolzpelletSystem(heizwaermebedarf, twwBedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtAnnuitaetHolzpelletSystem(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const haushaltsstrombedarf = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return kostenRechner.calculateGesamtannuitaetHolzpelletSystem(aktualisierterInput.gebaeudeNutzflaeche, heizwaermebedarf, twwBedarf, haushaltsstrombedarf, aktualisierterInput.strompreisProKWh);
}

function calculateGesamtPrimaerenergiebedarfHolzpelletSystemProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return calculateGesamtPrimaerEnergiebedarfHolzpellets(aktualisierterInput) / aktualisierterInput.gebaeudeNutzflaeche;
}

//TODO: zur Api hinzufügen
function calculateCo2Holzpellet(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const energiebedarfHeizenUndTww = berechneEnergiebedarfHeizenUndTww(aktualisierterInput, konstanten.aufwandzahlholzpellets);

    const strombedarfHaushalt = strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl);

    return co2Emissionenrechner.calculateCO2Strom(strombedarfHaushalt) + co2Emissionenrechner.calculateCO2Holzpellet(energiebedarfHeizenUndTww);
}

//Heizfenster vs. GEG-Referenzgebäude
function calculateGesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm(input) {
    const aktualisierterInput = setUpInputWerte(input);
    const gesamtPrimaerEnergieGegReferenzgebaeude = calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput);
    return gesamtPrimaerEnergieGegReferenzgebaeude / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungPrimaerEnergieOhneAnrechnungGegReferenzgebaeude(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergieHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const gesamtPrimaerEnergieGegReferenzgebaeude = calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput);

    return (gesamtPrimaerEnergieGegReferenzgebaeude - gesamtPrimaerEnergieHeizfenster) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungPrimaerEnergieMitAnrechnungGegReferenzgebaeude(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergieHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const substituiertePrimaerEnergie = calculateSubstituiertePrimaerEnergieHeizfenster(aktualisierterInput);

    const gesamtPrimaerEnergieGegReferenzgebaeude = calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput);

    return (gesamtPrimaerEnergieGegReferenzgebaeude - (gesamtPrimaerEnergieHeizfenster - substituiertePrimaerEnergie)) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenMitAnrechnungGegReferenzgebaeude(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2ErdgasBwSystem = calculateCo2ErdgasBwGEG(aktualisierterInput);

    const gesamtSubstuierteCo2Emissionen = calculateCo2HeizfensterAnrechnung(aktualisierterInput);

    return gesamtCo2ErdgasBwSystem - (gesamtCo2Heizfenstersystem - gesamtSubstuierteCo2Emissionen);
}

function calculateEinsparungCo2AeqEmissionenOhneAnrechnungGegReferenzgebaeude(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2ErdgasBwSystem = calculateCo2ErdgasBwGEG(aktualisierterInput);

    return gesamtCo2ErdgasBwSystem - gesamtCo2Heizfenstersystem;
}

//Prognose GEG Anforderungen mit Netzbezug aus normativer Vergleichrechnung für Potsdam
function calculatePrognoseGegAnforderungenGegReferenzgebaeudePotsdam(input) {

    let aktualisierterInput = setUpInputWerte(input);  
    let gesamtPrimaerEnergiebedarfEinsparrecht = berechnePrimaerEnergiebedarfNormativeVergleichsrechnung(aktualisierterInput);
    let gesamtPrimaerEnergiebedarfGEGReferenz=calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput);
    let gesamtEinsparungPrimaerEnergiebedarf=gesamtPrimaerEnergiebedarfGEGReferenz-gesamtPrimaerEnergiebedarfEinsparrecht;
    return gesamtEinsparungPrimaerEnergiebedarf>0;
}

//Prognose KfW standard mit Netzbezug aus normativer Vergleichrechnung für Potsdam
function calculatePrognoseKfwStandardGegReferenzgebaeudePotsdam(input) {

    let aktualisierterInput = setUpInputWerte(input);  
    let gesamtPrimaerEnergiebedarfEinsparrecht = berechnePrimaerEnergiebedarfNormativeVergleichsrechnung(aktualisierterInput);
    let gesamtPrimaerEnergiebedarfGEGReferenz=calculateGesamtPrimaerEnergieGegReferenzgebaeude(aktualisierterInput);
    let gesamtEinsparungPrimaerEnergiebedarf=gesamtPrimaerEnergiebedarfGEGReferenz-gesamtPrimaerEnergiebedarfEinsparrecht;

    if(aktualisierterInput.gebaeudeStandard=="KfW 55")
        {
            if(gesamtEinsparungPrimaerEnergiebedarf<=(gesamtPrimaerEnergiebedarfGEGReferenz*0.55)) {return true;} else{return false;};
        }


    if(aktualisierterInput.gebaeudeStandard=="KfW 40")
        {
            if(gesamtEinsparungPrimaerEnergiebedarf<=(gesamtPrimaerEnergiebedarfGEGReferenz*0.4)) {return true;} else{return false;};
        }
    else
        {
            return false;
        }
}





//Heizfenster vs. Erdgas-Bw-System

function calculateEinsparungPrimaerEnergieOhneAnrechnungErdgasBw(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergieHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const gesamtPrimaerEnergieErdgasBw = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard) * konstanten.primaerenergiefaktorGas + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom;

    return (gesamtPrimaerEnergieErdgasBw - gesamtPrimaerEnergieHeizfenster) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdgasBw(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2ErdgasBwSystem = calculateCo2ErdgasBwNormal(aktualisierterInput);

    return gesamtCo2ErdgasBwSystem - gesamtCo2Heizfenstersystem;
}

function calculateEinsparungPrimaerEnergieMitAnrechnungErdgasBw(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergieHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const substituiertePrimaerEnergie = calculateSubstituiertePrimaerEnergieHeizfenster(aktualisierterInput);

    const gesamtPrimaerEnergieErdgasBw = berechneGesamtErdgasBedarf(aktualisierterInput, aktualisierterInput.gebaeudeStandard) * konstanten.primaerenergiefaktorGas + strombedarfsRechner.calculateStrombedarfHaushalt(aktualisierterInput.bewohnerAnzahl) * konstanten.primaerEnergieFaktorStrom;

    return (gesamtPrimaerEnergieErdgasBw - (gesamtPrimaerEnergieHeizfenster - substituiertePrimaerEnergie)) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenMitAnrechnungErdgasBw(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2ErdgasBwSystem = calculateCo2ErdgasBwNormal(aktualisierterInput);

    const gesamtSubstuierteCo2Emissionen = calculateCo2HeizfensterAnrechnung(aktualisierterInput);

    return gesamtCo2ErdgasBwSystem - (gesamtCo2Heizfenstersystem - gesamtSubstuierteCo2Emissionen);
}

function calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdgasBw(input) {
    const gesamtannuitaetErdgasBW = calculateGesamtannuitaetErdgasBwSystem(input);

    const gesamtannuitaetHeizfenster = calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input);

    return gesamtannuitaetErdgasBW - gesamtannuitaetHeizfenster;
}

function calculateReduzierungGesamtAnnuitaetMitAnrechnungErdgasBw(input) {
    const gesamtannuitaetErdgasBW = calculateGesamtannuitaetErdgasBwSystem(input);

    const gesamtannuitaetHeizfenster = calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input);

    return gesamtannuitaetErdgasBW - gesamtannuitaetHeizfenster;
}

//Heizfenster vs. Wärmepumpen-System
function calculateEinsparungPrimaerEnergieOhneAnrechnungWaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerenergieBedarfWaermepumpe = calculateGesamtPrimaerEnergiebedarfWaermepumpe(aktualisierterInput);

    const gesamtPrimaerenergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    return (gesamtPrimaerenergieBedarfWaermepumpe - gesamtPrimaerenergieBedarfHeizfenster) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenOhneAnrechnungWaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Waermepumpe = calculateCo2Waermepumpe(aktualisierterInput);

    return gesamtCo2Waermepumpe - gesamtCo2Heizfenstersystem;
}


function calculateEinsparungPrimaerEnergieMitAnrechnungWaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerenergieBedarfWaermepumpe = calculateGesamtPrimaerEnergiebedarfWaermepumpe(aktualisierterInput);

    const gesamtPrimaerenergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const substituiertePrimaerEnergie = calculateSubstituiertePrimaerEnergieHeizfenster(aktualisierterInput);

    return (gesamtPrimaerenergieBedarfWaermepumpe - (gesamtPrimaerenergieBedarfHeizfenster - substituiertePrimaerEnergie)) / aktualisierterInput.gebaeudeNutzflaeche;
}


function calculateEinsparungCo2AeqEmissionenMitAnrechnungWaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Waermepumpe = calculateCo2Waermepumpe(aktualisierterInput);

    const gesamtSubstuierteCo2Emissionen = calculateCo2HeizfensterAnrechnung(aktualisierterInput);

    return gesamtCo2Waermepumpe - (gesamtCo2Heizfenstersystem - gesamtSubstuierteCo2Emissionen);
}

function calculateReduzierungGesamtAnnuitaetOhneAnrechnungWaermepumpe(input) {
    const gesamtannuitaetWaermepumpe = calculateGesamtAnnuitaetWaermepumpenSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input);

    return gesamtannuitaetWaermepumpe - gesamtannuitaetHeizfenstersystem;
}

function calculateReduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe(input) {
    const gesamtannuitaetWaermepumpe = calculateGesamtAnnuitaetWaermepumpenSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input);

    return gesamtannuitaetWaermepumpe - gesamtannuitaetHeizfenstersystem;
}

//Heizfenster vs. Erdwärmepumpen-System
function calculateEinsparungPrimaerEnergieOhneAnrechnungErdwaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergiebedarfErdwaermePumpe = calculateGesamtPrimaerEnergiebedarfErdwaermePumpe(aktualisierterInput, input);

    const gesamtPrimaerEnergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    return (gesamtPrimaerEnergiebedarfErdwaermePumpe - gesamtPrimaerEnergieBedarfHeizfenster) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdwaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Erdwaermepumpe = calculateCo2Erdwaermepumpe(aktualisierterInput)

    return gesamtCo2Erdwaermepumpe - gesamtCo2Heizfenstersystem;

}

function calculateEinsparungPrimaerEnergieMitAnrechnungErdwaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerenergieBedarfErdwaermepumpe = calculateGesamtPrimaerEnergiebedarfErdwaermePumpe(aktualisierterInput);

    const gesamtPrimaerenergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const substituiertePrimaerEnergie = calculateSubstituiertePrimaerEnergieHeizfenster(aktualisierterInput);

    return (gesamtPrimaerenergieBedarfErdwaermepumpe - (gesamtPrimaerenergieBedarfHeizfenster - substituiertePrimaerEnergie)) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Erdwaermepumpe = calculateCo2Erdwaermepumpe(aktualisierterInput)

    const gesamtSubstuierteCo2Emissionen = calculateCo2HeizfensterAnrechnung(aktualisierterInput);

    return gesamtCo2Erdwaermepumpe - (gesamtCo2Heizfenstersystem - gesamtSubstuierteCo2Emissionen);
}

function calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdwaermepumpe(input) {
    const gesamtannuitaetErdwaermepumpensystem = calculateGesamtAnnuitaetSwWaermepumpenSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input);

    return gesamtannuitaetErdwaermepumpensystem - gesamtannuitaetHeizfenstersystem;
}

function calculateReduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe(input) {
    const gesamtannuitaetErdwaermepumpensystem = calculateGesamtAnnuitaetSwWaermepumpenSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input);

    return gesamtannuitaetErdwaermepumpensystem - gesamtannuitaetHeizfenstersystem;
}

//Heizfenster vs. Holzpellet-System
function calculateEinsparungPrimaerEnergieOhneAnrechnungHolzpellet(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerEnergiebedarfHolzpellet = calculateGesamtPrimaerEnergiebedarfHolzpellets(aktualisierterInput);

    const gesamtPrimaerEnergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    return (gesamtPrimaerEnergiebedarfHolzpellet - gesamtPrimaerEnergieBedarfHeizfenster) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenOhneAnrechnungHolzpellet(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Holzpelletsystem = calculateCo2Holzpellet(aktualisierterInput)

    return gesamtCo2Holzpelletsystem - gesamtCo2Heizfenstersystem;
}

function calculateEinsparungPrimaerEnergieMitAnrechnungHolzpellet(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtPrimaerenergieBedarfHolzpellets = calculateGesamtPrimaerEnergiebedarfHolzpellets(aktualisierterInput);

    const gesamtPrimaerenergieBedarfHeizfenster = calculateGesamtPrimaerEnergieBedarfHeizfenster(aktualisierterInput);

    const substituiertePrimaerEnergie = calculateSubstituiertePrimaerEnergieHeizfenster(aktualisierterInput);

    return (gesamtPrimaerenergieBedarfHolzpellets - (gesamtPrimaerenergieBedarfHeizfenster - substituiertePrimaerEnergie)) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateEinsparungCo2AeqEmissionenMitAnrechnungHolzpellet(input) {
    const aktualisierterInput = setUpInputWerte(input);

    const gesamtCo2Heizfenstersystem = calculateCo2Heizfenster(aktualisierterInput);

    const gesamtCo2Holzpelletsystem = calculateCo2Holzpellet(aktualisierterInput)

    const gesamtSubstuierteCo2Emissionen = calculateCo2HeizfensterAnrechnung(aktualisierterInput);

    return gesamtCo2Holzpelletsystem - (gesamtCo2Heizfenstersystem - gesamtSubstuierteCo2Emissionen);
}

function calculateReduzierungGesamtAnnuitaetOhneAnrechnungHolzpellet(input) {
    const gesamtannuitaetHolzpelletsystem = calculateGesamtAnnuitaetHolzpelletSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung(input);

    return gesamtannuitaetHolzpelletsystem - gesamtannuitaetHeizfenstersystem;
}

function calculateReduzierungGesamtAnnuitaetMitAnrechnungHolzpellet(input) {
    const gesamtannuitaetHolzpelletsystem = calculateGesamtAnnuitaetHolzpelletSystem(input);

    const gesamtannuitaetHeizfenstersystem = calculateGesamtannuitaetHeizfenstersystemMitAnrechnung(input);

    return gesamtannuitaetHolzpelletsystem - gesamtannuitaetHeizfenstersystem;
}

//Hilfsfunktionen
function setUpInputWerte(input) {
    let defaultValuesKopie = JSON.parse(JSON.stringify(defaultValues));
    Object.entries(input).forEach(([key, value]) => {
        if (!checkInputName(key)) {
            return {};
        }
        defaultValuesKopie[key] = value
    });
    //Wenn installierte PV Leistung nicht eingegeben wurde, Berechnung anhand Dachfläche
    if (!("installiertePVLeistung" in defaultValuesKopie)) {
        defaultValuesKopie["installiertePVLeistung"] = installiertePvLeistungRechner.calculateInstalliertePVLeistung(defaultValuesKopie.gebaeudeNutzflaeche, defaultValuesKopie.etagenAnzahl);
    }

    // wenn Einspeisevergütung nicht gesetzt, setze Einspeisevergütung abhängig von installierter PV-Leistung
    if (!("einspeiseverguetung" in defaultValuesKopie)) {
        defaultValuesKopie["einspeiseverguetung"] = defaultValuesKopie.installiertePVLeistung <= 10 ? konstanten.einspeiseverguetungBis10kwp : konstanten.einspeiseverguetungAb10kwp;
    }

    //Fehlermeldung, wenn Required-Felder nicht gesetzt sind (sollten vom Frontend abgefangen werden)
    if (!("bundesland" in defaultValuesKopie)) {
        throw "Bundesland nicht gesetzt!"
    }
    if (!("gebaeudeNutzflaeche" in defaultValuesKopie)) {
        throw "Gebäudenutzfläche nicht gesetzt"
    }
    if (!("bewohnerAnzahl" in defaultValuesKopie)) {
        throw "Bewohneranzahl nicht gesetzt"
    }
    if (!("anzahlBeheizterRaeume" in defaultValuesKopie)) {
        throw "Anzahl beheizter Räume nicht gesetzt"
    }
    
    //Wenn pvleistung für keinen Monat eingetragen wurde und der array somit nicht instanziiert wurde
    if(!("pvErtragNutzereingabeArray" in defaultValuesKopie))
    {
        defaultValuesKopie["pvErtragGesamt"]=pvErtragsRechner.calculatePvErtrag(defaultValuesKopie.bundesland, defaultValuesKopie.installiertePVLeistung);
    }
    //Anderenfalls addiere alle Werte des Nutzereingabe Arrays
    else {
        defaultValuesKopie["pvErtragGesamt"]=pvErtragsRechner.calculatePvErtragNutzereingabe(defaultValuesKopie["pvErtragNutzereingabeArray"]);
    }

    return defaultValuesKopie;
}
    
    


function checkInputName(inputName) {
    if (!inputNames.includes(inputName)) {
        throw `${inputName} ist kein erwarteter Parameter`;
    }
    return true;
}

function berechneJaehrlichenNetzbezugHeizfenster(aktualisierterInput) {
    const gesamtStrombedarf = strombedarfsRechner.calculateGesamtStrombedarf(aktualisierterInput.heizfensterTyp, aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche, aktualisierterInput.bewohnerAnzahl);

    const gesamtEigenstromNutzung = berechneGesamtEigenstromNutzung(aktualisierterInput);

    return netzbezugRechner.calculateNetzbezugJaehrlich(gesamtStrombedarf, gesamtEigenstromNutzung);
}

function berechneGesamtEigenstromNutzung(aktualisierterInput) {
    
    const gesamtStrombedarf = strombedarfsRechner.calculateGesamtStrombedarf(aktualisierterInput.heizfensterTyp, aktualisierterInput.gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche, aktualisierterInput.bewohnerAnzahl);

    const gesamtPvErtrag = aktualisierterInput.pvErtragGesamt;

    const direktGenutzterEigenstrom = direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungJaehrlich(gesamtStrombedarf, gesamtPvErtrag);

    const gespeicherterEigentstrom = gespeicherterEigenstromRechner.calculateGespeicherterEigenstromJaehrlich(gesamtPvErtrag);

    return eigenstromNutzungsRechner.calculateGesamtEigenstromNutzung(direktGenutzterEigenstrom, gespeicherterEigentstrom);
}

function berechneGesamtErdgasBedarf(aktualisierterInput, gebaeudeStandard) {
    const heizwaermebedarf = heizwaermebedarfRechner.calculateHeizwaermebedarf(gebaeudeStandard, aktualisierterInput.gebaeudeNutzflaeche);

    const heizwaermebedarfProQMProMonat = heizwaermebedarfRechner.calculateHeizwaermebedarfProQm(gebaeudeStandard, aktualisierterInput.eingabeHeizwaermebedarfProQM)

    const twwBedarf = twwBedarfRechner.calculateTwwBedarf(aktualisierterInput.gebaeudeNutzflaeche);

    const gesamtEnergiebedarf = heizwaermebedarf + twwBedarf;

    return erdgasRechner.calculateErdgasbedarf(gesamtEnergiebedarf, aktualisierterInput.gebaeudeNutzflaeche, heizwaermebedarfProQMProMonat)
}

function berechnePvStromUeberschuss(aktualisierterInput) {
    const gesamtPvErtrag = aktualisierterInput.pvErtragGesamt;
    return gesamtPvErtrag - berechneGesamtEigenstromNutzung(aktualisierterInput);
}

function berechneEnergiebedarfHeizenUndTww(aktualisierterInput, aufwandsZahl) {
    const heizWaermebedarfProQm = heizwaermebedarfRechner.calculateHeizwaermebedarfProQm(aktualisierterInput.gebaeudeStandard);

    const strombedarfHeizenProQm = heizWaermebedarfProQm * aufwandsZahl;

    const trinkwasserBedarfProQm = twwBedarfRechner.calculateTwwbedarfProQm(aktualisierterInput.gebaeudeNutzflaeche);

    const strombedarfTwwProQm = trinkwasserBedarfProQm * aufwandsZahl;

    return (strombedarfHeizenProQm + strombedarfTwwProQm) * aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateSubstituiertePrimaerEnergieHeizfenster(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return berechnePvStromUeberschuss(aktualisierterInput) * konstanten.primaerEnergieFaktorStrom * (aktualisierterInput.anrechnungPvEinspeisung / 100);
}

function calculateSubstituiertePrimaerEnergieHeizfensterProQM(input) {
    const aktualisierterInput = setUpInputWerte(input);
    return calculateSubstituiertePrimaerEnergieHeizfenster(input) / aktualisierterInput.gebaeudeNutzflaeche;
}

function calculateCo2HeizfensterAnrechnung(input) {
    const aktualisierterInput = setUpInputWerte(input);
    const gesamtPvStromueberschuss = berechnePvStromUeberschuss(aktualisierterInput);
    return co2Emissionenrechner.calculateCO2Strom(gesamtPvStromueberschuss);
}

//Benötigt för Prognose Berechnungen
function berechnePrimaerEnergiebedarfNormativeVergleichsrechnung(aktualisierterInput)
{   
    const gesamtStrombedarfHeizfenstersystem=strombedarfsRechner.calculateGesamtStrombedarf(aktualisierterInput.heizfensterTyp,aktualisierterInput.gebaeudeStandard,aktualisierterInput.gebaeudeNutzflaeche,aktualisierterInput.bewohnerAnzahl);

    const P_pkNormativeVergleichsrechnung=0.9*aktualisierterInput.installiertePVLeistung;
    const C_effNormativeVergleichsrechnung=konstanten.normativevergleichsrechnungN_DoD*aktualisierterInput.nennkapazitaetStromspeicher;
    const v_QNormativeVergleichsrechnung=(P_pkNormativeVergleichsrechnung/gesamtStrombedarfHeizfenstersystem)*1000;
    const c_QNormativeVergleichsrechnung=(C_effNormativeVergleichsrechnung/gesamtStrombedarfHeizfenstersystem)*1000;
    const f_DLENormativeVergleichsrechnung=0.8*((18-(C_effNormativeVergleichsrechnung/2))/18);
    const f_BattNormativeVergleichsrechnung=Math.min(0.9*((gesamtStrombedarfHeizfenstersystem-f_DLENormativeVergleichsrechnung*strombedarfsRechner.calculateStrombedarfTwwProQm(aktualisierterInput.gebaeudeNutzflaeche)*aktualisierterInput.gebaeudeNutzflaeche)/berechneKonstantenormativevergleichsrechnungDirekteEigenstromnutzung(aktualisierterInput)), konstanten.normativevergleichsrechnungPVErtrag/berechneKonstantenormativevergleichsrechnungDirekteEigenstromnutzung(aktualisierterInput), Math.max(1,(0.2*Math.log(v_QNormativeVergleichsrechnung)+1.85)*c_QNormativeVergleichsrechnung**(0.1*Math.log(v_QNormativeVergleichsrechnung) + 0.25)) );
    const gesamtEigenstromNutzungNormativeVergleichsrechnung = f_BattNormativeVergleichsrechnung*berechneKonstantenormativevergleichsrechnungDirekteEigenstromnutzung(aktualisierterInput.gebaeudeStandard);//Switch case einbauen für lonstante
    const batterieverlusteNormativeVergleichsrechnung = berechneKonstantenormativevergleichsrechnungDirekteEigenstromnutzung(aktualisierterInput.gebaeudeStandard)*(1-konstanten.normativevergleichsrechnungN_Batt)*(f_BattNormativeVergleichsrechnung-1);
    const netzbezugNormativeVergleichsrechnung=gesamtStrombedarfHeizfenstersystem - gesamtEigenstromNutzungNormativeVergleichsrechnung + batterieverlusteNormativeVergleichsrechnung;
    const gesamtPrimaerEnergieBedarfNomrativeVergleichsrechnung=netzbezugNormativeVergleichsrechnung*konstanten.primaerEnergieFaktorStrom;
    return gesamtPrimaerEnergieBedarfNomrativeVergleichsrechnung;
}

function berechneKonstantenormativevergleichsrechnungDirekteEigenstromnutzung(gebaeudeStandard)
{
    let normativevergleichsrechnungDirekteEigenstromnutzung = 0;
    switch (gebaeudeStandard) {
        case "GEG-Referenzgebäude":
            normativevergleichsrechnungDirekteEigenstromnutzung = 2448;
            break;
        case "KfW 55":
            normativevergleichsrechnungDirekteEigenstromnutzung = 2289;
            break;
        case "KfW 40":
            normativevergleichsrechnungDirekteEigenstromnutzung = 2082;
            break;
        case "Passivhaus":
            normativevergleichsrechnungDirekteEigenstromnutzung = 1806;
            break;
        case "Nutzereingabe":
            normativevergleichsrechnungDirekteEigenstromnutzung = 2190;
            break;
        default:
            break;
    }

    return normativevergleichsrechnungDirekteEigenstromnutzung;

}

const calculator = {
    calculateAllResults,
    setUpInputWerte,
    //Unterschiedliche Heizsysteme:
    //Heizfenster
    calculateGesamtPrimaerEnergieBedarfHeizfensterProQm,
    calculateGesamtPrimaerEnergieBedarfHeizfenster,
    calculateInvestitionHeizfensterSystem,
    calculateGesamtStromkostenHeizfenster,
    calculateEinspeiseVerguetungHeizfenster,
    calculateGesamtannuitaetHeizfenstersystemOhneAnrechnung,
    calculateGesamtannuitaetHeizfenstersystemMitAnrechnung,
    calculateSubstituiertePrimaerEnergieHeizfensterProQM,
    calculateCo2Heizfenster,
    calculateSubstituierteCo2EmissionenHeizfenster,
    //Erdgas
    calculateInvestitionErdgasBwSystem,
    calculateGesamtEnergiekostenErdgasBwSystem,
    calculateGesamtannuitaetErdgasBwSystem,
    calculateGesamtPrimaerenergiebedarfErdgasBwSystemProQm,
    calculateCo2ErdgasBwNormal,
    //Wärmepumpe
    calculateInvestitionWaermepumpenSystem,
    calculateGesamtEnergieKostenWaermepumpenSystem,
    calculateGesamtAnnuitaetWaermepumpenSystem,
    calculateGesamtPrimaerenergiebedarfWaermepumpenSystemProQm,
    calculateCo2Waermepumpe,
    //Sole-Wasser-Wärmepumpe
    calculateInvestitionSwWaermepumpenSystem,
    calculateGesamtEnergieKostenSwWaermepumpenSystem,
    calculateGesamtAnnuitaetSwWaermepumpenSystem,
    calculateGesamtPrimaerenergiebedarfSwWaermepumpenSystemProQm,
    calculateCo2Erdwaermepumpe,
    //Holzpellets
    calculateInvestitionHolzpelletSystem,
    calculateGesamtEnergieKostenHolzpelletSystem,
    calculateGesamtAnnuitaetHolzpelletSystem,
    calculateGesamtPrimaerenergiebedarfHolzpelletSystemProQm,
    calculateCo2Holzpellet,

    //Heizfenster vs. GEG-Referenzgebäude
    //Ökologie
    calculateGesamtPrimaerenergiebedarfGegReferenzgebaeudeProQm,
    calculateCo2ErdgasBwGEG,
    calculateEinsparungPrimaerEnergieOhneAnrechnungGegReferenzgebaeude,
    calculateEinsparungCo2AeqEmissionenOhneAnrechnungGegReferenzgebaeude,
    calculateEinsparungPrimaerEnergieMitAnrechnungGegReferenzgebaeude,
    calculateEinsparungCo2AeqEmissionenMitAnrechnungGegReferenzgebaeude,
    //Energieeinsparrecht
    calculatePrognoseGegAnforderungenGegReferenzgebaeudePotsdam,
    calculatePrognoseKfwStandardGegReferenzgebaeudePotsdam,

    //Heizfenster vs. Erdgas-Bw-System
    //Ökologie
    calculateEinsparungPrimaerEnergieOhneAnrechnungErdgasBw,
    calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdgasBw,
    calculateEinsparungPrimaerEnergieMitAnrechnungErdgasBw,
    calculateEinsparungCo2AeqEmissionenMitAnrechnungErdgasBw,

    //Wirtschaftlichkeit
    calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdgasBw,
    calculateReduzierungGesamtAnnuitaetMitAnrechnungErdgasBw,

    //Heizfenster vs. Wärmepumpen-System
    //Ökologie
    calculateEinsparungPrimaerEnergieOhneAnrechnungWaermepumpe,
    calculateEinsparungCo2AeqEmissionenOhneAnrechnungWaermepumpe,
    calculateEinsparungPrimaerEnergieMitAnrechnungWaermepumpe,
    calculateEinsparungCo2AeqEmissionenMitAnrechnungWaermepumpe,
    //Wirtschaftlichkeit
    calculateReduzierungGesamtAnnuitaetOhneAnrechnungWaermepumpe,
    calculateReduzierungGesamtAnnuitaetMitAnrechnungWaermepumpe,

    //Heizfenster vs. Erdwärmepumpen-System
    //Ökologie
    calculateEinsparungPrimaerEnergieOhneAnrechnungErdwaermepumpe,
    calculateEinsparungCo2AeqEmissionenOhneAnrechnungErdwaermepumpe,
    calculateEinsparungPrimaerEnergieMitAnrechnungErdwaermepumpe,
    calculateEinsparungCo2AeqEmissionenMitAnrechnungErdwaermepumpe,
    //Wirtschaftlichkeit
    calculateReduzierungGesamtAnnuitaetOhneAnrechnungErdwaermepumpe,
    calculateReduzierungGesamtAnnuitaetMitAnrechnungErdwaermepumpe,

    //Heizfenster vs. Holzpellet-System
    //Ökologie
    calculateEinsparungPrimaerEnergieOhneAnrechnungHolzpellet,
    calculateEinsparungCo2AeqEmissionenOhneAnrechnungHolzpellet,
    calculateEinsparungPrimaerEnergieMitAnrechnungHolzpellet,
    calculateEinsparungCo2AeqEmissionenMitAnrechnungHolzpellet,
    //Wirtschaftlichkeit
    calculateReduzierungGesamtAnnuitaetOhneAnrechnungHolzpellet,
    calculateReduzierungGesamtAnnuitaetMitAnrechnungHolzpellet,

    //Absolute CO2 Werte
    calculateCo2Heizfenster,
    calculateCo2HeizfensterAnrechnung,
    calculateCo2ErdgasBwGEG,
    calculateCo2ErdgasBwNormal,
    calculateCo2Erdwaermepumpe,
    calculateCo2Holzpellet,
    calculateCo2Waermepumpe,
    berechnePrimaerEnergiebedarfNormativeVergleichsrechnung,

};

export default calculator;
