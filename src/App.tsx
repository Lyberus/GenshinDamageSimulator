import PartyPanel from "./PartyPanel";
import ParameterPanel from "./ParameterPanel";
import DamagePanel from "./DamagePanel";
import { useState } from "react";

export type Character = {
  name: string;
  elem: string;
  thumb: string;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character | null>(null);

  function addCharacter(chara: Character) {
    setCharacters([...characters, chara]);
  }

  function removeCharacter(idx: number) {
    if (characters[idx] === selected) setSelected(null);
    setCharacters([...characters.slice(0, idx), ...characters.slice(idx + 1)]);
  }

  function selectCharacter(chara: Character) {
    setSelected(chara);
  }

  return (
    <div className="select-none w-screen h-screen grid" style={{ gridTemplateColumns: "280px 2fr 1fr" }}>
      <PartyPanel characters={characters} addCharacter={addCharacter} removeCharacter={removeCharacter} selectCharacter={selectCharacter} />
      <ParameterPanel characters={characters} selected={selected} />
      <DamagePanel />
    </div>
  );
}

export default App;
