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
import SimpleInfo from "../components/SimpleInfo";

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
  const [dropDownSelected, setDropDownSelected] = useState(
    Object.keys(props.classes)[0]
  );
  const [nameInput, setNameInput] = useState("Tarnished");
  const { level, setLevel, totalRunes, setTotalRunes } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setCurrentStats(selectedClass);
    setLevel(selectedClass.initLvl);
  }, [selectedClass, setLevel, dropDownSelected, characterLoaded]);

  const onSelectClass = option => {
    setDropDownSelected(option);
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
    fetch(`er-character-planner-production.up.railway.app/characters/${id}`)
      .then(response => response.json())
      .then(data => {
        const { id, name, startClass, ...filteredData } = data;
        setSelectedClass(filteredData);
        setBaseStats(filteredData);
        setCurrentStats(filteredData);
        setCharacterLoaded(true);
        setDropDownSelected(data.startClass);
        setNameInput(data.name);
      });
  };

  const handleNewCharacter = () => {
    setDropDownSelected(Object.keys(props.classes)[0]);
    setCharacterLoaded(false);
    setSelectedClass(Object.values(props.classes)[0]);
    setNameInput("Tarnished");
  };

  const handleSaveCharacter = () => {};

  const handleChangeName = value => {
    setNameInput(value);
  };

  return (
    <>
      <Panel>
        <h3>Level {level}</h3>
        <Input name="Name" value={nameInput} onChangeName={handleChangeName} />
        <Dropdown
          name="Class"
          classes={CLASSES}
          onSelectClass={onSelectClass}
          isDisabled={characterLoaded}
          selected={dropDownSelected}
        />
        <Button name="new" handleOnClick={handleNewCharacter}>
          New
        </Button>
        <Button name="save" handleOnClick={handleSaveCharacter}>
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
            <SimpleInfo key={name} name={name} stat={value} />
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
        <SimpleInfo name="totalRunes" stat={totalRunes} />
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
