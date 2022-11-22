import sumAllArrayValues from './additionArrayRechner.js';

test('Addition aller Werte eines Arrays', () => {
  expect(sumAllArrayValues([1, 2])).toBe(3);
  expect(sumAllArrayValues([2, 4, 5, 1, 3])).toBe(15);
  expect(sumAllArrayValues([2.5, 4.2])).toBe(6.7);
});
