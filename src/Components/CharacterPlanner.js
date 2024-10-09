import { useState, useEffect } from "react";

import "../App.css";

import Panel from "./Panel";
import Counter from "./Counter";
import Dropdown from "./Dropdown";
import Info from "./Info";
import { useLevel } from "../Providers/LevelContext";
import Subinfo from "./Subinfo";

const classes = {
  hero: {
    initLvl: 7,
    vig: 14,
    mind: 9,
    end: 12,
    str: 16,
    dex: 9,
    int: 7,
    faith: 8,
    arc: 11,
  },
  bandit: {
    initLvl: 5,
    vig: 10,
    mind: 11,
    end: 10,
    str: 9,
    dex: 13,
    int: 9,
    faith: 8,
    arc: 14,
  },
  astrologer: {
    initLvl: 6,
    vig: 9,
    mind: 15,
    end: 9,
    str: 8,
    dex: 12,
    int: 16,
    faith: 7,
    arc: 9,
  },
};

const CharacterPlanner = () => {
  const [selectedClass, setSelectedClass] = useState(classes.hero);
  const [baseStats, setBaseStats] = useState(selectedClass);
  const [currentStats, setCurrentStats] = useState(selectedClass);
  const [calculatedStats, setCalculatedStats] = useState({
    equipload: "Light load",
  });
  const { level, setLevel } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setLevel(selectedClass.initLvl);
  }, [selectedClass]);

  const onSelectClass = option => {
    setSelectedClass(classes[option]);
    setCurrentStats(classes[option]);
  };

  const onAlterStat = (stat, statVal) => {
    const updatedStats = {
      ...selectedClass,
      [stat]: statVal,
    };

    setCurrentStats(updatedStats);
  };

  const onCalculateStat = (statName, value) => {
    setCalculatedStats({ ...calculatedStats, [statName]: value });
  };

  return (
    <div className="App">
      <Panel title="Base Stats">
        <h3>Level {level}</h3>
        <Dropdown
          name="Class"
          classes={classes}
          onSelectClass={onSelectClass}
        />
        <Counter name="vig" count={baseStats.vig} onAlterStat={onAlterStat} />
        <Counter name="mind" count={baseStats.mind} onAlterStat={onAlterStat} />
        <Counter name="end" count={baseStats.end} onAlterStat={onAlterStat} />
        <Counter name="str" count={baseStats.str} onAlterStat={onAlterStat} />
        <Counter name="dex" count={baseStats.dex} onAlterStat={onAlterStat} />
        <Counter name="int" count={baseStats.int} onAlterStat={onAlterStat} />
        <Counter
          name="faith"
          count={baseStats.faith}
          onAlterStat={onAlterStat}
        />
        <Counter name="arc" count={baseStats.arc} onAlterStat={onAlterStat} />
      </Panel>
      <Panel>
        <Info
          name="hp"
          stat={currentStats.vig}
          onCalculateStat={onCalculateStat}
        />
        <Info
          name="fp"
          stat={currentStats.mind}
          onCalculateStat={onCalculateStat}
        />
        <Info
          name="stamina"
          stat={currentStats.end}
          onCalculateStat={onCalculateStat}
        />
        <Info
          name="equipLoad"
          stat={currentStats.end}
          onCalculateStat={onCalculateStat}
        />
        <Subinfo name="weightStatus" stat={calculatedStats.equipload} />
      </Panel>
    </div>
  );
};

export default CharacterPlanner;
