import { useState, useEffect } from "react";

import "../App.css";

import Panel from "../Components/Panel";
import Counter from "../Components/Counter";
import Dropdown from "../Components/Dropdown";
import { useLevel } from "../Providers/LevelContext";

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
  const { level, setLevel } = useLevel();

  useEffect(() => {
    setBaseStats(selectedClass);
    setLevel(selectedClass.initLvl);
  }, [selectedClass]);

  const onSelectClass = option => {
    setSelectedClass(classes[option]);
  };

  return (
    <div className="App">
      <Panel title="Base Stats">
        <h3>Level {level}</h3>
        <Dropdown name="Class" classes={classes} onSelectClass={onSelectClass} />
        <Counter name="Vigor" count={baseStats.vig} />
        <Counter name="Mind" count={baseStats.mind} />
        <Counter name="End" count={baseStats.end} />
        <Counter name="Str" count={baseStats.str} />
        <Counter name="Dex" count={baseStats.dex} />
        <Counter name="Int" count={baseStats.int} />
        <Counter name="Faith" count={baseStats.faith} />
        <Counter name="Arc" count={baseStats.arc} />
      </Panel>
    </div>
  );
};

export default CharacterPlanner;
