import { Character } from "./App";
import palette from "./assets/ElementalPalette"
import { useState } from "react";

type Props = {
    characters: Character[];
    addCharacter(name: string): void;
    removeCharacter(name: string): void;
    selectCharacter(name: string): void;
};

function PartyPanel({ characters, addCharacter, removeCharacter, selectCharacter } : Props) {
    const [panelOpen, setPanelOpen] = useState<boolean>(false);

    return (
        <div className="bg-gray-100 p-3">
            <div className="flex flex-col gap-3 overflow-y-auto">
                {
                    characters.filter(elem => elem.visible).map(char => (
                        <div key={char.name} className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[char.info.elem].bg} ${palette[char.info.elem].hover} cursor-pointer`} onClick={() => { selectCharacter(char.name); setPanelOpen(false); }}>
                            <img src={char.info.thumb} alt={char.name} className={`w-16 h-16 rounded-2xl ${palette[char.info.elem].thumb}`} />
                            <p className={`text-xl ${palette[char.info.elem].font}`}>{char.name}</p>
                            <button className="absolute top-2 right-2 w-auto h-auto px-2 py-1 bg-none text-gray-500 hover:text-gray-700 cursor-pointer" onClick={(evt) => { removeCharacter(char.name); evt.stopPropagation(); } }>X</button>
                        </div>
                    ))
                }
                <button className="bg-amber-400 p-2 rounded-2xl hover:bg-amber-500 cursor-pointer" onClick={() => setPanelOpen(!panelOpen) }>캐릭터 추가</button>
            </div>
            {panelOpen && (
                <div className="fixed left-70 top-0 h-full w-70 bg-gray-100 p-4">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-blue-400">캐릭터 선택</h2>
                        <button className="pb-1 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setPanelOpen(false)}>X</button>
                    </div>
                    <div className="mt-4 flex flex-col space-y-2 overflow-y-auto">
                        {
                            characters.filter(elem => !elem.visible).map(char => (
                                <div key={char.name} className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[char.info.elem].bg} ${palette[char.info.elem].hover} cursor-pointer`} onClick={() => addCharacter(char.name) }>
                                    <img src={char.info.thumb} alt={char.name} className={`w-16 h-16 rounded-2xl ${palette[char.info.elem].thumb}`} />
                                    <p className={`text-xl ${palette[char.info.elem].font}`}>{char.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default PartyPanel;