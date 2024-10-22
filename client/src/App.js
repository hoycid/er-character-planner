import { useState, useEffect } from "react";
import { LevelProvider } from "./providers/LevelProvider";
import CharacterPlanner from "./pages/CharacterPlanner";

function App() {
  const [charClasses, setCharClasses] = useState(undefined);
  const [characters, setCharacters] = useState(undefined);

  const handleSaveCharacter = char => {
    setCharacters(prevCharacters => [...prevCharacters, char]);
  };

  const handleDeleteCharacter = char => {
    setCharacters(prevCharacters =>
      prevCharacters.filter(character => character.id !== char.id)
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
      setCharacters(data.characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  // Call the fetch functions as needed (e.g., in useEffect)
  useEffect(() => {
    fetchCharClasses();
    fetchCharacters();
  }, [characters]);

  return (
    <div className="App">
      {typeof charClasses === "undefined" &&
      typeof characters === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <LevelProvider>
          <CharacterPlanner
            classes={charClasses}
            characters={characters}
            onSaveCharacter={handleSaveCharacter}
            onDeleteCharacter={handleDeleteCharacter}
          />
        </LevelProvider>
      )}
    </div>
  );
}

export default App;
