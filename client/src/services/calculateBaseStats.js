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
  } else {
    throw new Error("Mind must be between 1 and 99.");
  }

  return Math.floor(fp);
};

export const calculateStamina = end => {
  // Level 1 - 15: 80 + 25*((Lvl - 1) / 14)
  // Level 16 - 35: 105 + 25*((Lvl - 15) / 15)
  // Level 36 - 60: 130 + 25*((Lvl - 30) / 20)
  // Level 61 - 99: 155 + 15*((Lvl - 50) / 49)
  // The resulting number is always rounded down

  let stamina = 0;

  if (end >= 1 && end <= 15) {
    stamina = 80 + 25 * ((end - 1) / 14);
  } else if (end >= 16 && end <= 35) {
    stamina = 105 + 25 * ((end - 15) / 15);
  } else if (end >= 36 && end <= 60) {
    stamina = 130 + 25 * ((end - 30) / 20);
  } else if (end >= 61 && end <= 99) {
    stamina = 155 + 15 * ((end - 50) / 49);
  } else {
    throw new Error("Endurance must be between 1 and 99.");
  }

  return Math.floor(stamina);
};

export const calculateEquipLoad = end => {
  // Level 1 - 25 --> 45 + 27*((Lvl - 8) / 17)
  // Level 26 - 60 --> 72 + 48*(((Lvl - 25) / 35)^1.1)
  // Level 61 - 99 --> 120 + 40*((Lvl - 60) / 39)
  // Only the first decimal point is kept.

  let equipLoad = 0;

  if (end >= 1 && end <= 25) {
    equipLoad = 45 + 27 * ((end - 8) / 17);
  } else if (end >= 26 && end <= 60) {
    equipLoad = 72 + 48 * Math.pow((end - 25) / 35, 1.1);
  } else if (end >= 61 && end <= 99) {
    equipLoad = 120 + 40 * ((end - 60) / 39);
  } else {
    throw new Error("Calculating equip load failed.");
  }

  return equipLoad;
};

export const calculateDiscovery = arc => {
  let discovery = 100.0;
  discovery = arc + discovery;
  return Math.round(discovery * 10) / 10;
};

export const calculateWeight = piecesWeights => {
  let weight =
    piecesWeights.head +
    piecesWeights.body +
    piecesWeights.hands +
    piecesWeights.legs;

  return weight;
};

export const determineWeightStatus = (equipLoad, totalWeight) => {
  let weightRatio = (totalWeight / equipLoad) * 100;

  if (weightRatio <= 29.9) {
    return "Light Load";
  } else if (weightRatio >= 30.0 && weightRatio <= 69.9) {
    return "Med. Load";
  } else if (weightRatio >= 70.0 && weightRatio <= 99.9) {
    return "Heavy Load";
  } else if (weightRatio >= 100.0) {
    return "Overloaded";
  } else {
    return "Error";
  }
};

export const calculateRunesToLevel = level => {
  // x = ((Lvl+81)-92)*0.02
  // x cannot be below 0, so change it to 0 if the formula resolves to below 0
  // Rune Cost = ((x+0.1)*((Lvl+81)^2))+1
  // The resulting number is always rounded down

  if (level > 0) {
    let x = (level + 81 - 92) * 0.02;
    if (x < 0) x = 0;

    return Math.floor((x + 0.1) * Math.pow(level + 81, 2) + 1);
  } else {
    return 0;
  }
};

export const calculateTotalRunes = (initLvl, level) => {
  let runes = 0;
  for (let i = level - 1; i >= initLvl; i--) {
    runes = runes + calculateRunesToLevel(i);
  }
  return runes;
};

const calculateBaseStats = (statName, stat) => {
  let result = 0;
  if (statName === "hp") {
    result = calculateHealth(stat);
  }
  if (statName === "fp") {
    result = calculateFP(stat);
  }
  if (statName === "stamina") {
    result = calculateStamina(stat);
  }
  if (statName === "equipLoad") {
    result = calculateEquipLoad(stat);
  }
  if (statName === "discovery") {
    result = calculateDiscovery(stat);
  }
  if (statName === "weight") {
    result = calculateWeight(stat);
  }

  return result;
};

export default calculateBaseStats;
