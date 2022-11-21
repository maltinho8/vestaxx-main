import einspeiseVerguetungRechner from './einspeiseVerguetungRechner.js';

test('Berechnung PV-Stromüberschuss', () => {
  expect(
    einspeiseVerguetungRechner.calculatePvStromUeberschuss(10170, 5114)
  ).toEqual(5056);
});

test('Berechnung Einspeisevergütung', () => {
  expect(
    Math.round(
      einspeiseVerguetungRechner.calculateEinspeiseVerguetung(
        10170,
        5113.83,
        0.0634
      ) * 100
    ) / 100
  ).toEqual(320.56);
});
