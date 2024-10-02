import "./App.css";

import { LevelProvider } from "./Providers/LevelContext";
import CharacterPlanner from "./Pages/CharacterPlanner";

function App() {
  return (
    <div className="App">
      <LevelProvider>
        <CharacterPlanner />
      </LevelProvider>
    </div>
  );
}

export default App;
