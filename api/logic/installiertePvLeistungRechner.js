function calculateInstalliertePVLeistung(gebaeudeNutzflaeche, etagenAnzahl) {
    let dachflaeche = gebaeudeNutzflaeche / etagenAnzahl;
    return dachflaeche / 10;
}

const calculator = {
    calculateInstalliertePVLeistung
};

export default calculator;
