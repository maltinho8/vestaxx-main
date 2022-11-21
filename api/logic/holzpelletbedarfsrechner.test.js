import rechner from './holzpelletbedarfsrechner.js';

test('Berechnung des Holzpelletbedarfs pro Jahr und Funktion', () => {
  expect(rechner.calculateHolzpelletbedarfprofunktion(35)).toBe(40.25);
});

test('Berechnung des Holzpelletbedarfs pro Jahr Gesamt', () => {
  expect(rechner.calculateHolzpelletbedarfGesamt(35, 35)).toBe(80.5);
});
