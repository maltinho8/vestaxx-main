import heizfensterBedarfRechner from "./heizfensterBedarfRechner.js";

test("Berechnung Gebäudeheizlast", () => {
    let result = heizfensterBedarfRechner.calculateGebaeudeheizlast(10, "nutzereingabe", 100);
    expect(result).toBe(1000);
    result = heizfensterBedarfRechner.calculateGebaeudeheizlast(15.5, "nutzereingabe", 100);
    expect(result).toBe(1550);
    result = heizfensterBedarfRechner.calculateGebaeudeheizlast(10, "KfW 55", 100);
    expect(result).toBe(3000);
    result = heizfensterBedarfRechner.calculateGebaeudeheizlast(10, "KfW 40", 100);
    expect(result).toBe(2000);
    result = heizfensterBedarfRechner.calculateGebaeudeheizlast(20, "Passivhaus", 150);
    expect(result).toBe(1500);
    result = heizfensterBedarfRechner.calculateGebaeudeheizlast(20, "GEG-Referenzgebäude", 100);
    expect(result).toBe(3500);
});

test("Berechne minimale Gesamtfläche", () => {
    let result = heizfensterBedarfRechner.calculateMinimaleGesamtflaecheHeizfenster(0, "KfW 55", 150);
    expect(result).toBe(20);
});

test("Berechne minimale Anzahl Heizfenster", () => {
    let result = heizfensterBedarfRechner.calculateMinimaleAnzahlHeizfenster(0, "KfW 55", 150, 8, 1.82);
    expect(result).toBe(11);
    result = heizfensterBedarfRechner.calculateMinimaleAnzahlHeizfenster(0, "KfW 55", 150, 12, 1.82);
    expect(result).toBe(12);
});
