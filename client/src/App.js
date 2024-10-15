import { useState, useEffect } from "react";
import { LevelProvider } from "./providers/LevelProvider";
import CharacterPlanner from "./pages/CharacterPlanner";

function App() {
  const [charClasses, setCharClasses] = useState(undefined);

  useEffect(() => {
    fetch("/classes")
      .then(response => response.json())
      .then(data => {
        setCharClasses(data);
      });
  }, []);

  return (
    <div className="App">
      {typeof charClasses === "undefined" ? (
        <p>Loading</p>
      ) : (
        <LevelProvider>
          <CharacterPlanner classes={charClasses} />
        </LevelProvider>
      )}
    </div>
  );
}

export default App;
