function calculateFaktorNennkapazitaet(nennkapazitaetStromspeicher) {
    if (nennkapazitaetStromspeicher <= 10) {
        return (9.2903 * Math.log(nennkapazitaetStromspeicher) + 5.5219) / 100;
    }
    return (6.0154 * Math.log(nennkapazitaetStromspeicher) + 13.1332) / 100;
}

const calculator = { calculateFaktorNennkapazitaet };

export default calculator;
