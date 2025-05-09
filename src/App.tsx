import PartyPanel from "./PartyPanel";
import ParameterPanel from "./ParameterPanel";
import DamagePanel from "./DamagePanel";
import { useImmer } from "use-immer";
import { useState } from "react";
import { CharacterInfo } from "./assets/CharacterDB";
import CharDB from "./assets/CharacterDB";
import CycleManager from "./CycleManager";
import { Draft } from "immer";

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
  maxWeaponLevel: number;
  weaponLevel: number;
  attackLevel: number;
  skillLevel: number;
  burstLevel: number;
  artifact: [Artifact, Artifact, Artifact, Artifact, Artifact];
};

export type Character = {
  name: string;
  info: CharacterInfo;
  visible: boolean;
  presets: Spec[];
  selectedPreset: number;
};

const initialCharacters: Character[] = [];
for (const [name, info] of Object.entries(CharDB))
  initialCharacters.push({ name: name, info: info, visible: false, presets: [], selectedPreset: 0 });

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

  function updatePreset(recipe: (draft: Draft<Spec>) => void) {
    const idx = characters.findIndex(val => val.name === selected);
    updateCharacters(draft => recipe(draft[idx].presets[draft[idx].selectedPreset]));
  }

  function updateCharacter(recipe: (draft: Draft<Character>) => void) {
    const idx = characters.findIndex(val => val.name === selected);
    updateCharacters(draft => recipe(draft[idx]));
  }

  return (
    <div className="select-none w-screen h-screen flex">
      <PartyPanel characters={characters} addCharacter={addCharacter} removeCharacter={removeCharacter} selectCharacter={selectCharacter} />
      <ParameterPanel characters={characters} selected={selected} updatePreset={updatePreset} updateCharacter={updateCharacter} />
      <DamagePanel />
      <CycleManager />
    </div>
  );
}

export default App;
