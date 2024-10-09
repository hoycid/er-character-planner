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

  return Math.round(equipLoad * 10) / 10;
};

export const determineWeightStatus = (equipLoad, totalWeight) => {
  let weightStatus = "";

  if (equipLoad >= 29.9) {
    weightStatus = "Light Load";
  } else if (equipLoad >= 30.0 && equipLoad <= 69.9) {
    weightStatus = "Med. Load";
  } else if (equipLoad >= 70.0 && equipLoad <= 99.9) {
    weightStatus = "Heavy Load";
  } else if (equipLoad >= 100.0) {
    weightStatus = "Overloaded";
  } 

  return weightStatus;
};

const calculateBaseStats = (statName, stat) => {
  let result = 0;
  if (statName === "hp") {
    result = calculateHealth(stat);
  } else if (statName === "fp") {
    result = calculateFP(stat);
  } else if (statName === "stamina") {
    result = calculateStamina(stat);
  } else if (statName === "equipLoad") {
    result = calculateEquipLoad(stat);
  } else {
    throw new Error("An error has occured.");
  }

  return result;
};

export default calculateBaseStats;
