import strombedarfsrechner from "./strombedarfsRechner.js";

test("Berechnung des Gesamtstrombedarfs pro Jahr", () => {
    let result = strombedarfsrechner.calculateGesamtStrombedarf("Dreifach-Verglasung", "KfW 55", 150, 4);
    expect(Math.round(result)).toBe(9811);
});

test("Berechnung des Gesamtstrombedarfs pro Qm und Jahr ", () => {
    let strombedarfheizen = 10.3
    let strombedarftww = 10.03
    let strombedarfhaushalt = 10.003
    expect(strombedarfsrechner.calculateGesamtStrombedarfProQm(strombedarfheizen, strombedarftww, strombedarfhaushalt)).toBe((30.333));
});

test("Berechnung des Strombedarfs für Heizen pro Qm und Jahr(Summenbildung)", () => {
    expect(strombedarfsrechner.calculateStrombedarfHeizenProQm("Zweifach-Verglasung", "KfW 55")).toBe(10.6952368707251899401318887936 + 8.52676156718769228196261827875 + 6.0471309547385072792685132456 + 0.84380028399201259478744391492 + 0.02609468279024413382182310360475 + 0.02065652100730553649729776018 + 2.4311240453526502111253206974 + 7.0341052405863520739937612 + 10.1983539612765606931969111565)
});

test("Berechnung des Strombedarfs für Heizen pro Qm und Monat", () => {
    expect(strombedarfsrechner.calculateStrombedarfHeizenProQmProMonat(1, "Zweifach-Verglasung", 3)).toBe(1.31896226374426);
    expect(strombedarfsrechner.calculateStrombedarfHeizenProQmProMonat(1, "Dreifach-Verglasung", 5)).toBe(1.56656992619999);
});

test("Berechnung des Strombedarfs für TWW pro Qm und Jahr(Summenbildung)", () => {
    expect(strombedarfsrechner.calculateStrombedarfTwwProQm(150)).toBe(2.916237050785298)
});

test("Berechnung des Strombedarfs für Tww pro Qm und Monat", () => {
    expect(strombedarfsrechner.calculateStrombedarfTwwProQmProMonat(1, 3)).toBe(0.324770642201835)
});

test("Berechnung des Strombedarfs für Haushalt pro Qm pro Monat", () => {
    expect(strombedarfsrechner.calculateStrombedarfHaushaltProQmProMonat(20, 3)).toBe(1.8132465077814381)
});

test("Berechnung des Strombedarfs für Haushalt pro Qm", () => {
    expect(strombedarfsrechner.calculateStrombedarfHaushaltProQm(3, 150)).toBe(20)
});

test("Ausgabe des Strombedarfs für Haushalt", () => {
    expect(strombedarfsrechner.calculateStrombedarfHaushalt(4)).toBe(3500)
});










