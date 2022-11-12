import konstanten from "../../konstanten.js";

//Berechnung der CO2 Emissionen auf Basis des Netzbezugs
function calculateCO2Strom(netzbezug) {
    return netzbezug * konstanten.co2ProKWhStrom;
}

//Berechnung der CO2 Emissionen auf Basis des Erdgasbedarfs
function calculateCO2Erdgas(erdgasbedarf) {
    return erdgasbedarf * konstanten.co2ProKWhGas;
}

//Berechnung der CO2 Emissionen auf Basis des Holzpelletbedarfs
function calculateCO2Holzpellet(holzpelletbedarf) {
    return holzpelletbedarf * konstanten.co2ProKWhHolzpelett;
}

const calculator = {
    calculateCO2Strom,
    calculateCO2Erdgas,
    calculateCO2Holzpellet
}

export default calculator;
