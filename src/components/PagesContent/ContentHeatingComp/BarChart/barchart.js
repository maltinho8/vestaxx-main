//import { faBullseye } from "@fortawesome/free-solid-svg-icons";

export const colors4Bars = ['#65a1db', '#ed7d31', '#6a6a6b', '#4472c4'];

export const colors5Bars = [
  '#65a1db',
  '#ed7d31',
  '#6a6a6b',
  '#ffc000',
  '#4472c4',
];

export const labels4Bars = [
  'Heizfenstersystem vs. Holzpelletheizung',
  'Heizfenstersystem vs. Luft-Wärmepumpe',
  'Heizfenstersystem vs. Sole-Wasser-Wärmepumpe',
  'Heizfenstersystem vs. Erdgas-Brennwert',
];

export const labels5Bars = [
  'Holzpellets',
  'Luft-Wärmepumpe',
  'Sole-Wasser-Wärmepumpe',
  'Vestaxx-Heizfenster inkl. Photovoltaik',
  'Erdgas-Brennwert',
];

export const labels6Bars = [
  'GEG-Referenzgebäude',
  'Holzpellets',
  'Luft-Wärmepumpe',
  'Sole-Wasser-Wärmepumpe',
  'Vestaxx-Heizfenster',
  'Erdgas-Brennwert',
];

/* inefficient implementation of options
 * everythin stays the same, it's just
 * the title text that changes */

export const optionsInvestmentCost = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Investitionskosten in €' },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsPrimaryEnergy = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Primärenergie in kWh/(m² ⋅ a)' },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsCO2 = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'CO2-Äquivalent-Emissionen in kg/a' },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsAnnuity = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Annuität in €' },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsReductionPrimary = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Eingesparte Primärenergie in kWh/(m² ⋅ a)',
      },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsReductionCO2 = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Eingesparte CO2-Äquivalent-Emissionen in kg/a',
      },
    },
    x: {
      stacked: true,
    },
  },
};

export const optionsReductionAnnuity = {
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Einsparung in €' },
    },
    x: {
      stacked: true,
    },
  },
};
