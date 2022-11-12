import netzbezugRechner from "./netzbezugRechner.js";

test("berechne Netzbezug", () => {
    const gesamtStrombedarf = 9811;
    const gesamtEigenstromNutzung = 5114;
    expect(netzbezugRechner.calculateNetzbezugJaehrlich(gesamtStrombedarf, gesamtEigenstromNutzung)).toEqual(4697);
});
