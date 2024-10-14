import { LevelProvider } from "./providers/LevelProvider";
import CharacterPlanner from "./pages/CharacterPlanner";

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
