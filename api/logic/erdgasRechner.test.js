import rechner from './erdgasRechner.js';

test('berechne Erdgasbedarf aus Energiebedarf für Aufwandszahl 31', () => {
  const energiebedarf = 60;
  const gebaeudenutzflaeche = 150;
  const heizwaermebedarfProQM = 60;
  expect(
    rechner.calculateErdgasbedarf(
      energiebedarf,
      gebaeudenutzflaeche,
      heizwaermebedarfProQM
    )
  ).toEqual(63.65440378257327);
});

test('berechne Erdgasbedarf aus Energiebedarf für Aufwandszahl 18', () => {
  const energiebedarf = 1500;
  const gebaeudenutzflaeche = 150;
  const heizwaermebedarfProQM = 10;
  expect(
    rechner.calculateErdgasbedarf(
      energiebedarf,
      gebaeudenutzflaeche,
      heizwaermebedarfProQM
    )
  ).toEqual(2468.160566739767);
});
