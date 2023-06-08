import Header from "./components/Header";
import { useUltimate } from "./context/UltimateContext";

function App() {
  const {currentSubj} = useUltimate()

  return (
    <div className="h-[100%] w-[100%]">
      <Header/>
      {currentSubj}
    </div>
  );
}

export default App;
