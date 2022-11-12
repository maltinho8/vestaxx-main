import eigenstromnutzungsrechner from "./eigenstromNutzungsRechner.js";

test("Berechnung der GesamtEigenstromNutzung", () => {
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(100, 300)).toBe(400);
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(100.12, 300.45)).toBe(400.57);
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(100, 0)).toBe(100);
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(0, 100)).toBe(100);
    //nullsafe, wenn z.B. keine Speicherung
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(null, 100)).toBe(100);
    expect(eigenstromnutzungsrechner.calculateGesamtEigenstromNutzung(100, null)).toBe(100);
});

