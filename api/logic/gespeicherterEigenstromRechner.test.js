import gespeicherterEigenstromRechner from "./gespeicherterEigenstromRechner.js";
import faktorNennkapazitaetRechner from "./support/faktorNennkapazitaetRechner.js";
import konstanten from "../../konstanten.js";
import jest from 'jest-mock';

const FAKTOR_NENNKAPAZITAET = 0.2047406103788650;

let faktorNennkapazitaetMock = faktorNennkapazitaetRechner.calculateFaktorNennkapazitaet = jest.fn();

test("Berechnung der monatlichen EigenstromSpeicherung", () => {
    faktorNennkapazitaetMock.mockReturnValue(FAKTOR_NENNKAPAZITAET);
    let gesamtPVErtrag = 9430;
    let iesn = 6.63288719430633;
    let direkteEigenstromNutzung = 165.5375109;
    let pvErtrag = 310;
    let strombedarf = 1755.266942;
    let expected = 128.06142;
    let result = gespeicherterEigenstromRechner.calculateGespeicherterEigenstromProMonat(gesamtPVErtrag, iesn, direkteEigenstromNutzung, pvErtrag, strombedarf);
    assertFaktorNennkapazitaetMock();
    expect(Math.round(result * 100_000) / 100_000).toBe(expected);
});

function assertFaktorNennkapazitaetMock() {
    let nennKapazitaet = konstanten.nennkapazitaetStromspeicher;
    expect(faktorNennkapazitaetMock).toHaveBeenCalledWith(nennKapazitaet);
    expect(faktorNennkapazitaetMock).toHaveBeenCalledTimes(1);
    expect(faktorNennkapazitaetMock(nennKapazitaet)).toBe(FAKTOR_NENNKAPAZITAET);
}

test("Berechnung der jährlichen EigenstromSpeicherung", () => {
    faktorNennkapazitaetMock.mockReturnValue(FAKTOR_NENNKAPAZITAET);
    let result = gespeicherterEigenstromRechner.calculateGespeicherterEigenstromJaehrlich(10170)
    expect(Math.round(result)).toBe(2082);
});

//Test für "alte" Berechnung (Summe der monatlichen Werte)
/*test("Berechnung der jährlichen EigenstromSpeicherung", () => {
    faktorNennkapazitaetMock.mockReturnValue(FAKTOR_NENNKAPAZITAET);
    let monatlicheStrombedarfe = [1755.2669, 1442.0212, 1129.0574, 422.2214, 308.6062, 287.9486, 287.0188, 283.3553, 307.4356, 636.4653, 1255.2061, 1696.3664];
    let monatlichePVErtraege = [310, 440, 840, 1110, 1150, 1150, 1170, 1070, 920, 670, 330, 270];
    let monatlicheDirekteEigenstromNutzung = [165.5375, 136.6750, 267.3613, 353.7458, 346.3663, 318.9211, 324.9973, 286.6857, 283.4411, 271.9981, 123.6409, 85.7301];
    let monatlicherIesn = [6.6329, 5.3704, 9.0016, 10.5056, 10.3455, 9.5963, 10.1680, 9.8152, 10.1890, 9.9657, 5.3481, 3.0630];
    let expected = [128.06, 103.69, 173.79, 68.48, -37.76, -30.97, -37.98, -3.33, 23.99, 192.41, 103.26, 59.14];
    let result = gespeicherterEigenstromRechner.calculateGespeicherterEigenstromMonatlich(monatlicheStrombedarfe, monatlichePVErtraege, monatlicheDirekteEigenstromNutzung, monatlicherIesn);
    for (let i = 0; i < expected.length; i++) {
        expect(Math.round(result[i] * 100) / 100).toBe(expected[i]);
    }
});*/


