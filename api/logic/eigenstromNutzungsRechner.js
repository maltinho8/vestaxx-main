function calculateGesamtEigenstromNutzung(direktGenutzterEigenstrom, gespeicherterEigenstrom) {
    return direktGenutzterEigenstrom + gespeicherterEigenstrom;
}

const calculator = {calculateGesamtEigenstromNutzung};

export default calculator;
