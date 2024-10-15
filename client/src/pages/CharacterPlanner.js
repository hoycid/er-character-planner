import { useState, useEffect } from "react";

import "../styles/App.css";

import Panel from "../components/Panel";
import Counter from "../components/Counter";
import Dropdown from "../components/Dropdown";
import Info from "../components/Info";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLevel } from "../providers/LevelProvider";
import Subinfo from "../components/Subinfo";

import { calculateRunesToLevel } from "../services/calculateBaseStats";
import CLASSES from "../utils/CLASSES";

const CharacterPlanner = props => {
  const [selectedClass, setSelectedClass] = useState(
    props.classes && Object.values(props.classes).length > 0
      ? Object.values(props.classes)[0]
      : CLASSES.hero
  );
  const [baseStats, setBaseStats] = useState(selectedClass);
  const [currentStats, setCurrentStats] = useState(selectedClass);
  const [calculatedStats, setCalculatedStats] = useState({
    equipload: "Light load",
    totalWeight: 0,
  });
  const { level, setLevel, totalRunes, setTotalRunes } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setCurrentStats(selectedClass);
    setLevel(selectedClass.initLvl);
  }, [selectedClass, setLevel]);

  const onSelectClass = option => {
    setSelectedClass(CLASSES[option]);
    setCurrentStats(CLASSES[option]);
  };

  const onAlterStat = (stat, statVal) => {
    const updatedStats = {
      ...currentStats,
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
      <Panel>
        <h3>Level {level}</h3>
        <Input name="Name" />
        <Dropdown
          name="Class"
          classes={CLASSES}
          onSelectClass={onSelectClass}
        />
        <Button name="save" onClick="">
          Save Character
        </Button>
        <Button name="load" onClick="" isDisabled="true">
          Load Character
        </Button>
      </Panel>
      <Panel title="Base Stats">
        {Object.entries(baseStats)
          .filter(([name]) => name !== "initLvl")
          .map(([name, value]) => (
            <Info key={name} name={name} stat={value} />
          ))}
      </Panel>
      <Panel title="Current Stats">
        {Object.entries(currentStats)
          .filter(([name]) => name !== "initLvl")
          .map(([name, value]) => (
            <Counter
              key={name}
              name={name}
              initCount={baseStats[name]}
              count={value}
              onAlterStat={onAlterStat}
            />
          ))}
      </Panel>

      <Panel title="Runes required">
        <Info
          name="runesToLevel"
          stat={level}
          onCalculateStat={onCalculateStat}
        />
        <Info name="totalRunes" stat={totalRunes} />
      </Panel>

      <Panel >
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
