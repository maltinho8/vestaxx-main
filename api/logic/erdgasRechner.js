import konstanten from "../../konstanten.js";

/**
 * Berechnet den Erdgasbedarf. Dabei ist es egal, ob die Energie für ein Jahr, für einen Monat oder für einen Quadratmeter gilt.
 * Das Ergebnis ist dann nur das entsprechende Äquivalent. Gibt man den Energiebedarf für ein Jahr ein, erhält man den Erdgasbedarf für ein Jahr.
 * @param {*} energiebedarf in kWh
 * @param {*} gebaeudenutzflaeche in m²
 * @param {*} heizwaermebedarfProQMProMonat in kWh. Wird benötigt, um Aufwandszahl festzulegen.
 * @returns in kWh
 */
function calculateErdgasbedarf(energiebedarf, gebaeudenutzflaeche, heizwaermebedarfProQMProMonat) {
    const aufwandszahl = calculateAufwandszahl(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat);
    return energiebedarf * aufwandszahl;
}

function calculateAufwandszahl(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat) {
    if (heizwaermebedarfProQMProMonat > 0.85 * konstanten.gegReferenzgebaeudeHeizwaermeProQM) {
        return calculateAufwandszahlAnlagenvariante31(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat);
    }
    return calculateAufwandszahlAnlagenvariante18(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat);
}

function calculateAufwandszahlAnlagenvariante31(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat) {
    const a = 0.00000000086038961041 * Math.pow(gebaeudenutzflaeche, 2) - 0.00000046866883118 * gebaeudenutzflaeche + 0.00007077922078;
    const b = -0.00000015886363637 * Math.pow(gebaeudenutzflaeche, 2) + 0.000086337337664 * gebaeudenutzflaeche - 0.01337012987;
    const c = 0.000010182467528 * Math.pow(gebaeudenutzflaeche, 2) - 0.0055540454526 * gebaeudenutzflaeche + 1.9392207791;
    const ep = a * Math.pow(heizwaermebedarfProQMProMonat, 2) + b * heizwaermebedarfProQMProMonat + c;
    return ep / konstanten.primaerenergiefaktorGas;
}

function calculateAufwandszahlAnlagenvariante18(gebaeudenutzflaeche, heizwaermebedarfProQMProMonat) {
    const a = 0.00000000034090909085 * Math.pow(gebaeudenutzflaeche, 2) - 0.00000026737012985 * gebaeudenutzflaeche + 0.000090746753245;
    const b = -0.0000001037987013 * Math.pow(gebaeudenutzflaeche, 2) + 0.000071285389612 * gebaeudenutzflaeche - 0.020558116883;
    const c = 0.000011070779221 * Math.pow(gebaeudenutzflaeche, 2) - 0.0067218376626 * gebaeudenutzflaeche + 2.6853441559;
    const ep = a * Math.pow(heizwaermebedarfProQMProMonat, 2) + b * heizwaermebedarfProQMProMonat + c;
    return ep / konstanten.primaerenergiefaktorGas;
}

const calculator = {calculateErdgasbedarf};

export default calculator;
