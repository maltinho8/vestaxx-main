import konstanten from "../../konstanten.js";

function calculateHolzpelletbedarfprofunktion(energiebedarf) {
    return konstanten.aufwandzahlholzpellets * energiebedarf;
}

function calculateHolzpelletbedarfGesamt(twwbedarf, heizbedarf) {
    return calculateHolzpelletbedarfprofunktion(twwbedarf) + calculateHolzpelletbedarfprofunktion(heizbedarf);
}

const calculator = {
    calculateHolzpelletbedarfprofunktion,
    calculateHolzpelletbedarfGesamt
};

export default calculator;
