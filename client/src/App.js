import { useState, useEffect } from "react";
import { LevelProvider } from "./providers/LevelProvider";
import CharacterPlanner from "./pages/CharacterPlanner";

function App() {
  const [charClasses, setCharClasses] = useState(undefined);
  const [characters, setCharacters] = useState(undefined);

  useEffect(() => {
    fetch("/classes")
      .then(response => response.json())
      .then(data => {
        setCharClasses(data);
      });

    fetch("/characters")
      .then(response => response.json())
      .then(data => {
        setCharacters(data.characters);
      });
  }, []);

  return (
    <div className="App">
      {typeof charClasses === "undefined" &&
      typeof characters === "undefined" ? (
        <p>Loading</p>
      ) : (
        <LevelProvider>
          <CharacterPlanner classes={charClasses} characters={characters} />
        </LevelProvider>
      )}
    </div>
  );
}

export default App;
