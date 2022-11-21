import direkteEigenstromNutzungsRechner from './direkteEigenstromNutzungsRechner';

test('Gesamtberechnung der jährlichen direkten Eigenstromnutzung', () => {
  expect(
    Math.round(
      direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungJaehrlich(
        9811,
        9430
      )
    )
  ).toBe(2965);
  expect(
    direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungJaehrlich(
      0,
      9430
    )
  ).toBe(0);
  expect(
    direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungJaehrlich(
      9811,
      0
    )
  ).toBe(0);
});

test('Berechnung der monatlichen Eigenstromnutzung', () => {
  let direkteEigenstromNutzung = 2965;
  let monatlicherDesn = [
    5.5829, 4.6095, 9.0169, 11.9303, 11.6814, 10.7558, 10.9608, 9.6687, 9.5592,
    9.1733, 4.1699, 2.8913,
  ];
  let expected = [166, 137, 267, 354, 346, 319, 325, 287, 283, 272, 124, 86];
  let result =
    direkteEigenstromNutzungsRechner.calculateDirekteEigenstromNutzungMonatlich(
      direkteEigenstromNutzung,
      monatlicherDesn
    );
  for (let i = 0; i < expected.length; i++) {
    expect(Math.round(result[i])).toBe(expected[i]);
  }
});
test('Vorbedingungen direkte Eigenstromnutzung', () => {
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      2000,
      2000
    )
  ).toBe(true);
  //PV-Ertrag >= 1086
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      2000,
      null
    )
  ).toBe(false);
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      2000,
      1086
    )
  ).toBe(true);
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      2000,
      1085
    )
  ).toBe(false);
  //PV-Ertrag <= 10049 (Bedingung ist momentan nicht drin)
  /*expect(direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(2000, 10049)).toBe(true);
    expect(direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(2000, 10050)).toBe(false);*/
  //Stromertrag >= 1000
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      1000,
      2000
    )
  ).toBe(true);
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      999,
      2000
    )
  ).toBe(false);
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      null,
      2000
    )
  ).toBe(false);
  //Stromertrag <=15000
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      15000,
      2000
    )
  ).toBe(true);
  expect(
    direkteEigenstromNutzungsRechner.calculateVorbedingungenDirekteEigenstromNutzungJaehrlich(
      15001,
      2000
    )
  ).toBe(false);
});

test('Berechne Menge der direkter Eigenstromnutzung', () => {
  expect(
    direkteEigenstromNutzungsRechner.calculateMengeDirekteEigenstromNutzungAusAnteil(
      2000,
      1000,
      10
    )
  ).toBe(200);
  expect(
    direkteEigenstromNutzungsRechner.calculateMengeDirekteEigenstromNutzungAusAnteil(
      1000,
      1000,
      12.5
    )
  ).toBe(125);
  //Strombedaf null
  expect(
    direkteEigenstromNutzungsRechner.calculateMengeDirekteEigenstromNutzungAusAnteil(
      2000,
      null,
      10
    )
  ).toBe(0);
  //PvStromertrag null
  expect(
    direkteEigenstromNutzungsRechner.calculateMengeDirekteEigenstromNutzungAusAnteil(
      null,
      1000,
      10
    )
  ).toBe(0);
});

test('Ermittle Anteil direkte Eigenstromnutzung', () => {
  expect(
    rundeAufEineNachkommaStelle(
      direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
        9811,
        9430
      )
    )
  ).toBe(31.4);
  expect(
    rundeAufEineNachkommaStelle(
      direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
        3200,
        7000
      )
    )
  ).toBe(16.9);
  //Randfälle werden korrekt berechnet:
  //Maximal mögliche Eingaben
  expect(
    rundeAufEineNachkommaStelle(
      direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
        14999,
        10049
      )
    )
  ).toBe(35.9);
  //Minimal mögliche Eingaben
  expect(
    rundeAufEineNachkommaStelle(
      direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
        1000,
        1086
      )
    )
  ).toBe(28.9);
  //Eingaben außerhalb der Grenzen keine Exception (sollen durch Eingabevalidierung verhindert werden):
  //Stromverbrauch überschreitet Obergrenze
  expect(
    direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
      16000,
      9430
    )
  ).toBeDefined();
  //PvErtrag überschreitet Obergrenze
  expect(
    direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(
      9811,
      12000
    )
  ).toBeDefined();
  //Randfall Untergrenzen werden unterschritten
  expect(
    direkteEigenstromNutzungsRechner.calculateAnteilAnStromverbrauch(0, 0)
  ).toBeDefined();
});

function rundeAufEineNachkommaStelle(value) {
  return Math.round(value * 10) / 10;
}
