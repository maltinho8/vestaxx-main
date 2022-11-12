//Twwbedarf pro QM und Monat
function calculateTwwbedarfProQmProMonat(twwbedarfProQm, Monat) {
    let twwanteilProMonat;
    switch (Monat) {
        case 1:
            twwanteilProMonat = 0.0985742667301355;
            break;
        case 2:
            twwanteilProMonat = 0.0874967307209494;
            break;
        case 3:
            twwanteilProMonat = 0.0936172048776821;
            break;
        case 4:
            twwanteilProMonat = 0.0834908200588768;
            break;
        case 5:
            twwanteilProMonat = 0.0754171207803534;
            break;
        case 6:
            twwanteilProMonat = 0.0703876765689401;
            break;
        case 7:
            twwanteilProMonat = 0.0706522567329814;
            break;
        case 8:
            twwanteilProMonat = 0.0686593287696217;
            break;
        case 9:
            twwanteilProMonat = 0.0765478493660513;
            break;
        case 10:
            twwanteilProMonat = 0.0845279805131141;
            break;
        case 11:
            twwanteilProMonat = 0.0915252136436394;
            break;
        case 12:
            twwanteilProMonat = 0.0991035512376649;
            break;
        default:
            twwanteilProMonat = 0;
            break;
    }

    return twwbedarfProQm * twwanteilProMonat;
}

//Twwbedarf pro QM
function calculateTwwbedarfProQm(gebaeudenutzflaeche) {
    return 15 - gebaeudenutzflaeche * 0.04; //Zahlen nochmals prüfen
}

function calculateTwwBedarf(gebaeudenutzflaeche) {
    return calculateTwwbedarfProQm(gebaeudenutzflaeche) * gebaeudenutzflaeche;
}

const calculator = {
    calculateTwwbedarfProQmProMonat,
    calculateTwwbedarfProQm,
    calculateTwwBedarf
};

export default calculator;
