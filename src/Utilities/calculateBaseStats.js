export const calculateHealth = vig => {
  let hp = 0;

  if (vig >= 1 && vig <= 25) {
    hp = 300 + 500 * Math.pow((vig - 1) / 24, 1.5);
  } else if (vig >= 26 && vig <= 40) {
    hp = 800 + 650 * Math.pow((vig - 25) / 15, 1.1);
  } else if (vig >= 41 && vig <= 60) {
    hp = 1450 + 450 * (1 - Math.pow(1 - (vig - 40) / 20, 1.2));
  } else if (vig >= 61 && vig <= 99) {
    hp = 1900 + 200 * (1 - Math.pow(1 - (vig - 60) / 39, 1.2));
  } else {
    throw new Error("Vigor must be between 1 and 99.");
  }

  return Math.floor(hp);
};

export const calculateFP = mind => {
  let fp = 0;

  if (mind >= 1 && mind <= 15) {
    fp = 50 + 45 * ((mind - 1) / 14);
  } else if (mind >= 16 && mind <= 35) {
    fp = 95 + 105 * ((mind - 15) / 20);
  } else if (mind >= 36 && mind <= 60) {
    fp = 200 + 150 * Math.pow(1 - (1 - (mind - 35) / 25), 1.2);
  } else if (mind >= 61 && mind <= 99) {
    fp = 350 + 100 * ((mind - 60) / 39);
  }

  return Math.floor(fp);
};
