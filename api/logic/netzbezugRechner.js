function calculateNetzbezugJaehrlich(gesamtStrombedarf, gesamtEigenstromNutzung) {
    return gesamtStrombedarf - gesamtEigenstromNutzung;
}

const calculator = {
    calculateNetzbezugJaehrlich
};

export default calculator;
