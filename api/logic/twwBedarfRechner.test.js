import rechner from './twwBedarfRechner.js';

test('Berechnung des TwwBedarfs pro Qm und Monat', () => {
  expect(rechner.calculateTwwbedarfProQmProMonat(9, 5)).toBe(
    0.6787540870231805
  );
});

test('Berechnung des TwwBedarfs pro Qm', () => {
  expect(rechner.calculateTwwbedarfProQm(150)).toBe(9);
});

test('Berechnung des TwwBedarfs gesamt', () => {
  expect(rechner.calculateTwwBedarf(150)).toBe(1350);
});
