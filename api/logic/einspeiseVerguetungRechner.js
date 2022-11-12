function calculatePvStromUeberschuss(pvStromErtrag, gesamtEigenstromnutzung) {
    return pvStromErtrag - gesamtEigenstromnutzung;
}

function calculateEinspeiseVerguetung(pvStromErtrag, gesamtEigenstromnutzung, einspeiseVerguetungProKwh) {
    return einspeiseVerguetungProKwh * calculatePvStromUeberschuss(pvStromErtrag, gesamtEigenstromnutzung)
}

const calculator = {
    calculatePvStromUeberschuss,
    calculateEinspeiseVerguetung
};

export default calculator;
