import { useState, useEffect } from "react";
import { LevelProvider } from "./providers/LevelProvider";
import CharacterPlanner from "./pages/CharacterPlanner";

function App() {
  const [charClasses, setCharClasses] = useState(undefined);
  const [characters, setCharacters] = useState(undefined);
  const [armors, setArmors] = useState(undefined);

  const handleSaveCharacter = char => {
    setCharacters(prevCharacters => [...prevCharacters, char]);
  };

  const handleDeleteCharacter = id => {
    setCharacters(prevCharacters =>
      prevCharacters.filter(character => character.id !== id)
    );
  };

  const fetchCharClasses = async () => {
    try {
      const response = await fetch(
        "https://er-character-planner-production.up.railway.app/classes"
      );

      if (!response.ok) {
        throw new Error(`Error fetching classes: ${response.statusText}`);
      }

      const data = await response.json();
      setCharClasses(data);
    } catch (error) {
      console.error("Error fetching character classes:", error);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://er-character-planner-production.up.railway.app/characters"
      );

      if (!response.ok) {
        throw new Error(`Error fetching characters: ${response.statusText}`);
      }

      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const fetchArmors = async () => {
    try {
      const response = await fetch(
        "https://er-character-planner-production.up.railway.app/armors"
      );

      if (!response.ok) {
        throw new Error(`Error fetching characters: ${response.statusText}`);
      }

      const data = await response.json();
      setArmors(data);
    } catch (error) {
      console.error("Error fetching armors:", error);
    }
  };

  useEffect(() => {
    fetchArmors();
    fetchCharClasses();
    fetchCharacters();
  }, [characters]);

  return (
    <div className="App">
      {typeof charClasses === "undefined" ||
      typeof characters === "undefined" ||
      typeof armors === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <LevelProvider>
          <CharacterPlanner
            classes={charClasses}
            characters={characters}
            armors={armors}
            onSaveCharacter={handleSaveCharacter}
            onDeleteCharacter={handleDeleteCharacter}
          />
        </LevelProvider>
      )}
    </div>
  );
}

export default App;
