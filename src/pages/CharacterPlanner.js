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

import {
  calculateRunesToLevel,
  calculateTotalRunes,
} from "../services/calculateBaseStats";
import CLASSES from "../utils/CLASSES";
import SimpleInfo from "../components/SimpleInfo";
import calculateBaseStats from "../services/calculateBaseStats";
import CustomDropdown from "../components/CustomDropdown";

const CharacterPlanner = props => {
  const [helms, setHelms] = useState([]);
  const [legArmors, setLegArmors] = useState([]);
  const [chestArmors, setChestArmors] = useState([]);
  const [gauntlets, setGauntlets] = useState([]);
  const [classesNames, setClassesNames] = useState(Object.keys(props.classes));

  const [baseStats, setBaseStats] = useState(
    props.classes && Object.values(props.classes).length > 0
      ? Object.values(props.classes)[0]
      : CLASSES.hero
  );
  const [currentStats, setCurrentStats] = useState(baseStats);
  const [calculatedStats, setCalculatedStats] = useState({
    totalWeight: 0,
    poise: 0,
  });
  const [characterLoaded, setCharacterLoaded] = useState(false);
  const [classDropDownSelected, setClassDropDownSelected] = useState(
    classesNames[0]
  );

  const [equipped, setEquipped] = useState({
    head: "",
    chest: "",
    hands: "",
    legs: "",
  });

  const [nameInput, setNameInput] = useState("Tarnished");

  const [charWeight, setCharWeight] = useState({
    head: 0,
    chest: 0,
    hands: 0,
    legs: 0,
  });

  const [charPoise, setCharPoise] = useState({
    head: 0,
    chest: 0,
    hands: 0,
    legs: 0,
  });

  const [weightStatus, setWeightStatus] = useState("Light load");
  const { level, setLevel } = useLevel();

  useEffect(() => {
    setCurrentStats(baseStats);
    setLevel(baseStats.initLvl);
    setClassesNames(Object.keys(props.classes));

    if (props.armors.length > 0) {
      setHelms(
        props.armors
          .filter(item => item.type === "helm")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setChestArmors(
        props.armors
          .filter(item => item.type === "chest armor")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setGauntlets(
        props.armors
          .filter(item => item.type === "gauntlets")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setLegArmors(
        props.armors
          .filter(item => item.type === "leg armor")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );
    }
  }, [
    baseStats,
    setLevel,
    classDropDownSelected,
    characterLoaded,
  ]);

  const onSelectClass = option => {
    setClassDropDownSelected(option);
    setBaseStats(CLASSES[option]);
    setCurrentStats(CLASSES[option]);
  };

  const onSelectEquipment = (slot, itemName) => {
    setEquipped({
      ...equipped,
      [slot]: itemName,
    });

    let item = "";

    if (slot === "head") {
      item = helms.find(helm => helm.name === itemName);
    } else if (slot === "chest") {
      item = chestArmors.find(chest => chest.name === itemName);
    } else if (slot === "hands") {
      item = gauntlets.find(gauntlet => gauntlet.name === itemName);
    } else if (slot === "legs") {
      item = legArmors.find(leg => leg.name === itemName);
    } else {
      console.log("Error while selecting equipment: Item not found.");
    }

    let weight = 0;
    let poise = 0;

    if (item) {
      const resistanceArrString = item.resistance;

      const resistanceValid = resistanceArrString.replace(/'/g, '"');

      const parsedResistance = JSON.parse(resistanceValid);

      const itemResistance = { ...parsedResistance[0] };

      weight = Number(item.weight);
      poise = Number(itemResistance.poise);
    }

    setCharWeight({ ...charWeight, [slot]: weight });
    setCharPoise({ ...charPoise, [slot]: poise });

    const totalWeight =
      charWeight.head + charWeight.chest + charWeight.hands + charWeight.legs;

    const totalPoise =
      charPoise.head + charPoise.chest + charPoise.hands + charPoise.legs;

    setCalculatedStats(prevStats => ({
      ...prevStats,
      totalWeight: totalWeight.toFixed(1),
      totalPoise: totalPoise,
    }));
  };

  const handleAlterStat = (stat, statVal) => {
    const updatedStats = {
      ...currentStats,
      [stat]: statVal,
    };
    setCurrentStats(updatedStats);
  };

  const handleLoadPreset = id => {
    fetch(
      `https://er-character-planner-production.up.railway.app/characters/${id}`
    )
      .then(response => response.json())
      .then(data => {
        const { id, name, startClass, ...filteredData } = data;
        setBaseStats(filteredData);
        setCurrentStats(filteredData);
        setCharacterLoaded(true);
        setClassDropDownSelected(data.startClass);
        setNameInput(data.name);
      });
  };

  const handleNewCharacter = () => {
    setClassDropDownSelected(classesNames[0]);
    setCharacterLoaded(false);
    setBaseStats(Object.values(props.classes)[0]);
    setNameInput("Tarnished");
  };

  const handleDeletePreset = id => {
    fetch(
      `https://er-character-planner-production.up.railway.app/characters/${id}`,
      {
        method: "DELETE",
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        props.onDeleteCharacter(id);
      })
      .catch(error => {
        console.error("Error deleting character:", error);
      });
  };

  const handleSaveCharacter = () => {
    const characterData = {
      name: nameInput,
      initLvl: currentStats.initLvl,
      startClass: classDropDownSelected,
      vig: currentStats.vig,
      mind: currentStats.mind,
      end: currentStats.end,
      str: currentStats.str,
      dex: currentStats.dex,
      int: currentStats.int,
      faith: currentStats.faith,
      arc: currentStats.arc,
    };

    fetch(
      "https://er-character-planner-production.up.railway.app/characters/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      }
    )
      .then(response => response.json())
      .then(() => {
        props.onSaveCharacter(characterData);
      })
      .catch(error => {
        console.error("Error saving character:", error);
      });
  };

  const handleChangeName = value => {
    setNameInput(value);
  };

  return (
    <>
      <Panel title="Elden Ring Character Planner">
        <h3>Level {level}</h3>
        <Input name="Name" value={nameInput} onChangeName={handleChangeName} />
        <Dropdown
          name="Class"
          choices={classesNames}
          onSelect={onSelectClass}
          isDisabled={characterLoaded}
          selected={classDropDownSelected}
        />
        <Button name="new" onClick={handleNewCharacter}>
          New
        </Button>
        <Button name="save" onClick={handleSaveCharacter}>
          Save
        </Button>
        <Panel title="Saved Characters">
          {Array.isArray(props.characters) && props.characters.length > 0 ? (
            props.characters.map(({ name, id }) => (
              <div className="Pill" key={`${id}-${name}`}>
                <p className="stat-value">{name}</p>
                <span>
                  <button onClick={() => handleLoadPreset(id)}>Load</button>
                  <button onClick={() => handleDeletePreset(id)}>Delete</button>
                </span>
              </div>
            ))
          ) : (
            <p>No characters available</p>
          )}
        </Panel>
      </Panel>

      <div className="PanelGroup">
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
          <Info name="runesToLevel" stat={calculateRunesToLevel(level)} />
          <SimpleInfo
            name="totalRunes"
            stat={calculateTotalRunes(baseStats.initLvl, level)}
          />
        </Panel>
      </div>

      <div className="PanelGroup">
        <Panel title="Equipment">
          <div className="Group">
            <CustomDropdown
              name="head"
              choices={helms.map(helm => helm.name)}
              selected={equipped.head}
              onSelect={onSelectEquipment}
            />
            <p className="detail">{charWeight.head}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="chest"
              choices={chestArmors.map(chest => chest.name)}
              selected={equipped.chest}
              onSelect={onSelectEquipment}
            />
            <p className="detail">{charWeight.chest}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="hands"
              choices={gauntlets.map(gauntlet => gauntlet.name)}
              selected={equipped.hands}
              onSelect={onSelectEquipment}
            />
            <p className="detail">{charWeight.hands}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="legs"
              choices={legArmors.map(leg => leg.name)}
              selected={equipped.legs}
              onSelect={onSelectEquipment}
            />
            <p className="detail">{charWeight.legs}</p>
          </div>
        </Panel>
      </div>

      <Panel>
        {[
          { name: "hp", stat: calculateBaseStats("hp", currentStats.vig) },
          { name: "fp", stat: calculateBaseStats("fp", currentStats.mind) },
          {
            name: "stamina",
            stat: calculateBaseStats("stamina", currentStats.end),
          },
          {
            name: "weight",
            stat: calculateBaseStats("weight", charWeight).toFixed(1),
          },
          {
            name: "equipLoad",
            stat:
              Math.round(
                calculateBaseStats("equipLoad", currentStats.end) * 10
              ) / 10,
          },
          {
            name: "weightRatio",
            stat: (
              (calculateBaseStats("weight", charWeight) /
                calculateBaseStats("equipLoad", currentStats.end)) *
              100
            ).toFixed(2),
          },
        ].map(({ name, stat }) => (
          <Info key={name} name={name} stat={stat} />
        ))}
        <Subinfo name="weightStatus" stat={weightStatus} />

        <Info
          name="poise"
          stat={calculatedStats.totalPoise ? calculatedStats.totalPoise : 0}
        />

        <Info
          name="discovery"
          stat={calculateBaseStats("discovery", currentStats.arc)}
        />
      </Panel>
    </>
  );
};

export default CharacterPlanner;
