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
  const [characterLoaded, setCharacterLoaded] = useState(false);
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

  const handleAlterStat = (stat, statVal) => {
    const updatedStats = {
      ...currentStats,
      [stat]: statVal,
    };
    setCurrentStats(updatedStats);
  };

  const handleCalculateStat = (statName, value) => {
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

  const handleLoadPreset = e => {
    const id = e.target.id;
    fetch(`/characters/${id}`)
      .then(response => response.json())
      .then(data => {
        // setCurrentStats(data);
        console.log(data);
        setCharacterLoaded(true);
      });
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
          isDisabled={characterLoaded}
        />
        <Button name="new" onClick="">
          New
        </Button>
        <Button name="save" onClick="">
          Save
        </Button>
        <Panel title="Saved Characters">
          {Array.isArray(props.characters) && props.characters.length > 0 ? (
            props.characters.map(({ id, name }) => (
              <div
                className="Subinfo"
                key={id}
                id={id}
                onClick={handleLoadPreset}
              >
                <p className="stat-value">{name}</p>
              </div>
            ))
          ) : (
            <p>No characters available</p>
          )}
        </Panel>
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
              onAlterStat={handleAlterStat}
            />
          ))}
      </Panel>

      <Panel title="Runes required">
        <Info
          name="runesToLevel"
          stat={level}
          onCalculateStat={handleCalculateStat}
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
            onCalculateStat={handleCalculateStat}
          />
        ))}
        <Subinfo name="weightStatus" stat={calculatedStats.equipload} />

        <Info
          name="poise"
          stat={calculatedStats.totalWeight}
          onCalculateStat={handleCalculateStat}
        />
        <Info
          name="discovery"
          stat={currentStats.arc}
          onCalculateStat={handleCalculateStat}
        />
      </Panel>
    </>
  );
};

export default CharacterPlanner;
