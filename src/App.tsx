import PartyPanel from "./PartyPanel";
import ParameterPanel from "./ParameterPanel";
import DamagePanel from "./DamagePanel";
import { useState } from "react";

export type Character = {
  name: string;
  elem: string;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([{ name: "마비카", elem: "불" }, { name: "푸리나", elem: "물" }, { name: "나히다", elem: "풀" }, { name: "라이덴 쇼군", elem: "번개" }, { name: "시틀라리", elem: "얼음" }, { name: "벤티", elem: "바람" }, { name: "종려", elem: "바위" }]);

  function addCharacter(chara: Character) {
    setCharacters([...characters, chara]);
  }

  function removeCharacter(idx: number) {
    setCharacters([...characters.slice(0, idx), ...characters.slice(idx + 1)]);
  }

  return (
    <div className="select-none w-screen h-screen grid" style={{ gridTemplateColumns: "280px 2fr 1fr" }}>
      <PartyPanel characters={characters} addCharacter={addCharacter} removeCharacter={removeCharacter} />
      <ParameterPanel />
      <DamagePanel />
    </div>
  );
}

export default App;
