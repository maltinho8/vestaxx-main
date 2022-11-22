import faktorNennkapazitaetRechner from './faktorNennkapazitaetRechner.js';

test('Berechnung des Faktors für die Nennkapazität', () => {
  //Nennkapazität 5
  let faktorNennkapazitaetGenau =
    faktorNennkapazitaetRechner.calculateFaktorNennkapazitaet(5);
  expect(Math.round(faktorNennkapazitaetGenau * 100000) / 100000).toBe(0.20474);
  //Nennkapazität 10
  faktorNennkapazitaetGenau =
    faktorNennkapazitaetRechner.calculateFaktorNennkapazitaet(10);
  expect(Math.round(faktorNennkapazitaetGenau * 100000) / 100000).toBe(0.26914);
});
