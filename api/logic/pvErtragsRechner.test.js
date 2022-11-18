import pvertragsrechner from './pvErtragsRechner.js';

test('Berechnung der GesamtPVErträge pro Bundesland', () => {
  expect(pvertragsrechner.calculatePvErtrag('berlin', 1)).toBe(1017);
  expect(pvertragsrechner.calculatePvErtrag('bremen', 1)).toBe(955);
  expect(pvertragsrechner.calculatePvErtrag('hamburg', 1)).toBe(982);
  expect(pvertragsrechner.calculatePvErtrag('brandenburg', 1)).toBe(1048);
  expect(pvertragsrechner.calculatePvErtrag('mecklenburg-vorpommern', 1)).toBe(
    990
  );
  expect(pvertragsrechner.calculatePvErtrag('schleswig-holstein', 1)).toBe(975);
  expect(pvertragsrechner.calculatePvErtrag('niedersachsen', 1)).toBe(1011);
  expect(pvertragsrechner.calculatePvErtrag('nordrhein-westphalen', 1)).toBe(
    1032
  );
  expect(pvertragsrechner.calculatePvErtrag('bayern', 1)).toBe(1119);
  expect(pvertragsrechner.calculatePvErtrag('baden-württemberg', 1)).toBe(1118);
  expect(pvertragsrechner.calculatePvErtrag('sachsen', 1)).toBe(1058);
  expect(pvertragsrechner.calculatePvErtrag('sachsen-anhalt', 1)).toBe(1063);
  expect(pvertragsrechner.calculatePvErtrag('thüringen', 1)).toBe(1034);
  expect(pvertragsrechner.calculatePvErtrag('saarland', 1)).toBe(1080);
  expect(pvertragsrechner.calculatePvErtrag('rheinland-pfalz', 1)).toBe(1095);
  expect(pvertragsrechner.calculatePvErtrag('hessen', 1)).toBe(1641);
});

test('Berechnung der GesamtPVErträge auf Grund monatlicher pvertrage aus Nutzereingabe', () => {
  let pvErtragNutzereingabeArray = [];
  pvErtragNutzereingabeArray[0] = 1;
  pvErtragNutzereingabeArray[1] = 1;
  pvErtragNutzereingabeArray[2] = 1;
  pvErtragNutzereingabeArray[3] = 1;
  pvErtragNutzereingabeArray[4] = 1;
  pvErtragNutzereingabeArray[5] = 1;
  pvErtragNutzereingabeArray[6] = 1;
  pvErtragNutzereingabeArray[7] = 1;
  pvErtragNutzereingabeArray[8] = 1;
  pvErtragNutzereingabeArray[9] = 1;
  pvErtragNutzereingabeArray[10] = 1;
  pvErtragNutzereingabeArray[11] = 1;
  expect(
    pvertragsrechner.calculatePvErtragNutzereingabe(pvErtragNutzereingabeArray)
  ).toBe(12);
});
