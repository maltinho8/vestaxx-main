import rechner from "./co2Emissionenrechner.js";

test("berechne CO2 aus Strombezug", () => {
    const strombezug = 30000;
    expect(rechner.calculateCO2Strom(strombezug)).toEqual(16800);
});

test("berechne CO2 aus Erdgasbedarf", () => {
    const erdgasbezug = 30000;
    expect(rechner.calculateCO2Erdgas(erdgasbezug)).toEqual(7200);
});

test("berechne CO2 aus Holzpelletbedarf", () => {
    const holzpelletbedarf = 30000;
    expect(rechner.calculateCO2Holzpellet(holzpelletbedarf)).toEqual(1590);
});
