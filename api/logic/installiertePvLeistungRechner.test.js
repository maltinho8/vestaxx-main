import installiertePvLeistungRechner from './installiertePvLeistungRechner.js';

test('Berechnung installierte PV Leistung', () => {
  expect(
    installiertePvLeistungRechner.calculateInstalliertePVLeistung(100, 1)
  ).toBe(10);
  expect(
    installiertePvLeistungRechner.calculateInstalliertePVLeistung(100, 2)
  ).toBe(5);
});
