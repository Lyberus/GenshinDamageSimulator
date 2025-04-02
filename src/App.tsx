import PartyPanel from "./PartyPanel";
import ParameterPanel from "./ParameterPanel";
import DamagePanel from "./DamagePanel";
import { useImmer } from "use-immer";
import { useState } from "react";

export type Spec = {
  name?: string;
  level: number;
  maxLevel: number;
};

export type Member = {
  name: string;
  presets: Spec[];
};

function App() {
  const [members, updateMembers] = useImmer<Member[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  function addCharacter(name: string) {
    updateMembers((draft): void => { draft.push({ name: name, presets: [] }); });
  }

  function removeCharacter(name: string) {
    updateMembers((draft): void => {
      const idx = draft.findIndex(elem => elem.name === name);
      draft.splice(idx, 1);
    });
    if (selected === name) setSelected(null);
  }

  function selectCharacter(name: string) {
    setSelected(name);
  }

  return (
    <div className="select-none w-screen h-screen grid" style={{ gridTemplateColumns: "280px 2fr 1fr" }}>
      <PartyPanel characters={members} addCharacter={addCharacter} removeCharacter={removeCharacter} selectCharacter={selectCharacter} />
      <ParameterPanel members={members} selected={selected} onChange={updateMembers} />
      <DamagePanel />
    </div>
  );
}

export default App;
