import { useState, useEffect } from "react";

import "../App.css";

import Panel from "./Panel";
import Counter from "./Counter";
import Dropdown from "./Dropdown";
import Info from "./Info";
import { useLevel } from "../Providers/LevelContext";
import Subinfo from "./Subinfo";

import { calculateRunesToLevel } from "../Utilities/calculateBaseStats";
import CLASSES from "../Utilities/CLASSES";

const CharacterPlanner = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES.hero);
  const [baseStats, setBaseStats] = useState(selectedClass);
  const [currentStats, setCurrentStats] = useState(selectedClass);
  const [calculatedStats, setCalculatedStats] = useState({
    equipload: "Light load",
    totalWeight: 0,
  });
  const { level, setLevel, totalRunes, setTotalRunes } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setLevel(selectedClass.initLvl);
  }, [selectedClass]);

  const onSelectClass = option => {
    setSelectedClass(CLASSES[option]);
    setCurrentStats(CLASSES[option]);
  };

  const onAlterStat = (stat, statVal) => {
    const updatedStats = {
      ...selectedClass,
      [stat]: statVal,
    };
    setCurrentStats(updatedStats);
  };

  const onCalculateStat = (statName, value) => {
    setCalculatedStats({
      ...calculatedStats,
      [statName]: value,
    });

    let runes = 0;
    for (let i = level - 1; i >= selectedClass.initLvl; i--) {
      runes = runes + calculateRunesToLevel(i);
    }

    setTotalRunes(runes);
  };

  return (
    <>
      <Panel title="Base Stats">
        <h3>Level {level}</h3>
        <Dropdown
          name="Class"
          classes={CLASSES}
          onSelectClass={onSelectClass}
        />
      </Panel>
      <Panel>
        {Object.entries(currentStats)
          .filter(([name]) => name !== "initLvl")
          .map(([name, value]) => (
            <Info key={name} name={name} stat={value} />
          ))}
      </Panel>
      <Panel>
        {Object.entries(baseStats)
          .filter(([name]) => name !== "initLvl")
          .map(([name, value]) => (
            <Counter
              key={name}
              name={name}
              count={value}
              onAlterStat={onAlterStat}
            />
          ))}
      </Panel>

      <Panel>
        <Info
          name="runesToLevel"
          stat={level}
          onCalculateStat={onCalculateStat}
        />
        <Info name="totalRunes" stat={totalRunes} />
      </Panel>

      <Panel>
        {[
          { name: "hp", stat: currentStats.vig },
          { name: "fp", stat: currentStats.mind },
          { name: "stamina", stat: currentStats.end },
          { name: "equipLoad", stat: currentStats.end },
        ].map(({ name, stat }) => (
          <Info
            key={name}
            name={name}
            stat={stat}
            onCalculateStat={onCalculateStat}
          />
        ))}
        <Subinfo name="weightStatus" stat={calculatedStats.equipload} />

        <Info
          name="poise"
          stat={calculatedStats.totalWeight}
          onCalculateStat={onCalculateStat}
        />
        <Info
          name="discovery"
          stat={currentStats.arc}
          onCalculateStat={onCalculateStat}
        />
      </Panel>
    </>
  );
};

export default CharacterPlanner;
