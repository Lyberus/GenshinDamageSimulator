import PartyPanel from "./PartyPanel";
import ParameterPanel from "./ParameterPanel";
import DamagePanel from "./DamagePanel";
import { useImmer } from "use-immer";
import { useState } from "react";
import { CharacterInfo } from "./assets/CharacterDB";
import CharDB from "./assets/CharacterDB";

export type Stat = {
  kind: string;
  value: number;
};

export type Artifact = {
  main: Stat;
  sub: Stat[];
};

export type Spec = {
  name: string;
  level: number;
  maxLevel: number;
  weaponLevel: number;
  attackLevel: number;
  skillLevel: number;
  burstLevel: number;
  flower: Artifact;
  plume: Artifact;
  sands: Artifact;
  goblet: Artifact;
  circlet: Artifact;
};

export type Character = {
  name: string;
  info: CharacterInfo;
  visible: boolean;
  presets: Spec[];
};

const initialCharacters: Character[] = [];
for (const [name, info] of Object.entries(CharDB))
  initialCharacters.push({ name: name, info: info, visible: false, presets: [] });

function App() {
  const [characters, updateCharacters] = useImmer<Character[]>(initialCharacters);
  const [selected, setSelected] = useState<string | null>(null);

  function addCharacter(name: string) {
    const idx = characters.findIndex(elem => elem.name === name);
    updateCharacters((draft): void => { draft[idx].visible = true; });
  }

  function removeCharacter(name: string) {
    const idx = characters.findIndex(elem => elem.name === name);
    updateCharacters((draft): void => { draft[idx].visible = false; });
    if (selected === name) setSelected(null);
  }

  function selectCharacter(name: string) {
    setSelected(name);
  }

  return (
    <div className="select-none w-screen h-screen grid" style={{ gridTemplateColumns: "280px 2fr 1fr" }}>
      <PartyPanel characters={characters} addCharacter={addCharacter} removeCharacter={removeCharacter} selectCharacter={selectCharacter} />
      <ParameterPanel characters={characters} selected={selected} onChange={updateCharacters} />
      <DamagePanel />
    </div>
  );
}

export default App;
