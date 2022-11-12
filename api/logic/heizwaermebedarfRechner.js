//Heizwärmebedarf pro QM und Monat
function calculateHeizwaermebedarfProQmProMonat(heizwaermebedarfProQm, Monat) {
    let heizanteilProMonat;
    switch (Monat) {
        case 1:
            heizanteilProMonat = 23.6319518426224 / 100;
            break;
        case 2:
            heizanteilProMonat = 18.7807631302855 / 100;
            break;
        case 3:
            heizanteilProMonat = 13.0993262570616 / 100;
            break;
        case 4:
            heizanteilProMonat = 1.47021212616694 / 100;
            break;
        case 5:
            heizanteilProMonat = 0.0275867064758181 / 100;
            break;
        case 6:
            heizanteilProMonat = 0 / 100;
            break;
        case 7:
            heizanteilProMonat = 0 / 100;
            break;
        case 8:
            heizanteilProMonat = 0 / 100;
            break;
        case 9:
            heizanteilProMonat = 0.0220015047238696 / 100;
            break;
        case 10:
            heizanteilProMonat = 5.01056063028792 / 100;
            break;
        case 11:
            heizanteilProMonat = 15.401937843235 / 100;
            break;
        case 12:
            heizanteilProMonat = 22.5556599591409 / 100;
            break;
        default:
            break;
    }

    return heizwaermebedarfProQm * heizanteilProMonat;
}

//Heizwärmebedarf pro QM
function calculateHeizwaermebedarfProQm(gebaeudeStandard, eingabeHeizwaermebedarfProQM = 0) {
    let HeizwaermebedarfProQm = 0;
    switch (gebaeudeStandard) {
        case "GEG-Referenzgebäude":
            HeizwaermebedarfProQm = 45;
            break;
        case "KfW 55":
            HeizwaermebedarfProQm = 35;
            break;
        case "KfW 40":
            HeizwaermebedarfProQm = 25;
            break;
        case "Passivhaus":
            HeizwaermebedarfProQm = 15;
            break;
        case "Nutzereingabe":
            HeizwaermebedarfProQm = eingabeHeizwaermebedarfProQM;
            break;
        default:
            break;
    }

    return HeizwaermebedarfProQm;
}

function calculateHeizwaermebedarf(gebaeudeStandard, gebaeudenutzflaeche) {
    return calculateHeizwaermebedarfProQm(gebaeudeStandard) * gebaeudenutzflaeche;
}

const calculator = {
    calculateHeizwaermebedarfProQmProMonat,
    calculateHeizwaermebedarfProQm,
    calculateHeizwaermebedarf
};

export default calculator;
