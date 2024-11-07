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
  calculateEquipLoad,
  calculateRunesToLevel,
  calculateTotalRunes,
  calculateWeight,
  determineWeightStatus,
} from "../services/calculateBaseStats";
import CLASSES from "../utils/CLASSES";
import SimpleInfo from "../components/SimpleInfo";
import calculateBaseStats from "../services/calculateBaseStats";
import CustomDropdown from "../components/CustomDropdown";

const CharacterPlanner = props => {
  const [classesNames, setClassesNames] = useState(Object.keys(props.classes));
  const [selectedClass, setSelectedClass] = useState(
    props.classes && Object.values(props.classes).length > 0
      ? Object.values(props.classes)[0]
      : CLASSES.hero
  );
  const [baseStats, setBaseStats] = useState(selectedClass);
  const [currentStats, setCurrentStats] = useState(selectedClass);
  const [calculatedStats, setCalculatedStats] = useState({
    totalWeight: 0,
    poise: 0,
  });
  const [characterLoaded, setCharacterLoaded] = useState(false);
  const [classDropDownSelected, setClassDropDownSelected] = useState(
    classesNames[0]
  );
  const [helmDropDownSelected, setHelmDropDownSelected] = useState("");
  const [chestDropDownSelected, setChestDropDownSelected] = useState("");
  const [gauntletsDropDownSelected, setGauntletsDropDownSelected] =
    useState("");
  const [legsDropDownSelected, setLegsDropDownSelected] = useState("");

  const [nameInput, setNameInput] = useState("Tarnished");
  const [helms, setHelms] = useState([]);
  const [legArmors, setLegArmors] = useState([]);
  const [chestArmors, setChestArmors] = useState([]);
  const [gauntlets, setGauntlets] = useState([]);
  const [charWeight, setCharWeight] = useState({
    head: 0,
    body: 0,
    hands: 0,
    legs: 0,
  });
  const [weightStatus, setWeightStatus] = useState("Light load");
  const { level, setLevel } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setCurrentStats(selectedClass);
    setLevel(selectedClass.initLvl);
    setClassesNames(Object.keys(props.classes));
    if (props.armors.length > 0) {
      setHelms(
        props.armors
          .filter(item => item.category === "Helm")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setChestArmors(
        props.armors
          .filter(item => item.category === "Chest Armor")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setGauntlets(
        props.armors
          .filter(item => item.category === "Gauntlets")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );

      setLegArmors(
        props.armors
          .filter(item => item.category === "Leg Armor")
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
      );
    }
  }, [selectedClass, setLevel, classDropDownSelected, characterLoaded]);

  const onSelectClass = option => {
    setClassDropDownSelected(option);
    setSelectedClass(CLASSES[option]);
    setCurrentStats(CLASSES[option]);
  };

  const onSelectHelm = option => {
    setHelmDropDownSelected(option);
    const helm = helms.find(helm => helm.name === option);
    const weight = helm.weight;
    const poise = helm.resistance[4];
    console.log(poise);
    setCharWeight({ ...charWeight, head: weight });
    const totalWeight =
      charWeight.head + charWeight.body + charWeight.hands + charWeight.legs;
    setCalculatedStats(prevStats => ({
      ...prevStats,
      totalWeight: totalWeight.toFixed(1),
    }));
    setWeightStatus(
      determineWeightStatus(
        calculateEquipLoad(currentStats.end),
        calculateWeight(charWeight)
      )
    );
  };

  const onSelectChest = option => {
    setChestDropDownSelected(option);
    const chest = chestArmors.find(chest => chest.name === option);
    const weight = chest.weight;
    setCharWeight({ ...charWeight, body: weight });
    const totalWeight =
      charWeight.head + charWeight.body + charWeight.hands + charWeight.legs;
    setCalculatedStats(prevStats => ({
      ...prevStats,
      totalWeight: totalWeight.toFixed(1),
    }));
    setWeightStatus(
      determineWeightStatus(
        calculateEquipLoad(currentStats.end),
        calculateWeight(charWeight)
      )
    );
  };

  const onSelectGauntlets = option => {
    setGauntletsDropDownSelected(option);
    const gauntlet = gauntlets.find(gauntlet => gauntlet.name === option);
    const weight = gauntlet.weight;
    setCharWeight({ ...charWeight, hands: weight });
    const totalWeight =
      charWeight.head + charWeight.body + charWeight.hands + charWeight.legs;
    setCalculatedStats(prevStats => ({
      ...prevStats,
      totalWeight: totalWeight.toFixed(1),
    }));
    setWeightStatus(
      determineWeightStatus(
        calculateEquipLoad(currentStats.end),
        calculateWeight(charWeight)
      )
    );
  };

  const onSelectLegs = option => {
    setLegsDropDownSelected(option);
    const leg = legArmors.find(leg => leg.name === option);
    const weight = leg.weight;
    setCharWeight({ ...charWeight, legs: weight });
    const totalWeight =
      charWeight.head + charWeight.body + charWeight.hands + charWeight.legs;
    setCalculatedStats(prevStats => ({
      ...prevStats,
      totalWeight: totalWeight.toFixed(1),
    }));
    setWeightStatus(
      determineWeightStatus(
        calculateEquipLoad(currentStats.end),
        calculateWeight(charWeight)
      )
    );
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
        setSelectedClass(filteredData);
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
    setSelectedClass(Object.values(props.classes)[0]);
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
            stat={calculateTotalRunes(selectedClass.initLvl, level)}
          />
        </Panel>
      </div>

      <div className="PanelGroup">
        <Panel title="Equipment">
          <div className="Group">
            <CustomDropdown
              name="Head"
              choices={helms.map(helm => helm.name)}
              selected={helmDropDownSelected}
              onSelect={onSelectHelm}
            />
            <p className="detail">{charWeight.head}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="Chest"
              choices={chestArmors.map(chest => chest.name)}
              selected={chestDropDownSelected}
              onSelect={onSelectChest}
            />
            <p className="detail">{charWeight.body}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="Hands"
              choices={gauntlets.map(gauntlet => gauntlet.name)}
              selected={gauntletsDropDownSelected}
              onSelect={onSelectGauntlets}
            />
            <p className="detail">{charWeight.hands}</p>
          </div>
          <div className="Group">
            <CustomDropdown
              name="Legs"
              choices={legArmors.map(leg => leg.name)}
              selected={legsDropDownSelected}
              onSelect={onSelectLegs}
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

        <Info name="poise" stat={calculatedStats.totalWeight ? 0 : 0} />

        <Info
          name="discovery"
          stat={calculateBaseStats("discovery", currentStats.arc)}
        />
      </Panel>
    </>
  );
};

export default CharacterPlanner;
