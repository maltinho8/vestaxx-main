import rechner from "./heizwaermebedarfRechner.js";

test("Berechnung des Heizwaermebedarfs pro Qm und Monat", () => {
    expect(rechner.calculateHeizwaermebedarfProQmProMonat(35, 3)).toBe(4.58476418997156);
});

test("Ausgabe des Heizwaermebedarfs pro Qm", () => {
    expect(rechner.calculateHeizwaermebedarfProQm("KfW 40")).toBe(25);
});

test("Ausgabe des Heizwaermebedarfs gesamt", () => {
    expect(rechner.calculateHeizwaermebedarf("KfW 55", 150)).toBe(5250);
});
